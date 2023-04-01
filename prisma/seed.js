const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const account = require('./data/account')
const retiredAccount = require('./data/retiredAccount')
const transactionReason = require('./data/transactionReason')
const transaction = require('./data/transaction')
const product = require('./data/product')
const retiredProduct = require('./data/retiredProduct')
const order = require('./data/order')

async function main() {
    for (const a of account) {
        await prisma.account.upsert({
            where: { number: a.number },
            update: a,
            create: a,
        })
    }
    for (const a of retiredAccount) {
        await prisma.retiredAccount.upsert({
            where: { number: a.number },
            update: a,
            create: a,
        })
    }
    for (const a of transactionReason) {
        await prisma.transactionReason.upsert({
            where: { id: a.id },
            update: a,
            create: a,
        })
    }
    for (const a of transaction) {
        await prisma.transaction.upsert({
            where: { number: a.number },
            update: a,
            create: a,
        })
    }

    for (const p of product) {
        await prisma.product.upsert({
            where: { code: p.code },
            update: p,
            create: p,
        })
    }

    for (const p of retiredProduct) {
        await prisma.retiredProduct.upsert({
            where: { code: p.code },
            update: p,
            create: p,
        })
    }

    for (const o of order) {
        await prisma.order.upsert({
            where: {
                orderNumber_orderSubNumber: {
                    orderNumber: o.orderNumber,
                    orderSubNumber: o.orderSubNumber,
                },
            },
            update: o,
            create: o,
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