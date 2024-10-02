import { TItemData } from "./models";

export interface IModalView<T extends HTMLElement = HTMLElement> {
  container: T;
  closeBtn: T;
  content: T;
  isOpened: boolean;
  open(): void;
  close(): void;
  setContent<T extends HTMLElement>(content: T): void;
}

export interface IPage<T extends HTMLElement = HTMLElement> {                             
  gallery: T;
  cartBtn: HTMLButtonElement;
  basketCounter: number | string;
  setCatalog(content: T[] | T): void;
}

export interface ICard {
  ItemId: string;
  cardTemplate: HTMLTemplateElement;                      // вешает на карточку слушатель события, который по клику генерирует событие 'card: selected'
}

export interface IBasketView<T extends HTMLElement = HTMLElement> {       // клик по кнопке генерирует событие 'basketView: proceed order';
  list: T[] | T;
  total: number;
  basketBtn: HTMLButtonElement; 
}

export interface IOrderForm {
  payment: string | undefined;
  address: string;
  clear(): void;
}

export interface IContactForm {
  mail: string;
  phone: string;
  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
  sendBtn: HTMLButtonElement; // по клику заполняет соответсвующие свойства данными из форм и генерирует событие
                              // 'contactForm: submit'
  clear() :void;
}

export interface ISuccess {
  total: number;
}