const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'order.csv');

const orders = fs.readFileSync(filePath, { encoding: 'utf-8' })
  .trim() // 末尾の改行を削除
  .split('\n') // 行単位で分割
  .map((line) => {
    const [day, orderNumber, orderSubNumber, productCode, quantity, couponDiscount] = line.split('\t');
    return {
      day: new Date(day),
      orderNumber,
      orderSubNumber: parseInt(orderSubNumber, 10),
      productCode,
      quantity: parseInt(quantity, 10),
      couponDiscount: couponDiscount ? parseInt(couponDiscount, 10) : null,
    };
  });

module.exports = orders