# 模块化

1. CommonJS：主要是 Node.js 使用，通过 `require` 同步加载模块，`exports` 导出内容。
2. AMD：主要是浏览器端使用，通过 `define` 定义模块和依赖，`require` 异步加载模块。
3. CMD：主要是浏览器端使用，和 `AMD` 类似，通过 `require` 异步加载模块，`exports` 导出内容。
4. UMD：通用模块规范，是 `CommonJS` 和 `AMD` 的融合，是跨平台的解决方案。
5. ESM：官方模块化规范，现代浏览器原生支持，通过 `import` 异步加载模块，`export` 导出内容。