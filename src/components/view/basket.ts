import { ensureElement, cloneTemplate } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { IBasketView } from '../../types/view';

export class BasketView extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected basketBtn: HTMLButtonElement;

	constructor(template: HTMLTemplateElement, protected events: EventEmitter) {
		super(cloneTemplate(template));

		this._list = ensureElement('.basket__list', this.container);
		this._total = ensureElement('.basket__price', this.container);
		this.basketBtn = ensureElement(
			'.basket__button',
			this.container
		) as HTMLButtonElement;

		this.basketBtn.onclick = () => {
			this.events.emit('basket: proceed');
		};
	}

	set total(amount: number) {
		if (amount === null) amount = 0;
		amount === 0
			? (this.basketBtn.disabled = true)
			: (this.basketBtn.disabled = false);
		this._total.textContent = `${amount} синапсов`;
	}

	set list(items: HTMLElement[] | HTMLElement) {
		Array.isArray(items)
			? this._list.replaceChildren(...items)
			: this._list.replaceChildren(items);
	}
}
