import { ensureElement, cloneTemplate } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/events";
import { ISuccess } from "../../types/view";

export class successView extends Component<ISuccess> {
  protected successBtn: HTMLButtonElement;
  protected _total: HTMLElement;
  
  constructor(template: HTMLTemplateElement, protected events: EventEmitter) {
    super(cloneTemplate(template));
    
    this._total = ensureElement('.order-success__description', this.container);
    this.successBtn = ensureElement('.order-success__close', this.container) as HTMLButtonElement;
    
    this.successBtn.onclick = () => {
      this.events.emit('modal: close');
    }
  }
  set total(amount: number) {
    this._total.textContent = `Списано ${amount} синапсов`;
  }
}