import { User } from './User';
import { SpRecipe } from './Sp-recipe';

export class Comment {
    idComment: number = 0;
    textComment: string="";
    dateComment: Date = new Date(Date.now());
    qualification: number=0;
    user: User = new User();
    spRecipe: SpRecipe = new SpRecipe();
}