<template>
  <div class="FormReportesRendimiento">
      <div class="contenedor">
        <div class="top-titulo" style="text-align:left;">
            <div class="col-12 col-md-4">
                <h5>Fechas:</h5>
                <date-picker style="left:0px" class="wide-date-example"
                    v-model="periodo" 
                    width="20" lang="es" range 
                    placeholder="Selecciona Rango de Fechas"
                    :disabled-date="disabledAfterToday"
                    @input="handlePeriodChange"
                    input-class="form-control">
                </date-picker>
            </div>
            <div class="col-12 col-md-4">
                <div class="row">
                    <div class="col"><h5>Tutor(a): </h5></div>
                    <div class="col" style="text-align: right; top: 50%">
                        <h6 style="top:50%;cursor:pointer;color:#17a2b8;" 
                        :disabled="!this.selectedTutor"
                        @click="addTutor" 
                        >Seleccionar</h6>
                    </div>
                </div>
                <select class="form-control"  v-model="selectedTutor">
                    <option disabled selected :value="null" focusable="false">Selecciona un(a) tutor(a)</option>
                    <option 
                        v-for="(tutor, index) in tutores" 
                        :key="index" 
                        :value="tutor">
                        {{ tutor.usuario.nombre + " " + tutor.usuario.apellidos }}
                    </option>
                </select>
                <ul class="overflow-wrap list-group list-group-flush" style="text-align:left;">
                    <li class="motivos-seleccionados list-group-item" style="text-align:left;"
                        v-for="(tutor,index) in tutorSelect"  
                        :key="index">
                        {{ tutor.usuario.nombre + " " + tutor.usuario.apellidos }}
                        <span name="remove" class="close" @click="deleteTutor(index, tutor)" style="float:right;">&times;</span>           
                    </li>
                </ul>
            </div>
            <div class="botones" style="margin-bottom:10px;text-align: up;margin-right: 0px;margin-top: 0px;">
                <button type="button" class="btn btn-info"  @click="generarReporte()" >Generar</button>
            </div>
        </div>
        <!-- aqui estaba mi cabcera -->
        <div class="row" style="margin-left:1px;text-align:left;">
            <!-- <h4 v-if="this.isCoordinador===false">Facultad: </h4>
            <select  class="col-sm-3 form-control" v-if="this.isCoordinador===false" v-model="selectedFacultad" v-on:change="listarProgramas()">
                <option disabled selected :value="null" focusable="false">Selecciona una facultad</option>
                <option
                    v-for="(facultad, index) in facultades"
                    :key="index"
                    :value="facultad">
                    {{ facultad.nombre }}
                </option>
            </select> -->
            <h5 class="font-weight-ligth text-left col-sm-2" v-if="this.isCoordinador===false" >Programa: </h5>
            <select  id="cbxProg" v-if="this.isCoordinador===false"  class="col-sm-3 form-control" style="align:left"  v-model="selectedPrograma">
                <option disabled selected :value="null" focusable="false">Selecciona un programa</option>

                <option
                    v-for="(programa, index) in programas"
                    :key="index"
                    :value="programa.id_programa" >
                    {{ programa.nombre }}
                </option>
            </select>
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>

        <div class="row mt-2">

            <div v-if="alumnosBR.length>0">
                <strong style="margin-left:10px">Cantidad de alumnos que asistieron a sus citas</strong>
                <horizontal-bar-chart :chartData="alumnosBR" :options="chartOp2"
                label='Alumnos con Bajo Rendimiento'  ></horizontal-bar-chart>
            </div>
            <div v-if="alumnosBRPlan.length>0">
                <strong style="margin-left:80px">Cantidad de alumnos que cumplieron su Plan de Acción</strong>
                <bar-chart :chartData="alumnosBRPlan" :options="chartOp"
                label='Alumnos con Plan de Acción terminado' ></bar-chart>
            </div>


        </div>
      </div>
        <!-- Modal de cargando -->
      <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
        <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
          <b-spinner style="width: 3rem; height: 3rem;"/>
          <br >Cargando...
        </div>
      </b-modal>

  </div>
