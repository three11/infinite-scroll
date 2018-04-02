"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfiniteScroll = void 0;

var _debounce = require("@three11/debounce");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InfiniteScroll =
/*#__PURE__*/
function () {
  function InfiniteScroll() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var win = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;

    _classCallCheck(this, InfiniteScroll);

    this.settings = _objectSpread({
      element: '.js-infinite',
      next: '.js-infinite__next',
      item: '.js-infinite__item',
      disabledClass: 'disabled',
      hiddenClass: 'hidden',
      responseType: 'text/html',
      onComplete: function onComplete(container) {}
    }, options);
    this.win = win;
    this.doc = doc;
    this.container = this.doc.querySelector(this.settings.element);
    this.next = this.doc.querySelector(this.settings.next);
    this.isLoading = false;
    this.isAtEnd = false;
    this.container !== null && this.init();
  }

  _createClass(InfiniteScroll, [{
    key: "init",
    value: function init() {
      this.bind().hideNext();
    }
  }, {
    key: "hideNext",
    value: function hideNext() {
      this.next && this.next.classList.add(this.settings.hiddenClass);
      return this;
    }
  }, {
    key: "getLoadingPosition",
    value: function getLoadingPosition() {
      var _container = this.container,
          offsetTop = _container.offsetTop,
          clientHeight = _container.clientHeight;
      return offsetTop - clientHeight;
    }
  }, {
    key: "getScrollPosition",
    value: function getScrollPosition() {
      var _win = this.win,
          pageYOffset = _win.pageYOffset,
          innerHeight = _win.innerHeight;
      return pageYOffset + innerHeight / 2;
    }
  }, {
    key: "bind",
    value: function bind() {
      var _this = this;

      this.win.addEventListener('load', function (event) {
        _this.loadMore();
      });
      this.win.addEventListener('scroll', function (event) {
        (0, _debounce.debounce)(_this.loadMore());
      });
      return this;
    }
  }, {
    key: "loadMore",
    value: function loadMore() {
      var _this2 = this;

      if (this.getScrollPosition() < this.getLoadingPosition() || this.isLoading || this.isAtEnd || !this.next) {
        return;
      }

      this.isLoading = true;
      this.next.classList.add(this.settings.disabledClass);
      this.makeRequest(this.next.href, function (html) {
        var items = _toConsumableArray(html.querySelectorAll(_this2.settings.item)).map(function (item) {
          return item.outerHTML;
        }).join('');

        var nextUrl = html.querySelector(_this2.settings.next) ? html.querySelector(_this2.settings.next).getAttribute('href') : '';
        _this2.next.href = nextUrl;
        _this2.container.innerHTML += items;

        _this2.next.classList.remove(_this2.settings.disabledClass);

        _this2.isLoading = false;

        _this2.settings.onComplete(_this2.container);

        _this2.isAtEnd = nextUrl === '';
      });
    }
  }, {
    key: "makeRequest",
    value: function makeRequest(url, callback) {
      var _this3 = this;

      var request = new XMLHttpRequest();
      request.open('GET', url);

      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          var response = request.responseText;
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(response, _this3.settings.responseType);
          callback(xmlDoc);
        }
      };

      request.send();
    }
  }]);

  return InfiniteScroll;
}();

exports.InfiniteScroll = InfiniteScroll;