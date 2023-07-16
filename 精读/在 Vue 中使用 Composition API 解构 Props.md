# 在 Vue 中使用 Composition API 解构 Props

> 原文地址：<https://dmitripavlutin.com/props-destructure-vue-composition/>

我们能通过 [reactivity API](https://vuejs.org/api/reactivity-core.html) 在 composition API 中保持代码的简洁。不过，你应该能遇到了一些响应式的坑，比如说丢失响应式。

本篇文章，你将学习如何正确解构 Vue 组件中的 Props 而不丢失 Props 的响应式。

## 解构 Props

在 `script setup` 中，我们通过 `defineProps()` 来声明组件的参数。

```vue
<script lang="ts" setup>
const props = defineProps()
</script>
```

在这段代码中，`props` 是一个包含了组件参数的响应式对象。如果组件的参数改变，`props` 的值也会相应改变。

你第一件想要做的事可能是解构 `props` 以单独访问其中的变量。但是出乎意料的是，解构 `props` 会丢失它的响应式！

请看下面的例子。组件 `EvenOdd` 接受一个 `number` 类型的 `count` 参数，通过该值计算 `count` 是奇数还是偶数。我们尝试使用 `const { count } = defineProps()` 来访问 `count`。

```vue
<script lang="ts" setup>
import { computed } from 'vue'

const { count } = defineProps<{ count: number }>() // Don't do this!

const even = computed(() => (count % 2 === 0 ? 'even' : 'odd'))
</script>

<template> The number is {{ even }} </template>
```

点击按钮使计数增加，文本应该随着计数的改变而改变。然而，我们发现 `The number is even` 文本始终没有变化。

也就是说，当通过 `const { count } = defineProps()` 的方式解构 `props` 对象，响应式会丢失。

响应式丢失的原因是解构后的 `count` 变为了一个有原始值的变量，而 Vue 的响应式不能在原始值上起作用。Vue 的响应式仅通过 `ref` 或 `reactive` 来实现。

## 正确解构方式

### 方法一：使用 `props` 对象

第一个显而易见的方法是不要解构 `props` 对象，而是直接通过 `props` 来访问其中的 `count`：即 `props.count`。

```vue
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ count: number }>()

const even = computed(() => (props.count % 2 === 0 ? 'even' : 'odd'))
</script>

<template> The number is {{ even }} </template>
```

在这段代码中 `computed()` 通过对象访问 `count`，`props` 对象是响应式的，所以值的改变将会被正确地追踪。

这个方法唯一的缺点就是要一直通过对象来访问内部的值。

总而言之，我推荐使用 `props` 对象保持值的响应式。

### 方法二：使用 `toRefs()` 解构

如果你对这个方法感兴趣，那我打赌你是解构的忠实粉丝并且时时刻刻都想进行解构。

如果一定要通过解构来访问 `props` 内的值，那么可以有意地将 `props` 对象中的值转换成响应式的。Vue 提供了一个特殊的工具函数 `toRefs()` 来达到这个目的。

```vue
<script lang="ts" setup>
import { toRefs, computed } from 'vue'

const props = defineProps<{ count: number }>()
const { count } = toRefs(props)

const even = computed(() => (count.value % 2 === 0 ? 'even' : 'odd'))
</script>
<template>The number is {{ even }}</template>
```

`toRefs(props)` 返回了一个对象，其中包含了每个 `prop` 中的响应式变量。

现在解构 `const { count } = toRefs(props)` 是正确的，因为 `count` 是一个来自于 `prop` 中的 `ref` 值。每次 `prop` 中的 `count` 改变，那 `ref` 的 `count` 也会改变。

在 `computed()` 中将 `count` 作为 `ref` 后需要通过 `count.value` 来访问 `count` 的值，因为 `.value` 是访问 `ref` 的方式。

我发现这种方式在组合式函数中返回响应式对象时相当有用，并且不会丢失响应性。

否则，我会使用第一个方法直接通过对象访问 `props`。

## 总结

1. 直接解构 `props` 会导致响应性丢失。
2. 保持响应性的方法之一是直接访问 `props` 对象。
3. 保持响应性的方法之二是通过 `toRefs()` 解构 `props`。
