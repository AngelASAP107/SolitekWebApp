export class Ticket {
    ticket_id!: number;
    titulo!: string;
    descripcion!: string;
    fecha_creacion!: Date;
    estado!: 'pendiente' | 'activo' | 'terminado' | 'cancelado';
    prioridad!: 'baja' | 'media' | 'alta';
    categoria!: string;
    cliente_id!: number;
    tecnico_id!: number;
    equipo_id!: number;
  }
  