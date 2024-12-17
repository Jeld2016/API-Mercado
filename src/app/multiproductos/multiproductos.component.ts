import { Component } from '@angular/core';
import { TranslateService } from '../translate.service';
import { Producto } from '../product/productos.interface';
import { productService } from '../product/producto.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-multiproductos',
  templateUrl: './multiproductos.component.html',
  styleUrl: './multiproductos.component.css'
})
export class MultiproductosComponent {
  aUrl = 'https://api.openai.com/v1/chat/completions';
  apiKey = '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';
  ASIN:string = '';
  ASINS: any;
  categoria:string = '';
  finPublicaciones: boolean = false;
  contadorExitos:number = 0;
  codigoCategoria:string = '';
  atributosCategoria: string = '';
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
buscar_categoria: boolean = false;

public product!: Producto;

  constructor(private app_service: productService, private translateService: TranslateService,
    private messageService: MessageService,private http: HttpClient
  ){}

  public async masiveSearch(asin: string, prime: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
        this.app_service.search(asin).subscribe({
            next: value => {
                if (value) {
                    this.creaPublicacion(value, prime);
                    resolve();
                } else {
                    resolve(); // Continúa si no hay valor
                }
            },
            error: err => {
                console.error('Error during search', err);
                reject(err); // Rechaza en caso de error
            }
        });
    });
}
  
public async multiSearch(): Promise<void> {
  this.contadorExitos = 0;
  this.finPublicaciones = false;
  this.Publicaciones = [];
  
  try {
    const response = await this.app_service.obtenerProductos(this.Link).toPromise();
    this.ASINS = response;
    console.log(this.ASINS);

    const promises = this.ASINS.asins.map((element: { asin: string, prime: boolean }) => 
      this.masiveSearch(element.asin, element.prime)  // Pasa el valor de 'prime' a masiveSearch
    );
    await Promise.all(promises);
    
    const publicacionesClonadas = [...this.Publicaciones];
    
    for (const producto of publicacionesClonadas) {
      const textoAnalizar = `${producto.vendor} ${producto.title} ${producto.description}`;
      this.app_service.palabraProhibida(textoAnalizar).subscribe({
        next: (value: { prohibida: boolean }) => {
          if (value.prohibida) {
            console.log(`Palabra prohibida detectada en el producto: ${producto.title}`);
            const index = this.Publicaciones.indexOf(producto);
            if (index > -1) {
              this.Publicaciones.splice(index, 1);
            }
          } else {
            console.log(`Producto permitido: ${producto.title}`);
          }
        },
        error: err => {
          console.error(`Error al verificar palabras prohibidas para el producto: ${producto.title}`, err);
        },
        complete: () => {
          console.log(`Verificación de palabras prohibidas completada para el producto: ${producto.title}`);
        }
      });
    }
  } catch (error) {
    console.error('Error en multiSearch:', error);
  }
}

