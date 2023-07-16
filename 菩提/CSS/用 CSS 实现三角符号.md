# 用 CSS 实现三角符号

记忆口诀：盒子宽高皆为 0，三面边框皆透明。

```css
    div:after {
      position: absolute;
      width: 0px;
      height: 0px;
      content: '';
      border-right: 100px solid transparent;
      border-top: 100px solid #ff0;
      border-left: 100px solid transparent;
      border-bottom: 100px solid transparent;
    }
```