<template>
  <div ref="content" class="FormReportesRendimiento">
      <div class="contenedor">
        <div class="top-titulo row" style="text-align:left;">
            <div class="col-12 col-md-4">
                <h5>Fechas:</h5>
                <date-picker style="left:0px" class="wide-date-example"
                    v-model="periodo" 
                    width="20" :lang="lang" 
                    format="DD/MM/YYYY" range 
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
            </div>
            <div class="col-12 col-md-2 offset-md-2"  style="margin-bottom:10px;text-align: up;margin-right: 0px;margin-top: 0px;">
                <button type="button" class="btn btn-info"  @click="generarReporte()" >Generar</button>
            </div>
        </div>
        <div class="top-titulo" style="text-align:left;">
            <div class="col-1">
                <div>Filtros: </div>
            </div>
            <div class="col-10 offset-1" style="text-align:left;">
                <div class="row">
                <ul  class="col-12 col-md-6 col-lg-4 overflow-wrap list-group list-group-flush" v-for="(tutor,index) in tutorSelect" :key="index" style="margin-bottom: 0px;text-align:left;">
                    <li class="motivos-seleccionados list-group-item " style="text-align:left;">
                        {{ tutor.usuario.nombre + " " + tutor.usuario.apellidos }}
                        <span name="remove" class="close col-2" @click="deleteTutor(index, tutor)" >&times;</span> 
                    </li>
                </ul>    
                </div>
            </div>
        </div>
        <!-- aqui estaba mi cabcera -->
        <div class="row" style="margin-left:1px;text-align:left;">
        
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

        <div  ref="crearimagen" class="row mt-2">            

            <div id="content1"  class="col-12 col-md-6" v-if="alumnosBRPlan.length>0">
                
                <strong style="margin-left:80px">Cantidad de alumnos que cumplieron su Plan de Acción</strong>
                <bar-chart :chartData="alumnosBRPlan" :options="chartOp"
                label='Alumnos con Plan de Acción terminado' ></bar-chart>
                
            </div>
            
        </div>
        <button  type="button" style="border-radius: 10px" @click="downloadWithCSS()" class="btn btn-info">Descargar Reporte</button>
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
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import axios from 'axios';

import BarChart from '@/components/Reportes/BarChart.vue'
// import DoughnutChart from '@/components/Reportes/DoughnutChart.vue'
import moment from 'moment';
import Swal from 'sweetalert2';
export default {
    components:{

        DatePicker,       
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

            lang: {
                formatLocale: {
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    // MMM
                    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
                    // dddd
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    // ddd
                    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                    // dd
                    weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                    firstDayOfWeek: 1,
                },
                monthBeforeYear: true,
            },
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
        //descargar reporte
        downloadPDF(){            
            const pdf = new jsPDF();
            //var reporte=document.getElementById('reporte');
            //var imag=reporte.toDataURL('image/png');
            //pdf.addImage(imag,'PNG',10,10);
            //pdf.text('Hola vizcochitos',10,10);
            const html=this.$refs.content.innerHTML;
            pdf.fromHTML(html,15,15,{width:150});
            pdf.save('salida2.pdf');
        },
        downloadWithCSS() {            
            var doc = new jsPDF('p', 'mm', 'a4');
            doc.setFontSize(29);
            doc.text('Reporte de Plan de Acción',50,20);
            doc.text('\n',10,10);
            const options = { background: 'white', height: 845, width: 1050 };
            domtoimage.toPng(document.querySelector("#content1"), options).then((dataUrl) => {
                doc.addImage(dataUrl,'PNG', 30, 50, 210, 340);
                doc.save("ReportePlanDeAccion.pdf");
            });
        },

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
                this.tutores=res.data.sort((a, b) => { return  a.usuario.nombre.localeCompare(b.usuario.nombre);});
          
                // this.tutores=res.data;
               
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

          
                  const params2 = {
                    id_programa: programas,
                    id_facultad: this.$store.state.programaActual.id_facultad,
                    id_tutor:this.idTutores,
                    fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                    fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
                };

                var dataPlan =await axios.post("usuarios/datosAlumnosPlan", params2);

                //LLenado del gráfico de la derecha
                 console.log('datos: ',dataPlan);

                 this.alumnosBRPlan.push({data:"< 50%",total:dataPlan.data[1].total_alumno});
                 this.alumnosBRPlan.push({data:"> 50%",total:dataPlan.data[0].total_alumno});

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
.list-group-item {
    padding-top: 0.1rem;
    padding-right: 1rem;
    padding-bottom: 0.1rem;
    margin-bottom: 0.1rem;
    padding-left: 1rem;
    background-color: rgba(0, 0, 0, 0.06);
}
</style>