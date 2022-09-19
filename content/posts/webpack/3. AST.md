---
title: 'AST 抽象语法树'
date: 2022-08-30
tags: [webpack, 前端]
---

## AST 概念

`AST` 指 `Abstract Syntax Tree`，即抽象语法树，也可简称语法树。它以树状的形式表现编程语言的语法结构。其涉及到前端工程化中诸多环节的应用，如：

1. 将 `TypeScript` 转换成 `JavaScript`；
2. 将 `Sass/Less` 转换成 `CSS`；
3. 将 `ES6+` 转换成 `ES5`；
4. `JavaScript` 代码格式化等。

在转换的过程中，实际上是对其 `AST` 的操作，核心步骤为三步：

1. Code -> AST(Parse)
2. AST -> AST(Transform)
3. AST -> Code(Generate)

以下为一段最简代码及其基于 `acorn` 解析的 `AST`。

```js
const a = 3
```

```json
{
  "type": "Program",
  "start": 0,
  "end": 12,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 12,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 6,
          "end": 11,
          "id": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "start": 10,
            "end": 11,
            "value": 3,
            "raw": "3"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "module"
}
```

不同语言有不同的解析器，如 `JavaScript` 解析器和 `CSS` 解析器。一个语言中也有不同的解析器，如 `acorn` 和 `babel`。

## AST 生成

生成 `AST` 的步骤为解析（Parser），分为两个阶段：词法分析和语法分析。

词法分析将代码转化为 `Token` 流，维护一个关于 `Token` 的数组。`Token` 指语法上不能再分的、最小的单个字符或字符串。

语法分析将 `Token` 流转化为结构化的 `AST`，方便操作。

## **webpack_modules** 的构建

了解了 `AST` 是什么后就可以基于 `AST` 构建出 `__webpack_modules__`。首先找到所有的 `require` 函数，便可确认模块的依赖关系。由于 `JavaScript` 执行查找模块为深度优先搜索遍历，根据模块依赖对所有模块构造一个基于深度优先搜索的树。

假设有如下的模块依赖关系：

```js
// index.js
const sum = require('./sum')
const hello = require('./hello')

// sum.js
const math = require('./math')
```

通过 `AST` 后构建的 `__webpack_modules__` 数组如下：

- `index.js` -> 0
  - `sum.js` -> 1
    - `math.js` -> 2
  - `hello.js` -> 3

基于 `AST` 可以实现一个小型的 `webpack` 打包器。核心思想为通过 `AST` 解析配合模块生成类似于 `webpack` 运行时的代码，其中最重要的一步是构建出所有的依赖模块数组和 `__webpack_modules__`。
