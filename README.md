[![GitHub release](https://img.shields.io/github/release/three11/infinite-scroll.svg)](https://github.com/three11/infinite-scroll/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/three11/infinite-scroll.svg)](https://github.com/three11/infinite-scroll/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/three11/infinite-scroll.svg)](https://github.com/three11/infinite-scroll/commits/master)
[![Github file size](https://img.shields.io/github/size/three11/infinite-scroll/dist/infinite-scroll.js.svg)](https://github.com/three11/infinite-scroll/)
[![Build Status](https://travis-ci.org/three11/infinite-scroll.svg?branch=master)](https://travis-ci.org/three11/infinite-scroll)
[![npm](https://img.shields.io/npm/dt/@three11/infinite-scroll.svg)](https://www.npmjs.com/package/@three11/infinite-scroll)
[![npm](https://img.shields.io/npm/v/@three11/infinite-scroll.svg)](https://www.npmjs.com/package/@three11/infinite-scroll)
[![Analytics](https://ga-beacon.appspot.com/UA-83446952-1/github.com/three11/infinite-scroll/README.md)](https://github.com/three11/infinite-scroll/)

# Infinite Scroll

> A module for loading more items as you scroll the page down.

See a [demo](https://three11-infinite-scroll.netlify.app/) and the [documentation](https://three11-infinite-scroll.netlify.app/docs.html).

## Install

```sh
npm i @three11/infinite-scroll
```

or

```sh
yarn add @three11/infinite-scroll
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

| Name                   | Type                          | Description                                                 | Default value          |
| ---------------------- | ----------------------------- | ----------------------------------------------------------- | ---------------------- |
| `element`              | string                        | CSS selector for the items container                        | '.js-infinite'         |
| `next`                 | string                        | CSS selector for the next page link                         | '.js-infinite\_\_next' |
| `item`                 | string                        | CSS selector for the item which will be loaded              | '.js-infinite\_\_item' |
| `disabledClass`        | string                        | Class name to add to the next page link                     | 'disabled'             |
| `hiddenClass`          | string                        | Class name to add to the next page link                     | 'hidden'               |
| `responseType`         | DOMParserSupportedType        | Type of the AJAX response                                   | 'text/html'            |
| `requestMethod`        | 'GET', 'POST', 'PUT', 'PATCH' | HTTP request type                                           | 'GET'                  |
| `viewportTriggerPoint` | number                        | Position in the viewport after which the loading will start | window.innerHeight / 2 |
| `debounceTime`         | number                        | Time to wait before triggering the next loading (in ms)     | 500                    |
| `onComplete`           | function                      | A function to run after successful load                     | null                   |

## Typescript

This module offers full Typescript support out of the box.

## License

GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007
