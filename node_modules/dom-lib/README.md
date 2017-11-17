# dom-lib   [![Travis][build-badge]][build] [![npm][npm-badge]][npm]

DOM helper library

## 安装

```
npm install dom-lib --save
```

## 示例

```js
import { addClass } from 'dom-lib';

```

## API

Class

```js
void hasClass(Element node, String className)
void addClass(Element node, String className)
void removeClass(Element node, String className)
void toggleClass(Element node, String className)
```


Style

```js
String getStyle(Element node, String property)
Object getStyle(Element node)
String getComputedStyle(Element node, String property)
Object getComputedStyle(Element node)

void removeStyle(Element node, String property)
void removeStyle(Element node, Array propertys)
void addStyle(Element node, String property, String value)
void addStyle(Element node, Object style)
```


Events

```js
Function  on(Element target, String eventName, Function listener, Boolean capture = false)
Function  onFocus()
void off(Element target, String eventName, Function listener, Boolean capture = false)
```
> on 和 onFocus 方法将返回一个 off 函数， 用于方便解绑事件


Query

```js
Element activeElement()
Number getHeight(Element node, client)
Number getWidth(Element node, client)
Object getOffset(Element node)
Object getOffsetParent(Element node)
Object getPosition(Element node, offsetParent)
String getWindow(Element node)
String nodeName(Element node)
Object ownerDocument(Element componentOrElement)
Object ownerWindow(Element componentOrElement)
Boolean contains(Element context, Element node)
void scrollLeft(Element node, Number val)
void scrollTop(Element node, Number val)
```



[build-badge]: https://travis-ci.org/rsuite/dom-lib.svg?branch=master
[build]: https://travis-ci.org/rsuite/dom-lib

[npm-badge]: https://badge.fury.io/js/dom-lib.svg
[npm]: http://badge.fury.io/js/dom-lib
