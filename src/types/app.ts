import { Page, ModalView, GalleryView, CardView, ItemPreview, BasketView, BasketItemView, OrderFormView, ContactFormView, SuccessView  } from "./view";
import { StoreModel, BasketModel, OrderModel } from "./models";
import { Api } from "../components/base/api";

export interface App {

  // API

  api: Api;                         // экземпляр API

  // Views

  page: Page;                       // экземпляр основного контейнера сайта
  modalView: ModalView;                     // экземпляр модального окна
  galleryView: GalleryView;                 // экземпляр галереи
  cardView: CardView;                       // класс карточки
  itemPreview: ItemPreview;         // класс превью товара для отображения в модальном окне
  basketView: BasketView;           // класс отображения корзины
  basketItemView: BasketItemView;   // класс добавленных в корзину товаров
  orderFormView: OrderFormView;     // Формы оформления заказа
  contactFormView: ContactFormView;
  successScreen: SuccessView;       // Показывается при успешном заказе в модалке

  // Models

  store: StoreModel;                // экземпляр модели магазина
  basketModel: BasketModel;                // экземпляр модели корзины
  orderModel: OrderModel;           // экземпляр модели заказа
  
  init(): void;                     // инициализация приложения, создание экземпляров классов страницы, галереи, модального 
                                //  окна, моделей данных, поиск необходимых элементов в DOM, а так же получение данных карточек из API и установка их в модель

  // Обработчики событий
  
  renderStore() :void;        // обработчик при срабатывании события 'store: changed', получает массив данных из экземпляра модели, массив итеративно обходится и на каждый элемент массива создаётся экземпляр класса карточки. Полученный массив элементов карточек передаётся в метод render экземпляра галереи, далее галерея выводится на страницу с помощью метода setGallery экземпляра класса Page

  displaySelectedCard() :void;      // обработчик при срабатывании события 'card: selected'. Получает id карточки, вызвавшей событие, используется
                              // для получения сооответствующего объекта данных товара в модели. Данные товара используются для рендера c помощью метода экземпляра класса itemPreview, затем полученный элемент отображается в модальном окне
  
  addItemToBasket() :void;           // Обработчик события 'item: added', при срабатывании получает id добавленного товара и 
                                // добавляет его в модель корзины, после чего получает от неё количество айтемов и устанавливает счётчик корзины на странице
  
  deleteBasketItem() :void;         // обработчик события 'basketItem: deleted'. Получает id товара, удаляет с его помощью
                                    // товар в модели корзины, затем вызывает метод renderBasket;
  
  renderBasket() :void;            // Получает массив id товаров из модели basketModel, с его помощью получает массив объектов
                              // с данными товаров из модели storeModel. Использует объекты данных для создания массива
                              // экземпляров класса basketItemView, который затем передаётся в экземпляр передаётся в метод
                              // render экземпляра класса basketView, который возвращает контент для отображения в
                              // модальном окне. Также устанавливает отображение общей стоимости с помощью метода getTotalPrice. Данный метод срабатывает на событии 'openBasketBtn: clicked', а также
                              // вызывается методом deleteBasketItem;
  
  getTotalPrice(): number;     // Получает массив id товаров из модели корзины, получает массив объектов данных этих товаров из модели каталога, и подсчитывает общую стоимость всех товаров. Обеспечивает взаимподействие между классами отображения и моделями, поэтому вынесен в презентер

  diplayOrderForm(): void;          // Срабатывает на событие 'basketView: proceedOrder'. Отображает экземпляр класса 
                             // OrderFormView в модальном окне
  getOrderData(): void;             // Срабатывает на событие 'orderForm: submit'. Устанавливает данными с формы (способ оплаты,
                             // адрес) соответствующие сеттеры у экземпляра класса модели OrderModel. Отображает в модальном окне экземпляр класса формы контактов ContactFormView
  makeOrder(): void;                // Срабатывает на событие 'contactForm: submit'. Устанавливает данными с формы (e-mail,
                             // телефон) соответствующие сеттеры у экземпляра класса модели OrderModel, передаёт ей общую стоимость товаров из корзины, а также массив их id. Вызывает метод sendOrder()

  sendOrder(): void;               // С помощью метода API объект данных заказа из экземпляра OrderModel отправляется на сервер. Если сервер отвечает "ОК", товары в корзине очищаются, вызывается метод displaySuccessView, которому передаётся общая стоимость товаров из метода getTotalPrice.

  displaySuccessView(total: number): void;      // В модальном окне отражается экземпляр класса SuccessView, ему передаётся общая стоимость заказа

  closeModal(): void;               // Срабатывает на событие 'modal: close', вызывает метод close у экземпляра ModalView
}