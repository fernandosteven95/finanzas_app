const { PrismaClient, TransactionType, AccountType } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    // 1. Create default Currency
    const usd = await prisma.currency.upsert({
        where: { code: 'USD' },
        update: {},
        create: {
            code: 'USD',
            name: 'US Dollar',
            symbol: '$',
        },
    })

    // 2. Create default Accounts (Sources)
    const accounts = [
        { name: 'Efectivo', type: AccountType.CASH },
        { name: 'Banco Principal', type: AccountType.BANK },
        { name: 'Tarjeta de Crédito', type: AccountType.CREDIT_CARD },
    ]

    for (const acc of accounts) {
        await prisma.account.create({
            data: {
                name: acc.name,
                type: acc.type,
                currencyId: usd.id,
            }
        })
    }

    // 3. Create Categories from Image
    // 3. Create Categories & Subcategories
    const categories = [
        {
            name: 'Entretenimiento', type: TransactionType.EXPENSE, icon: '🎬',
            children: [{ name: 'Cine' }, { name: 'Juegos' }]
        },
        {
            name: 'Comida', type: TransactionType.EXPENSE, icon: '🍔',
            children: [{ name: 'Supermercado' }, { name: 'Restaurante' }]
        },
        // ... (Keep simpler ones flat for brevity, or add more as needed)
        { name: 'Hogar', type: TransactionType.EXPENSE, icon: '🏠' },
        { name: 'Vehículo', type: TransactionType.EXPENSE, icon: '🚗' },
        { name: 'Sueldo', type: TransactionType.INCOME, icon: '💵' },
    ]

    for (const cat of categories) {
        await prisma.category.create({
            data: {
                name: cat.name,
                type: cat.type,
                icon: cat.icon,
                children: {
                    create: cat.children ? cat.children.map(child => ({
                        name: child.name,
                        type: cat.type, // Inherit type
                        icon: cat.icon // Inherit icon (optional, or specific icons)
                    })) : []
                }
            }
        })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
