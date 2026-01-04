
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:postgres@localhost:5433/finanzas"
        }
    },
    log: ['query', 'info', 'warn', 'error']
})

async function main() {
    try {
        console.log("Attempting to connect...")
        await prisma.$connect()
        console.log('✅ Successfully connected to DB')

        const count = await prisma.category.count()
        console.log('✅ Categories count:', count)

    } catch (e) {
        console.error('❌ Connection error:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
