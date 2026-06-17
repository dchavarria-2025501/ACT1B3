"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestionIncidentes = void 0;
class GestionIncidentes {
    constructor() {
        this.incidentes = [];
    }
    registrarIncidente(input) {
        const nuevoIncidente = {
            id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
            ...input,
            estado: 'abierto',
            fechaCreacion: new Date()
        };
        this.incidentes.push(nuevoIncidente);
        return nuevoIncidente;
    }
    actualizarEstado(id, nuevoEstado) {
        const incidente = this.incidentes.find(i => i.id === id);
        if (incidente) {
            incidente.estado = nuevoEstado;
            return true;
        }
        return false;
    }
    obtenerIncidentesDiarios(fecha) {
        const inicioDia = new Date(fecha.setHours(0, 0, 0, 0));
        const finDia = new Date(fecha.setHours(23, 59, 59, 999));
        return this.incidentes.filter(i => i.fechaCreacion >= inicioDia && i.fechaCreacion <= finDia);
    }
    obtenerIncidentesMensuales(año, mes) {
        return this.incidentes.filter(i => i.fechaCreacion.getFullYear() === año && i.fechaCreacion.getMonth() === mes);
    }
    obtenerTodos() {
        return this.incidentes;
    }
}
exports.GestionIncidentes = GestionIncidentes;
//# sourceMappingURL=GestionIncidentes.js.map