import { Routes } from '@angular/router';
import { CreaeditaProductComponent } from './components/product/creaedita-product/creaedita-product.component';
import { ProductComponent } from './components/product/product.component';
import { CreaeditaoptionpayComponent } from './components/optionpay/creaeditaoptionpay/creaeditaoptionpay.component';
import { OptionpayComponent } from './components/optionpay/optionpay.component';
import { UserComponent } from './components/user/user.component';
import { CreaeditauserComponent } from './components/user/creaeditauser/creaeditauser.component';
import { RoleComponent } from './components/role/role.component';
import { CreaeditaroleComponent } from './components/role/creaeditarole/creaeditarole.component';
import { ExpcertificateComponent } from './components/expcertificate/expcertificate.component';
import { CreaeditaexpcertificateComponent } from './components/expcertificate/creaeditaexpcertificate/creaeditaexpcertificate.component';
import { SaleComponent } from './components/sale/sale.component';
import { CreaeditasaleComponent } from './components/sale/creaeditasale/creaeditasale.component';
import { CommentComponent } from './components/comment/comment.component';
import { CreaeditacommentComponent } from './components/comment/creaeditacomment/creaeditacomment.component';
import { SpRecipeComponent } from './components/sp-recipe/sp-recipe.component';
import { CreaeditaspRecipeComponent } from './components/sp-recipe/creaeditasp-recipe/creaeditasp-recipe.component';

export const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent,
    children: [
      {
        path: 'registrar',
        component: CreaeditaProductComponent,
      },
    ],
  },
  {
    path: 'optionpay',
    component: OptionpayComponent,
    children: [
      {
        path: 'registrar',
        component: CreaeditaoptionpayComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaoptionpayComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'registrar',
        component: CreaeditauserComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditauserComponent,
      },
    ],
  },
  {
    path: 'role',
    component: RoleComponent,
    children: [
      {
        path: 'registrar',
        component: CreaeditaroleComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaroleComponent,
      },
    ],
  },
  {
    path: 'expcertificate',
    component: ExpcertificateComponent,
    children: [
      {
        path: 'registrar',
        component: CreaeditaexpcertificateComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaexpcertificateComponent,
      },
    ],
  },
  {
    path: 'sale',
    component: SaleComponent,
    children: [
      {
        path: 'registrar',
        component: CreaeditasaleComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditasaleComponent,
      },
    ],
  },
  {
    path: 'sp-recipe',
    component: SpRecipeComponent,
    children: [
      {
        path: 'registrar',
        component: CreaeditaspRecipeComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaspRecipeComponent,
      },
    ],
  },
  {
    path: 'comment',
    component: CommentComponent,
    children: [
      {
        path: 'registrar',
        component: CreaeditacommentComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditacommentComponent,
      },
    ],
  },
];
