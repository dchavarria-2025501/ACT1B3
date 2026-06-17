import { Incidente, NuevoIncidenteInput, EstadoIncidente } from './types';
export declare class GestionIncidentes {
    private incidentes;
    registrarIncidente(input: NuevoIncidenteInput): Incidente;
    actualizarEstado(id: string, nuevoEstado: EstadoIncidente): boolean;
    obtenerIncidentesDiarios(fecha: Date): Incidente[];
    obtenerIncidentesMensuales(año: number, mes: number): Incidente[];
    obtenerTodos(): Incidente[];
}
//# sourceMappingURL=GestionIncidentes.d.ts.map