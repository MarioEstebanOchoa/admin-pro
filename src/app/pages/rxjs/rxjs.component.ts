import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;


  constructor() {

    this.subscription = this.regresaOberevable().subscribe(
      numero => console.log('Subs: ', numero),
      error => console.error('Error en el observador', error),
      () => console.log('El observador termino')
    )

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {

    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();

  }


  regresaOberevable(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;



      let intervalo = setInterval(() => {

        contador++;

        let salida = {
          valor: contador
        }

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

      }, 1000);

    }).pipe(

      map(resp => resp.valor),
      filter((valor, index) => {
        if ((valor % 2) === 1) {
          //impar 
          return true;
        } else {
          //par
          return false;
        }
      })
    );
  }


}
