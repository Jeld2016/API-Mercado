import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Producto, Resultado } from "../models/models.interface";
import { Observable } from "rxjs";
import { json } from "express";

@Injectable({
    providedIn: 'root'
})
export class appService {
    private base_url = 'http://shareproduct.shop/';
    private url = "https://api.mercadolibre.com"
    private ACCESS_TOKEN = 'APP_USR-5074710933028386-071314-e402fe11ab48cef897f82b18187b8be5-1737844049';
    constructor(private httpClient: HttpClient){}


      headers = {
        'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }

    checkExpired():boolean{
        let exp = sessionStorage.getItem('key');
        console.log(exp)
        if(exp)
          // if (new Date(exp) > new Date())
            return true;
          else
          return false;
          
          return false;
    }

    cerrarSesion(){
      sessionStorage.removeItem('key');
  }

  public obtenerTienda():string| null{
      return sessionStorage.getItem('key');
  }

  public establecerTienda(Tienda: string){
    sessionStorage.setItem('key',Tienda);
  }

    public Iniciar(Tienda: string):Observable<any>{
      return this.httpClient.get<any>(`${this.base_url}iniciar/${Tienda}`)
    }

    public precios():Observable<any[]>{
      return this.httpClient.get<any[]>(`${this.base_url}api/get_precios`)
    }

    public search(ASIN: string):Observable<Producto>{
        return this.httpClient.get<Producto>(`${this.base_url}consulta/${ASIN}`)
    }

    public searchProductsByVendor(USER_ID: string):Observable<Resultado>{
      return this.httpClient.get<Resultado>(`${this.base_url}lista/${USER_ID}`)
  }

  public pauseProduct(ID: string):Observable<any>{
    return this.httpClient.get<any>(`${this.base_url}producto/${ID}`)
}

    public searchProductsByVendorScroll(USER_ID: string, scroll: string):Observable<Resultado>{
        return this.httpClient.get<Resultado>(`${this.base_url}lista/${USER_ID}/${scroll}`)
    }

    public searchProductsBD():Observable<any[]>{
      return this.httpClient.get<any[]>(`${this.base_url}api/get_product`)
  }

    public updateProduct(productos: Producto):Observable<Producto>{
      return this.httpClient.post<Producto>(`${this.base_url}actualiza_producto`,productos)
  }

  public addProducts(productos: any):Observable<Producto[]>{
    return this.httpClient.post<Producto[]>(`${this.base_url}api/product`,productos)
}
}