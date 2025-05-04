import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito.component';
import { CommonModule } from '@angular/common'; 
import { TarjetaCreditoComponentDM } from './components/endpoint';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaCreditoComponent, FontAwesomeModule, CommonModule, ReactiveFormsModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(TarjetaCreditoComponent) tarjetaComponent!: TarjetaCreditoComponent;
  
  title = 'TarjetaCredito';
  form: FormGroup;
  listTarjetas: TarjetaCreditoComponentDM[] = [
    {
      id: '1464654654645645',
      name: 'Juan Pérez',
      numberTarget: 4242424242424242,
      expiration: '12/25',
      cvv: 123,
      buttonEdit: true,
      buttonDelete: true
    },
    {
      id: '2616516515161651651165',
      name: 'María García',
      numberTarget: 5555555555554444,
      expiration: '03/26',
      cvv: 456,
      buttonEdit: true,
      buttonDelete: true
    }
  ];

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: [''],
      numberTarget: [''],
      expiration: [''],
      cvv: ['']
    });
  }
  ngAfterViewInit() {
    console.log('Componente hijo inicializado');
    
    setTimeout(() => {
      if (this.tarjetaComponent) {
        this.listTarjetas = this.tarjetaComponent.getTarjetasList();
      }
    });
  }

  getTarjetaFromForm(): TarjetaCreditoComponentDM {
    return {
      id: uuidv4(), 
      name: this.form.get('name')?.value,
      numberTarget: this.form.get('numberTarget')?.value,
      expiration: this.form.get('expiration')?.value,
      cvv: this.form.get('cvv')?.value,
      buttonEdit: true,
      buttonDelete: true
    };
  }

  agregarTarjeta(tarjeta: TarjetaCreditoComponentDM): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    console.log('Agregando tarjeta:', tarjeta);
    
    if (!this.tarjetaComponent) {
      console.error('El componente TarjetaCredito no está disponible.');
      return;
    }
    
    this.tarjetaComponent.agregarTarjeta(tarjeta);
    
    this.listTarjetas = this.tarjetaComponent.getTarjetasList();
    
    this.form.reset();
  }
  
  eliminarTarjeta(id: string): void {
    if (this.tarjetaComponent) {
      this.tarjetaComponent.onEliminar(id);
      this.listTarjetas = this.tarjetaComponent.getTarjetasList();
    }
  }
  
  editarTarjeta(tarjeta: TarjetaCreditoComponentDM): void {
    console.log('Editando tarjeta:', tarjeta);
    if (this.tarjetaComponent) {
      this.tarjetaComponent.onEditar(tarjeta);
    }
  }
}