// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import debounce from '@three11/debounce';

export type InfiniteScrollOptions = {
	element: string;
	next: string;
	item: string;
	disabledClass: string;
	hiddenClass: string;
	responseType: DOMParserSupportedType;
	scrollPosition: number;
	debounceTime: number;
	onComplete: null | ((container: HTMLElement, document: Document) => void);
};

export class InfiniteScroll {
	private doc: Document;
	private win: Window & typeof globalThis;
	private next: HTMLAnchorElement | null;
	private settings: InfiniteScrollOptions;
	private container: HTMLElement | null;
	private isAtEnd: boolean;
	private isLoading: boolean;

	constructor(options: Partial<InfiniteScrollOptions> = {}, doc = document, win = window) {
		this.settings = {
			element: '.js-infinite',
			next: '.js-infinite__next',
			item: '.js-infinite__item',
			disabledClass: 'disabled',
			hiddenClass: 'hidden',
			responseType: 'text/html',
			scrollPosition: win.innerHeight / 2,
			debounceTime: 500,
			onComplete: null,
			...options
		};
		this.win = win;
		this.doc = doc;
		this.container = this.doc.querySelector(this.settings.element);
		this.next = this.doc.querySelector(this.settings.next);
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
		return this.win.pageYOffset + this.settings.scrollPosition;
	}

	public loadMore(): void {
		if (this.getScrollPosition() < this.getLoadingPosition() || this.isLoading || this.isAtEnd || !this.next) {
			return;
		}

		const { item, next, onComplete, disabledClass } = this.settings;

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
			this.next.classList.add(this.settings.hiddenClass);
		}

		return this;
	}

	private bind(): InfiniteScroll {
		this.win.addEventListener('load', () => {
			this.loadMore();
		});

		this.win.addEventListener('scroll', () => {
			debounce(this.loadMore(), this.settings.debounceTime);
		});

		return this;
	}

	private makeRequest(url: string, callback: (doc: Document) => void): void {
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

export default InfiniteScroll;
