<template>
    <div name="FormSatisfaccion">
        <div class="contenedor">
        <div class="row" style="text-align:left;">
            <div class="col-12 col-md-4">
                <div class="row">
                    <h5 class="col-12 col-md-3">Fechas:</h5>
                    <date-picker class="wide-date-example col-12 col-md-8"
                        v-model="periodo" 
                        width="20" :lang="lang" 
                        format="DD/MM/YYYY" range 
                        placeholder="Selecciona Rango de Fechas"
                        :disabled-date="disabledAfterToday"
                        @input="handlePeriodChange"
                        input-class="form-control" style="left:10px;width:50%">
                    </date-picker>
                </div>
            </div>
            <div class="col-12 col-md-2 offset-md-4" style="margin-bottom:10px;text-align: right;margin-right: 0px;margin-top: 0px;">
                <button type="button" class="btn btn-info"  @click="generarReporte()" >Generar</button>
            </div>
            <div v-if="generado==true" class="col-12 col-md-2" style="margin-bottom:10px;text-align: up;margin-right: 0px;margin-top: 0px;">
                <button  type="button" style="border-radius: 10px" @click="downloadWithCSS()" class="btn btn-info">Descargar Reporte</button>
            </div>
        </div>

        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
        <div v-if="utilidad.length==0 && satisfaccion.length==0 && decisiones.length==0 && eficiencia.length==0 && recomendado.length==0">
            No se ha generado ningún reporte
        </div>
        <div class="row">
            <div id="content1" class="col-12 col-md-6" v-if="satisfaccion.length>0">
                <strong>Satisfacción con el acompañamiento</strong>
                <pie-chart :chartData="satisfaccion" :options="chartOp2" label='Satisfacción con el acompañamiento'></pie-chart>
            </div>
            <div id="content2" class="col-12 col-md-6" v-if="utilidad.length>0">
                <strong>Utilidad del programa de tutoría</strong>
                <pie-chart :chartData="utilidad" :options="chartOp2" label='Utilidad del programa de tutoría'></pie-chart>
            </div>
        </div>

        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
        
        <div class="row">

            <div id="content3" class="col-12 col-md-6" v-if="decisiones.length>0">
                <strong>Utilizó las recomendaciones para la toma de decisiones</strong>
                <pie-chart :chartData="decisiones" :options="chartOp2" label='Utilizó las recomendaciones para la toma de decisiones'></pie-chart>
            </div>
            <div id="content4" class="col-12 col-md-6" v-if="eficiencia.length>0">
                <strong>El programa solucionó su situación</strong>
                <pie-chart :chartData="eficiencia" :options="chartOp2" label='El programa solucionó su situación'></pie-chart>
            </div>
        </div>

        <div class="row">
            <div id="content5" class="col-12 col-md-6 offset-md-3" v-if="recomendado.length>0">
                <strong>Recomendación del programa de tutoría a sus pares</strong>
                <pie-chart :chartData="recomendado" :options="chartOp2" label='Recomendación del programa de tutoría a sus pares'></pie-chart>
            </div>
        </div>

        </div>
        
        <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
            <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
                <b-spinner style="width: 3rem; height: 3rem;"/>
                <br >Cargando... 
            </div>
        </b-modal>
    </div>
</template>



