import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { appService } from '../services/app.service';
import moment from 'moment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService] 
})
export class LoginComponent {
  Tienda:string = 'RICHHOUSESTORE';


  constructor(
    private messageService: MessageService,
    private app_service: appService
  ) {}

  Iniciar(){
    this.app_service.Iniciar(this.Tienda).subscribe({
      next : value =>{
        if(value.message){
          const ahora = moment()
          sessionStorage.setItem('key', JSON.stringify({exp: ahora.add(15,'minutes')}));
          this.messageService.add({ severity: 'success', summary: 'Incio Exitoso', detail: 'Iniciado correctamente' });
          setTimeout(() => {
            location.reload();
          }, 300);
        }
      },
    })
  }

}
