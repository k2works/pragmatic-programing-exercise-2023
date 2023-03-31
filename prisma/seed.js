const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const account = require('./data/account')
const retiredAccount = require('./data/retiredAccount')
const transactionReason = require('./data/transactionReason')
const transaction = require('./data/transaction')

async function main() {
    for (const a of account) {
        await prisma.account.upsert({
            where: { number: a.number },
            update: {},
            create: a,
        })
    }
    for (const a of retiredAccount) {
        await prisma.retiredAccount.upsert({
            where: { number: a.number },
            update: {},
            create: a,
        })
    }
    for (const a of transactionReason) {
        await prisma.transactionReason.upsert({
            where: { id: a.id },
            update: {},
            create: a,
        })
    }
    for (const a of transaction) {
        await prisma.transaction.upsert({
            where: { number: a.number },
            update: {},
            create: a,
        })
    }
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