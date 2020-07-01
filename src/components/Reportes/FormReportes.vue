<template>
  <div class="FormReportes">
      <div class="container">
        <div class="top-titulo" style="text-align:left;">
            <div class="col-4">
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
            <!--div class="col-4">
                <div class="row">
                <div class="col"><h5>Facultad: </h5></div>
                <div class="col" style="text-align: right; top: 50%"><h8 style="top:50%;cursor:pointer;color:#17a2b8;">Seleccionar</h8></div>
                </div>
                <select class="form-control"  v-model="selectedFacultad" v-on:change="listarProgramas()">
                    <option disabled selected :value="null" focusable="false">Selecciona una facultad</option>
                    <option 
                        v-for="(facultad, index) in facultades" 
                        :key="index" 
                        :value="facultad">
                        {{ facultad.nombre }}
                    </option>
                </select>
                <ul class="overflow-wrap list-group list-group-flush" style="text-align:left;">
                    <li class="motivos-seleccionados list-group-item" style="text-align:left;"
                        v-for="(facultad,index) in facultadesSelect"  
                        :key="index">
                        {{facultad.nombre}}
                        <span name="remove" class="close" @click="deleteFacu(index)" style="float:right;">&times;</span>           
                    </li>
                </ul>
            </div>
            <div class="col-4">
                <div class="row">
                    <div class="col"><h5>Programa: </h5></div>
                    <div  class="col" style="text-align: right; top: 50%"><h8 style="top:50%;cursor:pointer;color:#17a2b8;">Seleccionar</h8></div>
                </div>
                <select class="form-control"  v-model="selectedPrograma">
                    <option disabled selected :value="null" focusable="false">Selecciona un programa</option>
                    <option 
                        v-for="(programa, index) in progSinDefault"
                        :key="index" 
                        :value="programa" >
                        {{ programa.nombre }}
                    </option>
                </select>
                <ul class="overflow-wrap list-group list-group-flush" style="text-align:left;">
                    <li class="motivos-seleccionados list-group-item" style="text-align:left;"
                        v-for="(programa,index) in programasSelect"  
                        :key="index">
                        {{programa.nombre}}
                        <span name="remove" class="close" @click="deleteProg(index)" style="float:right;">&times;</span>        
                    </li>
                </ul>
            </div-->
            <div class="botones" style="margin-bottom:10px;margin-right: 0px;">
                <button type="button" class="btn btn-info"  @click="generarReporte()" >Generar</button>
            </div>
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
        
        <div class="row mt-5">
            <div  v-if="asignados.length>0">
                <strong>Cantidad de Alumnos Asignados</strong>
                <pie-chart :chartData="asignados" :options="chartOp2" label='Alumnos asignados'></pie-chart>
                <div class="botones" style="margin-bottom:10px;text-align: right">
                    <button type="button" class="btn btn-info"  @click="verDetalleAsignado()" >Ver más</button>
                </div>
            </div>
            <div class="col-6"  v-if="atenciones.length>0">
                <strong>Cantidad de Atenciones</strong>
                <line-chart :chartData="atenciones" :options="chartOp" label='Atenciones'></line-chart>
                <div class="botones" style="margin-bottom:10px;text-align: right">
                    <button type="button" class="btn btn-info"  @click="verDetalleAtenciones()" >Ver más</button>
                </div>
            </div>
            <div class="botones" style="margin-bottom:10px;text-align: right">
                <button type="button" class="btn btn-info"  @click="verDetalleAtenciones()" >Ver más</button>
            </div>
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
        <div class="row mt-5">
            <div v-if="satisfaccion.length>0">
                <strong>Satisfacción del alumno</strong>
                <pie-chart :chartData="satisfaccion" :options="chartOp2" label='Satisfacción del alumno'></pie-chart>
                <div class="botones" style="margin-bottom:10px;text-align: right">
                    <button type="button" class="btn btn-info"  @click="verDetalleSatisfaccion()" >Ver más</button>
                </div>
            </div>
            <div v-if="planAccion.length>0">
                <strong>Cumplimiento de Planes de Acción</strong>
                <line-chart :chartData="planAccion" :options="chartOp" label='Cumplimiento de Planes de Acción'></line-chart>
                <div class="botones" style="margin-bottom:10px;text-align: right">
                    <button type="button" class="btn btn-info"  @click="verDetalleRendimiento()" >Ver más</button>
                </div>
            </div>
            <div class="botones" style="margin-bottom:10px;text-align: right">
                <button type="button" class="btn btn-info"  @click="verDetalleRendimiento()" >Ver más</button>
            </div>
        </div>
      </div>

  </div>
