# 実践 JavaScript

[![Node.js CI](https://github.com/hiroshima-arc/javascript-in-practice/actions/workflows/node.js.yml/badge.svg)](https://github.com/hiroshima-arc/javascript-in-practice/actions/workflows/node.js.yml)

## 概要

JavaScript の実践的な使い方を学ぶためのリポジトリです。

### 目的

### 前提

| ソフトウェア | バージョン | 備考 |
| :----------- | :--------- | :--- |
| nodejs       | 16.x       |      |

## 構成

- [構築](#構築)
- [配置](#配置)
- [運用](#運用)
- [開発](#開発)

### 構築

## 開発環境の構築

JavaScript 開発環境を構築するためには、以下の手順を実行してください。

### バージョンマネージャー

バージョンマネージャーを使用することで、異なるバージョンの Node.js を簡単に切り替えることができます。以下の手順でバージョンマネージャーをセットアップしてください。

#### バージョンマネージャーのセットアップ

1. NVM をインストールします。NVM は、Node.js のバージョンを管理するためのツールです。以下のコマンドを実行して、NVM をインストールしてください。

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

2. npm をインストールします。npm は、Node.js のパッケージマネージャーです。以下のコマンドを実行して、npm をインストールしてください。

```bash
nvm list
nvm install 16.10.1
npm -v
```

3. yarn をインストールします。yarn は、npm の代替となるパッケージマネージャーです。以下のコマンドを実行して、yarn をインストールしてください。

```bash
npm install -g yarn
yarn -v
```

4. ターミナルを再起動します。

#### トランスパイラ

トランスパイラを使用することで、ES6 以降の構文を ES5 に変換することができます。以下の手順でトランスパイラをセットアップしてください。

#### トランスパイラのセットアップ

1. package.json ファイルを作成します。以下のコマンドを実行して、package.json ファイルを作成してください。

```bash
npm init -y
```

-y オプションを指定することで、package.json ファイルの内容をデフォルト値で作成することができます。

1. Babel をインストールします。Babel は、トランスパイラの一つです。以下のコマンドを実行して、Babel をインストールしてください。

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

--save-dev オプションを指定することで、package.json ファイルの devDependencies にパッケージを追加することができます。

2. .babelrc ファイルを作成します。以下のコマンドを実行して、.babelrc ファイルを作成してください。

```bash
touch .babelrc
```

3. .babelrc ファイルに以下の内容を記述してください。

```json
{
  "presets": ["@babel/preset-env"]
}
```

#### トランスパイラの設定

1. package.json ファイルを開き、以下の内容を追加してください。

```json
{
  "scripts": {
    "build": "babel src -d dist"
  }
}
```

scripts には、npm コマンドを登録することができます。今回は、build コマンドを登録しています。build コマンドは、src ディレクトリの JavaScript ファイルをトランスパイルして、dist ディレクトリに出力するコマンドです。

#### トランスパイラの実行

1. src ディレクトリを作成して、index.js ファイルを作成します。

```JavaScript
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
```

2. 以下のコマンドを実行して、トランスパイルを実行してください。

```bash
npm run build
```

3. ES6 以降の構文が ES5 に変換されていることを確認してください。

```JavaScript
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// テンプレートリテラル
var name = 'John Doe';
var message = "Hello, ".concat(name, "!");

// アロー関数
var add = function add(x, y) {
  return x + y;
};

// デフォルトパラメーター
function greet() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'World';
  console.log("Hello, ".concat(name, "!"));
}

// 分割代入
var person = {
  firstName: 'John',
  lastName: 'Doe'
};
var firstName = person.firstName,
  lastName = person.lastName;

// スプレッド演算子
var arr = [1, 2, 3];
var arrCopy = [].concat(arr);

// クラス
var Person = /*#__PURE__*/function () {
  function Person(firstName, lastName) {
    _classCallCheck(this, Person);
    this.firstName = firstName;
    this.lastName = lastName;
  }
  _createClass(Person, [{
    key: "getFullName",
    value: function getFullName() {
      return "".concat(this.firstName, " ").concat(this.lastName);
    }
  }]);
  return Person;
}();
```

### モジュールバンドラー

モジュールバンドラーを使用することで、複数の JavaScript ファイルを一つのファイルにまとめることができます。以下の手順でモジュールバンドラーをセットアップしてください。

#### モジュールバンドラーのセットアップ

1. Webpack をインストールします。Webpack は、モジュールバンドラーの一つです。以下のコマンドを実行して、Webpack をインストールしてください。

```bash
npm install --save-dev webpack webpack-cli
npx webpack --version
```

npx コマンドは、npm パッケージを実行するためのコマンドです。npx コマンドを使用することで、ローカルにインストールされている npm パッケージを実行することができます。

2. webpack.config.js ファイルを作成します。以下のコマンドを実行して、webpack.config.js ファイルを作成してください。

```bash
touch webpack.config.js
```

3. webpack.config.js ファイルに以下の内容を記述してください。

```javascript
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
};
```

4. package.json ファイルに以下の内容に変更してください。

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

#### モジュールバンドラーの実行

1. ./src/sample_es5.js ファイルを作成してください。

```JavaScript
function greeting(name) {
  return 'Hello ' + name;
}

module.exports = greeting;
```

2. ./src/index.js ファイルを変更してください。

```JavaScript
var greeting = require('./sample_es5');

console.log(greeting('ES5'));
```

3. 以下のコマンドを実行して、モジュールバンドラーを実行してください。

```bash
npm run build
```

4. ./dist/bundle.js ファイルが作成されていることを確認してください。

5. ./dist/bundle.js ファイルを実行してください。

```bash
node ./dist/bundle.js
```

#### モジュールバンドラーの設定

1. ./src/sample_es6.js ファイルを作成してください。

```JavaScript
class Greeting {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(`Hello ${this.name}`);
  }
}

export default Greeting;
```

2. ./src/index.js ファイルを変更してください。

```JavaScript
var greeting = require('./sample_es5');
console.log(greeting('ES5'));

var greet = require('./sample_es6');
var g = new greet.default('ES6');
g.say();
```

3. 以下のコマンドを実行して、モジュールバンドラーを実行してください。

```bash
npm run build
```

4. ./dist/bundle.js ファイルが作成されていることを確認してください。

5. ./dist/bundle.js ファイルを実行してください。

```bash
node ./dist/bundle.js
```

6. 現状では ES6 のコードをそのまま出力しています。ES5 に変換するためには、babel-loader を使用します。 パッケージをインストールして webpack.config.js に以下のコードを変更してください。

```bash
npm install --save-dev babel-loader
```

```javascript
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  target: ['web', 'es5'],
};
```

7. 以下のコマンドを実行して、モジュールバンドラーを実行してください。

```bash
npm run build
```

8. ./dist/bundle.js ファイルが作成されていることを確認してください。

9. ./dist/bundle.js ファイルを実行してください。

```bash
node ./dist/bundle.js
```

### TypeScript

TypeScript を使用することで、JavaScript に型を導入することができます。以下の手順で TypeScript をセットアップしてください。

#### TypeScript のセットアップ

1. TypeScript をインストールします。以下のコマンドを実行して、TypeScript をインストールしてください。

```bash
npm install --save-dev typescript
```

2. tsconfig.json ファイルを作成します。以下のコマンドを実行して、tsconfig.json ファイルを作成してください。

```bash
npx tsc --init
```

#### トランスパイラの設定

1. 必要なパッケージをインストールします。

```bash
npm install --save-dev @babel/preset-typescript @babel/plugin-proposal-class-properties typescript
```

2. .babelrc ファイルを変更します。

```bash
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

#### トランスパイラの実行

1. ./src/sample.ts ファイルを作成してください。

```TypeScript
class Greeting {
  constructor(public name: string) {}
  say() {
    console.log(`Hello ${this.name}`);
  }
}
```

2. ./src/index.ts ファイルを変更してください。

```TypeScript
import { Greeting } from "./sample";

const greeting = new Greeting("TypeScript");
greeting.say();
```

3. 以下のコマンドを実行して、トランスパイルを実行してください。

```bash
npx babel src --extensions '.ts,.tsx' --out-dir dist
```

4. ./dist/sample.js ファイルが作成されていることを確認してください。

5. ./dist/sample.js ファイルを実行してください。

```bash
node ./dist/index.js
```

#### モジュールバンドラーの設定

1. 必要なパッケージをインストールします。

```bash
npm install --save-dev ts-loader
```

2. webpack.config.js ファイルを開き、以下の内容を追加してください。

```javascript
module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  target: ['web', 'es5'],
};
```

3. 以下のコマンドを実行して、モジュールバンドラーを実行してください。

```bash
npm run build
```

4. ./dist/bundle.js ファイルが作成されていることを確認してください。

5. ./dist/bundle.js ファイルを実行してください。

```bash
node ./dist/bundle.js
```

TypeScript ファイルをそのまま実行したい場合は、ts-node を使用します。

```bash
npm install --save-dev ts-node
```

動かし方は以下の通りです。

```bash
npx ts-node src/index.ts
```

### webpack-dev-server のセットアップ

webpack-dev-server を使用することで、開発中に自動的にビルドを実行し、ブラウザをリロードすることができます。以下の手順で webpack-dev-server をセットアップしてください。

#### webpack-dev-server のインストール

1. 以下のコマンドを実行して、webpack-dev-server をインストールしてください。

```bash
npm install --save-dev webpack-dev-server
```

#### webpack-dev-server の設定

1. webpack.config.js ファイルを開き、以下の内容を追加してください。

```javascript
const path = require('path');

module.exports = {
  //...
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
```

#### webpack-dev-server の実行

1. 以下のコマンドを実行して、webpack-dev-server を実行してください。

```bash
npx webpack serve
```

終了する場合は、Ctrl + C を押してください。

2. HTMLWebpackPlugin プラグインを使用して js ファイルに自動的にバンドルされた script タグを生成し、index.html に挿入できるようにします。

```bash
npm install --save-dev html-webpack-plugin
```

3. プロジェクト直下に index.html を作成してください。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>App</title>
  </head>
  <body>
    <h1>アプリケーション</h1>
  </body>
</html>
```

4. webpack.config.js ファイルを開き、以下の内容を追加してください。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...他のWebpack設定

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};
```

5. package.json ファイルを開き、以下の内容を追加してください。

```json
{
  // ...他の設定
  "scripts": {
    "start": "webpack server --config ./webpack.config.js --open"
  }
}
```

6. 以下のコマンドを実行して、webpack-dev-server を実行してください。

```bash
npm start
```

7. ソースマップを有効にすることで、開発中にエラーが発生した場合に、エラーが発生したファイル名と行数を表示することができます。

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = process.env.NODE_ENV || "development";
const isDevelopment = env === "development";

module.exports = {
  mode: env,
  devtool: isDevelopment ? "source-map" : false,
```

8. TypeScript の型チェックを実行するために、tsconfig.json に以下の設定を追加してください。

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

### テスティングフレームワークのセットアップ

テストを自動化することで、開発中に問題を早期に発見し、品質を向上させることができます。以下の手順でテスティングフレームワークをセットアップしてください。

#### Jest とは

Jest は、JavaScript のテスティングフレームワークです。以下の手順で Jest をセットアップしてください。

#### Jest のインストール

1. 以下のコマンドを実行して、Jest をインストールしてください。

```bash
npm install --save-dev jest
```

#### Jest の設定

1. package.json ファイルを開き、以下の内容を追加してください。

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

2. ES Modules を私用している場合はテストが失敗するので以下の設定を package.json に追加する

```json
...
  "jest": {
    "moduleFileExtensions": [
      "js",
      "ts"
    ],
    "testMatch": [
      "**/**/*.test.js",
      "**/**/*.test.ts"
    ]
  }
}
```

#### TypeScript 対応

1. 以下のコマンドを実行して、必要なパッケージをインストールしてください。

```bash
npm install --save-dev @types/jest ts-jest
```

2. tsconfig.json ファイルを開き、以下の内容を追加してください。

```json
"module": "es2020",
```

#### テストの作成

1. テストファイルを作成してください。

`src/app.js`

```javascript
export function sum(a, b) {
  return a + b;
}
```

`src/app.test.js`

```javascript
import { sum } from './app.js';

test('adds 1 + 2 to equal 3', () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});
```

`src/app.ts`

```typescript
export function sum(a: number, b: number): number {
  return a + b;
}
```

`src/app.test.ts`

```typescript
import { sum } from './app';

test('adds 1 + 2 to equal 3', () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});
```

#### テストの実行

1. 以下のコマンドを実行して、テストを実行してください。

```bash
npm test
```

2. テストカバレッジを計測することで、テストがどの程度の範囲をカバーしているかを確認することができます。

```json
    "test": "jest --coverage"
```

### フォーマッタのセットアップ

フォーマッタを使用することで、コードのスタイルを統一し、読みやすくすることができます。以下の手順でフォーマッタをセットアップしてください。

#### Prettier とは

Prettier は、コードのフォーマットを自動化するツールです。以下の手順で Prettier をセットアップしてください。

#### パッケージのインストール

1. 以下のコマンドを実行して、Prettier をインストールしてください。

```bash
npm install --save-dev prettier
```

#### パッケージの設定

1. .prettierrc ファイルを作成し、以下の内容を記述してください。

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

#### フォーマッタの実行

1. 以下のコマンドを実行して、フォーマッタを実行してください。

```bash
npx prettier --write .
```

2. package.json ファイルを開き、以下の内容を追加してください。

```json
{
  "scripts": {
    "format": "prettier --write ."
  }
}
```

### 開発ツールのセットアップ

開発ツールを使用することで、開発効率を向上させることができます。以下の手順で開発ツールをセットアップしてください。

#### パッケージのインストール

1. 以下のコマンドを実行して、開発ツールをインストールしてください。

```bash
npm install --save-dev @k2works/full-stack-lab
```

`./index.html` を以下の内容に変更します。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>App</title>
  </head>
  <body>
    <h1>アプリケーション</h1>
    <div id="app"></div>
    <div id="app-dev"></div>
  </body>
</html>
```

`./src/app.js` を以下の内容に変更します。

```javascript
console.log('app.js: loaded');
export class App {
  constructor() {
    console.log('App initialized');
  }
}

export function sum(a, b) {
  return a + b;
}
```

`./src/index.js` をルート直下に移動して以下の内容変更します。

```javascript
import { App } from './src/app.js';
const app = new App();

import { render } from '@k2works/full-stack-lab';
const contents = `
## 機能名
## 仕様
## TODOリスト
`;

const uml = `
abstract class AbstractList
abstract AbstractCollection
interface List
interface Collection
List <|-- AbstractList
Collection <|-- AbstractCollection
Collection <|- List
AbstractCollection <|- AbstractList
AbstractList <|-- ArrayList
class ArrayList {
  Object[] elementData
  size()
}
enum TimeUnit {
  DAYS
  HOURS
  MINUTES
}
annotation SuppressWarnings
`;

const erd = `
' hide the spot
hide circle
' avoid problems with angled crows feet
skinparam linetype ortho
entity "Entity01" as e01 {
  *e1_id : number <<generated>>
  --
  *name : text
  description : text
}
entity "Entity02" as e02 {
  *e2_id : number <<generated>>
  --
  *e1_id : number <<FK>>
  other_details : text
}
entity "Entity03" as e03 {
  *e3_id : number <<generated>>
  --
  e1_id : number <<FK>>
  other_details : text
}
e01 ||..o{ e02
e01 |o..o{ e03
`;
render({ contents, uml, erd });
```

2. TypScript も同様に変更してください。

3. 最後に不要なファイルを削除します。

#### 開発ツールの設定

1. webpack.config.js を以下の内容に変更します。

```javascript
...
  entry: './index.js',
...
```

#### 開発ツールの実行

1. 以下のコマンドを実行して、開発ツールを実行してください。

```bash
npm start
```

**[⬆ back to top](#構成)**

### 配置
## GitHubとは
GitHubは、GitリポジトリをホストするためのWebベースのホスティングサービスです。GitHubを使用すると、コードを共有し、他の人と協力してプロジェクトを管理できます。

### GitHubのセットアップ
1. [GitHub](https://github.com/)にアクセスして、アカウントを作成します。
2. リポジトリを作成します。
3. リポジトリにコードをプッシュします。

## GitHub Actionsとは
GitHub Actionsは、GitHubでホストされる継続的インテグレーション/継続的デプロイメント（CI/CD）サービスです。GitHub Actionsを使用すると、コードの変更を自動的にビルド、テスト、デプロイできます。

### GitHub Actionsのセットアップ
1. リポジトリに`.github/workflows`ディレクトリを作成します。

2. ワークフローファイルを作成します。

`node.js.yml`を作成します。

```yml
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
```

3. レポジトリにコミット・プッシュしてワークフローを有効にします。

4. READMEにバッジを追加します。

## Herokuとは
Herokuは、クラウドプラットフォームであり、開発者がアプリケーションを構築、実行、スケールするためのツールを提供します。

### Herokuにアプリをデプロイする手順
#### Heroku アカウントの作成
1. [Heroku](https://www.heroku.com/)にアクセスして、アカウントを作成します。

#### Heroku CLI のインストール
1. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)をダウンロードしてインストールします。

#### Heroku アプリケーションの作成
1. Herokuにログインします。
2. `heroku create`コマンドを実行して、新しいアプリケーションを作成します。

```bash
heroku create jip-episode00
```

3. HTTPサーバーを起動するために、パッケージをインストールして`Procfile`ファイルを作成します。

```bash
npm install http-server
```

```bash
web: npx http-server -p $PORT
```

package.jsonに以下の内容を追加します。

```json
"scripts": {
  ...
  "heroku-postbuild": "webpack --config ./webpack.config.js --progress"
  ...
},
```

#### アプリケーションのデプロイ
1. `git add .`コマンドを実行して、変更をステージングします。
2. `git commit -m "Initial commit"`コマンドを実行して、変更をコミットします。
3. `git push heroku master`コマンドを実行して、アプリケーションをデプロイします。

```bash
git push heroku episode/00:master
```

ここではmasterブランチ以外にもデプロイしています。

#### アプリケーションの起動
1. `heroku open`コマンドを実行して、アプリケーションを起動します。

## Vercelとは
Vercelは、サーバーレスのプラットフォームで、フロントエンドの開発者が簡単にWebサイトやアプリケーションをデプロイできるようにするものです。

### Vercelにデプロイする手順
以下は、Vercelにデプロイする手順です。

#### Vercelのサインアップ
まず、Vercelにサインアップする必要があります。Vercelには、GitHub、GitLab、Bitbucket、またはVercelのアカウントでサインアップできます。

#### ビルドコマンドの入力
次に、アプリケーションのビルドコマンドを入力する必要があります。ビルドコマンドは、アプリケーションをビルドするために必要なコマンドです。

#### 環境変数の設定(必要な場合)
必要に応じて、環境変数を設定することができます。環境変数は、アプリケーションで使用される変数です。

#### デプロイするブランチの選択
次に、デプロイするブランチを選択する必要があります。通常、デプロイするブランチは、masterブランチです。

#### デプロイの開始
最後に、デプロイを開始する必要があります。デプロイが完了すると、VercelはURLを提供します。

#### デプロイの確認
デプロイが完了したら、Webサイトやアプリケーションを確認することができます。

### VercelにCLIでデプロイする手順

1. Vercel CLIをインストールする
Vercel CLIをインストールするには、ターミナルで以下のコマンドを実行します。

```
npm install -g vercel
```

2. Vercelにログインする
Vercel CLIを使用するには、Vercelにログインする必要があります。以下のコマンドを実行して、Vercelにログインしてください。

```
vercel login
```

3. プロジェクトをデプロイする
webpack.config.jsのビルドファイルの出力先をpublicに変更します。

```javascript
 output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
```

Vercel CLIを使用して、プロジェクトをデプロイするには、以下のコマンドを実行します。

```
vercel
```

**[⬆ back to top](#構成)**

### 運用

# 命令書:

あなたは、プロのテクニカルライターです。
以下の制約条件と構成をもとに、 最高のJavaScriptアプリケーション運用手順書を出力してください。

# 制約条件:

- 一般ユーザーにもわかりやすく。
- 重要なキーワードを取り残さない。
- 文章を簡潔に。
- 具体的な例を挿入する。
- もし、最適な情報を提供できない場合は、その旨を伝える。

# 構成:

## NPMスクリプトとは
## Gulpとは
## Asciidocとは
## BrowserSyncとは
## Marpとは
## 既存のnpmタスクを統合する

# 出力文:

こんにちは。JavaScriptアプリケーション運用手順書を作成するための制約条件と構成についてありがとうございます。以下は、あなたが要求した制約条件と構成に基づいて、最高のJavaScriptアプリケーション運用手順書を提供するための手順です。

## NPMスクリプトとは
NPMスクリプトは、Node.jsのパッケージマネージャであるnpmで提供される機能の1つです。NPMスクリプトを使用すると、JavaScriptアプリケーションの開発、テスト、ビルド、デプロイなどのタスクを自動化できます。NPMスクリプトは、package.jsonファイルに定義され、npm runコマンドを使用して実行できます。

## Gulpとは
Gulpは、JavaScriptアプリケーションの開発、テスト、ビルド、デプロイなどのタスクを自動化するためのJavaScriptタスクランナーです。Gulpは、プラグインを使用して、JavaScript、CSS、画像などのファイルを処理できます。Gulpは、gulpfile.jsファイルに定義されたタスクを実行することができます。

## Asciidocとは
Asciidocは、テキストベースのドキュメントフォーマットであり、HTML、PDF、EPUBなどのフォーマットに変換できます。Asciidocは、ドキュメントの構造を定義するためのマークアップ言語であり、テキストエディタで編集できます。Asciidocは、Node.jsのパッケージマネージャであるnpmで提供されています。

## BrowserSyncとは
BrowserSyncは、ブラウザーの自動リロード、CSSのインジェクション、デバイス同期などの機能を提供するJavaScriptライブラリです。BrowserSyncは、gulpfile.jsファイルに定義されたタスクを実行することができます。

## Marpとは
Marpは、Markdownを使用してスライドを作成するためのJavaScriptアプリケーションです。Marpは、スライドのデザインをカスタマイズするためのテーマを提供し、PDF、HTML、PNGなどのフォーマットにエクスポートできます。Marpは、Node.jsのパッケージマネージャであるnpmで提供されています。

## 既存のnpmタスクを統合する
既存のnpmタスクを統合するには、gulpfile.jsファイルにタスクを定義し、npmスクリプトを使用してタスクを実行します。タスクは、JavaScript関数として定義され、gulpプラグインを使用して、JavaScript、CSS、画像などのファイルを処理できます。

以上が、最高のJavaScriptアプリケーション運用手順書を提供するための手順です。もし、最適な情報を提供できない場合は、お知らせください。

**[⬆ back to top](#構成)**

### 開発

**[⬆ back to top](#構成)**

## 参照

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/ja/v1.0.0/)
- [@k2works/full-stack-lab](https://www.npmjs.com/package/@k2works/full-stack-lab)
