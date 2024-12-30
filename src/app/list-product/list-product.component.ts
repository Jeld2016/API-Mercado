import { Component, OnInit } from '@angular/core';
import { appService } from '../services/app.service';
import { Producto } from '../models/models.interface';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{

  Tienda:string = '1737844049';
  scroll_id:string = '';
  public product!: Producto;
  sourceProducts: Producto[] = [];
  updateProducts: Producto[] = [];
  updateInProducts: Producto[] = [];
  correctos:number = 0;
  incorrectos:number = 0;
  rango_precios : any[] = [];

  constructor(private app_service: appService){}

  ngOnInit(): void {
    const tiendaExiste = this.app_service.obtenerTienda();
     if(tiendaExiste){
      this.Tienda = tiendaExiste;
     }
    this.app_service.precios().subscribe({
      next: value =>{
        this.rango_precios = value;
        console.log(this.rango_precios)
      },
    })
  }

  public searchProduct(){
    this.app_service.searchProductsBD().subscribe({
      next:value =>{
        console.log(value)
        for(let i = 0; i < value.length; i++){
          const item: Producto = {ID_product:value[i].ID_product,title: value[i].titulo, image: value[i].imagen, sku: value[i].SKU,category_id: value[i].categoria, availability: value[i].disponibilidad, price: value[i].precio, vendor: '', description:''};
          this.sourceProducts = [ ...this.sourceProducts, item ];

        }

      },
    })
  }

  public compareProduct(){
    for(let i = 0; i < this.sourceProducts.length ; i++)
    {
      this.app_service.updateProduct(this.sourceProducts[i]).subscribe({
        next:value =>{
          console.log(value)
          // let changeProducts = this.updateProducts;
          for(let i = 0; i < this.rango_precios.length; i++){
            
            if(this.rango_precios[i].p_minimo <= value.price && this.rango_precios[i].p_maximo >= value.price){
              value.price = value.price * this.rango_precios[i].multiplicador
            }
          }
          value.price = value.price *18
          if(value.availability){
            this.updateProducts = [ ...this.updateProducts, value ];
            this.correctos ++;
          }
          else{
            this.incorrectos ++;
            this.updateInProducts = [ ...this.updateInProducts, value ];
          }
          // changeProducts.push(value);
          // this.updateProducts = changeProducts;
          

        },
        error(err) {
          console.log(err)
        },
      })
    }
   
  }

  public pausarPubli(){
    for(let i = 0; i < this.updateInProducts.length ; i++)
      {
        this.app_service.pauseProduct(this.updateInProducts[i].ID_product!).subscribe({
          next:value =>{
        
          },
        })
      }
  }

}
