import crypto from  "node:crypto"

let pedidosServicio = [
  {
    id: crypto.randomUUID(),
    cliente: "MariaGonzalez",
    dniCliente: 29856324,
    telefonoCliente: 1152347865,
    direccion: "SanMartin1234",
    fechaSolicitud: "2025-09-20",
    tipoServicio: "Instalacion",
    tecnicoAsignado: "CamilaR",
    fechaProgramada: "2025-09-25",
    estado: "pendiente"
  },
  {
    id: crypto.randomUUID(),
    cliente: "JorgeFernandez",
    dniCliente: 35412890,
    telefonoCliente: 2614521198,
    direccion: "CalleLasHeras450Mendoza",
    fechaSolicitud: "2025-09-18",
    tipoServicio: "Reparacion",
    tecnicoAsignado: "DiegoHerrera",
    fechaProgramada: "2025-09-22",
    estado: "enprogreso"
  },
  {
    id: crypto.randomUUID(),
    cliente: "LuciaMartinez",
    dniCliente: 41235788,
    telefonoCliente: 3416679341,
    direccion: "Belgrano2500Rosario",
    fechaSolicitud: "2025-09-10",
    tipoServicio: "Mantenimiento",
    tecnicoAsignado: "HugoLopez",
    fechaProgramada: "2025-09-15",
    estado: "completado"
  },
  {
    id: crypto.randomUUID(),
    cliente: "CarlosRuiz",
    dniCliente: 38765412,
    telefonoCliente: 1143217760,
    direccion: "AvMitre789BuenosAires",
    fechaSolicitud: "2025-09-05",
    tipoServicio: "Reparacion",
    tecnicoAsignado: "CamilaRodriguez",
    fechaProgramada: "2025-09-07",
    estado: "completado"
  },
  {
    id: crypto.randomUUID(),
    cliente: "PaulaDiaz",
    dniCliente: 36541289,
    telefonoCliente: 2304559901,
    direccion: "Ruta9Km32Pilar",
    fechaSolicitud: "2025-09-23",
    tipoServicio: "Instalacion",
    tecnicoAsignado: "DiegoHerrera",
    fechaProgramada: "2025-09-28",
    estado: "pendiente"
  },
  {
    id: crypto.randomUUID(),
    cliente: "FedericoLopez",
    dniCliente: 40125877,
    telefonoCliente: 2234572214,
    direccion: "Italia345MardelPlata",
    fechaSolicitud: "2025-09-19",
    tipoServicio: "Mantenimiento",
    tecnicoAsignado: "HugoLopez",
    fechaProgramada: "2025-09-21",
    estado: "enprogreso"
  },
  {
    id: crypto.randomUUID(),
    cliente: "SofiaCastro",
    dniCliente: 43326781,
    telefonoCliente: 2644813392,
    direccion: "Rivadavia980SanJuan",
    fechaSolicitud: "2025-09-11",
    tipoServicio: "Reparacion",
    tecnicoAsignado: "CamilaRodriguez",
    fechaProgramada: "2025-09-14",
    estado: "completado"
  },
  {
    id: crypto.randomUUID(),
    cliente: "NicolasPerez",
    dniCliente: 37890124,
    telefonoCliente: 3876004501,
    direccion: "Lavalle305Salta",
    fechaSolicitud: "2025-09-24",
    tipoServicio: "Instalacion",
    tecnicoAsignado: "DiegoHerrera",
    fechaProgramada: "2025-09-29",
    estado: "pendiente"
  },
  {
    id: crypto.randomUUID(),
    cliente: "ValentinaOrtiz",
    dniCliente: 39256780,
    telefonoCliente: 3815592847,
    direccion: "Catamarca560Tucuman",
    fechaSolicitud: "2025-09-13",
    tipoServicio: "Mantenimiento",
    tecnicoAsignado: "HugoLopez",
    fechaProgramada: "2025-09-17",
    estado: "completado"
  },
  {
    id: crypto.randomUUID(),
    cliente: "AndresSilva",
    dniCliente: 38547612,
    telefonoCliente: 2994786002,
    direccion: "Sarmiento220Neuquen",
    fechaSolicitud: "2025-09-26",
    tipoServicio: "Reparacion",
    tecnicoAsignado: "CamilaRodriguez",
    fechaProgramada: "2025-09-28",
    estado: "pendiente"
  }
];


export {pedidosServicio}