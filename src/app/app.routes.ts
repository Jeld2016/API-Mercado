import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductPublishedComponent } from './product-published/product-published.component';
import { ProductComponent } from './product/product.component';
import { MultiproductosComponent } from './multiproductos/multiproductos.component';

export const routes: Routes = [
    { path: '', component: ListProductComponent },
    { path: 'Publicados', component: ProductPublishedComponent },
    { path: 'Multiproductos', component: MultiproductosComponent },
    { path: 'Producto', component: ProductComponent },
];

