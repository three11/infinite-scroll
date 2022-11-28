import debounce from '@three11/debounce';

export type InfiniteScrollOptions = {
	element: string;
	next: string;
	item: string;
	disabledClass: string;
	hiddenClass: string;
	responseType: DOMParserSupportedType;
	requestMethod: 'GET' | 'POST' | 'PUT' | 'PATCH';
	debounceTime: number;
	viewportTriggerPoint: number;
	onComplete: null | ((container: HTMLElement, document: Document) => void);
};

export class InfiniteScroll {
	private doc: Document;
	private win: Window & typeof globalThis;
	private next: HTMLAnchorElement | null;
	private options: InfiniteScrollOptions;
	private container: HTMLElement | null;
	private isAtEnd: boolean;
	private isLoading: boolean;
	private defaultOptions: InfiniteScrollOptions = {
		element: '.js-infinite',
		next: '.js-infinite__next',
		item: '.js-infinite__item',
		disabledClass: 'disabled',
		hiddenClass: 'hidden',
		responseType: 'text/html',
		requestMethod: 'GET',
		debounceTime: 500,
		onComplete: null,
		viewportTriggerPoint: window.innerHeight / 2
	};

	constructor(options: Partial<InfiniteScrollOptions> = {}, doc = document, win = window) {
		this.options = {
			...this.defaultOptions,
			...options
		};
		this.win = win;
		this.doc = doc;
		this.container = this.doc.querySelector(this.options.element);
		this.next = this.doc.querySelector(this.options.next);
		this.isLoading = false;
		this.isAtEnd = false;

		if (this.container) {
			this.init();
		}
	}

	public init(): InfiniteScroll {
		this.bind().hideNext();

		return this;
	}

	public getLoadingPosition(): number {
		const { offsetTop, clientHeight } = this.container as HTMLElement;

		return offsetTop + clientHeight;
	}

	public getScrollPosition(): number {
		return this.win.scrollY + this.options.viewportTriggerPoint;
	}

	public loadMore(): void {
		if (this.getScrollPosition() < this.getLoadingPosition() || this.isLoading || this.isAtEnd || !this.next) {
			return;
		}

		const { item, next, onComplete, disabledClass = this.defaultOptions.disabledClass } = this.options;

		this.isLoading = true;
		this.next.classList.add(disabledClass);

		this.makeRequest(this.next.href, (html: Document) => {
			const items = Array.from(html.querySelectorAll(item))
				.map(item => item.outerHTML)
				.join('');

			const nextUrl = html.querySelector(next)?.getAttribute('href') || '';

			if (this.next) {
				this.next.href = nextUrl;
				this.next.classList.remove(disabledClass);
			}

			const container = this.container as HTMLElement;

			container.innerHTML += items;

			this.isLoading = false;
			this.isAtEnd = nextUrl === '';

			if (onComplete && typeof onComplete === 'function') {
				onComplete(container, html);
			}
		});
	}

	private hideNext(): InfiniteScroll {
		if (this.next) {
			this.next.classList.add(this.options.hiddenClass || this.defaultOptions.hiddenClass);
		}

		return this;
	}

	private bind(): InfiniteScroll {
		this.win.addEventListener('load', () => {
			this.loadMore();
		});

		this.win.addEventListener('scroll', () => {
			debounce(this.loadMore() as unknown as (...args: unknown[]) => void, this.options.debounceTime);
		});

		return this;
	}

	private makeRequest(url: string, callback: (doc: Document) => void): void {
		const request = new XMLHttpRequest();

		request.open(this.options.requestMethod || this.defaultOptions.requestMethod, url);

		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				const response = request.responseText;
				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(
					response,
					this.options.responseType || this.defaultOptions.responseType
				);

				callback(xmlDoc);
			}
		};

		request.send();
	}
}

export default InfiniteScroll;
