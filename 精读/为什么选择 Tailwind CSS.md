# 为什么选择 Tailwind CSS

> 原文地址：https://matt-rickard.com/why-tailwind-css-won

[Tailwind CSS](https://tailwindcss.com/) 是无处不在的新型前端框架。它取代了使用 [Twitter Bootstrap](https://getbootstrap.com/) 构建的一代网站。然而，Tailwind CSS 本身并不是一个用户界面框架，而是在某种程度上成为了通过 Tailwind CSS 构建的用户界面组件的代名词。为什么 Tailwind CSS 变得如此流行？有几个观点：

1. 无需切换代码的上下文逻辑。Tailwind CSS 官网上的标语写着⌈在无需离开 HTML 的情况下快速构建现代网站（Rapidly build modern websites without ever leaving your HTML）⌋。这话某种程度上正确，但仅有少数开发者写 HTML（相反，他们编写的是 jsx 或 tsx）。切换到 CSS 文件来修改样式就是一种昂贵的上下文切换。因此，开发者直接在代码中写 CSS 的原子类，这也极大地简化了效率不高且复杂的 CSS 构建流程。
2. 可复制粘贴。Bootstrap 提供了易于起手的模板。它为小项目和新创公司提供了落地页面。但这些设计不易于复制粘贴。想要这么做得把 CSS 和 HTML 一起复制下来。相反，Tailwind 易于复制粘贴——因为每个人都用相同的原子类，所以你只需复制一堆 class 名或一段 HTML 粘贴到自己的代码中，它就能直接使用。
3. 更少的依赖和更小的切入面。Tailwind 默认情况进行摇树优化（tree-shaken），且没有对 grid 或 flexbox 做出自己的定义（而是直接使用 CSS 原有的概念）。将其与上一代的框架（如 Bootstrap）相比，后者强迫开发者使用 JS、HTML、CSS 和像 Saas 的 CSS 预处理器。Tailwind 很容易和其他框架整合。
4. 可复用性。很多年来，开发者认为 CSS 的复用性就是通过 Sass 或 Less 这种预处理器来添加类层级的结构。其实，编写最少 CSS 样式的方法是只编写基本样式，即不编写自定义样式。
