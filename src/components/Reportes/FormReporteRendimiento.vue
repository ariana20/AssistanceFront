<template>
  <div class="FormReportes">
      <div class="container">
        <div  class="top-titulo" style="text-align:left;">
            <h5 class="font-weight-ligth text-left col-sm-2">Fechas:</h5>
            <date-picker 
                v-model="periodo" 
                width="100" lang="es" range 
                placeholder="Selecciona Rango de Fechas"
                :disabled-date="disabledAfterToday"
                @input="handlePeriodChange"
                input-class="col-sm-12 form-control">
            </date-picker>
            <div class="botones" style="margin-bottom:10px">
                <button type="button" class=" col-sm-12 btn btn-info" style="height:37px;width:100px;text-align:center" @click="generarReporte()" >Generar</button>
            </div>


         </div>  <!-- fin del top  -->
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
                <!-- <option 
                    v-for="(programa, index) in progSinDefault"
                    :key="index" 
                    :value="programa" >
                    {{ programa.nombre }}
                </option> -->
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
            <h6 class="font-weight-ligth text-left col-sm-12" v-if="this.nosemuestra===true" >
                No se ha generado ningún reporte </h6>
            <h6 class="font-weight-ligth text-left col-sm-12" 
                v-if="this.sinGrafico===true && this.nosemuestra===false" >
                No se ha generado un reporte con datos significativos </h6>
           

            <div v-if="alumnosBR.length>0 && this.sinGrafico===false">
                <strong style=";margin-left:10px">Cantidad de alumnos que asistieron a sus citas</strong>
                <bar-chart :chartData="alumnosBR" :options="chartOp2" :type="horizontalBar"
                label='Alumnos con Bajo Rendimiento'  style="display: block; width: 444px; height: 222px;"></bar-chart>
            </div>
          <div v-if="alumnosBRPlan.length>0 && this.sinGrafico===false">
                <strong style="margin-left:80px">Cantidad de alumnos que cumplieron su Plan de Acción</strong>
                <bar-chart :chartData="alumnosBRPlan" :options="chartOp"  
                label='Alumnos con Plan de Acción terminado'  style="display: block; width: 300px; height: 222px;margin-left:100px"></bar-chart>
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
        BarChart,
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
            //lista de identificadores
            idPogramas:[],
            idFacultades:[],
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
        document.querySelector("#container > div > div.FormReportes > div > div.top-titulo > div.mx-datepicker.mx-datepicker-range > div > input").style.borderRadius = "1.25rem"; 
        document.querySelector("#container > div > div.FormReportes > div > div.top-titulo > div.mx-datepicker.mx-datepicker-range > div > input").style.border= "0.5px solid #757575";    
        document.querySelector("#container > div > div.FormReportes > div > div.top-titulo > div.mx-datepicker.mx-datepicker-range > div > input").style.fontWeight = "300";
        document.querySelector("#container > div > div.FormReportes > div > div.top-titulo > div.mx-datepicker.mx-datepicker-range > div > input").style.fontSize = "1rem";
        document.querySelector("#container > div > div.FormReportes > div > div.top-titulo > div.mx-datepicker.mx-datepicker-range > div > input").style.height = "2.4em";
          this.periodo = [this.inicio,this.fin];
      
        this.listarFacultades();
        this.filtrosSegunUsuario();
    },
    computed: {
        
        progDefault: function () {
            return this.programas.filter(i => i.codigo == this.selectedFacultad.codigo)
        }
    },
    created(){
      

    },
 
    methods:{
        progSinDefault: function () {
            return this.programas.filter(i => i != null && i.codigo != this.selectedFacultad.codigo)
        },
     
        listarFacultades(){
            this.showModal();
            const params = {
                id_institucion:1,
            };
            axios.post('facultad/listarFacultades', params)
            .then( response => {
                this.hideModal();
                this.mipermisosUsuario=this.$store.state.permisosUsuario;
                console.log('perm',this.mipermisosUsuario);
                this.facultades=response.data;
                var facu=new Object();
                facu.nombre="Todos";
                facu.id_facultad=0;
                facu.codigo="TODOS";
                this.facultades.push(facu);
                console.log(this.facultades);
                //Manejo de permisos
          
                if(this.mipermisosUsuario.includes("Usuarios")){
                   
                    console.log('prog:',this.$store.state.programaActual);
                    this.selectedPrograma=this.$store.state.programaActual.id_programa;
                    this.listarProgramas();
                    console.log('selectedPrograma: ',this.selectedPrograma);
                    // document.getElementById("cbxProg").disabled = true;//inhabilita
                    
                //Llenar el combo box con su programa y no mostrarlo
                     this.isCoordinador=true;
                }     else{
                    //Probablemente sea coord de faci
                    this.listarProgramas();
                    this.hideModal();
                    this.isCoordinador=false;

                    

                }          
                
            })
            .catch(e => {
                console.log('catch:',e.response);
            });
            
        },
        listarProgramas(){
           // console.log(this.selectedFacultad);
            const params = {
                id_facultad:this.$store.state.programaActual.id_facultad,
                
            };
            axios.post('facultad/listarProgramasDefault', params)
            .then( response => {
                this.programas=response.data;
                this.programas.splice(0,1);
                console.log(this.programas);
                var prog=new Object();
                prog.nombre="Todos";
                prog.id_programa=0;
                this.programas.push(prog);
            })
            .catch(e => {
                console.log(e.response);
            });

        },

        async BajoRendimiento(){
           this.sinGrafico=false;
            console.log(this.selectedPrograma);
            if(this.selectedPrograma==null) this.hideModal();

            this.alumnosBR=[];
            this.alumnosBRPlan=[];
            if(this.selectedPrograma!=null && this.periodo[0]!=null && this.periodo[1]!=null  ){            
                var programas=[];
                console.log(this.selectedPrograma);
                if(this.selectedPrograma==0){
                    var n=this.programas.length;
                    for(let i=1;i<n-1;i++ ){                    
                        programas[i]=this.programas[i].id_programa;
                    }
                }else{
                    programas[0]=this.selectedPrograma;
                }

                const params = {
                    id_programa: programas,
                    id_facultad: this.$store.state.programaActual.id_facultad,
                    id_institucion: 1,
                    fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                    fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
                };
                console.log('params: ',params);
                var data =await axios.post("usuarios/datosBajoRendimiento", params);
                var dataPlan =await axios.post("usuarios/datosAlumnosPlan", params);
                console.log('data2:',dataPlan);
                // if(data.data.indexOf("Se han encontrado errores")!=-1) this.sinGrafico=true;
                //LLenado del gráfico de la izquierda
                this.alumnosBR.push({data:"Asistieron >50%-Cuarta",total:data.data[4].total_alumnos});
                this.alumnosBR.push({data:"Asistieron <50%-Cuarta",total:data.data[5].total_alumnos});

                this.alumnosBR.push({data:"Asistieron >50%-Trica",total:data.data[2].total_alumnos});
                this.alumnosBR.push({data:"Asistieron <50%-Trica",total:data.data[3].total_alumnos});
                
                this.alumnosBR.push({data:"Asistieron >50%-Bica",total:data.data[0].total_alumnos});
                this.alumnosBR.push({data:"Asistieron <50%-Bica",total:data.data[1].total_alumnos});
                
                //LLenado del gráfico de la derecha

               
                this.alumnosBRPlan.push({data:"Cumplieron-Cuarta",total:dataPlan.data[2].total_alumnos});
                 this.alumnosBRPlan.push({data:"Cumplieron-Trica",total:dataPlan.data[1].total_alumnos});
                 this.alumnosBRPlan.push({data:"Cumplieron-Bica",total:dataPlan.data[0].total_alumnos});              
               
            }else{
                this.sinGrafico=true;
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
               console.log('f');
            
           
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
            console.log(this.periodo);
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
        }
        
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
</style>