</template>



<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import axios from 'axios';
// import LineChart from '@/components/Reportes/LineChart.vue'
// import PieChart from '@/components/Reportes/PieChart.vue'
import HorizontalBarChart from '@/components/Reportes/HorizontalBarChart.vue'
import BarChart from '@/components/Reportes/BarChart.vue'
// import DoughnutChart from '@/components/Reportes/DoughnutChart.vue'
import moment from 'moment';
import Swal from 'sweetalert2';
export default {
    components:{
        // LineChart,
        // PieChart,
        // DoughnutChart,
        DatePicker,
        HorizontalBarChart,
        BarChart
    },
    data(){
        return{
            //Permisos que afectan filtros
            isCoordinador:true,
            mipermisosUsuario:null,
            nosemuestra:true,
            sinGrafico:false,
            //filtros
            facultades:[],
            selectedFacultad:null,
            programas:[],
            selectedPrograma:null,
            tutores:[],
            tutorSel:null,
            selectedTutor:null,
            tutorSelect:[],
            //lista de identificadores
            idPogramas:[],
            idFacultades:[],
            idTutores:[],
            //graficos
            asignados:[],
            bicas:[],
            tricas:[],
            cuartas:[],
            atenciones:[],
            alumnosBR:[],
            alumnosBRPlan:[],
            //datepicker
            inicio: new Date(new Date().getTime() - 30 * 24 * 3600 * 1000),
            fin: new Date(),
            periodo:'',


            //opciones de gráficos
            chartOp:{
                scales: {
                    yAxes: [{
                        stacked: true,
                        ticks:{precision:0}
                    }],
                    xAxes: [{
                        stacked: false,
                    }]
                },
                legend: {
                    display: false
                },
                pieceLabel: {
                    mode: 'percentage',
                    precision: 1
                },
                responsive: true,
                maintainAspectRatio:false
            },
            chartOp2:{
                scales: {
                    yAxes: [{
                        stacked: true,
                        ticks:{precision:0}
                    }],
                    xAxes: [{
                        stacked: false,
                    }]
                },
                legend: {
                    display: false
                },
                pieceLabel: {
                    mode: 'percentage',
                    precision: 1
                },
                responsive: true,
                maintainAspectRatio:false,
                 type: 'horizontalBar',
            },
             chartOp3:{
                responsive: true,
                pieceLabel: {
                    mode: 'percentage',
                    precision: 1
                },
                maintainAspectRatio:false
            },

        }

    },
    mounted(){
        document.querySelector("#container > div > div.FormReportesRendimiento > div > div:nth-child(1) > div:nth-child(1) > div > div > input").style.borderRadius = "1.25rem";
        document.querySelector("#container > div > div.FormReportesRendimiento > div > div:nth-child(1) > div:nth-child(1) > div > div > input").style.border= "0.5px solid #757575";
        document.querySelector("#container > div > div.FormReportesRendimiento > div > div:nth-child(1) > div:nth-child(1) > div > div > input").style.fontWeight = "300";
        document.querySelector("#container > div > div.FormReportesRendimiento > div > div:nth-child(1) > div:nth-child(1) > div > div > input").style.fontSize = "1rem";
        document.querySelector("#container > div > div.FormReportesRendimiento > div > div:nth-child(1) > div:nth-child(1) > div > div > input").style.height = "2.4em";
        this.periodo = [this.inicio,this.fin];
        this.BajoRendimiento();
        this.listarFacultades();
        this.filtrosSegunUsuario();
        this.listarTutores();
    },
    computed: {

        progDefault: function () {
            return this.programas.filter(i => i.codigo == this.selectedFacultad.codigo)
        }
    },
    created(){
      this.BajoRendimiento();

    },

    methods:{
        progSinDefault: function () {
            return this.programas.filter(i => i != null && i.codigo != this.selectedFacultad.codigo)
        },
        listarTutores(){
           
            const params = {
                id_programa : this.$store.state.programaActual.id_programa,
                nomFacu:this.$store.state.programaActual.facultad.nombre,
                nombre: "",
            };
            axios
            .post('/programa/tutoresListar', params)
            .then(res =>{
                this.tutores=res.data;
               
                console.log('tutores: ',this.tutores);
                // this.tutores.splice(0,1);
                // //Agrego la opción de todos
                 var tTodos=new Object(), usuario=new Object;

                 usuario.nombre="Todos";
                 usuario.apellidos="";
                 usuario.id_usuario=0;
                 tTodos.usuario=usuario;
                 
                 tTodos.id_usuario=0;
                 this.tutores.push(tTodos); 
              
            })
            .catch(e => {
                console.log('catch',e);
              
                Swal.fire({
                    text:"Estamos teniendo problemas al listar los tutores del programa. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                     showConfirmButton: true,
                });

            })



        },
        listarFacultades(){
        
            const params = {
                id_institucion:1,
            };
            axios.post('facultad/listarFacultades', params)
            .then( response => {
              
                this.mipermisosUsuario=this.$store.state.permisosUsuario;
                this.facultades=response.data; //No lo uso
                //Manejo de permisos
                // console.log('permisos ',this.mipermisosUsuario);
                if(this.mipermisosUsuario.includes("Usuarios")){
                    this.selectedPrograma=this.$store.state.programaActual.id_programa;
                    this.listarProgramas();
                //Llenar el combo box con su programa y no mostrarlo
                     this.isCoordinador=true;
                }
                else{
                    //Probablemente sea coord de faci
                    this.listarProgramas();

                    this.isCoordinador=false;
                }

            })
            .catch(e => {
                
                console.log('catch:',e);
            });

        },
        listarProgramas(){
            const params = {
                id_facultad:this.$store.state.programaActual.id_facultad,

            };
            
            axios.post('facultad/listarProgramasDefault', params)
            .then( response => {
                // console.log(response);
                this.programas=response.data;
                // this.programas.splice(0,1);
                // var prog=new Object();
                // prog.nombre="Todos";
                // prog.id_programa=0;
                // this.programas.push(prog);
            })
            .catch(e => {
                console.log('catch: ',e);
            });

        },

        async BajoRendimiento(){
           this.sinGrafico=false;
          
            console.log('reporte');
            this.alumnosBR=[];
            this.alumnosBRPlan=[];
            console.log('t: ',this.idTutores);
            this.selectedPrograma=this.$store.state.programaActual.id_programa;
            if(this.selectedPrograma!=null && this.periodo[0]!=null && this.periodo[1]!=null  ){
                 console.log('func reporte');
                var programas=[];
              
                if(this.selectedPrograma==0){
                    //escogió todos los prog
                    let n=this.programas.length;
                    for(let i=1;i<n-1;i++ ){
                        programas[i]=this.programas[i].id_programa;
                     
                    }
                }else if(this.idTutores==0 && this.selectedPrograma!=0 ){
                   
                    programas[0]=this.selectedPrograma;
                }else if(this.idTutores!=0 && this.selectedPrograma!=0 ){
                  
                    programas[0]=this.selectedPrograma;
                }

                const params = {
                    id_programa: programas,
                    id_facultad: this.$store.state.programaActual.id_facultad,
                    id_institucion: 1,
                    fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                    fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
                    // id_tutor:tutoresSeleccionados,
                     id_tutor:this.idTutores,
                };
                  const params2 = {
                    id_programa: programas,
                    id_facultad: this.$store.state.programaActual.id_facultad,
                    id_institucion: 1,
                    fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                    fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
                };
                console.log(params);
                var data =await axios.post("usuarios/datosBajoRendimiento", params);
                var dataPlan =await axios.post("usuarios/datosAlumnosPlan", params2);

                // if(data.data.indexOf("Se han encontrado errores")!=-1) this.sinGrafico=true;
                //LLenado del gráfico de la izquierda
                console.log('datos: ',data);
                this.alumnosBR.push({data:">50%-Cuarta",total:data.data[4].total_alumnos});
                this.alumnosBR.push({data:"<50%-Cuarta",total:data.data[5].total_alumnos});

                this.alumnosBR.push({data:">50%-Trica",total:data.data[2].total_alumnos});
                this.alumnosBR.push({data:"<50%-Trica",total:data.data[3].total_alumnos});

                this.alumnosBR.push({data:">50%-Bica",total:data.data[0].total_alumnos});
                this.alumnosBR.push({data:"<50%-Bica",total:data.data[1].total_alumnos});

                //LLenado del gráfico de la derecha


                this.alumnosBRPlan.push({data:"Cumplieron-Cuarta",total:dataPlan.data[2].total_alumnos});
                 this.alumnosBRPlan.push({data:"Cumplieron-Trica",total:dataPlan.data[1].total_alumnos});
                 this.alumnosBRPlan.push({data:"Cumplieron-Bica",total:dataPlan.data[0].total_alumnos});

            }
         

        },
        handlePeriodChange(periodo) {
            this.periodo = periodo;
        },
        disabledAfterToday(date){
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },

        generarReporte(){

            this.validaciones();
            this.nosemuestra=false;
            this.BajoRendimiento();


        },
           filtrosSegunUsuario(){

        },

        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        validaciones(){
            this.sinGrafico=false;
            this.nosemuestra=true;
            if(this.selectedPrograma==null){

                Swal.fire({
                    text:"No ha seleccionado un programa.",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
               })
            }
            else if(this.periodo[0]==null && this.periodo[1]==null ){
                Swal.fire({
                    text:"No ha seleccionado una fecha",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
               })
            }
            else if(this.idTutores.length==0){
                
                 Swal.fire({
                    text:"No ha seleccionado un tutor, pero se muestrarán los reportes con todos los tutores.",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
               })
            }
        },
        addTutor(){
            //Verificamos si está seleccionando todos los tutores
            if(!this.selectedTutor.usuario.codigo){
                for(var tut in this.tutores){
                    if(this.tutores[tut].usuario.codigo){
                        this.tutorSelect.push(this.tutores[tut]);
                        this.idTutores.push(this.tutores[tut].usuario.id_usuario);
                    }
                }

                this.tutores=[];
            }else{
                this.tutorSelect.push(this.selectedTutor);
                this.idTutores.push(this.selectedTutor.usuario.id_usuario);
                for(var i in this.tutores)
                    if(this.selectedTutor.usuario.codigo==this.tutores[i].usuario.codigo) {
                        this.tutores.splice(i,1);  
                    }
            }
            this.selectedTutor=null;
            //verifico si el único que queda es "Todos"
            if(this.tutores[0]&&!this.tutores[0].usuario.codigo){
                this.tutores.splice(i,1); 
            }


        },
        deleteTutor(index, tutor) {
            this.tutorSelect.splice(index,1);
            this.idTutores.splice(index,1);
            if(this.tutores.length){
                this.tutores.splice(this.tutores.length-1, 0, tutor);
                
            }else{
                this.tutores.push(tutor);
                var tutorNulo=new Object();
                tutorNulo.usuario=new Object();
                tutorNulo.usuario.nombre="Todos";
                tutorNulo.usuario.codigo=0;
                tutorNulo.usuario.apellidos="";
                this.tutores.push(tutorNulo);      
            }
            
        },


    }


}



</script>


<style lang="scss" scoped>
@import '../../assets/styles/material.css';

.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}

.wide-date-example {
    width: 100% !important;
}

element.style {
    display: block;
    height: 800px;
    width: 800px;
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
  background-color: #BABABA;
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

input:focus {outline: none;box-shadow: none;}
</style>