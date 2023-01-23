# プログラミング入門 2023

[![Node.js CI](https://github.com/k2works/programing_introduce_2023/actions/workflows/node.js.yml/badge.svg)](https://github.com/k2works/programing_introduce_2023/actions/workflows/node.js.yml)

## 概要

### 目的

### 前提

| ソフトウェア | バージョン | 備考 |
| :----------- | :--------- | :--- |
| nodejs       | 16.3.0    |      |

## 構成

- [構築](#構築)
- [配置](#配置)
- [運用](#運用)
- [開発](#開発)

## 詳細

### Quick Start

```bash
npm install
npm start
```

### 構築

```bash
npm init -y
npm install --save-dev browser-sync jest @babel/core @babel/cli @babel/preset-env @babel/register
npm install --save-dev npm-run-all watch foreman cpx rimraf marked@1.2.2
npm install --save-dev webpack webpack-cli html-webpack-plugin webpack-dev-server
touch Procfile
npm install --save-dev jest
npm i -g vercel
```

**[⬆ back to top](#構成)**

### 配置

```bash
npm run deploy
```

**[⬆ back to top](#構成)**

### 運用

**[⬆ back to top](#構成)**

### 開発

```bash
npm start
```

**[⬆ back to top](#構成)**

## 参照
- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/ja/v1.0.0/)
- [Vercel](https://vercel.com/)
- [GitHub Actions](https://github.co.jp/features/actions)