public async buscarCategoria() {
  console.log(this.categoria);
  this.app_service.predictor(this.categoria).subscribe({
    next: (value) => {
      let codigo = value;
      let str = Object.values(codigo).join('');
      this.codigoCategoria = str;
      console.log("Categoría asignada:", this.codigoCategoria);

      // Llamada para obtener el nombre de la categoría
      this.app_service.obtenercategoriaName(this.codigoCategoria).subscribe({
        next: (nombreCategoria) => {
          console.log(nombreCategoria);
          this.messageService.add({ 
            severity: 'info', 
            summary: `Nombre de categoría: ${nombreCategoria}`, 
          });
        },
        error: (err) => {
          console.error("Error al obtener el nombre de la categoría:", err);
        }
      });

      this.app_service.obtenerAtributos(this.codigoCategoria).subscribe({
        next: value => {
          this.atributosCategoria = value;
          this.buscar_categoria = true;
          console.log("Atributos:", this.atributosCategoria);
        }
      });
    },
    error: (err) => {
      console.error("Error en la predicción de la categoría:", err);
      return false;
    }
  });
}

  public async creaPublicacion(producto: Producto, prime: boolean) {
    const rango1 = 5;
    const rango2 = 12;
    const rango3 = 30;
    const rango4 = 50;
    const rango5 = 100000;
    const tipoDeCambio = 18;

    try {
        // Verificamos si el producto tiene los parámetros esenciales
        if (!producto || !producto.price || !producto.title || !producto.description) {
            this.publicarBoton = false;
            throw new Error('El producto tiene parámetros faltantes o inválidos.');
        }

        producto.prime = prime;
        let precio = producto.price;
        let traduccionTitle: string = '';
        let traduccionDesc: string = '';

        try {
            console.log(producto.title);
            this.translateWithOpenAI(producto.title, 'español').then((traduccionTitle) => {
                this.translateWithOpenAI(producto.description, 'español').then((traduccionDesc) => {
                    producto.title = traduccionTitle;
                    producto.description = traduccionDesc;

                    // Manejo de los días de disponibilidad basados en si es Prime
                    if (producto.prime) {
                        producto.diasDisponibilidad = 8;
                    } else {
                        producto.diasDisponibilidad = 15;
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
                        precio += precio * 2;
                        console.log("rango6", precio);
                    }

                    let resultado: number = precio * tipoDeCambio * 1.16 * 1.07;
                    resultado = parseFloat(resultado.toFixed(2));
                    producto.price = resultado;
                    producto.category = this.codigoCategoria;
                    producto.atributos = this.atributosCategoria;
                    console.log("producto", producto);
                    this.publicarBoton = true;
                    this.Publicaciones = [...this.Publicaciones, producto];
                });
            });
        } catch (error) {
            console.error("Error en la traducción:", error);
            // Podemos continuar con los datos originales si la traducción falla
            traduccionTitle = producto.title;
            traduccionDesc = producto.description;
        }

        return true;
    } catch (error) {
        console.error("Error al crear la publicación:", error);
        return false;
    }
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

public publicar() {

  for (let i = 0; i < this.Publicaciones.length; i++) {
    this.app_service.publicarProducto(this.Publicaciones[i]).subscribe({
      next: value => {
        this.contadorExitos++; 
      },
      error: err => {
        console.error(`Error al publicar el producto`, err);
      },
      complete: () => {
          this.finPublicaciones = true
      }
    });
  }
}

public translateWithOpenAI(text: string, targetLanguage: string): Promise<string> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.apiKey}`,
  });

  const body = {
    model: 'gpt-3.5-turbo', // Puedes usar gpt-4 si es necesario
    messages: [
      {
        role: 'system',
        content: 'Eres un traductor experto. Traduce el texto al idioma deseado.',
      },
      {
        role: 'user',
        content: `Traduce el siguiente texto al ${targetLanguage}: "${text}"`,
      },
    ],
  };

  return new Promise((resolve, reject) => {
    this.http.post<any>(this.aUrl, body, { headers }).subscribe(
      (response) => {
        const translatedText = response.choices[0].message.content.trim();
        resolve(translatedText);
      },
      (error) => {
        console.error('Error al traducir:', error);
        reject(error);
      }
    );
  });
}


/*private async traducirTexto(titulo: string): Promise<string> {
  try {
    const value = await this.translateService.traducirFrase(titulo, 'es');
    console.log("data.translatedText",value )
    return value;
  } catch (error) {
    console.error(error);
    return ''; // Retorna un string vacío en caso de error
  }
}*/

resizeImages(imageUrls: string[], width: number, height: number): Promise<string[]> {
  const resizedImages: string[] = [];

  return Promise.all(
    imageUrls.map((imageUrl) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = imageUrl;
        img.crossOrigin = "anonymous"; // Evita problemas de CORS si la imagen es de otro dominio

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resizedImages.push(canvas.toDataURL("image/jpeg")); // Cambia a otro formato si es necesario
          }
          resolve();
        };

        img.onerror = () => resolve(); // Manejo de errores en caso de que la imagen no se cargue
      })
    )
  ).then(() => resizedImages);
}

}
