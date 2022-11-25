import * as presupuesto from './gestionPresupuesto.js';
import * as web from './gestionPresupuestoWeb.js';
"use strict";
presupuesto.actualizarPresupuesto(1500);

let valor = presupuesto.mostrarPresupuesto();
web.mostrarDatoEnId(valor,'presupuesto');

let gasto1=presupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2=presupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3=presupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4=presupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5=presupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6=presupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
