// テンプレートリテラル
const name = 'John Doe';
const message = `Hello, ${name}!`;

// アロー関数
const add = (x, y) => x + y;

// デフォルトパラメーター
function greet(name = 'World') {
  console.log(`Hello, ${name}!`);
}

// 分割代入
const person = {
  firstName: 'John',
  lastName: 'Doe'
};

const { firstName, lastName } = person;

// スプレッド演算子
const arr = [1, 2, 3];
const arrCopy = [...arr];

// クラス
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}