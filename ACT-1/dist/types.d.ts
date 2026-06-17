export type Prioridad = 'baja' | 'media' | 'alta';
export type EstadoIncidente = 'abierto' | 'en progreso' | 'resuelto';
export interface DatosUsuario {
    nombre: string;
    apellido: string;
    edad: number;
    carne: string;
}
export interface Incidente {
    readonly id: string;
    usuario: DatosUsuario;
    titulo: string;
    descripcion: string;
    prioridad: Prioridad;
    estado: EstadoIncidente;
    fechaCreacion: Date;
}
export type NuevoIncidenteInput = {
    usuario: DatosUsuario;
    titulo: string;
    descripcion: string;
    prioridad: Prioridad;
};
//# sourceMappingURL=types.d.ts.map