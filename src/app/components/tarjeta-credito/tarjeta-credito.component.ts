import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { TarjetaCreditoComponentDM, editarTarjeta, eliminarTarjeta } from "../endpoint";  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({   
  selector: 'app-tarjeta-credito',   
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],   
  templateUrl: './tarjeta-credito.component.html',   
  styleUrl: './tarjeta-credito.component.css' 
})  
export class TarjetaCreditoComponent implements OnInit {
    
  listTarjetas: TarjetaCreditoComponentDM[] = [];
  form: FormGroup;
  tarjetaSeleccionada?: TarjetaCreditoComponentDM;
  
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      numberTarget: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expiration: ['', [Validators.required,Validators.maxLength(5), Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  ngOnInit(): void {
    this.listTarjetas = [
      {
        id: '1',
        name: 'Juan Pérez',
        numberTarget: 4242424242424242,
        expiration: '12/25',
        cvv: 123,
        buttonEdit: true,
        buttonDelete: true
      },
      {
        id: '2',
        name: 'María García',
        numberTarget: 5555555555554444,
        expiration: '03/26',
        cvv: 456,
        buttonEdit: true,
        buttonDelete: true
      }
    ];
  }

  agregarTarjeta(tarjeta: TarjetaCreditoComponentDM): void {
    console.log(this.form)
    console.log('Componente hijo recibió:', tarjeta);
    
    this.listTarjetas = [...this.listTarjetas, tarjeta];    
    alert("Tarjeta agregada con éxito");
  }
  
  onEliminar(id: string): void {
    this.listTarjetas = this.listTarjetas.filter(tarjeta => tarjeta.id !== id);
    this.form.reset();
    eliminarTarjeta(this.listTarjetas, id);
  }

  onEditar(tarjeta: TarjetaCreditoComponentDM): void {
    this.tarjetaSeleccionada = tarjeta;
    
    this.form.patchValue({
      name: tarjeta.name,
      numberTarget: tarjeta.numberTarget,
      expiration: tarjeta.expiration,
      cvv: tarjeta.cvv
    });
    editarTarjeta(this.listTarjetas,tarjeta);
  }
  
  actualizarTarjeta(): void {
    if (!this.tarjetaSeleccionada) return;
    
    const tarjetaActualizada: TarjetaCreditoComponentDM = {
      ...this.tarjetaSeleccionada,
      name: this.form.value.name,
      numberTarget: Number(this.form.value.numberTarget),
      expiration: this.form.value.expiration,
      cvv: Number(this.form.value.cvv)
    };
    
    const index = this.listTarjetas.findIndex(t => t.id === this.tarjetaSeleccionada!.id);
    if (index !== -1) {
      this.listTarjetas[index] = tarjetaActualizada;
      this.listTarjetas = [...this.listTarjetas]; 
    }
    
    this.tarjetaSeleccionada = undefined;
    this.form.reset();
  }

  getTarjetasList(): TarjetaCreditoComponentDM[] {
    return this.listTarjetas;
  }
}