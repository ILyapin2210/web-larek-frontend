import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { IPage } from '../../types/view';

export class Page extends Component<IPage> {
	protected catalog: HTMLElement | undefined;
	protected openBasketBtn: HTMLElement | undefined;
	protected _basketCounter: HTMLSpanElement | undefined;
	protected wrapper: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.catalog = ensureElement('.gallery');
		this.openBasketBtn = ensureElement('.header__basket', this.container);
		this.wrapper = ensureElement('.page__wrapper', this.container);
		this.openBasketBtn.onclick = () => {
			this.events.emit('basket: open');
		};
		this._basketCounter = ensureElement(
			'.header__basket-counter',
			this.openBasketBtn
		);
		this._basketCounter.textContent = '0';
	}

	set basketCounter(count: number | string) {
		if (Number.isNaN(count))
			throw new Error(
				'Attempting to assign a non-number type value to basket the counter'
			);
		this._basketCounter.textContent = String(count);
	}

	setCatalog<T extends HTMLElement>(content: T[] | T) {
		Array.isArray(content)
			? this.catalog.replaceChildren(...content)
			: this.catalog.replaceChildren(content);
	}

	set locked(value: boolean) {
		if (value) {
				this.wrapper.classList.add('page__wrapper_locked');
		} else {
				this.wrapper.classList.remove('page__wrapper_locked');
		}
}
}
