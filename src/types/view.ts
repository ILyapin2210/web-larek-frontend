import { ItemData } from "./models";

export interface ModalView {
  container: HTMLElement;
  closeBtn: HTMLButtonElement;
  content: HTMLElement;
  open(): void;
  close(): void;
  setContent(content: HTMLElement): void;
}

export interface Page {                             
  galleryElement: HTMLElement;
  cartBtn: HTMLButtonElement;
  cartCounter: HTMLSpanElement;
  setCounter(amount: number): void;
  setGallery(gallery: GalleryView): void;
}

export interface GalleryView {
  gallery: HTMLElement;
  render(items: CardView []): void;
}

export interface CardView {
  ItemId: string;
  cardTemplate: HTMLTemplateElement;
  render(data: ItemData): HTMLElement;                       // вешает на карточку слушатель события, который по клику генерирует событие 'card: selected'
}

export interface ItemPreview {
template: HTMLTemplateElement;
render(data: ItemData): HTMLDivElement;                     // вешает на кнопку "В корзину" слушатель события по клику, генерирует событие  "item: added"
}

export interface BasketView {                              // клик по кнопке генерирует событие 'basketView: proceed order';
  basketTemplate: HTMLTemplateElement;
  basketList: HTMLUListElement;
  totalCounter: HTMLSpanElement;
  setTotal (total: number) :void;
  basketProceedButton: HTMLButtonElement;
  render(items: BasketItemView[]): void;     
}

export interface BasketItemView {
  basketItemTemplate: HTMLTemplateElement;
  itemId: string | undefined;                               // может быть indefined пока не будет установлен при рендере
  deleteItemBtn: HTMLButtonElement;                         // клик по кнопке генерирует событие 'basketItem: deleted' с id товара;
  render(item: ItemData): HTMLElement;
}

export interface OrderFormView {
  template: HTMLTemplateElement;
  paymentOption: string;
  orderButtonsContainer: HTMLDivElement;  
  orderButtons: HTMLButtonElement [];
  orderAddressInput: HTMLInputElement;
  orderSubmit: HTMLButtonElement;       // при создании экземпляра на кнопку вешается обработчик клика, который генерирует событие 'orderForm: submit'
  render() :HTMLFormElement
  clear() :void;
}

export interface ContactFormView {
  template: HTMLTemplateElement;
  mail: string;
  phone: string;
  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
  sendBtn: HTMLButtonElement; // по клику заполняет соответсвующие свойства данными из форм и генерирует событие
                              // 'contactForm: submit'
  render(): HTMLFormElement;
  clear() :void;
}

export interface SuccessView {
  template: HTMLTemplateElement;
  totalPriceElement: HTMLElement;
  setTotal(total: number): void;
  returnButton: HTMLButtonElement; // при создании экземпляра на кнопку вешается обработчик по клику, который генерирует событие 'modal: close'
}