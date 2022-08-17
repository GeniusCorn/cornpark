---
title: '使用 Node api 学习 webpack'
date: 2022-08-17
tags: [webpack, 前端]
---

## webpack api

学习 `webpack` 的过程其实就是学习 `webpack` 配置文件的过程，即配置 `webpack.config.js`。但是，`webpack cli` 难于调试，因此我直接调用 `webpack` 提供的 [Node API](https://webpack.js.org/api/node/) 来进行学习。使用 api 也特别容易，将配置文件中的参数传递给 `webpack` 参数即可。

当提供回调函数时，`webpack()` 函数是编译器。第一个参数接收配置，第二个参数是回调函数，可以在其中获取编译的各种信息。

```js
import webpack from 'webpack';

webpack({
  // webpack 的各种配置
}, (err, stats) => {
    // 获取错误或者状态
  }
});
```

下面以打包一个最简包为例。

### 使用 `webpack api` 打包一个最简的 cjs 资源

提供一个计算函数，在 `index.cjs` 中导入。

```index.cjs
const sum = require('./sum.cjs');

sum(3, 8);
```

```sum.cjs
module.exports = (...args) => args.reduce((x, y) => x + y, 0);
```

在 `build.js` 中调用 `webpack` 进行打包。

```build.js
import webpack from 'webpack';

function f1() {
  return webpack({
    entry: './index.cjs', // 打包入口
    mode: 'none', // 指定打包模式
    output: {
      iife: false,
      filename: 'bundle.js', // 指定打包文件名称
      pathinfo: 'verbose',
    },
  });
}

f1().run((err, stat) => {
    console.log(stat)
});
```

执行 `build.js`，`webpack` 会在 `dist` 文件夹中生成相应的打包文件。

## 计算每次 `webpack` 的构建时间

观察 `stat` 的输出信息，不难找到有 `time` 的字样，即为构建时间。

```js
console.log(`构建时间为：${stat.toJson('minimal').time} ms`);
```

## 构建时间是如何计算的

接下来要用到断点调试的方法，进入 `webpack` 源码，简单查看其构建时间是如何计算的。我平日根本没有用过断点调试的方法，但断点调试是深入源码了解其运行原理的最好方式。

- 在需要调试的变量上打断点，在此即 `time` 的变量。因为变量取自 `stat`，接下来我只需要关注有关 `stat` 的代码。

![](/img/20220817230550.png)

- 执行函数，观察左侧变量和堆栈。

![](/img/20220817231348.png)

- 点击堆栈中的回调，展开变量中的 `stats`，发现 `startTime` 和 `endTime`。推测构建时间应该是由这两个值计算而来。

![](/img/20220817231612.png)

- 继续深入，查看该函数的 `stats` 参数，发现只有两个地方调用了 `stats`。

![](/img/20220817231924.png)

![](/img/20220817232027.png)

- 于是查看下一个堆栈，进入 `Stats` 变量，发现两个获得时间的 `get` 函数。

![](/img/20220817232117.png)

![](/img/20220817232327.png)

- 可以继续进入两个返回的值，最后能在引用中找到 `time` 的计算方式，即为 `endTime - startTime`。

![](/img/20220817232617.png)

![](/img/20220817232639.png)
