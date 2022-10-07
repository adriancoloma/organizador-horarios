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

export class Materia{
    public nombre: string;
    public color: string;
    public horarios: Horario[];

    constructor(nombre: string, horarios: Horario[], color: string){
        this.nombre = nombre;
        this.horarios = horarios;
        this.color = color;
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

    public getNumeroHoras() : number{
        let horas = 0;
        for(let horario of this.horarios){
            horas += horario.horaFin - horario.horaInicio;
        }

        return horas;
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
    private static metodosOrganizacion = {masHoras: "Horario con mas horas", aleatorio: "Horario aleatorio"};
    private metodoOrganizacion: string;
    
    constructor(metodoOrganizacion: string = "masHoras"){
        this.metodoOrganizacion = metodoOrganizacion;
    }
    private shuffle(materias: Materia[]){
        for(let i = materias.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [materias[i], materias[j]] = [materias[j], materias[i]];
        }
    }

    public organizar(materias: Materia[]) : Materia[] {
        let horario: Materia[] = [];
        let metodos = Object.keys(OrganizadorHorario.metodosOrganizacion);
        switch(this.metodoOrganizacion){
            case metodos[0]:
                horario = this.obtenerHorarioConMasHoras(materias);
                break;
            case metodos[1]:
                this.shuffle(materias);
                horario = this.organizarHelper(materias);
                break;
        }
                
        return horario;
    }

    public getHorarioOrdenado(horario: Materia[]) : string[][]{
        let horarioOrdenado: string[][] = [];
        let horaMinima = getHoraMinima(horario);
        let horaMaxima = getHoraMaxima(horario);

        for(let i = horaMinima; i < horaMaxima; i++){
            horarioOrdenado.push([`${i}-${i+1}`]);
        }
        for(let materia of horario){
            for(let horarioMateria of materia.horarios){
                let fila = horarioMateria.horaInicio - horaMinima;
                let columna = getNumeroDia(horarioMateria.dia) + 1;
                for(let i = 0; i < horarioMateria.horaFin - horarioMateria.horaInicio; i++){
                    if(horarioOrdenado[fila + i] == undefined){
                        horarioOrdenado[fila + i] = [];
                    }
                    horarioOrdenado[fila + i][columna] = materia.nombre;
                }
            }
        }

        return horarioOrdenado;
    }

    private obtenerHorarioConMasHoras(materias: Materia[]): Materia[]{
        let mayorNumeroHoras = 0;
        let horarioMayorNumeroHoras: Materia[] = [];
        for(let i = 0; i < 50; i++){
            this.shuffle(materias);
            let horario = this.organizarHelper(materias);
            let numeroHoras = getNumeroHoras(horario);
            if(numeroHoras > mayorNumeroHoras){
                mayorNumeroHoras = numeroHoras;
                horarioMayorNumeroHoras = horario;
            }
        }
            
        return horarioMayorNumeroHoras;
    }
                
        

    private organizarHelper(materias: Materia[]) : Materia[] {
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

    static getMetodosOrganizacion(){
        return this.metodosOrganizacion;
    }
}

function getNumeroHoras(horario: Materia[]): number{
    let horas = 0;
    for(let materia of horario){
        horas += materia.getNumeroHoras();
    }

    return horas;
}

function getHoraMaxima(horario: Materia[]) : number{
    let horaMaxima = 0;
    for(let materia of horario){
        for(let horario of materia.horarios){
            if(horario.horaFin > horaMaxima){
                horaMaxima = horario.horaFin;
            }
        }
    }

    return horaMaxima;
}

function getHoraMinima(horario: Materia[]) : number{
    let horaMinima = 24;
    for(let materia of horario){
        for(let horario of materia.horarios){
            if(horario.horaInicio < horaMinima){
                horaMinima = horario.horaInicio;
            }
        }
    }

    return horaMinima;

}

function getNumeroDia(dia: Dia) : number{
    let dias = Object.values(Dia);
    for(let i = 0; i < dias.length; i++){
        if(dias[i] == dia){
            return i;
        }
    }
}

export function toMaterias(materias : any[]) : Materia[]{
    let materiasArray: Materia[] = [];
    for(let materia of materias){
        materiasArray.push(new Materia(materia.nombre, materia.horarios, materia.color));
    }

    return materiasArray;
}

export default OrganizadorHorario;