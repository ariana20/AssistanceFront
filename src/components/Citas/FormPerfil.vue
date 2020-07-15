<template>
    <div class="contenedor">
        <div class="top-info">
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
            <div class="row grid-divider">
                <div class="izq col-lg-6 col-xm-2 col-md-12">
                    <div v-if="usuario!=null">
                        <div class="font-weight-bolder text-left">{{usuario.nombre+" "+usuario.apellidos}}</div>
                        <datosAlumnos 
                        :tutor="usuario"
                        :tipoTutoria="null" />
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-sm-4">
                        
                        </div>
                        <div class="col">
                        
                        </div>
                    </div>
                    <div style="position:absolute; bottom:30px;">
                    </div>
                </div>
            
                <div class="der col-lg-6 col-xm col-md-12">
                    <div class="font-weight-bolder text-left">Resultado</div>
                    <div style="margin-bottom:20px;text-align:left">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.57247 26.0949L10.6574 30.0712L36.8383 15.7898L21.0476 34.2107L43.6809 44.5158C44.068 44.6853 44.4902 44.7592 44.9119 44.7311C45.3335 44.7029 45.7422 44.5737 46.1033 44.3543C46.4645 44.1349 46.7674 43.8318 46.9867 43.4706C47.2059 43.1093 47.3349 42.7006 47.3628 42.279L49.9946 2.80565C50.0239 2.34877 49.9337 1.89213 49.733 1.48066C49.5322 1.0692 49.2278 0.71709 48.8496 0.458985C48.4715 0.20088 48.0326 0.0456746 47.5763 0.00864158C47.1199 -0.0283915 46.6618 0.0540238 46.2469 0.247778L1.50668 21.3002C1.0503 21.5167 0.665713 21.8598 0.398658 22.2885C0.131603 22.7172 -0.00668216 23.2137 0.000248292 23.7187C0.00717875 24.2238 0.159033 24.7162 0.437752 25.1374C0.71647 25.5587 1.11032 25.891 1.57247 26.0949ZM15.7841 50L28.3535 43.9053L15.7841 38.0422V50Z" fill="black"/>
                        </svg>
                        <b-button v-on:click="$store.state.verPdf=false;$store.state.verCitas=false;$store.state.verPlan=true" style="background: #0097A7;border: 0px;width:40%;margin-left:5%">
                            Plan de Acción
                        </b-button><br><br>

                        <svg v-if="$store.state.permisosUsuario!= null && $store.state.permisosUsuario.includes('Visualizar Notas')" width="53" height="52" viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4737 13.6579H16.1329L16.0083 13.9751L1.53462 50.8172L1.26637 51.5H2H7.78947H8.13869L8.25891 51.1721L11.0334 43.6053H26.6508L29.4253 51.1721L29.5455 51.5H29.8947H36.2105H36.9442L36.6759 50.8172L22.2022 13.9751L22.0776 13.6579H21.7368H16.4737ZM52.5 8.89474V8.39474H52H44.6053V1V0.5H44.1053H38.8421H38.3421V1V8.39474H30.9474H30.4474V8.89474V14.1579V14.6579H30.9474H38.3421V22.0526V22.5526H38.8421H44.1053H44.6053V22.0526V14.6579H52H52.5V14.1579V8.89474ZM13.515 37.3421L19.1053 22.6677L24.6955 37.3421H13.515Z" fill="black" stroke="black"/>
                        </svg>
                        <b-button v-if="$store.state.permisosUsuario!= null && $store.state.permisosUsuario.includes('Visualizar Notas')" v-on:click="$store.state.verPdf=true;$store.state.verCitas=false;$store.state.verPlan=false" style="background: #0097A7;border: 0px;width:40%;margin-left:5%">
                            Histórico del Alumno
                        </b-button><br v-if="$store.state.permisosUsuario!= null && $store.state.permisosUsuario.includes('Visualizar Notas')"><br v-if="$store.state.permisosUsuario!= null && $store.state.permisosUsuario.includes('Visualizar Notas')">

                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M44.4444 5H41.6667V2.5C41.6667 1.125 40.4167 0 38.8889 0C37.3611 0 36.1111 1.125 36.1111 2.5V5H13.8889V2.5C13.8889 1.125 12.6389 0 11.1111 0C9.58333 0 8.33333 1.125 8.33333 2.5V5H5.55556C2.47222 5 0.0277778 7.25 0.0277778 10L0 45C0 46.3261 0.585316 47.5979 1.62718 48.5355C2.66905 49.4732 4.08213 50 5.55556 50H44.4444C47.5 50 50 47.75 50 45V10C50 7.25 47.5 5 44.4444 5ZM44.4444 42.5C44.4444 43.875 43.1944 45 41.6667 45H8.33333C6.80556 45 5.55556 43.875 5.55556 42.5V17.5H44.4444V42.5ZM11.1111 22.5H16.6667V27.5H11.1111V22.5ZM22.2222 22.5H27.7778V27.5H22.2222V22.5ZM33.3333 22.5H38.8889V27.5H33.3333V22.5Z" fill="black"/>
                        </svg>
                        <b-button v-on:click="$store.state.verPdf=false;$store.state.verCitas=true;$store.state.verPlan=false" style="background: #0097A7;border: 0px;width:40%;margin-left:5%">
                            Histórico de Citas
                        </b-button>
                    </div>                
                </div>
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
        <div name="VisorPdf" v-if="this.$store.state.verPdf && usuario!=null ">
            <div class="container" style="width:100%">
                <div v-if="usuario.notas!=null && usuario.notas!=''">
                    <!-- {{usuario.notas}} -->
                    <embed class="toolb" :src="'https://assisstanceproyecto20201.vizcochitos.cloudns.cl/usuarios/'+usuario.notas+'#toolbar=0&navpanes=0&scroll=0'" height="400vh" style="width:85%;overflow:auto"/>
                </div>
                <div v-else>
                    <h2>No tiene notas registradas actualmente</h2>
                </div>
            </div>
        </div>
        <div name="VisorCitas" v-if="this.$store.state.verCitas && usuario!=null ">
            <div style="overflow: auto;width:95%">
                <table responsive class="table" style="text-align:left" >
                    <thead>
                        <tr>
                            <th scope="col" >Tutor</th>
                            <th scope="col" >Fecha</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Asistencia</th>
                            <th scope="col">Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in historicoCitas" :key="index">
                            <td v-if="item!=undefined">{{item.disponibilidad.usuario.nombre + " "+ item.disponibilidad.usuario.apellidos}}</td>
                            <td v-if="item!=undefined">{{item.disponibilidad.fecha}}</td>
                            <td v-if="item!=undefined">{{item.disponibilidad.hora_inicio}}</td>  
                            <td >
                                <div v-if="item.pivot.asistencia == 'asi'">
                                    Asistió
                                </div>
                                <div v-else-if="item.pivot.asistencia == 'pen'">
                                    Pendiente
                                </div>
                                <div v-else>
                                    No Asistió
                                </div>
                            </td>
                            <td >
                                <button v-on:click="Elegir(item)" style="padding-left: 5px;padding-right: 5px;width:50px" class="btn link">
                                    <modalJ2 :id="item.id_cita" :alumno="usuario" :cita="item"/>      
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div name="VisorPlan" v-if="this.$store.state.verPlan && usuario!=null ">
            <PlanAccion :usr="usuario"/>
        </div>

        <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
            <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
                <b-spinner style="width: 3rem; height: 3rem;"/>
                <br>Cargando... 
            </div>
        </b-modal>

        <div style="margin-top:5%"></div>
    </div>
