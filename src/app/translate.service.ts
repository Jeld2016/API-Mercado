import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private apiKey = 'AIzaSyDAR9ZeT31Wk_mUG5K2GzfZV46UHBoER5k'; 
  private endpoint = 'https://translation.googleapis.com/language/translate/v2';

  constructor() { }

  async traducirFrase(texto: string, idiomaDestino: string): Promise<string> {
    try {
      const response = await axios.post(this.endpoint, null, {
        params: {
          q: texto,
          target: idiomaDestino,
          key: this.apiKey
        }
      });
      console.log(response.data.data.translations[0].translatedText);
      return response.data.data.translations[0].translatedText;

    } catch (error) {
      console.error('Error al traducir:', error);
      throw new Error('Error al traducir la frase.');
    }
  }
}
