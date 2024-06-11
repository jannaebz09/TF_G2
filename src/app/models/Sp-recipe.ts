import { User } from './User';

export class SpRecipe {
    idSpecialRecipe: number = 0;
    description: string = "";
    shippingDate: Date = new Date(Date.now());
    user: User = new User();
}