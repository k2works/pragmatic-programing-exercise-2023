# プログラミング入門 2023

[![Node.js CI](https://github.com/k2works/programing_introduce_2023/actions/workflows/node.js.yml/badge.svg)](https://github.com/k2works/programing_introduce_2023/actions/workflows/node.js.yml)

## 概要

### 目的

### 前提

| ソフトウェア | バージョン | 備考 |
| :----------- | :--------- | :--- |
| nodejs       | 16.x       |      |

### Quick Start

```bash
npm i @k2works/intercept-booster
npx npx intercept-booster
npm install
npm start
```
## 構成

- [構築](./docs/build.adoc)

### テストのためのライブラリ

```
stack install doctest
stack install QuickCheck
```

### デバッガーセットアップ

```
stack update
stack install haskell-dap ghci-dap haskell-debug-adapter
```

- [配置](./docs/ship.adoc)

- [運用](./docs/run.adoc)

### doctest/QuickCheckによるテスト

```
stack exec doctest test/DoctestSample.hs
```

- 開発

## 参照

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/ja/v1.0.0/)
- [@k2works/intercept-booster](https://www.npmjs.com/package/@k2works/intercept-booster)
- [@k2works/full-stack-lab](https://www.npmjs.com/package/@k2works/full-stack-lab)
- [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
- [Asciidoctor](https://asciidoctor.org/)
- [Browsersync](https://browsersync.io/)
- [Marp](https://marp.app/)
- [［増補改訂］関数プログラミング実践入門 ──簡潔で、正しいコードを書くために WEB+DB PRESS](https://www.amazon.co.jp/%EF%BC%BB%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%EF%BC%BD%E9%96%A2%E6%95%B0%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E5%AE%9F%E8%B7%B5%E5%85%A5%E9%96%80-%E2%94%80%E2%94%80%E7%B0%A1%E6%BD%94%E3%81%A7%E3%80%81%E6%AD%A3%E3%81%97%E3%81%84%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E6%9B%B8%E3%81%8F%E3%81%9F%E3%82%81%E3%81%AB-WEB-PRESS-plus-ebook/dp/B07JGP7RGR/ref=sr_1_1?adgrpid=119949147358&hvadid=649078768014&hvdev=c&hvqmt=e&hvtargid=kwd-334292588801&hydadcr=27266_14653489&jp-ad-ap=0&keywords=%E9%96%A2%E6%95%B0%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E5%AE%9F%E8%B7%B5%E5%85%A5%E9%96%80&qid=1679974098&sr=8-1)
- [Haskell GHCi Debug Adapter Phoityne](https://marketplace.visualstudio.com/items?itemName=phoityne.phoityne-vscode)