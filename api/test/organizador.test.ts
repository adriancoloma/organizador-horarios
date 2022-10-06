import { describe, expect, test } from '@jest/globals';
import OrganizadorHorario, { Materia, toMaterias } from '..//OrganizadorHorarios';

describe('OrganizadorHorarios', () => {
    test('Debe organizar un horario de forma ordenada', () => {
        let organizador = new OrganizadorHorario();
        let horarioObj = {
            "horario": [{
                "nombre": "Fisica",
                "horarios": [{ "dia": "Lunes", "horaInicio": 10, "horaFin": 12 }]
            },
            {
                "nombre": "Matematicas",
                "horarios": [{ "dia": "Martes", "horaInicio": 13, "horaFin": 14 }]
            }]
        };

        let horarioOrganizado = organizador.getHorarioOrdenado(toMaterias(horarioObj.horario));
        console.log(horarioOrganizado);
        expect(horarioOrganizado[0][1]).toBe("Fisica");

    })});