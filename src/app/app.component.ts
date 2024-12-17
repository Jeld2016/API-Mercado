import { Component, OnInit } from '@angular/core';
import { appService } from './services/app.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TerminalService } from 'primeng/terminal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService,TerminalService] 
})
export class AppComponent implements OnInit{
  sesion =false;
  title = 'task-administrator-client';
  displayTerminal: boolean = false;;
  displayFinder: boolean = false;
  displayGalleria: boolean  = false;;
  dockItems: MenuItem[] | undefined;
  menubarItems: any[] | undefined;
  responsiveOptions: any[] | undefined
  images: any[] | undefined;
  nodes: any[] | undefined;
  subscription: Subscription | undefined;
  constructor(
    private app_service: appService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dockItems = [
      {
          label: 'Finder',
          tooltipOptions: {
              tooltipLabel: 'Finder',
              tooltipPosition: 'top',
              positionTop: -15,
              positionLeft: 15,
              showDelay: 1000
          },
          icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg',
          command: () => {
              this.router.navigate(['']);
              // this.displayFinder = true;
          }
      },
      {
          label: 'Terminal',
          tooltipOptions: {
              tooltipLabel: 'Terminal',
              tooltipPosition: 'top',
              positionTop: -15,
              positionLeft: 15,
              showDelay: 1000
          },
          icon: 'https://primefaces.org/cdn/primeng/images/dock/terminal.svg',
          command: () => {
              this.router.navigate(['Publicados']);
              // this.displayTerminal = true;
          }
      },
      {
          label: 'App Store',
          tooltipOptions: {
              tooltipLabel: 'App Store',
              tooltipPosition: 'top',
              positionTop: -15,
              positionLeft: 15,
              showDelay: 1000
          },
          icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg',
          command: () => {
            this.router.navigate(['Producto']);
          }
      },
      {
          label: 'Safari',
          tooltipOptions: {
              tooltipLabel: 'Safari',
              tooltipPosition: 'top',
              positionTop: -15,
              positionLeft: 15,
              showDelay: 1000
          },
          icon: 'https://primefaces.org/cdn/primeng/images/dock/safari.svg',
          command: () => {
            this.router.navigate(['Multiproductos']);
          }
      },
      {
          label: 'Photos',
          tooltipOptions: {
              tooltipLabel: 'Photos',
              tooltipPosition: 'top',
              positionTop: -15,
              positionLeft: 15,
              showDelay: 1000
          },
          icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg',
          command: () => {
              this.displayGalleria = true;
          }
      },
      {
          label: 'GitHub',
          tooltipOptions: {
              tooltipLabel: 'GitHub',
              tooltipPosition: 'top',
              positionTop: -15,
              positionLeft: 15,
              showDelay: 1000
          },
          icon: 'https://primefaces.org/cdn/primeng/images/dock/github.svg'
      },
      {
          label: 'Trash',
          tooltipOptions: {
              tooltipLabel: 'Trash',
              tooltipPosition: 'top',
              positionTop: -15,
              positionLeft: 15,
              showDelay: 1000
          },
          icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
          command: () => {
            this.app_service.cerrarSesion();
            location.reload();
          }
      }
  ];

  this.menubarItems = [
      {
          label: 'Finder',
          styleClass: 'menubar-root'
      },
      {
          label: 'File',
          items: [
              {
                  label: 'New',
                  icon: 'pi pi-fw pi-plus',
                  items: [
                      {
                          label: 'Bookmark',
                          icon: 'pi pi-fw pi-bookmark'
                      },
                      {
                          label: 'Video',
                          icon: 'pi pi-fw pi-video'
                      }
                  ]
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-trash'
              },
              {
                  separator: true
              },
              {
                  label: 'Export',
                  icon: 'pi pi-fw pi-external-link'
              }
          ]
      },
      {
          label: 'Edit',
          items: [
              {
                  label: 'Left',
                  icon: 'pi pi-fw pi-align-left'
              },
              {
                  label: 'Right',
                  icon: 'pi pi-fw pi-align-right'
              },
              {
                  label: 'Center',
                  icon: 'pi pi-fw pi-align-center'
              },
              {
                  label: 'Justify',
                  icon: 'pi pi-fw pi-align-justify'
              }
          ]
      },
      {
          label: 'Users',
          items: [
              {
                  label: 'New',
                  icon: 'pi pi-fw pi-user-plus'
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-user-minus'
              },
              {
                  label: 'Search',
                  icon: 'pi pi-fw pi-users',
                  items: [
                      {
                          label: 'Filter',
                          icon: 'pi pi-fw pi-filter',
                          items: [
                              {
                                  label: 'Print',
                                  icon: 'pi pi-fw pi-print'
                              }
                          ]
                      },
                      {
                          icon: 'pi pi-fw pi-bars',
                          label: 'List'
                      }
                  ]
              }
          ]
      },
      {
          label: 'Events',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                      {
                          label: 'Save',
                          icon: 'pi pi-fw pi-calendar-plus'
                      },
                      {
                          label: 'Delete',
                          icon: 'pi pi-fw pi-calendar-minus'
                      }
                  ]
              },
              {
                  label: 'Archieve',
                  icon: 'pi pi-fw pi-calendar-times',
                  items: [
                      {
                          label: 'Remove',
                          icon: 'pi pi-fw pi-calendar-minus'
                      }
                  ]
              }
          ]
      },
      {
          label: 'Quit'
      }
  ];

  this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

    this.sesion = this.app_service.checkExpired();
  }
  commandHandler(text: any) {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
        case 'date':
            response = 'Today is ' + new Date().toDateString();
            break;

        case 'greet':
            response = 'Hola ' + text.substring(argsIndex + 1) + '!';
            break;

        case 'random':
            response = Math.floor(Math.random() * 100);
            break;

        default:
            response = 'Unknown command: ' + command;
            break;
    }

    if (response) {
    }
}

ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
}
}