</template>



<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import axios from 'axios';
import LineChart from '@/components/Reportes/LineChart.vue'
import PieChart from '@/components/Reportes/PieChart.vue'
import moment from 'moment';
export default {
    components:{
        LineChart,
        PieChart,
        DatePicker
    },
    data(){
        return{
            //filtros
            facultades:[],
            selectedFacultad:null,
            facultadesSelect:[],
            programas:[],
            selectedPrograma:null,
            programasSelect:[],
            //lista de identificadores
            idPogramas:[],
            idFacultades:[],
            //graficos
            satisfaccion:[],
            planAccion:[],
            asignados:[],
            atenciones:[],
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
        
        document.querySelector("#container > div > div.FormReportes > div > div.top-titulo > div:nth-child(1) > div > div > input").style.borderRadius = "1.25rem"; 
        document.querySelector("#container > div > div.FormReportes > div > div.top-titulo > div:nth-child(1) > div > div > input").style.border= "0.5px solid #757575";    
        document.querySelector("#container > div > div.FormReportes > div > div.top-titulo > div:nth-child(1) > div > div > input").style.fontWeight = "400";
        document.querySelector("#container > div > div.FormReportes > div > div.top-titulo > div:nth-child(1) > div > div > input").style.fontSize = "1rem";
        document.querySelector("#container > div > div.FormReportes > div > div.top-titulo > div:nth-child(1) > div > div > input").style.height = "2.4em";
  
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
        this.idPogramas.push(this.$store.state.programaActual.id_programa);
        this.RatioAsignado();
        this.RatioAtenciones();
        //this.listarFacultades();
    },
    methods:{
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
                console.log(this.facultades);
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
                console.log(this.programas);
            })
            .catch(e => {
                console.log(e.response);
            });

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

            console.log("asignadosXUniversidad ");
            console.log(data);
            this.asignados.push({date:"Asignados",total:data.data[0].asignados});
            this.asignados.push({date:"No Asignados",total:data.data[1].noasignados});


        },
        handlePeriodChange(periodo) {
            this.periodo = periodo;
        },
        disabledAfterToday(date){
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },

        async RatioAtenciones(){
            
            this.atenciones=[];
            const params = {
                id_programa:this.idPogramas,
                id_facultad:11,
                fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
            };
            
            const { data } =await axios.post("programa/asistenciaXPrograma", params);
            console.log("Asistencia por programa");
            console.log(data);
            /*
            data.forEach(d =>{
                if(d.asistencia=="asi") this.atenciones.push({date:"Atendidos",total:d.cantalum});
                else if(d.asistencia=="noa") this.atenciones.push({date:"No Atendidos",total:d.cantalum});
                else if(d.asistencia=="pen") this.atenciones.push({date:"Pendientes",total:d.cantalum});   
                else if(d.asistencia=="can") this.atenciones.push({date:"Cancelados",total:d.cantalum});                
            })*/
            

        },

        async RatioAtencionesOtraPantalla(){
            this.atenciones=[];
            const params = {
                id_programa: this.$store.state.programaActual.id_programa,
                fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
                fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
            };
            console.log(params.fecha_ini);
            //fecha: moment(new Date(String(this.datetime))).format('YYYY-MM-DD'),
            //hora_inicio: moment(new Date(String(this.datetime))).format('hh:mm:ss'), 
            const { data } =await axios.post("programa/cantAtendidos", params);
            console.log(data);
            
            data.forEach(d =>{
                if(d.asistencia=="asi") this.atenciones.push({date:"Atendidos",total:d.cantalum});
                else if(d.asistencia=="noa") this.atenciones.push({date:"No Atendidos",total:d.cantalum});
                else if(d.asistencia=="pen") this.atenciones.push({date:"Pendientes",total:d.cantalum});   
                else if(d.asistencia=="can") this.atenciones.push({date:"Cancelados",total:d.cantalum});                
            })
            console.log(this.atenciones);
        },

        generarReporte(){
            //this.RatioAtenciones();
            this.RatioAsignado();
        },
        verDetalleAsignado(){
            this.$router.push('/reporteAsignado');
        },
        verDetalleAtenciones(){
            this.$router.push('/reporteAtenciones');

        },
        verDetalleSatisfaccion(){
            this.$router.push('/reporteSatisfaccion');

        },
        verDetalleRendimiento(){
            this.$router.push('/reporteRendimiento');

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