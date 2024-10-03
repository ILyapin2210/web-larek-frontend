import {
	ensureElement,
	cloneTemplate,
	ensureAllElements,
} from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { IContactForm } from '../../types/view';

type TValidationEntry = { field: string; isValid: boolean };

export class ContactForm extends Component<IContactForm> {
	protected form: HTMLFormElement;
	protected submitBtn: HTMLButtonElement;
	protected formInputs: HTMLInputElement[];
	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;
	protected error: HTMLElement;
	protected validationList: Map<string, boolean> = new Map();

	constructor(template: HTMLTemplateElement, protected events: EventEmitter) {
		super(cloneTemplate(template));
		this.form = this.container as HTMLFormElement;
		this.emailInput = this.form.email;
		this.phoneInput = this.form.phone;
		this.error = ensureElement('.form__errors', this.container);
		this.submitBtn = ensureElement(
			'.button',
			this.container
		) as HTMLButtonElement;
		
    ensureAllElements<HTMLInputElement>('.form__input', this.container).forEach(
			(input) => this.validationList.set(input.name, false)
		);

		this.form.addEventListener('input', (evt) => {
			const target = evt.target as HTMLInputElement;
      const inputName = target.name;
			let isValid = target.validity.valid;
			this.error.textContent = target.validationMessage ?? '';
			this.validationList.set(inputName, isValid);
			this.checkValidation();
		});

		this.submitBtn.onclick = (evt: Event) => {
			evt.preventDefault();
			this.events.emit('order: makeOrder');
		};
	}

	get email() {
		return this.emailInput.value;
	}

	get phone() {
		return this.phoneInput.value;
	}

	set buttonText(text: string) {
		this.setText(this.submitBtn, text);
	}

	checkValidation(): void {
		this.setDisabled(
			this.submitBtn,
			Array.from(this.validationList.values()).some((isValid) => !isValid)
		);
	}

	clear() {
		this.form.reset();
		this.buttonText = 'Оплатить';
	}
}
