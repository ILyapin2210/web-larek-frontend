export type ItemData = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
};

export interface StoreModel {
	items: ItemData[];
	setItems(items: ItemData[]): void; // генерирует событие 'store: changed';
	getItems(): ItemData[];
	getItem(id: string): ItemData;
}

export interface BasketModel {
	items: string[]; // массив id товаров
	getItemsCount(): number;
	getItems(): string[];
	addItem(id: string): void;
	removeItem(id: string): void;
	clearBasket(): void;
}

export type OrderData = {
  payment: string,
  email: string,
  phone: string,
  address: string,
  total: number,
  items: string[],
}

export interface OrderModel {
	payment: string;
	address: string;
	email: string;
	phone: string;
	items: string[];
	total: number;
	getOrderData(): OrderData;
}
