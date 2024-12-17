import { Component } from '@angular/core';
import { Producto } from './productos.interface';
import { TranslateService } from '../translate.service';
import { productService } from './producto.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})

export class ProductComponent {
  
  ASIN:string = '';
  ASINS: any;
  Link:string = '';
  Tienda:string = '';
  productos: Producto[] = [];
  Publicaciones: Producto[] = [];
  publicarBoton: boolean = false;
  publicacion: Producto = {
    title: '',
    price: 0,
    category: '',
    sku: '',
    atributos: '',
    vendor: '',
    description: '',
    image: '',
    prime: false,
    availability: false,
    diasDisponibilidad: 0
}

  public product!: Producto;

  constructor(private app_service: productService, private translateService: TranslateService){}

  public search(){
    this.app_service.search(this.ASIN).subscribe({
      next: value =>{
        this.product = value;
        this.creaPublicacion(this.product);
        console.log(this.product)
      },
    })
  }

 

  limpiarPublicacion(){
    this.publicacion = {
      title: '',
      price: 0,
      category: '',
      sku: '',
      atributos: '',
      vendor: '',
      description: '',
      image: '',
      prime: false,
      availability: false,
      diasDisponibilidad: 0
  }
}

  public async creaPublicacion(producto : Producto){

    this.limpiarPublicacion();

    const rango1 = 5;
    const rango2 = 12;
    const rango3 = 30;
    const rango4 = 50;
    const rango5 = 100000;
    const tipoDeCambio = 18;

    try {
    // Verificamos si el producto tiene los parámetros esenciales
    if (!producto || !producto.price || !producto.title || !producto.description) {
      this.publicarBoton = false
      throw new Error('El producto tiene parámetros faltantes o inválidos.');
    }

    this.product.prime = producto.prime;
    let precio = producto.price;
    let palabras: string[] = [];
    let traduccionTitle: string = '';
    let traduccionDesc: string = '';
    let categoria: string = '';

    // Manejo de errores en la traducción del título
    try {
      traduccionTitle = await this.traducirTexto(producto.title);
      traduccionDesc = await this.traducirTexto(producto.description);
    } catch (error) {
      console.error("Error en la traducción:", error);
      // Podemos continuar con los datos originales si la traducción falla
      traduccionTitle = producto.title;
      traduccionDesc = producto.description;
    }

    console.log(traduccionTitle, traduccionDesc);
    this.product.title = traduccionTitle;
    this.product.description = traduccionDesc;

    palabras.push(traduccionTitle, traduccionDesc, producto.vendor);

    // Manejo de errores en la verificación de palabras prohibidas
    this.app_service.palabraProhibida(`${traduccionTitle} ${traduccionDesc} ${producto.vendor}`).subscribe({
      next: (value: { prohibida: boolean }) => {
        if (value.prohibida) {
          console.log("Palabra prohibida detectada", value);
          throw new Error('Palabra prohibida detectada. No se puede continuar.');
        } else {
          console.log("Palabra permitida", value);
        }
      },
      error: (err) => {
        console.error("Error al verificar palabra prohibida:", err);
      },
      complete: () => {
        console.log("Verificación de palabra prohibida completada.");
      }
    });

    // Manejo de los días de disponibilidad basados en si es Prime
    if (this.product.prime) {
      this.product.diasDisponibilidad = 8;
    } else {
      this.product.diasDisponibilidad = 15;
    }

    // Cálculo del precio con rangos
    if (precio <= rango1) {
      precio += precio * 3.55;
      console.log("rango1", precio);
    } else if (precio > rango1 && precio <= rango2) {
      precio += precio * 2.85;
      console.log("rango2", precio);
    } else if (precio > rango2 && precio <= rango3) {
      precio += precio * 1.45;
      console.log("rango3", precio);
    } else if (precio > rango3 && precio <= rango4) {
      precio += precio * 1.35;
      console.log("rango4", precio);
    } else if (precio > rango4 && precio <= rango5) {
      precio += precio * 1.2;
      console.log("rango5", precio);
    } else {
      precio += precio * 1.2;
      console.log("rango6", precio);
    }

    let resultado: number = precio * tipoDeCambio;
    resultado = parseFloat(resultado.toFixed(2));
    this.product.price = resultado;
    console.log("producto",this.product);
    this.publicarBoton = true;

    this.app_service.predictor(traduccionTitle).subscribe({
      next: (value) => {
        categoria = value;
        let str = Object.values(categoria).join('');
        this.product.category = str;
        console.log("Categoría asignada:", this.product.category);
      },
      error: (err) => {
        console.error("Error en la predicción de la categoría:", err);
        return false
      }
    });
    return true
  } catch (error) {
    console.error("Error al crear la publicación:", error);
    return false
  }
}

public publicar(product: Producto) {
  this.app_service.obtenerAtributos(product.category).subscribe({
    next: value => {
      product.atributos = value;
      console.log("atributos", product.atributos);
      
      // Solo se ejecuta después de obtener los atributos
      this.app_service.publicarProducto(product).subscribe({
        next: value => {
          console.log("hola");
        }
      });
    }
  });
}

  private async traducirTexto(titulo: string): Promise<string> {
    try {
      const value = await this.translateService.traducirFrase(titulo, 'es');
      return value;
    } catch (error) {
      console.error(error);
      return ''; // Retorna un string vacío en caso de error
    }
  }

  public searchProduct(){
    this.app_service.searchProductsByVendor(this.Tienda).subscribe({
      next: value =>{
        this.product = value;
        console.log(this.product)
      },
    })
  }

  
}