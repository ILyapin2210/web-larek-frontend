import { EventEmitter } from "../base/events";
import { TItemData, TBasketItem, TOrderData, IStoreModel, IBasketModel, IOrderModel } from "../../types/models";

export class StoreModel implements IStoreModel {
  private _items: TItemData[] = [];
  
  constructor(protected events: EventEmitter) {}

  set items(items: TItemData[]) {
    this._items = items;
    this.events.emit('store: changed');
  }

  get items(): TItemData[] {
    return this._items;
  }

  getItem(id: string): TItemData {
    return this._items.find(item => item.id === id);
  }
}

export class BasketModel implements IBasketModel {
  private _items: Set<TBasketItem> = new Set();

  constructor(protected events: EventEmitter ) {} 

  get items(): TBasketItem[] {
    return Array.from(this._items);
  }

  get count(): number {
    return Array.from(this._items).length;
  }

  addItem(item: string): void {
    this._items.add(item as TBasketItem);
    this.events.emit('basket: changed');
  }

  removeItem(targetItem: string): void {
    this._items.delete(targetItem as TBasketItem);
    this.events.emit('basket: changed');
  }

  isContain(id: string): boolean {
    return this._items.has(id as TBasketItem);
  }

  clear(): void {
    this._items.clear();
    this.events.emit('basket: changed');
  }
}

export class OrderModel implements IOrderModel {
  private _payment: string | undefined;
  private _address: string | undefined;
  private _email: string | undefined;
  private _phone: string | undefined;
  private _items: TBasketItem[] = [];
  private _total: number;

  constructor(protected events: EventEmitter) {}

  set payment(option: string) {
    this._payment = option;
  }

  set address(address: string) {
    this._address = address;
  }

  set email(email: string) {
    this._email = email;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  set items(items: TBasketItem[]) {
    this._items = items;
  }

  set total(amount: number) {
    if (isNaN(amount)) throw new Error('Assigning non-numeric type value to a total price');
    this._total = Number(amount);
  }

  getOrderData(): TOrderData {
    return {
      payment: this._payment,
      address: this._address,
      email: this._email,
      phone: this._phone,
      items: this._items,
      total: this._total,
    };
  }
}



