const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const account = require('./data/account')
const retiredAccount = require('./data/retiredAccount')
const transactionReason = require('./data/transactionReason')
const transaction = require('./data/transaction')
const product = require('./data/product')
const retiredProduct = require('./data/retiredProduct')
const order = require('./data/order')
const party = require('./data/party')
const experienceEvent = require('./data/experienceEvent')
const event = require('./data/event')
const code = require('./data/code')

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

    for (const p of party) {
        await prisma.party.upsert({
            where: { id: p.id },
            update: p,
            create: p,
        })
    }

    for (const e of experienceEvent) {
        await prisma.experienceEvent.upsert({
            where: { eventNumber: e.eventNumber },
            update: e,
            create: e,
        })
    }

    for (const e of event) {
        await prisma.event.upsert({
            where: { eventNumber: e.eventNumber },
            update: e,
            create: e,
        })
    }

    for (const c of code) {
        await prisma.code.upsert({
            where: {
                type_value: {
                    type: c.type,
                    value: c.value,
                },
            },
            update: c,
            create: c,
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