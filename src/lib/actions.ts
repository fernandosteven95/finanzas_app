"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// This is like your "Visual Logic Flow" in Budibase, but in clean code.
export async function createTransaction(formData: FormData) {
    const amount = parseFloat(formData.get("amount") as string);
    const description = formData.get("description") as string;
    const type = formData.get("type") as "INCOME" | "EXPENSE"; // Simple casting for demo

    // 0. Get default account (Temporary fix for v1)
    const defaultAccount = await prisma.account.findFirst();
    if (!defaultAccount) throw new Error("No accounts found. Please seed the database.");

    // 1. Insert into Database (This is the "Create Row" block)
    await prisma.transaction.create({
        data: {
            amount,
            description,
            type,
            date: new Date(),
            accountId: defaultAccount.id, // Linked to the first found account
            // categoryId: is optional, so we can skip it for now
        },
    });

    // 2. Refresh the UI (This is "Refresh Data Provider")
    revalidatePath("/");

    // 3. Close modal or redirect? For now, we just refresh.
}

export async function getCategories() {
    return await prisma.category.findMany({
        where: { parentId: null }, // Only fetch top-level
        include: {
            children: {
                orderBy: { name: 'asc' }
            }
        },
        orderBy: { name: 'asc' },
    });
}

export async function addCategory(formData: FormData) {
    const name = formData.get("name") as string;
    const type = formData.get("type") as "INCOME" | "EXPENSE";
    const icon = formData.get("icon") as string;
    const parentId = formData.get("parentId") as string; // Optional

    await prisma.category.create({
        data: {
            name,
            type,
            icon,
            parentId: parentId || null
        }
    });
    revalidatePath("/settings");
}

export async function deleteCategory(id: string) {
    try {
        // Optional: Check for transactions first if needed
        // For now, cascade delete or simple delete (Prisma might fail if foreign keys exist without Cascade)
        // We will assume cascade delete is NOT enabled in schema yet, so strict delete.
        await prisma.category.delete({ where: { id } });
        revalidatePath("/settings");
    } catch (error) {
        console.error("Failed to delete category:", error);
    }
}


export async function updateCategory(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;

    await prisma.category.update({
        where: { id },
        data: { name, icon }
    });
    revalidatePath("/settings");
}

// --- Account Actions ---

export async function getAccounts() {
    return await prisma.account.findMany({
        include: { currency: true },
        orderBy: { createdAt: 'asc' }
    });
}

export async function getCurrencies() {
    return await prisma.currency.findMany({
        orderBy: { code: 'asc' }
    });
}

export async function createAccount(formData: FormData) {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string; // Will cast to Enum
    const currencyId = formData.get("currencyId") as string;
    const balance = parseFloat(formData.get("balance") as string) || 0;

    await prisma.account.create({
        data: {
            name,
            type: type as any, // Cast to AccountType
            currencyId,
            balance
        }
    });
    revalidatePath("/settings");
}

export async function deleteAccount(id: string) {
    try {
        await prisma.account.delete({ where: { id } });
        revalidatePath("/settings");
    } catch (error) {
        console.error("Failed to delete account:", error);
    }
}

// --- Recurring Transactions ---

export async function createRecurringTransaction(formData: FormData) {
    const description = formData.get("description") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const type = formData.get("type") as "INCOME" | "EXPENSE";
    const accountId = formData.get("accountId") as string;
    const categoryId = formData.get("categoryId") as string;
    const frequency = formData.get("frequency") as "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY";
    const startDate = new Date(formData.get("startDate") as string);
    const totalInstallments = formData.get("totalInstallments") ? parseInt(formData.get("totalInstallments") as string) : null;

    // Initial nextDate is the start date
    await prisma.recurringTransaction.create({
        data: {
            description,
            amount,
            type,
            accountId,
            categoryId,
            frequency,
            startDate,
            nextDate: startDate,
            totalInstallments
        }
    });
    revalidatePath("/recurring");
}

export async function checkAndGenerateRecurring() {
    // 1. Find due transactions
    const dueRecurring = await prisma.recurringTransaction.findMany({
        where: {
            nextDate: { lte: new Date() },
        }
    });

    for (const rule of dueRecurring) {
        // Double check installments limit in JS for safety
        if (rule.totalInstallments && rule.installmentsPaid >= rule.totalInstallments) continue;

        // 2. Generate Transaction (PENDING)
        await prisma.transaction.create({
            data: {
                amount: rule.amount,
                description: `${rule.description} (Automático)`,
                date: rule.nextDate,
                type: rule.type,
                status: "PENDING",
                accountId: rule.accountId,
                categoryId: rule.categoryId,
                recurringTransactionId: rule.id
            }
        });

        // 3. Calculate new Next Date
        const nextDate = new Date(rule.nextDate);
        switch (rule.frequency) {
            case "DAILY": nextDate.setDate(nextDate.getDate() + 1); break;
            case "WEEKLY": nextDate.setDate(nextDate.getDate() + 7); break;
            case "BIWEEKLY": nextDate.setDate(nextDate.getDate() + 14); break;
            case "MONTHLY": nextDate.setMonth(nextDate.getMonth() + 1); break;
            case "YEARLY": nextDate.setFullYear(nextDate.getFullYear() + 1); break;
        }

        // 4. Update Rule
        await prisma.recurringTransaction.update({
            where: { id: rule.id },
            data: {
                nextDate,
                lastGenerated: new Date(),
                installmentsPaid: { increment: 1 }
            }
        });
    }

    if (dueRecurring.length > 0) {
        revalidatePath("/");
        revalidatePath("/recurring");
    }
}

export async function getRecurringTransactions() {
    // Lazy check
    await checkAndGenerateRecurring();

    return await prisma.recurringTransaction.findMany({
        orderBy: { nextDate: 'asc' },
        include: { account: true, category: true }
    });
}

export async function deleteRecurringTransaction(id: string) {
    try {
        await prisma.recurringTransaction.delete({ where: { id } });
        revalidatePath("/recurring");
    } catch (error) {
        console.error("Failed to delete recurring:", error);
    }
}
