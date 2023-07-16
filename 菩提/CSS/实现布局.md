# 实现布局

## 两栏布局

现有 DOM 结构：

```html
<div class="outer">
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

### 利用浮动实现

将左边元素宽度固定并设置为 `float: left`，将右边元素的 `margin-left` 设置为左边元素的固定宽度。右边元素的 `width` 默认为 `auto`，所以右边宽度会自动撑满父元素。

```css
  .outer {
    height: 100px;
    background-color: aqua;
  }

  .left {
    float: left;

    width: 200px;
    height: 100%;
    border-color: brown;
  }

  .right {
    margin-left: 200px;
    height: 100%;
    background-color: yellowgreen;
  }
```

### 再利用浮动实现

同样利用浮动，将左边元素宽度固定并设置为 `float: left`，将右边元素设置为 `overflow: hidden`。右边元素触发 [[面试/CSS/块格式化上下文]]，由于 `BFC` 的区域不会与浮动元素发生重叠，所以两侧不会重叠。

```css
    .outer {
      height: 100px;
      background-color: aqua;
    }

    .left {
      float: left;

      width: 200px;
      height: 100%;
      border-color: brown;
    }

    .right {
      overflow: hidden;
      height: 100%;
      background-color: yellowgreen;
    }
```

### 利用 flex 布局

将左边元素固定宽度，右边元素设置 `flex: 1`。

```css
    .outer {
      display: flex;
      height: 100px;
      background-color: whitesmoke;
    }

    .left {
      width: 200px;
      height: 100%;
      background-color: aqua;
    }

    .right {
      flex: 1;
      height: 100%;
      background-color: brown;
    }
```

### 利用绝对定位

将父元素设为 `relative`；左边元素设为 `absolute`，固定宽度；右边元素的 `margin-left` 设置为左边元素的宽度值。

```css
    .outer {
      position: relative;
      height: 100px;
      background-color: whitesmoke;
    }

    .left {
      position: absolute;
      width: 200px;
      height: 100%;
      background-color: aqua;
    }

    .right {
      margin-left: 200px;
      height: 100%;
      background-color: brown;
    }
```

### 再利用绝对定位

将父元素设为 `relative`；左边元素固定宽度；右边元素设为 `absolute`，`left` 为左侧元素宽度大小，其余方向全为 `0`。

```css
    .outer {
      position: relative;
      height: 100px;
      background-color: whitesmoke;
    }

    .left {
      width: 200px;
      height: 100%;
      background-color: aqua;
    }

    .right {
      position: absolute;
      left: 200px;
      top: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      background-color: brown;
    }
```

### 三栏布局

#### 圣杯布局

```html
    <div class="container">
      <div class="center">center</div>
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
```

```css
    .container {
      box-sizing: border-box;
      height: 500px;
      padding: 0 215px 0 115px;
    }

    .center {
      float: left;
      width: 100%;
      height: 500px;
      box-sizing: border-box;
      background-color: antiquewhite;
    }

    .left {
      margin-left: -100%;
      position: relative;
      left: -115px;
      float: left;
      width: 100px;
      height: 500px;
      background-color: aqua;
    }

    .right {
      position: relative;
      left: 215px;
      width: 200px;
      height: 500px;
      margin-left: -200px;
      float: left;
      background-color: burlywood;
    }
```

