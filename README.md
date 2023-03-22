# 実践 JavaScript

## 概要

JavaScriptの実践的な使い方を学ぶためのリポジトリです。

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
JavaScript開発環境を構築するためには、以下の手順を実行してください。

### バージョンマネージャー
バージョンマネージャーを使用することで、異なるバージョンのNode.jsを簡単に切り替えることができます。以下の手順でバージョンマネージャーをセットアップしてください。

#### バージョンマネージャーのセットアップ
1. NVMをインストールします。NVMは、Node.jsのバージョンを管理するためのツールです。以下のコマンドを実行して、NVMをインストールしてください。

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

2. npmをインストールします。npmは、Node.jsのパッケージマネージャーです。以下のコマンドを実行して、npmをインストールしてください。

```bash
nvm list
nvm install 16.10.1
npm -v
```

3. yarnをインストールします。yarnは、npmの代替となるパッケージマネージャーです。以下のコマンドを実行して、yarnをインストールしてください。

```bash
npm install -g yarn
yarn -v
```

4. ターミナルを再起動します。

#### トランスパイラ
トランスパイラを使用することで、ES6以降の構文をES5に変換することができます。以下の手順でトランスパイラをセットアップしてください。

#### トランスパイラのセットアップ
1. package.jsonファイルを作成します。以下のコマンドを実行して、package.jsonファイルを作成してください。

```bash
npm init -y
```

-y オプションを指定することで、package.jsonファイルの内容をデフォルト値で作成することができます。

1. Babelをインストールします。Babelは、トランスパイラの一つです。以下のコマンドを実行して、Babelをインストールしてください。

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

--save-dev オプションを指定することで、package.jsonファイルのdevDependenciesにパッケージを追加することができます。

2. .babelrcファイルを作成します。以下のコマンドを実行して、.babelrcファイルを作成してください。

```bash
touch .babelrc
```

3. .babelrcファイルに以下の内容を記述してください。

```json
{
  "presets": ["@babel/preset-env"]
}
```

#### トランスパイラの設定
1. package.jsonファイルを開き、以下の内容を追加してください。

```json
{
  "scripts": {
    "build": "babel src -d dist"
  }
}
```

scripts には、npmコマンドを登録することができます。今回は、buildコマンドを登録しています。buildコマンドは、srcディレクトリのJavaScriptファイルをトランスパイルして、distディレクトリに出力するコマンドです。

#### トランスパイラの実行

1. srcディレクトリを作成して、index.jsファイルを作成します。

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

3. ES6以降の構文がES5に変換されていることを確認してください。

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
モジュールバンドラーを使用することで、複数のJavaScriptファイルを一つのファイルにまとめることができます。以下の手順でモジュールバンドラーをセットアップしてください。

#### モジュールバンドラーのセットアップ
1. Webpackをインストールします。Webpackは、モジュールバンドラーの一つです。以下のコマンドを実行して、Webpackをインストールしてください。

```bash
npm install --save-dev webpack webpack-cli
npx webpack --version
```

npx コマンドは、npmパッケージを実行するためのコマンドです。npxコマンドを使用することで、ローカルにインストールされているnpmパッケージを実行することができます。

2. webpack.config.jsファイルを作成します。以下のコマンドを実行して、webpack.config.jsファイルを作成してください。

```bash
touch webpack.config.js
```

3. webpack.config.jsファイルに以下の内容を記述してください。

```javascript
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
};
```

4. package.jsonファイルに以下の内容に変更してください。

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

#### モジュールバンドラーの実行

1. ./src/sample_es5.jsファイルを作成してください。

```JavaScript
function greeting(name) {
  return 'Hello ' + name;
}

module.exports = greeting;
```

2. ./src/index.jsファイルを変更してください。

```JavaScript
var greeting = require('./sample_es5');

console.log(greeting('ES5'));
```

3. 以下のコマンドを実行して、モジュールバンドラーを実行してください。

```bash
npm run build
```

4. ./dist/bundle.jsファイルが作成されていることを確認してください。

5. ./dist/bundle.jsファイルを実行してください。

```bash
node ./dist/bundle.js
```

#### モジュールバンドラーの設定

1. ./src/sample_es6.jsファイルを作成してください。

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

2. ./src/index.jsファイルを変更してください。

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

4. ./dist/bundle.jsファイルが作成されていることを確認してください。

5. ./dist/bundle.jsファイルを実行してください。

```bash
node ./dist/bundle.js
```

6. 現状ではES6のコードをそのまま出力しています。ES5に変換するためには、babel-loaderを使用します。 パッケージをインストールしてwebpack.config.js に以下のコードを変更してください。

```bash
npm install --save-dev babel-loader
```

```javascript
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
    ],
  },
  target: ["web", "es5"],
};
```

7. 以下のコマンドを実行して、モジュールバンドラーを実行してください。

```bash
npm run build
```

8. ./dist/bundle.jsファイルが作成されていることを確認してください。

9. ./dist/bundle.jsファイルを実行してください。

```bash
node ./dist/bundle.js
```

### TypeScript

TypeScriptを使用することで、JavaScriptに型を導入することができます。以下の手順でTypeScriptをセットアップしてください。

#### TypeScriptのセットアップ

