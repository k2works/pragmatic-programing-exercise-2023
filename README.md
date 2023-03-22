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
```

2. webpack.config.jsファイルを作成します。以下のコマンドを実行して、webpack.config.jsファイルを作成してください。

```bash
touch webpack.config.js
```

3. webpack.config.jsファイルに以下の内容を記述してください。

```javascript
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
touch tsconfig.json
```

3. tsconfig.jsonファイルに以下の内容を記述してください。

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

#### トランスパイラの設定

1. package.jsonファイルを開き、以下の内容を追加してください。

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

#### トランスパイラの実行

1. 以下のコマンドを実行して、トランスパイルを実行してください。

```bash
npm run build
```

#### モジュールバンドラーの設定

1. webpack.config.jsファイルを開き、以下の内容を追加してください。

```javascript
module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
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
module.exports = {
  // ...
  devServer: {
    contentBase: './dist',
  },
};
```

#### webpack-dev-serverの実行

1. 以下のコマンドを実行して、webpack-dev-serverを実行してください。

```bash
npx webpack serve
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

2. jest.config.jsファイルを作成し、以下の内容を記述してください。

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

#### TypeScript対応

1. 以下のコマンドを実行して、必要なパッケージをインストールしてください。

```bash
npm install --save-dev @types/jest ts-jest
```

2. jest.config.jsファイルを開き、以下の内容を追加してください。

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

#### テストの作成

1. testsディレクトリを作成し、テストファイルを作成してください。

```bash
mkdir tests
touch tests/index.test.ts
```

2. 以下の内容を記述してください。

```typescript
describe('example', () => {
  it('should return true', () => {
    expect(true).toBe(true);
  });
});
```

#### テストの実行

1. 以下のコマンドを実行して、テストを実行してください。

```bash
npm test
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