</template>


<script>
import Swal from 'sweetalert2'
import datosAlumnos from '@/components/Citas/DatosAlumno.vue'
import PlanAccion from '@/components/Citas/FormPlanDeAccion.vue'
import modalJ2 from '@/components/ModalCita.vue'

export default ({
    name: 'formSesionTutoria',
    components:{
        datosAlumnos,
        PlanAccion,
        modalJ2,
    },
    props: {
        idUsuario: String,
    },
    data: function () {
        return {
            usuario: null,
            historicoCitas: null,
        }
    },
    mounted(){
        if(this.$store.state.usuario==null) this.$router.push('/login')
        this.showModal()
        this.axios.post('/usuarios/listar/'+this.idUsuario)
            .then( response=>{
                this.usuario = response.data;
            })
            .catch(e => {
                console.log(e.response);
                Swal.fire({
                    title: e,
                    text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                }); 
            });
        let obj ={id_usuario : parseInt(this.idUsuario,10)}
        this.axios.post('/citas/historcioAlumno',obj)
            .then( response=>{
                this.historicoCitas = response.data;
                this.hideModal()
            })
            .catch(e => {
                console.log(e.response);
                this.hideModal()
                Swal.fire({
                    title: e,
                    text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                }); 
            });
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        Elegir(item){
            this.solEl = item;
        },
    }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/material.css';

#outerContainer #mainContainer div.toolbar {
  display: none !important; /* hide PDF viewer toolbar */
}
#outerContainer #mainContainer #viewerContainer {
  top: 0 !important; /* move doc up into empty bar space */
}

