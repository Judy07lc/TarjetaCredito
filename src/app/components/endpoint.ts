// endpoint.ts
export interface TarjetaCreditoComponentDM {
    [x: string]: any;
    id: string;
    name: string;
    numberTarget: number;
    expiration: string;
    cvv: number;
    buttonEdit: boolean;
    buttonDelete: boolean;
  }
  
  export function editarTarjeta(
    listaTarjetas: TarjetaCreditoComponentDM[], 
    tarjeta: TarjetaCreditoComponentDM
  ): TarjetaCreditoComponentDM[] {
    const nuevaLista = [...listaTarjetas]; 
    const index = nuevaLista.findIndex(t => t.id === tarjeta.id);
    if (index !== -1) {
      nuevaLista[index] = {...tarjeta};
    }
    console.log('Editando tarjeta:', tarjeta);
    return nuevaLista; 
  }
  
  export function eliminarTarjeta(
    listaTarjetas: TarjetaCreditoComponentDM[], 
    id: string
  ): TarjetaCreditoComponentDM[] {
    return listaTarjetas.filter(tarjeta => tarjeta.id !== id);
  }

  export function agregarTarjeta(
    tarjeta: TarjetaCreditoComponentDM,
    id: string
  ): TarjetaCreditoComponentDM{
    return tarjeta;
  }