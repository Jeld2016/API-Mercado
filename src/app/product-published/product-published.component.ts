import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/models.interface';
import { appService } from '../services/app.service';

@Component({
  selector: 'app-product-published',
  templateUrl: './product-published.component.html',
  styleUrl: './product-published.component.css'
})


export class ProductPublishedComponent implements OnInit{

  Tienda:string = '1737844049';
  scroll_id:string = '';
  sourceProducts: Producto[] = [];

  constructor(private app_service: appService){}


  ngOnInit(): void {
    const tiendaExiste = this.app_service.obtenerTienda();
     if(tiendaExiste){
      this.Tienda = tiendaExiste;
     }
  }

  public searchProduct(){
    console.log(this.Tienda)
    console.log(this.scroll_id)
    if(this.scroll_id == ''){
      this.app_service.searchProductsByVendor(this.Tienda).subscribe({
        next:value =>{
          console.log(value)
          this.sourceProducts = value.productos;
          this.scroll_id = value.scroll_id;
        },
      })
    }
    else{
      this.app_service.searchProductsByVendorScroll(this.Tienda, this.scroll_id).subscribe({
        next:value =>{
          console.log(value)
          this.sourceProducts = value.productos;      
          this.scroll_id = value.scroll_id;  
        },
      })
    }

}
  public addProducts(){
    console.log(this.Tienda)
    console.log(this.scroll_id)
      this.app_service.addProducts({product : this.sourceProducts}).subscribe({
        next:value =>{
          this.sourceProducts = value;
          console.log(value)
        },
        error: err => {
        },
      })
  }
}
