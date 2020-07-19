<template>
  <div class="FormAsignado">
      <div class="contenedor">
        <div class="top-titulo" style="text-align:left;">
            <div class="col-4">
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
            <div class="col-4">
                <div class="row">
                    <div class="col"><h5>Tutor(a): </h5></div>
                    <div class="col" style="text-align: right; top: 50%"><h6 style="top:50%;cursor:pointer;color:#17a2b8;" 
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
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
        
        <div class="row">
            <div id="content1" v-if="asignadosXTutor.length>0" style="width:100%; margin-left: 20px; margin-right:20px">
                <strong>Cantidad de Alumnos Asignados por Tutor</strong>
                <bar-chart :chartData="asignadosXTutor" :options="chartOp" label='Alumnos asignados'></bar-chart>
            </div>
        </div>
        <button  type="button" style="border-radius: 10px" @click="downloadWithCSS()" class="btn btn-info">Descargar Reporte</button>
      </div>
    
  </div>
</template>



<script>
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import axios from 'axios';
import BarChart from '@/components/Reportes/BarChart.vue';
import moment from 'moment';
export default {
    components:{
        DatePicker, 
        BarChart
    },
    data(){
        return{
            //filtros
            facultad:[],
            selectedFacultad:null,
            facultadSelect:[],
            programas:[],
            selectedPrograma:null,
            programasSelect:[],
            tutores:[],
            selectedTutor:null,
            tutorSelect:[],
            //lista de identificadores
            idPogramas:[],
            idFacultades:[],
            idTutores:[],
            //graficos
            asignados:[],
            asignadosXTutor:[],
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
                    xAxes: [{
                        stacked: true,
                        ticks:{precision:0}
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks:{precision:0}
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
            }
            
        }

    },
    mounted(){
        
        document.querySelector("#container > div > div.FormAsignado > div > div.top-titulo > div:nth-child(1) > div > div > input").style.borderRadius = "1.25rem"; 
        document.querySelector("#container > div > div.FormAsignado > div > div.top-titulo > div:nth-child(1) > div > div > input").style.border= "0.5px solid #757575";    
        document.querySelector("#container > div > div.FormAsignado > div > div.top-titulo > div:nth-child(1) > div > div > input").style.fontWeight = "400";
        document.querySelector("#container > div > div.FormAsignado > div > div.top-titulo > div:nth-child(1) > div > div > input").style.fontSize = "1rem";
        document.querySelector("#container > div > div.FormAsignado > div > div.top-titulo > div:nth-child(1) > div > div > input").style.height = "2.4em";
  
    },
    computed: {
        progSinDefault: function () {
            return this.programas.filter(i => i != null && i.codigo != this.selectedFacultad.codigo)
        },
        progDefault: function () {
            return this.programas.filter(i => i.codigo == this.selectedFacultad.codigo)
        }
    },
    created(){
        this.periodo = [this.inicio,this.fin];
        this.RatioAsignadoXTutor();
        this.listarTutores();
    },
    methods:{
        downloadWithCSS() {            
            const doc = new jsPDF('l', 'mm', 'a3');
            doc.setFontSize(29);
            doc.text('Reporte de Alumnos Asignados',140,20);
            doc.text('\n',10,10);
            const options = { background: 'white', height: 845, width: 1800 };
            domtoimage.toPng(document.querySelector("#content1"), options).then((dataUrl) => {
                doc.addImage(dataUrl,'JPEG', 10, 50, 420, 340);
                doc.save("ReporteAsignados.pdf");
            });
        },
        listarFacultades(){
            const params = {
                id_institucion:1,
            };
            axios.post('facultad/listarFacultades', params)
            .then( response => {
                this.facultades=response.data;
                var facu=new Object();
                facu.nombre="Todos";
                facu.id_facultad=0;
                facu.codigo="TODOS";
                this.facultades.push(facu);
            })
            .catch(e => {
                console.log(e.response);
            });

        },
        listarProgramas(){
            
            const params = {
                id_facultad:this.selectedFacultad.id_facultad
            };
            axios.post('facultad/listarProgramasDefault', params)
            .then( response => {
                this.programas=response.data;
                var prog=new Object();
                prog.nombre="Todos";
                prog.id_programa=0;
                prog.codigo="TODOS";
                this.programas.push(prog);
            })
            .catch(e => {
                console.log(e.response);
            });

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
                var tutor=new Object();
                tutor.usuario=new Object();
                tutor.usuario.nombre="Todos";
                tutor.usuario.codigo=0;
                tutor.usuario.apellidos="";
                this.tutores.push(tutor);         
                })
                .catch(e => {
                console.log(e.response);
                })
        },

        async RatioAsignado(){
            this.asignados=[];
            const params = {
                id_programa: this.idPogramas,
                id_facultad: this.idFacultades,
                id_institucion: 1,
                fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
            };
            var data;
            if(this.idPogramas.length>0)
                data =await axios.post("registros/asignadosXPrograma", params);
            else if(this.idFacultades.length>0)
                data =await axios.post("registros/asignadosXFacultad", params);
            else
                data =await axios.post("registros/asignadosXUniversidad", params);

            data.forEach(d =>{
                this.asignados.push({data:d.nombre,total:d.cantalum});             
            })

        },
        async RatioAsignadoXTutor(){
            this.asignadosXTutor=[];
            const params = {
                id_programa:this.$store.state.programaActual.id_programa,
                id_tutores: this.idTutores,
                fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
            };
            const { data } = await axios.post("registros/cantAlumnosXTutores", params);

            this.asignadosXTutor=data;
            /*
            data.forEach(d =>{
                this.asignadosXTutor.push({data:d.nombre+" "+d.apellidos,total:d.cantalum});             
            })
            */


        },

        handlePeriodChange(periodo) {
            this.periodo = periodo;
        },
        disabledAfterToday(date){
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
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



        generarReporte(){
            //this.RatioAtenciones();
            this.RatioAsignadoXTutor();
        }
        
    }

    
}



</script>


<style lang="scss" scoped>
@import '../../assets/styles/material.css';

.wide-date-example {
    width: 100% !important;
}

.list-group-item {
    padding-top: 0.1rem;
    padding-right: 1rem;
    padding-bottom: 0.1rem;
    padding-left: 1rem;
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
#wrapper {
  display: flex;
  align-items: center;
  justify-content: right;
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
.button{
    top:0%;
    position:relative
}
.font-weight-bolder {
    color: black;
    font-size: 24px;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif !important;
}
.botones {
    margin:auto;
    top:0%;
    position:relative
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
    top:0%;
    position:relative
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