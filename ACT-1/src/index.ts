import * as readline from 'readline';
import { GestionIncidentes } from './GestionIncidentes';
import { Prioridad, EstadoIncidente } from './types';

const gestor = new GestionIncidentes();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const preguntar = (pregunta: string): Promise<string> => {
    return new Promise((resolve) => rl.question(pregunta, resolve));
};

async function menuPrincipal() {
    console.log(`\n=========================================`);
    console.log(`   SISTEMA DE INCIDENTES LABORATORIO C-27 `);
    console.log(`=========================================`);
    console.log(`1. Reportar un nuevo Incidente Técnico`);
    console.log(`2. Cambiar estado de un ticket`);
    console.log(`3. Ver Reporte Diario`);
    console.log(`4. Ver Reporte Mensual`);
    console.log(`5. Salir del programa`);
    console.log(`=========================================`);
    
    const opcion = await preguntar(`Seleccione una opción (1-5): `);

    switch (opcion.trim()) {
        case '1':
            await procesoRegistroIncidente();
            break;
        case '2':
            await procesoActualizarEstado();
            break;
        case '3':
            mostrarReporteDiario();
            break;
        case '4':
            mostrarReporteMensual();
            break;
        case '5':
            console.log("\n¡Gracias por utilizar el sistema del C-27! Cerrando terminal...");
            rl.close();
            return;
        default:
            console.log("\n[Error] Opción no válida. Intente de nuevo.");
    }

    await menuPrincipal();
}

async function procesoRegistroIncidente() {
    console.log(`\n--- FORMULARIO DE REPORTE C-27 ---`);
    
    const nombre = await preguntar("Ingrese su Nombre: ");
    const apellido = await preguntar("Ingrese su Apellido: ");
    const edadStr = await preguntar("Ingrese su Edad: ");
    const carne = await preguntar("Ingrese su Carné o ID de Maestro: ");
    
    const titulo = await preguntar("Título del problema (ej: Fallas de red): ");
    const descripcion = await preguntar("Descripción detallada del incidente: ");
    
    let prioridad: Prioridad = 'media';
    const prioInput = await preguntar("Prioridad (baja, media, alta): ");
    const prioMinuscula = prioInput.toLowerCase().trim();
    if (prioMinuscula === 'baja' || prioMinuscula === 'media' || prioMinuscula === 'alta') {
        prioridad = prioMinuscula;
    } else {
        console.log("Prioridad inválida asignada como 'media' por defecto.");
    }

    const ticket = gestor.registrarIncidente({
        usuario: {
            nombre,
            apellido,
            edad: parseInt(edadStr) || 0,
            carne
        },
        titulo,
        descripcion,
        prioridad
    });

    console.log(`\n[ÉXITO] Ticket guardado en Base de Datos.`);
    console.log(`-> ID Asignado: ${ticket.id}`);
    console.log(`-> Estado Inicial: ${ticket.estado} (Automático)`);
    console.log(`-> Registro exacto: ${ticket.fechaCreacion.toLocaleString()}`); 
}

async function procesoActualizarEstado() {
    console.log(`\n--- ACTUALIZACIÓN DE MANTENIMIENTO ---`);
    const id = await preguntar("Ingrese el ID del ticket (ej: INC-1234): ");
    const nuevoEstadoInput = await preguntar("Nuevo Estado (abierto, en progreso, resuelto): ");
    
    const estado = nuevoEstadoInput.toLowerCase().trim() as EstadoIncidente;
    
    if (['abierto', 'en progreso', 'resuelto'].includes(estado)) {
        const modificado = gestor.actualizarEstado(id.toUpperCase().trim(), estado);
        if (modificado) {
            console.log(`\n[ÉXITO] El estado del ticket ${id} cambió a: ${estado}`);
        } else {
            console.log(`\n[Error] No se encontró ningún ticket con el ID proporcionado.`);
        }
    } else {
        console.log(`\n[Error] Estado inválido.`);
    }
}

function mostrarReporteDiario() {
    const hoy = new Date();
    const lista = gestor.obtenerIncidentesDiarios(hoy);  
    const incidentes = gestor.obtenerIncidentesDiarios(hoy);
    
    console.log(`\n==================================================`);
    console.log(` REPORTE DIARIO C-27 - DÍA: ${hoy.toLocaleDateString()}`);
    console.log(`==================================================`);
    imprimirLista(incidentes);
}

function mostrarReporteMensual() {
    const hoy = new Date();
    const incidentes = gestor.obtenerIncidentesMensuales(hoy.getFullYear(), hoy.getMonth());
    const nombreMes = hoy.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
    
    console.log(`\n==================================================`);
    console.log(` REPORTE MENSUAL C-27 - MES: ${nombreMes} ${hoy.getFullYear()}`);
    console.log(`==================================================`);
    imprimirLista(incidentes);
}

function imprimirLista(lista: any[]) {
    console.log(`Total tickets en el periodo: ${lista.length}`);
    console.log(`--------------------------------------------------`);
    lista.forEach(i => {
        console.log(`[${i.id}] [${i.estado.toUpperCase()}] - ${i.titulo}`);
        console.log(`      Reportó: ${i.usuario.nombre} ${i.usuario.apellido} (Carné: ${i.usuario.carne})`);
        console.log(`      Prioridad: ${i.prioridad} | Hora: ${i.fechaCreacion.toLocaleTimeString()}`);
        console.log(`      Descripción: ${i.descripcion}\n`);
    });
}


menuPrincipal();