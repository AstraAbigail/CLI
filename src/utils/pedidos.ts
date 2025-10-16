import crypto from  "node:crypto"

let pedidosServicio = [
  {
    id: crypto.randomUUID(),
    cliente: "MariaGonzalez",
    dniCliente: 29856324,    
    direccion: "SanMartin1234",    
    tecnicoAsignado: "Camila",
    fechaProgramada: "2025-09-25",
    estado: "pendiente"
  },
  {
    id: crypto.randomUUID(),
    cliente: "JorgeFernandez",
    dniCliente: 35412890,    
    direccion: "CalleLasHeras450Mendoza",    
    tecnicoAsignado: "Diego",
    fechaProgramada: "2025-09-22",
    estado: "progreso"
  },
  {
    id: crypto.randomUUID(),
    cliente: "LuciaMartinez",
    dniCliente: 41235788,    
    direccion: "Belgrano2500Rosario",    
    tecnicoAsignado: "Hugo",
    fechaProgramada: "2025-09-15",
    estado: "completado"
  },
  {
    id: crypto.randomUUID(),
    cliente: "CarlosRuiz",
    dniCliente: 38765412,    
    direccion: "AvMitre789BuenosAires",
    tecnicoAsignado: "Diego",
    fechaProgramada: "2025-09-07",
    estado: "completado"
  },
  {
    id: crypto.randomUUID(),
    cliente: "PaulaDiaz",
    dniCliente: 36541289,    
    direccion: "Ruta9Km32Pilar",    
    tecnicoAsignado: "Diego",
    fechaProgramada: "2025-09-28",
    estado: "pendiente"
  },
  {
    id: crypto.randomUUID(),
    cliente: "FedericoLopez",
    dniCliente: 40125877,    
    direccion: "Italia345MardelPlata",    
    tecnicoAsignado: "Hugo",
    fechaProgramada: "2025-09-21",
    estado: "progreso"
  },
  {
    id: crypto.randomUUID(),
    cliente: "SofiaCastro",
    dniCliente: 43326781,    
    direccion: "Rivadavia980SanJuan",    
    tecnicoAsignado: "Camila",
    fechaProgramada: "2025-09-14",
    estado: "completado"
  },
  {
    id: crypto.randomUUID(),
    cliente: "NicolasPerez",
    dniCliente: 37890124,    
    direccion: "Lavalle305Salta",    
    tecnicoAsignado: "Diego",
    fechaProgramada: "2025-09-29",
    estado: "pendiente"
  },
  {
    id: crypto.randomUUID(),
    cliente: "ValentinaOrtiz",
    dniCliente: 39256780,    
    direccion: "Catamarca560Tucuman",    
    tecnicoAsignado: "Hugo",
    fechaProgramada: "2025-09-17",
    estado: "completado"
  },
  {
    id: crypto.randomUUID(),
    cliente: "AndresSilva",
    dniCliente: 38547612, 
    direccion: "Sarmiento220Neuquen",   
    tecnicoAsignado: "Camila",
    fechaProgramada: "2025-09-28",
    estado: "pendiente"
  }
];


export {pedidosServicio}