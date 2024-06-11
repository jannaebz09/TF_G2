import { Product } from './Product';
import { Sale } from './Sale';

export class DetailSale {
  idDetailSale: number = 0;
  descriptionDetailSale: string = '';
  subtotal: number = 0;
  quantity: number = 0;
  sale: Sale = new Sale();
  product: Product = new Product();
}
