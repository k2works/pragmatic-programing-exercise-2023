console.log("App.js: loaded");
export class App {
  constructor() {
    console.log("App initialized");
  }
}

export function sum(a, b) {
  return a + b;
}

export function totalStructured() {
  let total = 0;
  const prices = [1, 5, 7];

  for (let n = 0; n < prices.length; n++) {
    total += prices[n];
  }

  return total;
}

export function totalInject() {
  const prices = [1, 5, 7];
  const result = prices.reduce((total, n) => total + n, 0);
  return result;
}

export function totalReduce() {
  const prices = [1, 5, 7];
  return prices.reduce((total, n) => total + n, 0);
}

export function iteratorNotUsing() {
  const result = [];
  for (let i = 1; i <= 9; i++) {
    if (i % 2 === 0) {
      result.push(i);
    }
  }
  return result;
}

export function iteratorUsingSelect() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(i => i % 2 === 0);
}


