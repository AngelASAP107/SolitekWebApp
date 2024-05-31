export interface Ticket {
  cliente: number;
  equipo: number;
  tecnico: number;
  fechaIngreso: Date;
  estado: string;
  prioridad: string;
  tipoServicio: string;
}
