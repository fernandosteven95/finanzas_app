import { PrismaClient, TransactionType, AccountType } from '@prisma/client'

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
    const categories = [
        { name: 'Entretenimiento', type: TransactionType.EXPENSE, icon: '🎬' },
        { name: 'Hogar', type: TransactionType.EXPENSE, icon: '🏠' },
        { name: 'Vehículo', type: TransactionType.EXPENSE, icon: '🚗' },
        { name: 'Comida', type: TransactionType.EXPENSE, icon: '🍔' },
        { name: 'Deportes', type: TransactionType.EXPENSE, icon: '⚽' },
        { name: 'Educación', type: TransactionType.EXPENSE, icon: '📚' },
        { name: 'Finanzas', type: TransactionType.EXPENSE, icon: '💸' },
        { name: 'Capital a invertir', type: TransactionType.EXPENSE, icon: '📈' },
        { name: 'Mascota', type: TransactionType.EXPENSE, icon: '🐶' },
        { name: 'Personales', type: TransactionType.EXPENSE, icon: '👤' },
        { name: 'Regalos', type: TransactionType.EXPENSE, icon: '🎁' },
        { name: 'Vestimenta', type: TransactionType.EXPENSE, icon: '👔' },
        { name: 'Salud', type: TransactionType.EXPENSE, icon: '🏥' },
        { name: 'Transporte', type: TransactionType.EXPENSE, icon: '🚌' },
        { name: 'Viajes', type: TransactionType.EXPENSE, icon: '✈️' },
        { name: 'Vivienda', type: TransactionType.EXPENSE, icon: '🏘️' },
        { name: 'Ahorros', type: TransactionType.EXPENSE, icon: '🐷' },
        { name: 'Emprendimiento', type: TransactionType.EXPENSE, icon: '💪' },
        { name: 'Sueldo', type: TransactionType.INCOME, icon: '💵' },
    ]

    for (const cat of categories) {
        await prisma.category.create({
            data: {
                name: cat.name,
                type: cat.type,
                icon: cat.icon,
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
