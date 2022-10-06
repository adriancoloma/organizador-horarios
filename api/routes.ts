import * as express from "express";
import GeneradorExcel from "./GeneradorExcel";
import OrganizadorHorario, {Materia, toMaterias} from "./OrganizadorHorarios";
let router = express.Router();
let generadorExcel = new GeneradorExcel();
let organizadorHorario = new OrganizadorHorario();

router.post('/organizar', (req, res) => {
    console.log("Post request");
    let materias = req.body.materias;
    console.table(materias);
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
    console.log(horarioOrdenado);
    let pathExcel = generadorExcel.generarExcel(horarioOrdenado, horario);

    res.json({path: pathExcel});

});


export default router;