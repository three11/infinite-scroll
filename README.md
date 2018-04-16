# Infinite Scroll

A vanilla ES2017 module for loading more items as you scroll the page down.

## Install

```
npm i @three11/infinite-scroll
```

or

```
yarn add @three11/infinite-scroll
```

or

Just download this repository and link the files located in dist folder:

```
<script src="dist/index.min.js"></script>
```

## Usage

First, `import` the module:

```
import InfiniteScroll from '@three11/infinite-scroll';
```

Then initialize a new instance of the module:

```
const infiniteScroll = new InfiniteScroll();
```

## Settings

The default settings are:

```
element       : '.js-infinite',       // The container of the instance
next          : '.js-infinite__next', // The link to the next page
item          : '.js-infinite__item', // The item
disabledClass : 'disabled',           // Disabled class name
hiddenClass   : 'hidden',             // Hidden class name
responseType  : 'text/html',          // Type of the AJAX response
```

There is one callback:

```
onComplete(container) {}
```

This is a function which runs after the items have been added to the DOM and accepts a single argument `container` which refers to the element which contains the instance of the module.

## License

GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

