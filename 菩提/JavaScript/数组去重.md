# 数组去重

## filter + Object

```js
function unique(array) {
  let container = {};
  return array.filter((item) =>
    container.hasOwnProperty(item) ? false : (container[item] = true),
  );
}
```

## filter + indexOf

```js
function unique(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}
```

## Set

```js
function unique(array) {
  return [...new Set(array)];
}
```