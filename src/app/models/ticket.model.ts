export interface Equipo {
  especificaciones: string;
  estado_equipo: string;
  servicio: string;
  observaciones: string;
}

export interface Ticket {
  ticket_id?: number; 
  cliente: number;
  equipo: Equipo; // Aquí aseguramos que 'equipo' es de tipo 'Equipo'
  tecnico: number;
  fechaIngreso: Date;
  estado: string;
  prioridad: string;
  tipoServicio: string;
}
