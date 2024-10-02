import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/events";
import { IModalView } from "../../types/view";

export class Modal extends Component<IModalView> {
  protected modalContainer: HTMLElement;
  protected closeBtn: HTMLButtonElement | undefined;
  protected content: HTMLElement | undefined | null;
  protected isOpened: boolean = false;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.closeBtn = ensureElement('.modal__close', this.container) as HTMLButtonElement;
    this.modalContainer = ensureElement('.modal__container', this.container);
    this.content = ensureElement('.modal__content', this.container);
    
    this.closeBtn.onclick = () => {
      this.events.emit('modal: close');
    };
    this.container.onclick = () => {
      this.events.emit('modal: close');
    }
    this.modalContainer.onclick = (evt: Event) => {
      evt.stopPropagation();
    }
  }

  open(): void {
    if(this.content.children.length === 0) throw new Error('The popup is empty!');
    if (!this.isOpened) this.container.classList.add('modal_active');
    this.isOpened = true;
    this.events.emit('modal: opened');
  }

  close(): void {
    if(this.isOpened) this.container.classList.remove('modal_active');
    this.setText(this.content, '');
    this.isOpened = false;
  }

  setContent(content: HTMLElement): void {
    this.content.replaceChildren(content);
  }
}