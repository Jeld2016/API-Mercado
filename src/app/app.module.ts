import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DockModule } from 'primeng/dock';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { GalleriaModule } from 'primeng/galleria';
import { routes } from './app.routes';
import { TerminalModule } from 'primeng/terminal';
import { MessagesModule } from 'primeng/messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { PickListModule } from 'primeng/picklist';
import { ListProductComponent } from './list-product/list-product.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ProductPublishedComponent } from './product-published/product-published.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { MultiproductosComponent } from './multiproductos/multiproductos.component';


@NgModule({
  imports:      [ BrowserModule,
                  RouterOutlet,
                  DockModule,
                  RadioButtonModule,
                  MenubarModule,
                  DialogModule,
                  ToastModule,
                  TreeModule,
                  GalleriaModule,
                  TerminalModule,
                  MessagesModule,
                  BrowserAnimationsModule,
                  FormsModule,
                  ButtonModule,
                  InputTextModule,
                  HttpClientModule,
                  PickListModule,
                  TableModule,
                  CardModule,
                  RouterModule.forRoot(routes),
                 ],
  declarations: [ AppComponent,
                  DashboardComponent,
                  ProductComponent,
                  ListProductComponent,
                  ProductPublishedComponent,
                  LoginComponent,
                  MultiproductosComponent
                 ],
  bootstrap:    [ AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
})
export class AppModule { }