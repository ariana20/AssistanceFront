<template>
    <div name="Seleccion" style="margin-top: 120px">
        <h1>Elige tu Programa</h1>
        <div id="app" class="container">
            <card v-for="(item,index) in this.programas" :key="index" data-image="https://image.winudf.com/v2/image1/Y29tLm1vdmluZy53YWxscGFwZXJzLmdyZWVuLmxpdmUud2FsbHBhcGVyX3NjcmVlbl8xMl8xNTU3NzQ3Njg2XzA5MA/screen-12.jpg?fakeurl=1&type=.jpg">
                <h1 slot="header">{{item.programa.nombre}}</h1>
                <p slot="content">Rol: {{item.tipoUsuario.nombre}}</p>
            </card>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import card from '@/components/Card.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'FormSeleccionPrograma',
  components: {
    card
  },
  data(){
      return{
          programas:null,
      }
  },
  mounted(){
      this.axios.post('/usuarios/permisosProgramas')
        .then(response=>{
            this.programas = response.data
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../assets/styles/seleccion.scss';
</style>