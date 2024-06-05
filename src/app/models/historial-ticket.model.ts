export interface DescripcionTicket {
    descripcion_id: number;
    mensaje: string;
    fecha_notificacion: Date;
  }
  
  export interface HistorialTicket {
    historial_id: number;
    ticket_id: number;
    descripcion_id: number;
    DescripcionTicket: DescripcionTicket;
  }
  