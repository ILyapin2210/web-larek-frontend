import './scss/styles.scss';
import { larekAPI } from './components/base/larekAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { createElement, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import {
	StoreModel,
	BasketModel,
	OrderModel,
} from './components/models/models';
import { cardId } from './components/view/card';
import { Modal } from './components/view/modal';
import { Page } from './components/view/page';
import { Card } from './components/view/card';
import { BasketView } from './components/view/basket';
import { OrderForm } from './components/view/order';
import { ContactForm } from './components/view/contacts';
import { successView } from './components/view/success';

// Шаблоны

const modalTmp = ensureElement('#modal-container') as HTMLTemplateElement;
const basketTmp = ensureElement('#basket') as HTMLTemplateElement;
const cardCatalogTmp = ensureElement('#card-catalog') as HTMLTemplateElement;
const cardPreviewTmp = ensureElement('#card-preview') as HTMLTemplateElement;
const cardBasketTmp = ensureElement('#card-basket') as HTMLTemplateElement;
const formOrderTmp = ensureElement('#order') as HTMLTemplateElement;
const formContactsTmp = ensureElement('#contacts') as HTMLTemplateElement;
const successTmp = ensureElement('#success') as HTMLTemplateElement;

// Экземпляры базовых классов

const events = new EventEmitter();
const api = new larekAPI(CDN_URL, API_URL);

// Экземпляры моделей

const store = new StoreModel(events);
const basket = new BasketModel(events);
const order = new OrderModel(events);

// Заглушка на случай пустой корзины

const emptyBasket = createElement('h1', {
	innerText: 'В корзине пока ничего нет',
});

// Экземпляры классов представления

const modal = new Modal(modalTmp, events);
const page = new Page(document.querySelector('.page'), events);
const basketView = new BasketView(basketTmp, events);

// Экземпляры форм

const formOrder = new OrderForm(formOrderTmp, events);
const formContacts = new ContactForm(formContactsTmp, events);

// Показываем при успешной отправке заказа

const success = new successView(successTmp, events);

// Обработчики событий

events.on('store: changed', () => {
	// Изменения в модели каталога
	page.setCatalog(
		store.items.map((item) => new Card(cardCatalogTmp, events).render(item))
	);
});

events.on('modal: opened', () => {
	// При открытии модального окна
	page.locked = true;
});

events.on('modal: close', () => {
	// при закрытии модального окна
	page.locked = false;
	modal.close();
});

events.on('card: selected', (card: cardId) => {
	// выбрана карточка с товаром
	modal.setContent(
		new Card(cardPreviewTmp, events, basket.isContain(card.id)).render(
			store.getItem(card.id)
		)
	);
	modal.open();
});

events.on('item: toBasket', (item: cardId) => {
	// товар добавлен в корзину
	basket.addItem(item.id);
	page.basketCounter = basket.count;
	events.emit('card: selected', item);
});

events.on('basket: changed', () => {
	// Изменилась корзина
	page.basketCounter = basket.count;
})

events.on('basket: deleteItem', (item: cardId) => {
	// товар удалён из корзины
	basket.removeItem(item.id);
	page.basketCounter = basket.count;
	events.emit('basket: open');
});

events.on('basket: open', () => {
	// открываем корзину товаров
	if (basket.count === 0) {
		basketView.list = emptyBasket;
		basketView.total = 0;
	} else {
		basketView.total = getTotalPrice();
		basketView.list = basket.items.map((item, index) => {
			const card = new Card(cardBasketTmp, events);
			card.itemIndex = index + 1;
			return card.render(store.getItem(item));
		});
	}
	modal.setContent(basketView.render());
	modal.open();
});

events.on('basket: proceed', () => {
	// начинаем оформлять заказ
	formOrder.clear();
	modal.setContent(formOrder.render());
});

events.on('order: proceed', () => {
	// заполнили первую форму, запрашиваем следующую
	order.payment = formOrder.payment;
	order.address = formOrder.address;
	formOrder.clear();
	formContacts.clear();
	modal.setContent(formContacts.render());
});

events.on('order: makeOrder', () => {
	// формируем объект заказа, отправляем на серве, в случае успеха показываем уведомление
	formContacts.buttonText = 'Отправляем на сервер...';
	order.email = formContacts.email;
	order.phone = formContacts.phone;
	order.total = getTotalPrice();
	order.items = basket.items;
	console.log(order.getOrderData());
	api.makeOrder(order.getOrderData()).then((data) => {
		success.total = data.total;
		basket.clear();
		modal.setContent(success.render());
	});
});

// берёт массив id товаров из корзины, по этим id получает массив объектов товаров из модели каталога и суммирует их стоимость

function getTotalPrice(): number {
	return basket.items
		.map((item) => store.getItem(item).price)
		.reduce((a, c): number => a + c);
}

// инициализируем каталог

api.getItems().then((res) => (store.items = res));
