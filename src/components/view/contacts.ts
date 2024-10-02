import {
	ensureElement,
	cloneTemplate,
	ensureAllElements,
} from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { IContactForm } from '../../types/view';

export class ContactForm extends Component<IContactForm> {
  protected form: HTMLFormElement;
  protected submitBtn: HTMLButtonElement;
  protected formInputs: HTMLInputElement[];
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;
  protected error: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: EventEmitter) {
    super((cloneTemplate(template)));
    this.form = this.container as HTMLFormElement;
    this.emailInput = this.form.email;
    this.phoneInput = this.form.phone;
    this.error = ensureElement('.form__errors', this.container);
    this.submitBtn = ensureElement('.button', this.container) as HTMLButtonElement;

    this.emailInput.oninput = () => {         // Если оба поля валидны, разблокируем кнопку
      if(!this.emailInput.validity.valid) {
        this.error.textContent = this.emailInput.validationMessage;
        this.setDisabled(this.submitBtn, true);
      } else if (this.phoneInput.validity.valid) {
        this.error.textContent = "";
        this.setDisabled(this.submitBtn, false);
      }
    }

    this.phoneInput.oninput = () => {         // поля взаимно проверяют друг друга
      if(!this.phoneInput.validity.valid) {
        this.error.textContent = this.phoneInput.validationMessage;
        this.setDisabled(this.submitBtn, true);
      } else if (this.emailInput.validity.valid) {
        this.error.textContent = "";
        this.setDisabled(this.submitBtn, false);
      }
    }

    this.submitBtn.onclick = (evt: Event) => {
      evt.preventDefault();
      this.events.emit('order: makeOrder');
    }
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

  clear() {
    this.form.reset();
    this.buttonText = 'Оплатить';
  }
}