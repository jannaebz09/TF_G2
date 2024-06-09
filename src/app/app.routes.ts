import { Routes } from '@angular/router';
import { CreaeditaProductComponent } from './components/product/creaedita-product/creaedita-product.component';
import { ProductComponent } from './components/product/product.component';
import { CreaeditaoptionpayComponent } from './components/optionpay/creaeditaoptionpay/creaeditaoptionpay.component';
import { OptionpayComponent } from './components/optionpay/optionpay.component';
import { UserComponent } from './components/user/user.component';
import { CreaeditauserComponent } from './components/user/creaeditauser/creaeditauser.component';
import { RoleComponent } from './components/role/role.component';
import { CreaeditaroleComponent } from './components/role/creaeditarole/creaeditarole.component';

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
];
