export type TItemData = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
};

export interface IStoreModel {
	items: TItemData[];
	getItem(id: string): TItemData;
}

export type TBasketItem = 'string';

export interface IBasketModel {
	items: TBasketItem[]; // массив id товаров
	count: number;
	addItem(id: string): void;
	removeItem(id: string): void;
	isContain(id: string): boolean; // добавил просто на всякий случай, мне показалось, будет полезным в таком классе
	clear(): void;
}

export type TOrderData = {
  payment: string,
  email: string,
  phone: string,
  address: string,
  total: number,
  items: string[],
}

export interface IOrderModel {
	payment: string;
	address: string;
	email: string;
	phone: string;
	items: string[];
	total: number;
	getOrderData(): TOrderData;
}

export type TOrderResult = {
  id: string,
  total: number,
}
