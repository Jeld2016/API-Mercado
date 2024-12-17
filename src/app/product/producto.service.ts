import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Producto, masivo } from './productos.interface';
import { Observable } from "rxjs";
import { json } from "express";

@Injectable({
    providedIn: 'root'
})
export class productService {
    private base_url = 'http://localhost:3000/';
    private url = "https://api.mercadolibre.com"
    private ACCESS_TOKEN = 'APP_USR-5074710933028386-071314-e402fe11ab48cef897f82b18187b8be5-1737844049';
    constructor(private httpClient: HttpClient){}

      headers = {
        'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }

    public search(ASIN: string):Observable<Producto>{
        return this.httpClient.get<Producto>(`${this.base_url}consulta/${ASIN}`)
    }

    public predictor(titulo: string):Observable<string>{
      const encodedTitulo = encodeURIComponent(titulo);
      return this.httpClient.get<string>(`${this.base_url}predictor/${encodedTitulo}`);
    }

    public obtenerAtributos(categoria: string):Observable<string>{
      return this.httpClient.get<string>(`${this.base_url}atributos/${categoria}`)
    }

    public obtenercategoriaName(categoriaID: string):Observable<string>{
      return this.httpClient.get<string>(`${this.base_url}categoriaName/${categoriaID}`)
    }

    public publicarProducto(producto: Producto): Observable<Producto> {
      return this.httpClient.post<Producto>(`${this.base_url}publicarProducto`, producto);
    }

    public obtenerProductos(link: string): Observable<masivo[]> {
      console.log(link);
      return this.httpClient.post<masivo[]>(`${this.base_url}productos`, { link });
    }

    public palabraProhibida(palabras:string): Observable<{ prohibida: boolean }> {
      console.log(palabras);
      return this.httpClient.post<{ prohibida: boolean }>(`${this.base_url}palabrasProhibidas`, { palabras });
    }

    public searchProductsByVendor(USER_ID: string):Observable<any>{
        console.log(USER_ID)
        return this.httpClient.get<any>(`${this.base_url}lista/${USER_ID}`,{headers: this.headers})
    }
}