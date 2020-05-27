<template>
    <div name="Modal">
        <a class="button" href="#openModal2"><b-icon icon="search"></b-icon></a>
        <div id="openModal2" class="modalbg">
            <div class="dialog">
                <a href="#close" title="Close" class="close">X</a>
                <h2>Coordinadores</h2>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Estado</th>
                    </tr>
                    </thead>
                    <tbody href="#close">
                    <tr  v-for="(item, index) in coordinadores" :key="index" v-on:click="$emit('childToParentProg',item)">
                        <th scope="row"><a href="#close">{{item.id_usuario}}</a></th>
                        <td><a href="#close">{{item.nombre+" "+item.apellidos}}</a></td>
                        <td><a href="#close">{{item.correo}}</a></td>
                        <td><a href="#close">{{item.estado}}</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      coordinadores:[],
      coordSel:null,
    }
  },
  mounted(){
    this.listarCoordinadores();
  },
  methods:{
    listarCoordinadores() {
      this.axios.post('/facultad/coordinadoresPyF')
        .then(res =>{
          this.$store.state.coordinadores = res.data
          this.coordinadores=res.data;
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    mandar(event,coordinador){
        this.coordSel = coordinador
        this.$emit('childToParentProg',this.coordSel)
    },
  },
}
</script>

<style lang="less" scoped>
    @import '../assets/styles/modal.less';
</style>