import { Api } from "./api";
import { ApiListResponse } from "./api";
import { TOrderResult } from "../../types/models";
import { TItemData } from "../../types/models";
import { TOrderData } from "../../types/models";

interface ILarekAPI {
  getItems(): Promise<TItemData[]>;
  makeOrder(order: TOrderData): Promise<TOrderResult>;
}

export class larekAPI extends Api implements ILarekAPI {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getItems(): Promise<TItemData[]> {
    return this.get('/product').then((data: ApiListResponse<TItemData>) =>
        data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image,
        }))
    );
}

  makeOrder(order: TOrderData): Promise<TOrderResult> {
    return this.post('/order', order).then(
      (data: TOrderResult) => data
    )
  }
}
