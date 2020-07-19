<template>
  <div class="FormAtenciones">
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

        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
        <div v-if="atenciones.length==0 && atencionesXFecha.length==0 && atencionesXTutor.length==0">
        No se ha generado ningún reporte
        </div>
        <div class="row">
            <div  ref="crearimagen" id="content1" class="col-12 col-md-4" v-if="atenciones.length>0">
                <strong>Cantidad de Atenciones</strong>
                <doughnut-chart :chartData="atenciones" :options="chartOp2" label='Alumnos atendidos'></doughnut-chart>
            </div>
            <div  ref="crearimagenes" id="content2" class="col-12 col-md-4" v-if="atencionesXTipoTutoria.length>0">
                <strong>Alumnos atendidos por Tipo de Tutoría</strong>
                <pie-chart :chartData="atencionesXTipoTutoria" :options="chartOp2" label='Alumnos atendidos por Tipo de Tutoría'></pie-chart>
            </div>
            <div  ref="crearimagen3" id="content3" class="col-12 col-md-4" v-if="atencionesXMotivoConsulta.length>0">
                <strong>Alumnos atendidos por Motivo de Consulta</strong>
                <bar-chart :chartData="atencionesXMotivoConsulta" :options="chartOp" label='Alumnos atendidos por Motivo de Consulta'></bar-chart>
            </div>
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>        
        <div class="row">
            <div  ref="crearimagen4" id="content4" class="col-12" v-if="atencionesXTutor.length>0" style="width:100%; margin-left: 20px; margin-right:20px">
                <strong>Cantidad de Alumnos Atendidos por Tutor</strong>
                <bar-chart :chartData="atencionesXTutor" :options="chartOp" label='Alumnos atendidos'></bar-chart>
            </div>
            <div  ref="crearimagen5" id="content5" class="col-12" v-if="atencionesXFecha.length>0">
                <strong>Atenciones por Fecha</strong>
                <line-chart :chartData="atencionesXFecha" :options="chartOp" label='Alumnos atendidos'></line-chart>
            </div>        
        </div>
        <button  type="button" style="border-radius: 10px" @click="downloadWithCSS()" class="btn btn-info">Descargar Reporte</button>
      </div>    
  </div>
</template>



