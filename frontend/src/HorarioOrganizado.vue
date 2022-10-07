<script>
import Horario from './Horario.vue';
    export default{
        props:{
            materias: Array,
        },
        data(){
            return{

            }
        },
        methods:{
            descargarExcel(){
                fetch('/api/crear-excel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ horario: this.materias }),
                }).then(response => response.blob()).then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = "horario.xlsx";
                    a.click();
                });
            }
        },
        components:{Horario}
    }
</script>
<template>
    <div class="m-4 text-center text-success">
        <h1 class="d-md-block d-none">¡Tu horario ha sido organizado con éxito!</h1>
        <h3 class="d-md-none d-block">¡Tu horario ha sido organizado con éxito!</h3>
    </div>
    <Horario :materias="materias" :acciones="false" :seleccionarColor="true"></Horario>
    <div class="text-center">
        <button class="btn btn-primary" @click="descargarExcel">Descargar excel</button>
    </div>
</template>