<script>
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import axios from 'axios';
// import LineChart from '@/components/Reportes/LineChart.vue';
// import BarChart from '@/components/Reportes/BarChart.vue';
// import DoughnutChart from '@/components/Reportes/DoughnutChart.vue';
import PieChart from '@/components/Reportes/PieChart.vue';
import moment from 'moment';
export default {
    components:{
        DatePicker, 
        // BarChart,
        // DoughnutChart,
        // LineChart,
        PieChart
    },
    data(){
        return{
            //filtros
            generado:false,
            facultad:[],
            selectedFacultad:null,
            facultadSelect:[],
            programas:[],
            selectedPrograma:null,
            programasSelect:[],
            //lista de identificadores
            idPogramas:[],
            idFacultades:[],
            //graficos
            satisfaccion:[],
            utilidad:[],
            decisiones:[],
            eficiencia:[],
            recomendado:[],
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
            },
            chartOp2:{
                responsive: true,
                pieceLabel: {
                    mode: 'percentage',
                    precision: 1
                },
                maintainAspectRatio:false,
                plugins: {
                    datalabels: {
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value*100 / sum).toFixed(2)+"%";
                            return percentage;
                        }
                    }
                }
            },
            
        }

    },
    mounted(){
        
        document.querySelector("#container > div > div:nth-child(2) > div > div:nth-child(1) > div.col-12.col-md-4 > div > div > div > input").style.borderRadius = "1.25rem"; 
        document.querySelector("#container > div > div:nth-child(2) > div > div:nth-child(1) > div.col-12.col-md-4 > div > div > div > input").style.border= "0.5px solid #757575";    
        document.querySelector("#container > div > div:nth-child(2) > div > div:nth-child(1) > div.col-12.col-md-4 > div > div > div > input").style.fontWeight = "400";
        document.querySelector("#container > div > div:nth-child(2) > div > div:nth-child(1) > div.col-12.col-md-4 > div > div > div > input").style.fontSize = "1rem";
        document.querySelector("#container > div > div:nth-child(2) > div > div:nth-child(1) > div.col-12.col-md-4 > div > div > div > input").style.height = "2.4em";
        this.generarReporte()
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
    },
    methods:{
        downloadWithCSS() {            
            this.showModal()
            var doc = new jsPDF('p', 'mm', 'a4');
            doc.setFontSize(29);
            doc.text('Reporte de Encuestas',60,20);
            doc.text('\n',10,10);
            const options = { background: 'white', height: 845, width: 900 };
            domtoimage.toPng(document.querySelector("#content1"), options).then((dataUrl) => {
                doc.addImage(dataUrl,'PNG', 40, 75, 210, 340);
                doc.addPage();
                domtoimage.toPng(document.querySelector("#content2"), options).then((dataUrl) => {
                    doc.addImage(dataUrl,'PNG', 40, 75, 210, 340);
                    doc.addPage();
                    domtoimage.toPng(document.querySelector("#content3"), options).then((dataUrl) => {
                        doc.addImage(dataUrl,'PNG', 40, 75, 210, 340);
                        doc.addPage();
                        domtoimage.toPng(document.querySelector("#content4"), options).then((dataUrl) => {
                            doc.addImage(dataUrl,'PNG', 40, 75, 210, 340);
                            doc.addPage();
                            domtoimage.toPng(document.querySelector("#content5"), { background: 'white', height: 845, width: 990 }).then((dataUrl) => {
                                doc.addImage(dataUrl,'PNG', -40, 75, 230, 340);
                                this.hideModal()
                                doc.save("ReporteEncuestas.pdf");
                            });
                        });
                    });
                });
            });
        },
        handlePeriodChange(periodo) {
            this.periodo = periodo;
        },
        disabledAfterToday(date){
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },

        async Encuestas(){
            this.showModal()
            this.satisfaccion=[];
            this.utilidad=[];
            this.decisiones=[];
            this.eficiencia=[];
            this.recomendado=[];
            
            const params = {
                id_programa: [this.$store.state.programaActual.id_programa],
                fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
            };

            var data =await axios.post("encuesta/reporteEncuesta", params);
           
            //LLenado de gráficos
            data.data.forEach(element => {
                if(element.id_encuesta == 1){
                    element.data = element.nombre
                    this.satisfaccion.push(element)
                }
            });
            data.data.forEach(element => {
                if(element.id_encuesta == 2){
                    element.data = element.nombre
                    this.utilidad.push(element)
                }
            });
            data.data.forEach(element => {
                if(element.id_encuesta == 3){
                    element.data = element.nombre
                    this.decisiones.push(element)
                }
            });
            data.data.forEach(element => {
                if(element.id_encuesta == 4){
                    element.data = element.nombre
                    this.eficiencia.push(element)
                }
            });
            data.data.forEach(element => {
                if(element.id_encuesta == 5){
                    element.data = element.nombre
                    this.recomendado.push(element)
                }
            });

            this.hideModal()

        },

        generarReporte(){
            this.generado = true
            this.Encuestas();
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        
    }

    
}



</script>


<style lang="scss" scoped>
@import '../../assets/styles/material.css';

.wide-date-example {
    margin-top: -5px;
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