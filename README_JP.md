[English](./README.md) / 日本語

<!-- ![](./res/) -->

# react-template

Reactプロジェクトのためのボイラープレート。

## 特徴

これらを含む

* Node.js
* TypeScript
* eslint
* React
* GitHub Actions

## インストール

```sh
git clone https://github.com/not-dev/react-template.git
```

## 使用方法

```sh
npm i -f
npm start
```

## ライセンス

* コード: MIT License
* ロゴ: CC BY-ND
* このプロジェクトはOSSを含みます

## 生成方法

```sh
# create react app with typescript
npx create-react-app [name] --typescript
# eslintrc.yml
npm i -D eslint
npx eslint --init
---
GitHub >> .git, LICENSE, README.md, .github/workflows/main.yml
ADD >> .eslintignore, README_JP.md, res/
EDIT >> eslintrc.yml, .gitignore, package.json, tsconfig.json
```
