import { OptionPay } from './OptionPay';
import { User } from './User';

export class Sale {
  idSale: number = 0;
  saleDate: Date = new Date(Date.now());
  total: number = 0;
  user: User = new User();
  optionPay: OptionPay = new OptionPay();
}