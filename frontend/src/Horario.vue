<script>
export default {
    props: {
        materias: Array,
        acciones: Boolean,
        eliminarMateria: Function,
        seleccionarColor: Boolean
    },
    methods:{
        getHorario(horarios, dia) {
            return horarios.find(horario => horario.dia == dia);
        },
    }
}
</script>
<template>
    <table id="tabla_materias" class="table table-bordered mt-4 table-responsive">
        <thead>
            <tr class="table-primary">
                <th>Materia</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miercoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sabado</th>
                <th v-if="acciones">Acciones</th>
                <th v-if="seleccionarColor">Color</th>
            </tr>
        </thead>
        <tbody v-for="materia in materias" class="text-center">
            <tr>
                <td>
                    {{materia.nombre}}
                </td>
                <td>
                    <div v-if="getHorario(materia.horarios, 'lunes')">
                        {{getHorario(materia.horarios, 'lunes').horaInicio}} - {{getHorario(materia.horarios,
                        'lunes').horaFin}}
                    </div>
                </td>
                <td>
                    <div v-if="getHorario(materia.horarios, 'martes')">
                        {{getHorario(materia.horarios, 'martes').horaInicio}} - {{getHorario(materia.horarios,
                        'martes').horaFin}}
                    </div>
                </td>
                <td>
                    <div v-if="getHorario(materia.horarios, 'miercoles')">
                        {{getHorario(materia.horarios, 'miercoles').horaInicio}} - {{getHorario(materia.horarios,
                        'miercoles').horaFin}}
                    </div>
                </td>
                <td>
                    <div v-if="getHorario(materia.horarios, 'jueves')">
                        {{getHorario(materia.horarios, 'jueves').horaInicio}} - {{getHorario(materia.horarios,
                        'jueves').horaFin}}
                    </div>
                </td>
                <td>
                    <div v-if="getHorario(materia.horarios, 'viernes')">
                        {{getHorario(materia.horarios, 'viernes').horaInicio}} - {{getHorario(materia.horarios,
                        'viernes').horaFin}}
                    </div>
                </td>
                <td>
                    <div v-if="getHorario(materia.horarios, 'sabado')">
                        {{getHorario(materia.horarios, 'sabado').horaInicio}} - {{getHorario(materia.horarios,
                        'sabado').horaFin}}
                    </div>
                </td>
                <td v-if="acciones">
                    <button type="button" class="btn btn-danger" @click="eliminarMateria(materia)">Eliminar</button>
                </td>
                <td v-if="seleccionarColor">
                    <input type="color" v-model="materia.color" >
                </td>
            </tr>

        </tbody>

    </table>
</template>