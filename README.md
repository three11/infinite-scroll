[![GitHub stars](https://img.shields.io/github/stars/three11/infinite-scroll.svg?style=social&label=Stars)](https://github.com/three11/infinite-scroll)
[![GitHub forks](https://img.shields.io/github/forks/three11/infinite-scroll.svg?style=social&label=Fork)](https://github.com/three11/infinite-scroll/network#fork-destination-box)
[![GitHub release](https://img.shields.io/github/release/three11/infinite-scroll.svg)](https://github.com/three11/infinite-scroll/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/three11/infinite-scroll.svg)](https://github.com/three11/infinite-scroll/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/three11/infinite-scroll.svg)](https://github.com/three11/infinite-scroll/commits/master)
[![Github file size](https://img.shields.io/github/size/three11/infinite-scroll/dist/index.min.js.svg)](https://github.com/three11/infinite-scroll/)
[![npm](https://img.shields.io/npm/dt/@three11/infinite-scroll.svg)](https://www.npmjs.com/package/@three11/infinite-scroll)
[![npm](https://img.shields.io/npm/v/@three11/infinite-scroll.svg)](https://www.npmjs.com/package/@three11/infinite-scroll)
[![license](https://img.shields.io/github/license/three11/infinite-scroll.svg)](https://github.com/three11/infinite-scroll)
[![Analytics](https://ga-beacon.appspot.com/UA-83446952-1/github.com/three11/infinite-scroll/README.md)](https://github.com/three11/infinite-scroll/)
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/three11/infinite-scroll/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/three11/infinite-scroll/graphs/commit-activity)

[![ForTheBadge built-with-love](https://ForTheBadge.com/images/badges/built-with-love.svg)](https://github.com/three11/)

# Infinite Scroll

A vanilla ES2017 module for loading more items as you scroll the page down.

## Install

```console
npm i @three11/infinite-scroll
```

or

```console
yarn add @three11/infinite-scroll
```

or

Just download this repository and link the files located in dist folder:

```html
<script src="dist/index.min.js"></script>
```

## Usage

First, `import` the module:

```javascript
import InfiniteScroll from '@three11/infinite-scroll';
```

Then initialize a new instance of the module:

```javascript
const infiniteScroll = new InfiniteScroll();
```

## Settings

The default settings are:

```javascript
element       : '.js-infinite',       // The container of the instance
next          : '.js-infinite__next', // The link to the next page
item          : '.js-infinite__item', // The item
disabledClass : 'disabled',           // Disabled class name
hiddenClass   : 'hidden',             // Hidden class name
responseType  : 'text/html',          // Type of the AJAX response
```

There is one callback:

```javascript
onComplete(container) {}
```

This is a function which runs after the items have been added to the DOM and accepts a single argument `container` which refers to the element which contains the instance of the module.

## License

GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

