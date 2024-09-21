# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание архитектуры

Приложение основано на событийно-ориентированной архитектуре, включает в себя слой данных (Model), слой отображения (View) и брокер событий App для их взаимодействия.

## Брокер событий:

App

Класс App принимает в себя экземпляры классов из слоя отображения и моделей данных, подписывается на их события и устанавливает соответствующие обработчики, вызывает их при возникновении события.

## Модели:

StoreModel 

класс StoreModel наследуется от класса EventEmitter, хранит массив объектов с данными о товарах каталога, добавляет их и получает (массив целиком или отдельный товар по id). Добавление новых товаров генерирует событие 'store: changed'

BasketModel

Класс BasketModel наследуется от класса EventEmitter, хранит массив id товаров, добавляет и удаляет id из массива, выдает количество добавленных товаров, содержит метод для очистки всех товаров из корзины

OrderModel

Класс OrderModel содержит сеттеры для свойств, из которых впоследствии формируется объект данных заказа

## Отображение:

Page

Класс Page наследуется от класса EventEmitter, устанавливает элемент счётчика корзины, а также кнопку корзины, навешивает обработчик на кнопку корзины, который генерирует у страницы событие 'OpenBacketBtn: clicked', получает и устанавливает элемент галереи, выводит её на страницу

ModalView

Класс ModalView наследуется от класса EventEmitter, содержит методы открытия и закрытия модального окна, установки отображаемого в модальном окне контента. Вешает обработчик на кнопку закрытия, который генерирует событие 'modal: close' по клику

GalleryView

Класс GalleryView хранит ссылку на элемент каталога магазина, а также отображает товары в каталоге, принимая в массив экземпляров класса товаров

CardView

Класс CardView наследуется от класса EventEmitter, создаёт экземпляр карточки товара на основе полученного объекта данных товара, хранит id товара. При рендере добавляет на карточку обработчик клика, который вызывает событие 'card: selected'

ItemPreview

Класс ItemPreview наследуется от класса EventEmitter, рендерит контент для модального окна (превью для выбранной карточки товара). Кнопка "В корзину" при клике генерирует событие 'basketItem: added'

BasketView

Класс BasketView наследуется от класса EventEmitter, рендерит содержимое модального окна при открытии корзины, служит контейнером для экземпляров класса BasketItemView, получает общую стоимость товаров в корзине и отображает её. 

BasketItemView

Класс BasketItemView наследуется от класса EventEmitter, рендерит отображение товара в корзине на основе полученного из модели объекта данных товара. Также вешает на кнопку удаления товара обработчик, который генерирует по клику событие 'basketItem: deleted'

OrderFormView

Класс наследуется от класса EventEmitter, создаёт форму оформления заказа, которая принимает способ оплаты, а также адрес доставки для передачи этих данных в модель создаваемого заказа. Содержит методы для рендера формы в модальном окне, а также для очистки полей формы. На кнопку "Далее" при рендере вешается обработчик клика, который вызывает событие 'orderForm: submit'

ContactFormView

Класс наследуется от класса EventEmitter, создаёт форму оформления заказа, отображаемую в модальном окне, принимает электронную почту, а также телефон покупателя для передачи этих данных в модель создаваемого заказа. На кнопке "Оплатить" вешается обработчик клика, который заполняет поля mail и phone данными из соответствующих инпутов для последующей передачи в модель заказа и вызывает событие 'contactForm: submit'

SuccessView

Класс наследуется от класса EventEmitter. Отображается в модальном окне, отображает общую сумму заказа. Вешает на кнопку 'За новыми покупками!' обработчик клика, которая генерирует событие 'modal: close'.