<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import axios from 'axios';
import LineChart from '@/components/Reportes/LineChart.vue';
import BarChart from '@/components/Reportes/BarChart.vue';
import DoughnutChart from '@/components/Reportes/DoughnutChart.vue';
import PieChart from '@/components/Reportes/PieChart.vue';
import moment from 'moment';
export default {
    components:{
        DatePicker, 
        BarChart,
        DoughnutChart,
        LineChart,
        PieChart
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
            atencionesXTipoTutoria:[],
            atencionesXMotivoConsulta:[],
            atenciones:[],
            atencionesXFecha:[],
            atencionesXTutor:[],
            //datepicker
            inicio: new Date(new Date().getTime() - 30 * 24 * 3600 * 1000),
            fin: new Date(),
            periodo:'',
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
            },
            chartOp2:{
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
        
        document.querySelector("#container > div > div.FormAtenciones > div > div.top-titulo > div:nth-child(1) > div > div > input").style.borderRadius = "1.25rem"; 
        document.querySelector("#container > div > div.FormAtenciones > div > div.top-titulo > div:nth-child(1) > div > div > input").style.border= "0.5px solid #757575";    
        document.querySelector("#container > div > div.FormAtenciones > div > div.top-titulo > div:nth-child(1) > div > div > input").style.fontWeight = "400";
        document.querySelector("#container > div > div.FormAtenciones > div > div.top-titulo > div:nth-child(1) > div > div > input").style.fontSize = "1rem";
        document.querySelector("#container > div > div.FormAtenciones > div > div.top-titulo > div:nth-child(1) > div > div > input").style.height = "2.4em";
  
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
        //this.RatioAsignado();
        //this.RatioAtencionesXTutor();
        this.listarTutores();
        //this.RatioAtencionesXTutor();
        //this.RatioAtenciones();
        //this.RatioAtencionesXFecha();
        //this.RatioAtencionesXTipoTutoria();
    },
    methods:{
        downloadWithCSS() {            
            const doc = new jsPDF('p', 'mm', 'a4');
            var img1='';
            var img2='';
            var img3='';
            var img4='';
            var img5='';
            var canvasElement = document.createElement('canvas');
            html2canvas(document.querySelector("#content1"), { canvas: canvasElement 
                }).then(function (canvas) {
                img1 = canvas.toDataURL("image/jpeg", 100);
                html2canvas(document.querySelector("#content2"), { canvas: canvasElement 
                    }).then(function (canvas) {
                    img2 = canvas.toDataURL("image/jpeg", 100);
                    html2canvas(document.querySelector("#content3"), { canvas: canvasElement 
                        }).then(function (canvas) {
                        img3 = canvas.toDataURL("image/jpeg", 100);
                        html2canvas(document.querySelector("#content4"), { canvas: canvasElement 
                            }).then(function (canvas) {
                            img4 = canvas.toDataURL("image/jpeg",100);
                            html2canvas(document.querySelector("#content5"), { canvas: canvasElement 
                                }).then(function (canvas) {
                                img5 = canvas.toDataURL("image/jpeg",100);
                                //img5.width = 700;
                                //img5.height = 500;
                                doc.text('Reporte de Atenciones',80,10);
                                doc.text('\n',10,10);
                                doc.addImage(img1,'JPEG',40,75);
                                doc.addPage();
                                doc.addImage(img2,'JPEG',40,75);
                                doc.addPage();
                                doc.addImage(img3,'JPEG',40,75);
                                doc.addPage('a3', 'l');
                                doc.addImage(img4,'JPEG',0,80);
                                doc.addPage('a3', 'l');
                                doc.addImage(img5,'JPEG',0,80);
                                doc.save("ReporteAtenciones.pdf");
                            });
                        });
                    });
                });
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
            console.log(this.selectedFacultad);
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
                tutor.usuario.apellidos="";
                this.tutores.push(tutor);    
                })
                .catch(e => {
                console.log(e.response);
                })
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


        async RatioAtencionesXTutor(){
            this.atencionesXTutor=[];
            const params = {
                id_programa:this.$store.state.programaActual.id_programa,
                id_tutores: this.idTutores,
                fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
            };
            const { data } = await axios.post("programa/asistenciaXTutores", params);
            
            this.atencionesXTutor=data;
            

        },
        async RatioAtenciones(){
            this.atenciones=[];
            const params = {
                id_programa: this.$store.state.programaActual.id_programa,
                id_tutores: this.idTutores,
                fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
            };
            //fecha: moment(new Date(String(this.datetime))).format('YYYY-MM-DD'),
            //hora_inicio: moment(new Date(String(this.datetime))).format('hh:mm:ss'), 
            const { data } =await axios.post("programa/cantAtendidos", params);
            
            
            data.forEach(d =>{
                if(d.data=="asi") this.atenciones.push({data:"Atendidos",total:d.total});
                else if(d.data=="noa") this.atenciones.push({data:"No Atendidos",total:d.total});
                else if(d.data=="pen") this.atenciones.push({data:"Pendientes",total:d.total});   
                else if(d.data=="can") this.atenciones.push({data:"Cancelados",total:d.total});                
            })
            console.log(this.atenciones);
            
        },
        async RatioAtencionesXFecha(){
            
            this.atencionesXFecha=[];
            const params = {
                id_programa:this.$store.state.programaActual.id_programa,
                id_tutores:this.idTutores,
                fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
            };
            
            const { data } =await axios.post("programa/citasXDia", params);
            // verificar si ya no es necesario el bucle
            // se cambió la función del back
            this.atencionesXFecha=data;
            console.log(this.atencionesXFecha);
            /*
            data.forEach(d =>{
                this.atencionesXFecha.push({data:d.fecha,total:d.count});               
            })*/
            

        },
        
        async RatioAtencionesXTipoTutoria(){
            this.atencionesXTipoTutoria=[];
            const params = {
                id_programa:this.$store.state.programaActual.id_programa,
                id_tutores:this.idTutores,
                fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
            };
            
            const { data } =await axios.post("TipoTutoria/asistenciaXTipoTutorias", params);
            this.atencionesXTipoTutoria=data;

        },
        async RatioAtencionesXMotivoConsulta(){
            this.atencionesXMotivoConsulta=[];
            const params = {
                id_programa:this.$store.state.programaActual.id_programa,
                id_tutores:this.idTutores,
                fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
            };
            
            const { data } =await axios.post("motivosConsulta/asistencia", params);
            this.atencionesXMotivoConsulta=data;

        },

        generarReporte(){
            this.RatioAtencionesXMotivoConsulta();
            this.RatioAtencionesXTutor();
            this.RatioAtenciones();
            this.RatioAtencionesXFecha();
            this.RatioAtencionesXTipoTutoria();
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