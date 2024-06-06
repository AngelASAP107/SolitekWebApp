export interface Usuario {
  nombre: string;
}

export interface Equipo {
  especificaciones: string;
  estado_equipo: string;
  servicio: string;
  observaciones: string;
}

export interface Ticket {
  ticket_id?: number;
  cliente: number;
  equipo: Equipo;
  tecnico: Usuario; // Asegúrate de que tecnico es de tipo Usuario
  fechaIngreso: Date;
  estado: string;
  prioridad: string;
  tipoServicio: string;
}
