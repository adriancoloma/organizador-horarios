import * as express from "express";
import GeneradorExcel from "./GeneradorExcel";
import OrganizadorHorario, {Materia, toMaterias} from "./OrganizadorHorarios";
let router = express.Router();
const path = require('path');
let generadorExcel = new GeneradorExcel();
let organizadorHorario = new OrganizadorHorario();

router.use('/static', express.static(path.join(__dirname, './static')));
router.post('/organizar', (req, res) => {
    console.log("Post request");
    let materias = req.body.materias;
    let horario = organizadorHorario.organizar(toMaterias(materias));

    res.json(horario);
});

router.get('/metodos-organizacion', (req, res) => {
    res.json(OrganizadorHorario.getMetodosOrganizacion());
});

router.post('/crear-excel', (req, res) => {
    let horario = req.body.horario;
    let materias : Materia[] = toMaterias(horario);
    let horarioOrdenado = organizadorHorario.getHorarioOrdenado(materias);
    generadorExcel.generarExcel(horarioOrdenado, materias, res);

});


export default router;