.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}

input.e-input, .e-input-group input.e-input, .e-input-group.e-control-wrapper input.e-input, textarea.e-input, .e-input-group textarea.e-input, .e-input-group.e-control-wrapper textarea.e-input{
    border-width: 1px !important;
}
.input.e-input, .e-input-group input.e-input, .e-input-group input, .e-input-group.e-control-wrapper input.e-input, .e-input-group.e-control-wrapper input, .e-float-input input, .e-float-input.e-input-group input, .e-float-input.e-control-wrapper input, .e-float-input.e-control-wrapper.e-input-group input, .e-input-group, .e-input-group.e-control-wrapper, .e-float-input, .e-float-input.e-control-wrapper {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    text-align: center;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif;
    font-size: 17px;
    margin-bottom:0px!important;
}
.e-control .e-autocomplete .e-lib .e-input .e-keyboard {
    z-index: -100;
}
.borde-textbox {
    border-radius: 1.25rem;  
    border: 2px solid #757575;
}
.izq {
    //background-color: cornflowerblue;
    padding: 20px;
}
.der {
    //background-color: darkgreen;
    padding: 20px;
}
.tutoria-title{
    margin-top: 30px;
    margin-bottom: 20px;
}
.grid-divider {
  overflow-x: hidden; //quickfix to hide divider on left side
  position: relative;
}
.grid-divider > [class*="col-"]:nth-child(n + 2):after {
  content: "";
  background-color: transparent;
  position: absolute;
  top: 0;
  bottom: 0;
  @media (max-width: 767px) {
    width: 100%;
    height: 1px;
    left: 0;
    top: -4px; // quickfix to center line between columns
  }
  @media (min-width: 768px) {
    width: 1px;
    height: auto;
    left: -1px; // quickfix to hide divider on left side
  }
}
.font-weight-bolder {
    color: black;
    font-size: 24px;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif !important;
}
.botones {
    margin:auto;
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
}
.top-titulo {
    display: flex;
    justify-content: space-between;
}
.text-left {
    margin-bottom: 20px;
}
.motivo-dropdown-title {
    top: 10px;
    text-align: left;
}

.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
}
.btn:focus {
    outline:none;
    box-shadow: none;
    border: 2.3px solid transparent;
}
select:focus {
    outline:none;
    box-shadow: none;
}

.toolb{
    .toolbar{
        display: none !important; 
    }
    #outerContainer #mainContainer div.toolbar {
        display: none !important; /* hide PDF viewer toolbar */
    }
    #outerContainer #mainContainer #viewerContainer {
    top: 0 !important; /* move doc up into empty bar space */
    }
}
</style>