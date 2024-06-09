
import { Routes } from '@angular/router';
import { CreaeditaProductComponent } from './components/product/creaedita-product/creaedita-product.component';
import { ProductComponent } from './components/product/product.component';
import { CreaeditaoptionpayComponent } from './components/optionpay/creaeditaoptionpay/creaeditaoptionpay.component';
import { OptionpayComponent } from './components/optionpay/optionpay.component';

export const routes: Routes = [
    {
        path:'product',component:ProductComponent,
        children:[
            {
                path:'registrar',component:CreaeditaProductComponent
            }
        ]
    },
    {
        path:'optionpay',component:OptionpayComponent,
        children:[
            {
                path:'registrar',component:CreaeditaoptionpayComponent
            }
        ]
    }
];