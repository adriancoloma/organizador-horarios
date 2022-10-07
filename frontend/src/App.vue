
<script>
import HorarioOrganizado from './HorarioOrganizado.vue';
import OrdenarHorario from './OrdenarHorario.vue';
export default {
  data() {
    return {
      horario: [],
      seOrdeno: false,
    };
  },

  mounted() {
    window.addEventListener("hashchange", () => {
      if(window.location.hash == ""){
        this.seOrdeno = false;
      }else if(window.location.hash == "#horario-organizado"){
        this.seOrdeno = true;
      }
    });
  },

  watch:{
    seOrdeno(seOrdeno){
      if(seOrdeno){
        window.location.hash = "#horario-organizado";
        console.log(this.horario)
      }else{
        window.location.hash = "";
      }
    },
    
  },
  components: {OrdenarHorario, HorarioOrganizado }
}
</script>

<template>
  <HorarioOrganizado v-if="seOrdeno" :materias="horario"></HorarioOrganizado>
  <OrdenarHorario v-else @seOrdeno="(horarioOrganizado) => {horario = horarioOrganizado; seOrdeno = true;}"></OrdenarHorario>

</template>

<style scoped>

</style>
