enum Dia{
    Lunes = "lunes",
    Martes = "martes",
    Miercoles = "miercoles",
    Jueves = "jueves",
    Viernes = "viernes",
    Sabado = "sabado",
}

interface Horario{
    dia: Dia;
    horaInicio: number;
    horaFin: number;
}

class Materia{
    private nombre: string;
    private horarios: Horario[];

    constructor(nombre: string, horarios: Horario[]){
        this.nombre = nombre;
        this.horarios = horarios;
    }

    public colisiona(materia: Materia): boolean{
        for(let horario of this.horarios){
            for(let horarioMateria of materia.horarios){
                if(horario.dia == horarioMateria.dia){
                    if(this.perteneceIntervalo(horario.horaInicio, horario.horaFin, horarioMateria.horaInicio, horarioMateria.horaFin)){
                        return true;
                    }

                    if(this.perteneceIntervalo(horarioMateria.horaInicio, horarioMateria.horaFin, horario.horaInicio, horario.horaFin)){
                        return true;
                    }

                    if(horario.horaInicio == horarioMateria.horaInicio && horario.horaFin == horarioMateria.horaFin){
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private perteneceIntervalo(num1:number, num2:number, limInf: number, limSup: number): boolean{
        if(num1 > limInf && num1 < limSup){
            return true;
        }
        if(num2 > limInf && num2 < limSup){
            return true;
        }

        return false;
    }

}

class OrganizadorHorario{
    public organizar(materias: Materia[]) : Materia[] {
        let horario: Materia[] = [];

        for(let materia of materias){
            let colisiona = false;
            for(let materiaHorario of horario){
                if(materia.colisiona(materiaHorario)){
                    colisiona = true;
                    break;
                }
            }

            if(!colisiona){
                horario.push(materia);
            }
        }

        return horario;
    }
}

export function toMaterias(materias : any[]) : Materia[]{
    let materiasArray: Materia[] = [];
    for(let materia of materias){
        materiasArray.push(new Materia(materia.nombre, materia.horarios));
    }

    return materiasArray;
}

export default OrganizadorHorario;