1. TypeScriptをインストールします。以下のコマンドを実行して、TypeScriptをインストールしてください。

```bash
npm install --save-dev typescript
```

2. tsconfig.jsonファイルを作成します。以下のコマンドを実行して、tsconfig.jsonファイルを作成してください。

```bash
npx tsc --init
```

#### トランスパイラの設定

1. 必要なパッケージをインストールします。

```bash
npm install --save-dev @babel/preset-typescript @babel/plugin-proposal-class-properties typescript
```

2. .babelrcファイルを変更します。

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

1. ./src/sample.tsファイルを作成してください。

```TypeScript
class Greeting {
  constructor(public name: string) {}
  say() {
    console.log(`Hello ${this.name}`);
  }
}
```

2. ./src/index.tsファイルを変更してください。

```TypeScript
import { Greeting } from "./sample";

const greeting = new Greeting("TypeScript");
greeting.say();
```

3. 以下のコマンドを実行して、トランスパイルを実行してください。

```bash
npx babel src --extensions '.ts,.tsx' --out-dir dist
```

4. ./dist/sample.jsファイルが作成されていることを確認してください。

5. ./dist/sample.jsファイルを実行してください。

```bash
node ./dist/index.js
```

#### モジュールバンドラーの設定

1. 必要なパッケージをインストールします。

```bash
npm install --save-dev ts-loader
```

2. webpack.config.jsファイルを開き、以下の内容を追加してください。

```javascript
module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
    ],
  },
  target: ["web", "es5"],
};
```

3. 以下のコマンドを実行して、モジュールバンドラーを実行してください。

```bash
npm run build
```

4. ./dist/bundle.jsファイルが作成されていることを確認してください。

5. ./dist/bundle.jsファイルを実行してください。

```bash
node ./dist/bundle.js
```

TypeScriptファイルをそのまま実行したい場合は、ts-nodeを使用します。

```bash
npm install --save-dev ts-node
```

動かし方は以下の通りです。

```bash
npx ts-node src/index.ts
```

### webpack-dev-serverのセットアップ

webpack-dev-serverを使用することで、開発中に自動的にビルドを実行し、ブラウザをリロードすることができます。以下の手順でwebpack-dev-serverをセットアップしてください。

#### webpack-dev-serverのインストール

1. 以下のコマンドを実行して、webpack-dev-serverをインストールしてください。

```bash
npm install --save-dev webpack-dev-server
```

#### webpack-dev-serverの設定

1. webpack.config.jsファイルを開き、以下の内容を追加してください。

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

#### webpack-dev-serverの実行

1. 以下のコマンドを実行して、webpack-dev-serverを実行してください。

```bash
npx webpack serve
```

終了する場合は、Ctrl + Cを押してください。

2. HTMLWebpackPluginプラグインを使用してjsファイルに自動的にバンドルされたscriptタグを生成し、index.htmlに挿入できるようにします。

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

4. webpack.config.jsファイルを開き、以下の内容を追加してください。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...他のWebpack設定

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};
```

5. package.jsonファイルを開き、以下の内容を追加してください。

```json
{
  // ...他の設定
  "scripts": {
    "start": "webpack server --config ./webpack.config.js --open"
  }
}
```

6. 以下のコマンドを実行して、webpack-dev-serverを実行してください。

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

8. TypeScriptの型チェックを実行するために、tsconfig.jsonに以下の設定を追加してください。

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

### テスティングフレームワークのセットアップ

テストを自動化することで、開発中に問題を早期に発見し、品質を向上させることができます。以下の手順でテスティングフレームワークをセットアップしてください。

#### Jestとは

Jestは、JavaScriptのテスティングフレームワークです。以下の手順でJestをセットアップしてください。

#### Jestのインストール

1. 以下のコマンドを実行して、Jestをインストールしてください。

```bash
npm install --save-dev jest
```

#### Jestの設定

1. package.jsonファイルを開き、以下の内容を追加してください。

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

2. ES Modulesを私用している場合はテストが失敗するので以下の設定をpackage.jsonに追加する

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

#### TypeScript対応

1. 以下のコマンドを実行して、必要なパッケージをインストールしてください。

```bash
npm install --save-dev @types/jest ts-jest
```

2. tsconfig.jsonファイルを開き、以下の内容を追加してください。

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

#### Prettierとは

Prettierは、コードのフォーマットを自動化するツールです。以下の手順でPrettierをセットアップしてください。

#### パッケージのインストール

1. 以下のコマンドを実行して、Prettierをインストールしてください。

```bash
npm install --save-dev prettier
```

#### パッケージの設定

1. .prettierrcファイルを作成し、以下の内容を記述してください。

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

### 開発ツールのセットアップ

開発ツールを使用することで、開発効率を向上させることができます。以下の手順で開発ツールをセットアップしてください。

#### パッケージのインストール

1. 以下のコマンドを実行して、開発ツールをインストールしてください。

```bash
```

#### 開発ツールの設定


**[⬆ back to top](#構成)**

### 配置

**[⬆ back to top](#構成)**

### 運用

**[⬆ back to top](#構成)**

### 開発

**[⬆ back to top](#構成)**

## 参照
- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/ja/v1.0.0/)