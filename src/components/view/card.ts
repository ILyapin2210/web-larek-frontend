import { ensureElement, cloneTemplate } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { TItemData } from '../../types/models';
import { ICard } from '../../types/view';

enum tagStyles {
	soft = 'card__category_soft',
	hard = 'card__category_hard',
	other = 'card__category_other',
	additional = 'card__category_additional',
	button = 'card__category_button',
}

export type cardId = Pick<TItemData, 'id'>;

export class Card extends Component<TItemData> {
	protected _id: string | undefined;
	protected _description: HTMLElement | null;
	protected _image: HTMLImageElement | null;
	protected _title: HTMLElement | null;
	protected _category: HTMLElement | null;
	protected _price: HTMLElement | null;
	protected _addToBasketBtn: HTMLButtonElement | null;
	protected _itemIndex: HTMLElement | null;
	protected _removeFromBasketBtn: HTMLButtonElement | null;

	constructor(template: HTMLTemplateElement, protected events: EventEmitter, isPicked?: boolean) {
		super(cloneTemplate(template));

		this._description = this.container.querySelector('.card__text') ?? null;
		this._image = this.container.querySelector('.card__image') ?? null;
		this._title = this.container.querySelector('.card__title') ?? null;
		this._category = this.container.querySelector('.card__category') ?? null;
		this._price = this.container.querySelector('.card__price') ?? null;
		this._addToBasketBtn =
			this.container.querySelector('.button.card__button') ?? null;
		if(isPicked && this._addToBasketBtn) {
			this.setDisabled(this._addToBasketBtn, true);
			this.setText(this._addToBasketBtn, 'Добавлено в корзину!');
		}
		this._itemIndex =
			this.container.querySelector('.basket__item-index') ?? null;
		this._removeFromBasketBtn =
			this.container.querySelector('.basket__item-delete') ?? null;

		this.container.onclick = (evt: Event) => {
			evt.stopImmediatePropagation();
			this.events.emit('card: selected', { id: this._id });
		};

		if (this._addToBasketBtn) {
			this._addToBasketBtn.onclick = (evt: Event) => {
				evt.stopPropagation();
				this.events.emit('item: toBasket', { id: this._id });
			};
		}

		if (this._removeFromBasketBtn) {
			this._removeFromBasketBtn.onclick = (evt: Event) => {
				evt.stopPropagation();
				this.events.emit('basket: deleteItem', { id: this._id });
			};
		}
	}

	set id(id: string) {
		this._id = id;
	}

	get id() {
		return this._id;
	}

	set description(descr: string) {
		if (this._description) this._description.textContent = descr;
	}

	set image(url: string) {
		if (this._image) this._image.src = url;
	}

	set title(title: string) {
		if (this._title) this._title.textContent = title;
	}

	set category(tag: string) {
		if (this._category) {
			switch (tag) {
				case 'софт-скил':
					this._category.classList.add(tagStyles.soft);
					break;
				case 'хард-скил':
					this._category.classList.add(tagStyles.hard);
					break;
				case 'другое':
					this._category.classList.add(tagStyles.other);
					break;
				case 'дополнительное':
					this._category.classList.add(tagStyles.additional);
					break;
				case 'кнопка':
					this._category.classList.add(tagStyles.button);
					break;
				default:
					this._category.classList.add(tagStyles.soft);
			}
			this._category.textContent = tag;
		}
	}

	set price(price: number | null) {
		if (this._price)
			this._price.textContent = price === null ? 'Бесценно' : String(price); // костыль, куда без них
	}

	set itemIndex(index: number) {
		this._itemIndex.textContent = String(index);
	}
}
