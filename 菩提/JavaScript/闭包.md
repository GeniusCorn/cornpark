# 闭包

当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使是函数在当前词法作用域外执行。

下面这个例子，函数 `bar` 在作为返回值返回后，在自己定义的词法作用域之外执行。

```js
function foo() {
  const a = 'hello'
  function bar() {
    console.log(a)
  }

  return bar
}

const baz = foo()
baz()

// hello
```

## 应用

[防抖与节流](/菩提/JavaScript/防抖与节流.md)
