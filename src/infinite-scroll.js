import debounce from '@three11/debounce';

export default class InfiniteScroll {
	constructor(options = {}, doc = document, win = window) {
		this.settings = {
			element: '.js-infinite',
			next: '.js-infinite__next',
			item: '.js-infinite__item',
			disabledClass: 'disabled',
			hiddenClass: 'hidden',
			responseType: 'text/html',
			onComplete(container) {},
			...options
		};
		this.win = win;
		this.doc = doc;
		this.container = this.doc.querySelector(this.settings.element);
		this.next = this.doc.querySelector(this.settings.next);
		this.isLoading = false;
		this.isAtEnd = false;

		this.container !== null && this.init();
	}

	init() {
		this.bind().hideNext();
	}

	hideNext() {
		this.next && this.next.classList.add(this.settings.hiddenClass);

		return this;
	}

	getLoadingPosition() {
		const { offsetTop, clientHeight } = this.container;

		return offsetTop - clientHeight;
	}

	getScrollPosition() {
		const { pageYOffset, innerHeight } = this.win;

		return pageYOffset + innerHeight / 2;
	}

	bind() {
		this.win.addEventListener('load', event => {
			this.loadMore();
		});

		this.win.addEventListener('scroll', event => {
			debounce(this.loadMore());
		});

		return this;
	}

	loadMore() {
		if (this.getScrollPosition() < this.getLoadingPosition() || this.isLoading || this.isAtEnd || !this.next) {
			return;
		}

		this.isLoading = true;
		this.next.classList.add(this.settings.disabledClass);

		this.makeRequest(this.next.href, html => {
			const items = [...html.querySelectorAll(this.settings.item)].map(item => item.outerHTML).join('');
			const nextUrl = html.querySelector(this.settings.next)
				? html.querySelector(this.settings.next).getAttribute('href')
				: '';

			this.next.href = nextUrl;
			this.container.innerHTML += items;
			this.next.classList.remove(this.settings.disabledClass);
			this.isLoading = false;
			this.settings.onComplete(this.container);
			this.isAtEnd = nextUrl === '';
		});
	}

	makeRequest(url, callback) {
		const request = new XMLHttpRequest();

		request.open('GET', url);

		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				const response = request.responseText;
				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(response, this.settings.responseType);

				callback(xmlDoc);
			}
		};

		request.send();
	}
}
