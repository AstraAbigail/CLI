interface IPedido {
  cliente: string;
  dniCliente: number,  
  direccion: string;  
  tecnicoAsignado: string;
  fechaProgramada: string;
  estado: string;
}

export default IPedido