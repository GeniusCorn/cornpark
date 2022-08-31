---
title: '文件名中的 hash'
date: 2022-08-31
tags: [webpack, 前端]
---

使用 `webpack` 等打包器进行打包时，可以对每个资源的文件名生成一个带有 `hash` 的路径。以 `bilibili` 网站为例，其 `core.js` 文件就配置了 `hash`。

![](/img/20220831221259.png)

资源文件名中的 `hash` 一般和浏览器缓存相结合。可以对添加了 `hash` 的资源设置长期强缓存（Long Term Cache），若资源没有进行更改，`hash` 值就不会改变，客户端就优先请求本地缓存；当资源发生改变，`hash` 值也发生变化，就会生成新的缓存资源地址，客户端重新请求新的资源。此举可以提高网站的 `HTTP` 缓存能力，从而提高网站的二次加载性能。

在 `Headers` 中，设置强缓存的方式是将 `cache-control` 设置为 `max-age=31536000`，该值为一年的秒数。

在 `webpack` 中，可以在 `output` 里配置 `filename` 配置生成带有 `hash` 的资源文件。

```js
output: {
  filename: `[name].[contenthash:6].js`
}
```

不仅如此，也可以将项目的版本号（package.version）注入到文件名中。但是一般不推荐这么做，因为每次版本号改变后所有的缓存都会失效，而并不是版本升级后所有的资源内容都会改变。

`webpack` 的 `hash` 函数默认使用 `md4`。它基于模块内容和一系列元信息生成摘要信息。可以配置 `hashFunction` 来更换默认的 `hash` 函数提升打包速度。比如 `sha256` 或者 `xxhash64`。在 `next.js` 及 `vue-cli` 的 `hash` 函数都已更换为 `xxhash64`。下面来对比默认方法 `md4` 和 `xxhash64` 的打包速度。

```js
function f1() {
  return webpack([
    {
      entry: './index.cjs',
      mode: 'none',
      output: {
        filename: `main.[contenthash:6].md4.js`,
        hashFunction: 'md4'
      }
    },
    {
      entry: './index.cjs',
      mode: 'none',
      output: {
        filename: `main.[contenthash:6].xxhash64.js`,
        hashFunction: 'xxhash64'
      }
    }
  ])
}
```

在 `run` 函数中输出两者的构建时间。

```js
f1().run((err, stat) => {
  if (err) {
    console.log(err)
  }
  if (stat) {
    console.log(stat.toJson().children[0].time)
    console.log(stat.toJson().children[1].time)
  }
})
```

查看控制台输出，`xxhash64` 的构建速度明显快于 `md4`。这是优化 `webpack` 打包速度不常有的答案。
