# 类和类继承

## 题目

1. 要求写一个动物类，有速度和名字的属性；给两个方法，一个为跑，一个为停止。
2. 要求写一个兔子子类，继承动物类；给一个方法为藏起来。

## ES6

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    console.log(`${this.name} 跑的时速为 ${this.speed}`);
  }

  stop() {
    this.speed = 0;
    console.log(`${this.name} 停止`);
  }
}

class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} 藏起来了`);
  }
}
```

## ES5

```js
function Animal(name) {
  this.name = name;
  this.speed = 0;
}

Animal.prototype.run = function (speed) {
  console.log(`${this.name} 跑的时速为 ${this.speed}`);
};

Animal.prototype.stop = function () {
  this.speed = 0;
  console.log(`${this.name} 停止`);
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = new Animal();

Rabbit.prototype.hide = function () {
  console.log(`${this.name} 藏起来了`);
};
```