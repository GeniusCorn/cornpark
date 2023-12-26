# 用现代的方法深拷贝 JavaScript 中的对象

> 原文：<https://www.builder.io/blog/structured-clone>

你知道现在已经有原生的方法可以在 JavaScript 中深拷贝对象了吗？

是的，`structuredClone` 函数可以在 JavaScript 运行时中使用了：

```js
const calendarEvent = {
  title: 'Builder.io Conf',
  date: new Date(123),
  attendees: ['Steve'],
}

export function clone() {
  const copied = structuredClone(calendarEvent)
}
```

你还注意到了吗，上面的代码不仅仅复制了对象，还复制了嵌套的对象，甚至是 Date 对象。

并且所有东西都按预期的运行：

```js
copied.attendees // ["Steve"]
copied.date // Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
cocalendarEvent.attendees === copied.attendees // false
```

是的，`structuredClone` 不仅仅能做到上面这些，还可以：

- 拷贝无限的嵌套对象和数组
- 拷贝循环引用
- 拷贝多种 JavaScript 类型，比如 `Date`、`Set`、`Map`、`Error`、`RegExp`、`ArrayBuffer`、`Blob`、`File`、`ImageDate` 以及[更多](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types)
- 转移任何[可转移的对象](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

因此，举例来说，这种疯狂的东西也能被拷贝：

```js
const kitchenSink = {
  set: new Set([1, 3, 3]),
  map: new Map([[1, 2]]),
  regex: /foo/,
  deep: { array: [ new File(someBlobData, 'file.txt') ] },
  error: new Error('Hello!')
}
kitchenSink.circular = kitchenSink
// ✅ 所有东西都深拷贝下来了！
const clonedSink = structuredClone(kitchenSink)
```

## 为什么不用对象扩展符呢？

有必要指出的是我们现在正在讨论深拷贝。如果你只需要浅拷贝，也就是说不拷贝嵌套的对象或数组，那我们可以直接用对象扩展符：

```js
const simpleEvent = {
  title: "Builder.io Conf",
}
// ✅ 没有问题，这里没有嵌套的对象或数组
const shallowCopy = { …calendarEvent }
```

或者你喜欢这种方法：

```js
const shallowCopy = Object.assign({}, simpleEvent)
const shallowCopy = Object.create(simpleEvent)
```

但当其中包含嵌套时，这就有问题了：

```js
const calendarEvent = {
  title: "Builder.io Conf",
  date: new Date(123),
  attendees: ["Steve"]
}

const shallowCopy = {…calendarEvent}

// 🚩 糟糕 - 我们*同时*把“Bob”添加到拷贝对象和原对象了
shallowCopy.attendees.push("Bob")

// 🚩 糟糕 - 我们*同时*把拷贝对象和原对象的 date 都更新了
shallowCopy.date.setTime(456)
```

如你所见，我们并未对这个对象进行深拷贝。

嵌套的日期和数组仍然共享同一个引用，如果要编辑那些我们以为的拷贝对象，可能会给我们带来很大的麻烦。

## 为什么不用 `JSON.parse(JSON.stringify(x))`？

啊对，这也是一个方法。实际上这是一个很好的方法，并且有惊人的性能，但还有些不足，而 `structedClone` 可以解决。

看下面这个例子：

```js
const calendarEvent = {
  title: "Builder.io Conf",
  date: new Date(123),
  attendees: ["Steve"]
}

// 🚩 JSON.stringify 将日期转换为字符串了
const problematicCopy = JSON.parse(JSON.stringify(calendarEvent))
```

如果我们输出 `problematicCopy`，会得到：

```json
{
    "title": "Builder.io Conf",
    "date": "1970-01-01T00:00:00.123Z",
    "attendees": [
        "Steve"
    ]
}
```

这不是我们想要的！`date` 应该是一个 `Date` 对象而不是字符串。

这是因为 `JSON.stringify` 只能处理基本对象、数组和[原始值](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)。任何其他类型都可能以难以预测的方式被处理。比如，日期对象被转换为字符串，但 `Set` 被简单地转换成 `{}`。

`JSON.stringify` 甚至完全忽略确定的类型，像是 `undefined` 或函数。

举个例子，当我们通过这种方式拷贝 `kitchenSink` 时：

```js
const kitchenSink = {
  set: new Set([1, 3, 3]),
  map: new Map([[1, 2]]),
  regex: /foo/,
  deep: { array: [new File(someBlobData, 'file.txt')] },
  error: new Error('Hello!')
}

const veryProblematicCopy = JSON.parse(JSON.stringify(kitchenSink))
```

会得到：

```json
{
  "set": {},
  "map": {},
  "regex": {},
  "deep": {
    "array": [
      {}
    ]
  },
  "error": {},
}
```

呃！

哦，对了，我们还得删除原先的循环引用，因为 `JSON.stringify` 遇到循环引用时会直接抛出错误。

因此，尽管这种方法在需求与其功能相匹配时非常有效，但我们可以用`structuredClone` 做很多这种方法做不到的事情（也就是上面做不到的事情）。

## 为什么不用 `_.cloneDeep`？

迄今为止，Lodash 的 `cloneDeep` 函数一直是解决这一问题的常用方法。

事实上，这也确实起到了预期作用：

```js
import cloneDeep from 'lodash/cloneDeep'

const calendarEvent = {
  title: "Builder.io Conf",
  date: new Date(123),
  attendees: ["Steve"]
}

const clonedEvent = cloneDeep(calendarEvent)
```

不过，有一点需要注意。根据我 IDE 里的 [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) 插件显示函数导入占用的数据大小，这一个函数最小化的大小为 17.4kb（压缩后为 5.3kb）。

![](/images/202312262212.png)

假设你只导入了这一个函数。如果你使用更常用的方式导入，没有意识到摇树并不总是如你所愿，那么你可能会因为这个函数而意外导入多达 25kb 的数据。

![](/images/202312262212-1.png)

虽然这对任何人来说都不会是世界末日，但很多情况下根本没有必要，因为浏览器其实已经内置了 `structuredClone`。

## 有什么东西 `structuredClone` 不能拷贝？

### 函数

这会抛出 `DataCloneError` 错误：

```js
// 🚩 错误!
structuredClone({ fn: () => { } })
```

### DOM 节点

也会抛出 `DataCloneError` 错误：

```js
// 🚩 错误!
structuredClone({ el: document.body })
```

### 属性描述、setter 和 getter

以及类似元数据的特征不会被克隆。

例如，对于 getter，结果值会被克隆，但 getter 函数本身并不会（或者其他属性元数据）。

```js
structuredClone({ get foo() { return 'bar' } })
// 结果: { foo: 'bar' }
```

### 对象原型

原型链不会被执行或复制。所以当你克隆 `MyClass`，被克隆出来的对象将不再是该类的实例（但类中的所有有效的属性都将被克隆）。

```js
class MyClass {
  foo = 'bar'
  myMethod() { /* … */ }
}
const myClass = new MyClass()

const cloned = structuredClone(myClass)
// 结果: { foo: 'bar' }

cloned instanceof myClass // false
```

### 所有支持的类型

更简单地说，不在以下列表中的东西都不能被克隆：

#### JS 内置类型

`Array`、`ArrayBuffer`、`Boolean`、`DataView`、`Date`、`Error`  类型（下面特别列出的类型）、`Map` 、`Object` （仅限普通对象，例如来自对象字面的对象）、除了 `symbol` 的[原始值](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values)（也就是 `number`、`string`、`null`、`undefined`、`boolean`、`BigInt`）、`RegExp`、`Set` 和 `TypedArray`。

#### 错误类型

`Error`, `EvalError`, `RangeError`, `ReferenceError` , `SyntaxError`, `TypeError`, `URIError`

#### Web 或 API 类型

`AudioData`, `Blob`, `CryptoKey`, `DOMException`, `DOMMatrix`, `DOMMatrixReadOnly`, `DOMPoint`, `DomQuad`, `DomRect`, `File`, `FileList`, `FileSystemDirectoryHandle`, `FileSystemFileHandle`, `FileSystemHandle`, `ImageBitmap`, `ImageData`, `RTCCertificate`, `VideoFrame`

### 浏览器和运行时支持

最赞的是，`structuredClone` 支持所有主流浏览器，甚至 Node.js 和 Deno。

需要注意的是，Web Worker 的支持比较有限：

![](/images/202312262312-3.png)

图片来源：[MDN](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone#browser_compatibility)

## 结论

虽然姗姗来迟，但我们现在终于有了 `structuredClone`，可以轻而易举地在 JavaScript 里深拷贝对象了。谢谢你，Surma。
