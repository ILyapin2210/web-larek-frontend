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

Приложение основано на событийно-ориентированной архитектуре, включает в себя слой данных (Model), слой отображения (View) и класс-презентер Presenter для их взаимодействия. 

## Брокер событий:

Базовый класс EventEmitter позволяет генерировать кастомные события и осуществлять подписку на эти события с помощью метода on, передавая в него коллбеки-обработчики события. Данные обработчики вызываются впоследствии при вызове метода emit, запускающего событие. Конструкторы всех классов отображения и моделей принимают экземпляр класса EventEmitter для последующей реализации событийно-ориентированной архитектуры

## Презентер:

Presenter

Класс Presenter осуществляет взаимодействие классов отображения и моделей данных, подписывается на их события и устанавливает соответствующие обработчики, вызывает их при возникновении события.

## Модели:

StoreModel 

класс StoreModel хранит массив объектов с данными о товарах каталога, добавляет их и получает (массив целиком или отдельный товар по id). Добавление новых товаров генерирует событие 'store: changed'

BasketModel

Класс BasketModel, хранит массив id товаров, добавляет и удаляет id из массива, выдает количество добавленных товаров, содержит метод для очистки всех товаров из корзины

OrderModel

Класс OrderModel содержит сеттеры для свойств, из которых впоследствии формируется объект данных заказа

## Отображение:

Page

Класс Page, устанавливает элемент счётчика корзины, а также кнопку корзины, навешивает обработчик на кнопку корзины, который генерирует у страницы событие 'OpenBacketBtn: clicked', получает и устанавливает элемент галереи, выводит её на страницу

ModalView

Класс ModalView, содержит методы открытия и закрытия модального окна, установки отображаемого в модальном окне контента. Вешает обработчик на кнопку закрытия, который генерирует событие 'modal: close' по клику

GalleryView

Класс GalleryView хранит ссылку на элемент каталога магазина, а также отображает товары в каталоге, принимая в массив экземпляров класса товаров

CardView

Класс CardView создаёт экземпляр карточки товара на основе полученного объекта данных товара, хранит id товара. При рендере добавляет на карточку обработчик клика, который вызывает событие 'card: selected'

ItemPreview

Класс ItemPreview рендерит контент для модального окна (превью для выбранной карточки товара). Кнопка "В корзину" при клике генерирует событие 'basketItem: added'

BasketView

Класс BasketView, рендерит содержимое модального окна при открытии корзины, служит контейнером для экземпляров класса BasketItemView, получает общую стоимость товаров в корзине и отображает её. 

BasketItemView

Класс BasketItemView, рендерит отображение товара в корзине на основе полученного из модели объекта данных товара. Также вешает на кнопку удаления товара обработчик, который генерирует по клику событие 'basketItem: deleted'

OrderFormView

Класс создаёт форму оформления заказа, которая принимает способ оплаты, а также адрес доставки для передачи этих данных в модель создаваемого заказа. Содержит методы для рендера формы в модальном окне, а также для очистки полей формы. На кнопку "Далее" при рендере вешается обработчик клика, который вызывает событие 'orderForm: submit'

ContactFormView

Класс создаёт форму оформления заказа, отображаемую в модальном окне, принимает электронную почту, а также телефон покупателя для передачи этих данных в модель создаваемого заказа. На кнопке "Оплатить" вешается обработчик клика, который заполняет поля mail и phone данными из соответствующих инпутов для последующей передачи в модель заказа и вызывает событие 'contactForm: submit'

SuccessView

Класс рендерит контент для модального окна при успешном оформлении заказа, отображает общую сумму заказа. Вешает на кнопку 'За новыми покупками!' обработчик клика, который генерирует событие 'modal: close'.






