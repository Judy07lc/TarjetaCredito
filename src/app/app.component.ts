import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaCreditoComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TarjetaCredito';
}
