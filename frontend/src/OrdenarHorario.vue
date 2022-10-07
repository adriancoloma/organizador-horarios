<script>
import Horario from './Horario.vue';
export default {
    emits: ["seOrdeno"],
    data() {
        return {
            metodosOrganizacion: null,
            metodoOrganizacion: "masHoras",
            materias: [],
            nombreMateria: "",
            horarios: [{ dia: "lunes", horaInicio: null, horaFin: null }, { dia: "martes", horaInicio: null, horaFin: null }, { dia: "miercoles", horaInicio: null, horaFin: null }, { dia: "jueves", horaInicio: null, horaFin: null }, { dia: "viernes", horaInicio: null, horaFin: null }, { dia: "sabado", horaInicio: null, horaFin: null }],
            organizando: false,
            horarioOrganizado: [],

        };
    },
    created() {
        this.getMetodosOrganizacion();
        let materiasGuardadas = localStorage.getItem("materias");
        if (materiasGuardadas) {
            this.materias = JSON.parse(materiasGuardadas);
        }

    },
    methods: {
        agregarMateria() {
            let materia = { nombre: this.nombreMateria, horarios: [] };
            this.horarios.forEach(horario => {
                if (horario.horaInicio != null && horario.horaFin != null) {
                    materia.horarios.push(Object.assign({}, horario));
                }
            });
            this.materias.push(materia);

            //this.$refs.form.reset();
            this.horarios.forEach(horario => {
                horario.horaInicio = null;
                horario.horaFin = null;
            });
            this.nombreMateria = "";
        },
        getHorario(horarios, dia) {
            return horarios.find(horario => horario.dia == dia);
        },

        eliminarMateria(materia) {
            this.materias = this.materias.filter(m => m != materia);
        },

        organizar() {
            this.organizando = true;
            fetch('/api/organizar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ metodoOrganizacion: this.metodoOrganizacion, materias: this.materias }),


            }).then(response => response.json()).then(data => {
                this.horarioOrganizado = data;
                this.organizando = false;
                this.$emit("seOrdeno", data);
            }).catch(error => {
                this.organizando = false;
                alert("Error al conectar con el servidor");
                console.log(error);
            });
        },

        descargarMaterias() {
            let materias = this.materias;
            let materiasString = JSON.stringify(materias);
            let blob = new Blob([materiasString], { type: "application/json;charset=utf-8" });
            let url = URL.createObjectURL(blob);
            let link = document.createElement('a');
            link.href = url;
            link.download = "materias.json";
            link.click();
        },

        subirMaterias() {
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.onchange = e => {
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.addEventListener("loadend", () => {
                    let data = reader.result;
                    let json = JSON.parse(data);
                    if (json[0]) {
                        this.materias = json;
                    }

                });
                reader.readAsText(file, 'UTF-8');
            }

            input.click();
        },

        getMetodosOrganizacion() {
            fetch('/api/metodos-organizacion').then(response => response.json()).then(data => {
                this.metodosOrganizacion = data;
            }).catch(error => {
                alert("Error al conectar con el servidor");
                console.log(error);
            });
        }


    },
    watch: {
        materias: {
            handler(materias) {
                localStorage.setItem("materias", JSON.stringify(materias));
            },
            deep: true
        }

    },
    components: { Horario }
}
</script>
<template>

    <form ref="form">
        <div class="d-flex m-4 justify-content-center">
            <div class="mx-4">
                Nombre de la materia:
            </div>
            <div>
                <input type="text" v-model="nombreMateria">
            </div>
        </div>
        <div class="d-flex m-4 justify-content-center">
            <div class="mx-4">
                Metodo de organizacion:
            </div>
            <div>
                <select v-model="metodoOrganizacion">
                    <option v-for="(value, key) in metodosOrganizacion" :value="key" selected>{{value}}</option>
                </select>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-hover text-center">
                <tr>
                    <th>Dias</th>
                    <th>Lunes</th>
                    <th>Martes</th>
                    <th>Miercoles</th>
                    <th>Jueves</th>
                    <th>Viernes</th>
                    <th>Sabado</th>
                </tr>
                <tr>
                    <th>Hora de inicio</th>
                    <td><input type="number" v-model="horarios[0].horaInicio"></td>
                    <td><input type="number" v-model="horarios[1].horaInicio"></td>
                    <td><input type="number" v-model="horarios[2].horaInicio"></td>
                    <td><input type="number" v-model="horarios[3].horaInicio"></td>
                    <td><input type="number" v-model="horarios[4].horaInicio"></td>
                    <td><input type="number" v-model="horarios[5].horaInicio"></td>
                </tr>
                <tr>
                    <th>Hora de salida</th>
                    <td><input type="number" v-model="horarios[0].horaFin"></td>
                    <td><input type="number" v-model="horarios[1].horaFin"></td>
                    <td><input type="number" v-model="horarios[2].horaFin"></td>
                    <td><input type="number" v-model="horarios[3].horaFin"></td>
                    <td><input type="number" v-model="horarios[4].horaFin"></td>
                    <td><input type="number" v-model="horarios[5].horaFin"></td>
                </tr>
            </table>
        </div>

        <div class="container-fluid d-flex justify-content-center">
            <div>
                <button type="button" @click="agregarMateria" class="btn btn-success btn-lg m-2">Agregar</button>
                <button @click="materias = []" type="button" class="btn btn-danger btn-lg m-2">Eliminar
                    todo</button>
            </div>
        </div>
    </form>
    <Horario :materias="materias" :acciones="true" :eliminarMateria="eliminarMateria"></Horario>

    <div class="container-fluid d-flex justify-content-center">
        <div>
            <button type="button" class="btn btn-primary btn-lg m-2" @click="organizar">Organizar</button>
            <button type="button" class="btn btn-warning btn-lg m-2" @click="descargarMaterias">Descargar
                materias</button>
            <label for="input-materias" class="btn btn-warning btn-lg m-2" @click="subirMaterias">Subir archivo</label>
        </div>
    </div>
    <div v-if="organizando" class="container-fluid d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only"></span>
        </div>
    </div>

</template>