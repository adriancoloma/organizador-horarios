import * as express from "express";
import OrganizadorHorario, {toMaterias} from "./OrganizadorHorarios";
let router = express.Router();


router.post('/organizar', (req, res) => {
    console.log("Post request");
    let materias = req.body.materias;
    console.table(materias);
    let horario = new OrganizadorHorario(req.body.metodoOrganizacion).organizar(toMaterias(materias));

    res.json(horario);
});

router.get('/metodos-organizacion', (req, res) => {
    res.json(OrganizadorHorario.getMetodosOrganizacion());
});



export default router;