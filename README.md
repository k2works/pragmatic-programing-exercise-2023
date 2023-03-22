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

### [構築](./docs/build.adoc)

**[⬆ back to top](#構成)**

### [配置](./docs/ship.adoc)

**[⬆ back to top](#構成)**

### 運用

## NPMスクリプトとは
NPMスクリプトは、Node.jsのパッケージマネージャであるnpmで提供される機能の1つです。NPMスクリプトを使用すると、JavaScriptアプリケーションの開発、テスト、ビルド、デプロイなどのタスクを自動化できます。NPMスクリプトは、package.jsonファイルに定義され、npm runコマンドを使用して実行できます。

開発中のWebアプリケーションを運用するために使用するモジュール群です。以下でそれぞれの役割を説明します。

- npm-run-all: 複数のnpm scriptコマンドを同時に実行したり、シーケンシャルに実行したりすることができるパッケージです。
- cpx: ファイルのコピーを簡単に実行することができるツールです。
- rimraf: ファイルやディレクトリを削除するためのパッケージです。通常、rm -rfの代替手段として使用されます。

これらのツールを使用することで、エラーハンドリングやファイル操作などを簡単に処理することができます。特に、npm run scriptにおいて便利な機能を提供します。

```
npm install --save-dev npm-run-all cpx rimraf
```

## Gulpとは
Gulpは、JavaScriptアプリケーションの開発、テスト、ビルド、デプロイなどのタスクを自動化するためのJavaScriptタスクランナーです。Gulpは、プラグインを使用して、JavaScript、CSS、画像などのファイルを処理できます。Gulpは、gulpfile.jsファイルに定義されたタスクを実行することができます。

Gulpは、JavaScriptアプリケーションの開発、テスト、ビルド、デプロイなどのタスクを自動化するためのJavaScriptタスクランナーです。Gulpは、プラグインを使用して、JavaScript、CSS、画像などのファイルを処理できます。Gulpは、gulpfile.jsファイルに定義されたタスクを実行することができます。

1. Gulpをインストールします

```
npm install --save-dev gulp
```

2. Gulpタスクを作成します

```javascript
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
```

3. Gulpタスクを実行します

```
npx gulp --tasks
npx gulp
```

## Asciidocとは
Asciidocは、テキストベースのドキュメントフォーマットであり、HTML、PDF、EPUBなどのフォーマットに変換できます。Asciidocは、ドキュメントの構造を定義するためのマークアップ言語であり、テキストエディタで編集できます。Asciidocは、Node.jsのパッケージマネージャであるnpmで提供されています。

1. Asciidocをインストールします

```
npm install --save-dev asciidoctor asciidoctor-kroki
```

2. Asciidocファイルを作成します

`docs` ディレクトリに `index.adoc` と `sample.adoc` ファイルを作成し、以下の内容を記述します。

```asciidoc
:toc: left
:toclevels: 5
:sectnums:

= Asciidoc

== 目的

== 前提

== 構成

=== link:./sample.html[サンプル^][[anchor-1]]

== 参照

* link:/docs/sample.html[サンプル^]
```

```asciidoc
:toc: left
:toclevels: 5
:sectnums:
:stem:
:source-highlighter: coderay

= AppTemplate

== 仕様

== 設計

=== TODOリスト
* [ ] TODO
* [x] [line-through]#TODO DONE#

=== ユースケース図
[plantuml]
----
left to right direction
skinparam packageStyle rectangle
actor customer
actor clerk
rectangle checkout {
  customer -- (checkout)
  (checkout) .> (payment) : include
  (help) .> (checkout) : extends
  (checkout) -- clerk
}
----

=== クラス図
[plantuml]
----
class Car
Driver - Car : drives >
Car *- Wheel : have 4 >
Car -- Person : < owns
----

=== シーケンス図
[plantuml]
----
participant User
User -> A: DoWork
activate A
A -> B: << createRequest >>
activate B
B -> C: DoWork
activate C
C --> B: WorkDone
destroy C
B --> A: RequestCreated
deactivate B
A -> User: Done
deactivate A
----

=== 数式

https://asciidoctor.org/docs/user-manual/#activating-stem-support[Using Multiple Stem Interpreters^]

stem:[sqrt(4) = 2]

Water (stem:[H_2O]) is a critical component.

[stem]
++++
sqrt(4) = 2
++++

latexmath:[C = \alpha + \beta Y^{\gamma} + \epsilon]

== 開発

== 参照
```

3. Gulpタスクを作成します

```js
const { series } = require("gulp");
const { default: rimraf } = require("rimraf");

const asciidoctor = {
  clean: async (cb) => {
    await rimraf("./public/docs");
    cb();
  },
  build: (cb) => {
    const fs = require("fs");
    const asciidoctor = require("@asciidoctor/core")();
    const kroki = require("asciidoctor-kroki");

    const krokiRegister = () => {
      const registry = asciidoctor.Extensions.create();
      kroki.register(registry);
      return registry;
    };

    const inputRootDir = "./docs";
    const outputRootDir = "./public/docs";
    const fileNameList = fs.readdirSync(inputRootDir);
    const docs = fileNameList.filter(RegExp.prototype.test, /.*\.adoc$/);

    docs.map((input) => {
      const file = `${inputRootDir}/${input}`;
      asciidoctor.convertFile(file, {
        safe: "safe",
        extension_registry: krokiRegister(),
        to_dir: outputRootDir,
        mkdirs: true,
      });
    });
    cb();
  },
  watch: (cb) => {
    watch("./docs/**/*.adoc", asciidoctor.build);
    cb();
  },
}

exports.docs = series(asciidoctor.clean, asciidoctor.build);
```

4. Gulpタスクを実行します

```
npx gulp docs
```

`public` ディレクトリはgit管理対象外にするため.gitignoreに以下を追加します。

```
/public
```

## BrowserSyncとは
BrowserSyncは、ブラウザーの自動リロード、CSSのインジェクション、デバイス同期などの機能を提供するJavaScriptライブラリです。BrowserSyncは、gulpfile.jsファイルに定義されたタスクを実行することができます。

1. BrowserSyncをインストールします

```
npm install --save-dev browser-sync
```

2. Gulpタスクを変更します

```js
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask

const { series, watch } = require("gulp");
const { default: rimraf } = require("rimraf");
const browserSync = require('browser-sync').create();

const asciidoctor = {
  clean: async (cb) => {
    await rimraf("./public/docs");
    cb();
  },
  build: (cb) => {
    const fs = require("fs");
    const asciidoctor = require("@asciidoctor/core")();
    const kroki = require("asciidoctor-kroki");

    const krokiRegister = () => {
      const registry = asciidoctor.Extensions.create();
      kroki.register(registry);
      return registry;
    };

    const inputRootDir = "./docs";
    const outputRootDir = "./public/docs";
    const fileNameList = fs.readdirSync(inputRootDir);
    const docs = fileNameList.filter(RegExp.prototype.test, /.*\.adoc$/);

    docs.map((input) => {
      const file = `${inputRootDir}/${input}`;
      asciidoctor.convertFile(file, {
        safe: "safe",
        extension_registry: krokiRegister(),
        to_dir: outputRootDir,
        mkdirs: true,
      });
    });
    cb();
  },
  watch: (cb) => {
    watch("./docs/**/*.adoc", asciidoctor.build);
    cb();
  },
  server: (cb) => {
    browserSync.init({
      server: {
        baseDir: "./public",
      },
    });
    watch("./public/**/*.html").on("change", browserSync.reload);
    cb();
  },
}

exports.docs = series(asciidoctor.clean, asciidoctor.build, asciidoctor.watch, asciidoctor.server)
```

3. Gulpタスクを実行します

```
npx gulp docs
```

これで、adocファイルを編集するたびにドキュメントがビルドされブラウザが自動でリロードされます。

## Marpとは
Marpは、Markdownを使用してスライドを作成するためのJavaScriptアプリケーションです。Marpは、スライドのデザインをカスタマイズするためのテーマを提供し、PDF、HTML、PNGなどのフォーマットにエクスポートできます。Marpは、Node.jsのパッケージマネージャであるnpmで提供されています。

1. Marpをインストールします

```
npm install --save-dev @marp-team/marp-cli
```

2. スライドを作成します

`./docs/slides/PITCHME.md`

```md
---
marp: true
---

### タイトル

---

### 構成

- 自己紹介
- トピック 1
- トピック 2
- トピック 3

---

### 自己紹介

---

### トピック 1

---

### トピック 2

---

### トピック 3

---

### おわり

---

### 参照

---
```

3. スライドをビルドします

```
npx marp --html --pdf ./docs/slides/PITCHME.md
```

4. Gulpタスクを追加します

```js
marp = {
  build: (cb) => {
    const { marpCli } = require('@marp-team/marp-cli')

    marpCli(['./docs/slides/PITCHME.md', '--html', '--output', './public/slides/index.html'])
      .then((exitStatus) => {
        if (exitStatus > 0) {
          console.error(`Failure (Exit status: ${exitStatus})`)
        } else {
          console.log('Success')
        }
      })
      .catch(console.error)
    cb();
  },
  clean: async (cb) => {
    await rimraf("./public/slides");
    cb();
  },
  watch: (cb) => {
    watch("./docs/slides/**/*.md", marp.build);
    cb();
  }
}

exports.slides = series(marp.build);
```

5. Gulpタスクを実行します

```
npx gulp slides
```

## 既存のnpmタスクを統合する
既存のnpmタスクを統合するには、gulpfile.jsファイルにタスクを定義し、npmスクリプトを使用してタスクを実行します。タスクは、JavaScript関数として定義され、gulpプラグインを使用して、JavaScript、CSS、画像などのファイルを処理できます。

1. webpackのタスクを追加します

```js
const webpack = {
  clean: async (cb) => {
    await rimraf("./public");
    cb();
  },
  build: (cb) => {
    const webpack = require("webpack");
    const webpackConfig = require("./webpack.config.js");
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.error(err);
      }
      cb();
    });
  },
  watch: (cb) => {
    const webpack = require("webpack");
    const webpackConfig = require("./webpack.config.js");
    const compiler = webpack(webpackConfig);
    compiler.watch({}, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.error(err);
      }
    });
    cb();
  },
  server: (cb) => {
    const webpack = require("webpack");
    const webpackConfig = require("./webpack.config.js");
    const compiler = webpack(webpackConfig);
    const WebpackDevServer = require("webpack-dev-server");
    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
      open: false,
    });
    const server = new WebpackDevServer(compiler, devServerOptions);
    server.start(devServerOptions.port, devServerOptions.host, () => {
      console.log("Starting server on http://localhost:8080");
    });
    cb();
  },
}
```

2. jestのタスクを追加します

```js
const jest = {
  test: (cb) => {
    const jest = require("jest");
    jest.run(["--coverage"]);
    cb();
  },
  watch: (cb) => {
    const jest = require("jest");
    jest.run(["--watch"]);
    cb();
  },
}
```

3. prettierのタスクを追加します

```bash
npm install gulp-prettier --save-dev
```

```js
const prettier = {
  format: (cb) => {
    const prettier = require('gulp-prettier');
    return src("./src/**/*.{js,jsx,ts,tsx,json,css,scss,md}")
      .pipe(prettier({ singleQuote: true }))
      .pipe(dest('src'));
  },
  watch: (cb) => {
    watch("./src/**/*.{js,jsx,ts,tsx,json,css,scss,md}", prettier.format);
    cb();
  },
};
```

4. 既存のタスクと統合します

```js
const { series, parallel, watch } = require("gulp");

....

const webpackBuildTasks = () => {
  return series(webpack.clean, webpack.build);
}

const asciidoctorBuildTasks = () => {
  return series(asciidoctor.clean, asciidoctor.build);
}

const marpBuildTasks = () => {
  return series(marp.clean, marp.build);
}

exports.default = series(
  webpackBuildTasks(),
  asciidoctorBuildTasks(),
  marpBuildTasks(),
  series(
    parallel(webpack.server, asciidoctor.server),
    parallel(webpack.watch, asciidoctor.watch, marp.watch),
    parallel(jest.watch)
  )
);

exports.build = series(
  webpackBuildTasks(),
  asciidoctorBuildTasks(),
  marpBuildTasks(),
  prettier.format
);

exports.test = series(jest.test);

exports.format = series(prettier.format);

exports.slides = series(marp.build);

exports.docs = series(
  asciidoctorBuildTasks(),
  marpBuildTasks(),
  parallel(asciidoctor.server, asciidoctor.watch, marp.watch),
);

exports.watch = parallel(webpack.watch, asciidoctor.watch, marp.watch, jest.watch);
```

5. package.jsonのscriptsを更新します

```json
{
  "scripts": {
    "start": "npx gulp",
    "build": "npx gulp build",
    "test": "npx gulp test",
    "format": "npx gulp format",
    "slides": "npx gulp slides",
    "docs": "npx gulp docs",
    "watch": "npx gulp watch",
    "heroku-postbuild": "webpack --config ./webpack.config.js --progress"
  },
}
```

6. デプロイタスクを追加します

```json
{
  "scripts": {
    "start": "npx gulp",
    "build": "npx gulp build",
    "test": "npx gulp test",
    "format": "npx gulp format",
    "slides": "npx gulp slides",
    "docs": "npx gulp docs",
    "watch": "npx gulp watch",
    "deploy": "vercel",
    "deploy:local": "vercel dev",
    "deploy:heroku": "git push heroku wip/episode/00:master ",
    "heroku-postbuild": "webpack --config ./webpack.config.js --progress"
  },
}
```

7. npmタスクからgulpのdefaultタスクを実行します。

```bash
npm start
```

**[⬆ back to top](#構成)**

### 開発

**[⬆ back to top](#構成)**

## 参照

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/ja/v1.0.0/)
- [@k2works/full-stack-lab](https://www.npmjs.com/package/@k2works/full-stack-lab)
- [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
- [Asciidoctor](https://asciidoctor.org/)
- [Browsersync](https://browsersync.io/)