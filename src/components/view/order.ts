import {
	ensureElement,
	cloneTemplate,
	ensureAllElements,
} from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { IOrderForm } from '../../types/view';

export class OrderForm extends Component<IOrderForm> implements IOrderForm {
	protected optionsContainer: HTMLElement;
	protected optionsButtons: HTMLButtonElement[];
	protected _payment: string | undefined;
	protected _input: HTMLInputElement;
	protected _error: HTMLElement;
	protected _submitBtn: HTMLButtonElement;
	protected optionPicked: boolean = false;

	constructor(template: HTMLTemplateElement, protected events: EventEmitter) {
		super(cloneTemplate(template) as HTMLFormElement);
		
		this.optionsContainer = ensureElement('.order__buttons', this.container);
		this.optionsButtons = ensureAllElements(
			'.button_alt',
			this.optionsContainer
		);
		
		this.optionsButtons.forEach((currentBtn) => {
			currentBtn.onclick = () => {
				this._payment = currentBtn.name;
				this.optionsButtons.forEach((btn) => {
					btn.classList.remove('button_alt-active');
				});
				currentBtn.classList.add('button_alt-active');
				this.optionPicked = true;
				if (this._input.validity.valid) {
					this.setDisabled(this._submitBtn, false);
					this._error.textContent = '';
				}
			};
		});
		
		this._input = ensureElement(
			'.form__input',
			this.container
		) as HTMLInputElement;
		
		this._error = ensureElement('.form__errors', this.container);
		
		this._submitBtn = ensureElement(
			'.order__button',
			this.container
		) as HTMLButtonElement;

		this._submitBtn.onclick = (evt: Event) => {
			evt.preventDefault();
			this.events.emit('order: proceed');
		};

		this._input.oninput = () => {
			if (this.optionPicked && this._input.validity.valid) {
				this.setDisabled(this._submitBtn, false);
				this._error.textContent = '';
			} else {
				this.setDisabled(this._submitBtn, true);
				this._error.textContent =
					'Необходимо заполнить поле и указать способ оплаты';
			}
		};
	}

	get payment() {
		return this._payment;
	}

	get address() {
		return this._input.value;
	}

  clear() {
    this._input.value = '';
    this._error.textContent = '';
    this.optionsButtons.forEach((btn) => {
      btn.classList.remove('button_alt-active');
    });
		this.setDisabled(this._submitBtn, true);
  }
}
