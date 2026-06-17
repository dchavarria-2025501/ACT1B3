import { Incidente, NuevoIncidenteInput, EstadoIncidente } from './types';

export class GestionIncidentes {
    private incidentes: Incidente[] = [];

    public registrarIncidente(input: NuevoIncidenteInput): Incidente {
        const nuevoIncidente: Incidente = {
            id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
            ...input,
            estado: 'abierto', 
            fechaCreacion: new Date() 
        };

        this.incidentes.push(nuevoIncidente);
        return nuevoIncidente;
    }

    public actualizarEstado(id: string, nuevoEstado: EstadoIncidente): boolean {
        const incidente = this.incidentes.find(i => i.id === id);
        if (incidente) {
            incidente.estado = nuevoEstado;
            return true;
        }
        return false;
    }

    public obtenerIncidentesDiarios(fecha: Date): Incidente[] {
        const inicioDia = new Date(fecha.setHours(0, 0, 0, 0));
        const finDia = new Date(fecha.setHours(23, 59, 59, 999));
        return this.incidentes.filter(i => i.fechaCreacion >= inicioDia && i.fechaCreacion <= finDia);
    }

    public obtenerIncidentesMensuales(año: number, mes: number): Incidente[] {
        return this.incidentes.filter(i => 
            i.fechaCreacion.getFullYear() === año && i.fechaCreacion.getMonth() === mes
        );
    }

    public obtenerTodos(): Incidente[] {
        return this.incidentes;
    }
}