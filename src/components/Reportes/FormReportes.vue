<template>

  <div  class="FormReportes">
      <button  type="button" style="border-radius: 10px;margin-right:50px;padding-top:5px;margin-top:-25px" @click="downloadPDF" class="row btn btn-info">Descargar</button>
        
      <div ref="content"  class="container">
        <div class="row mt-5">            
            <div class="col-7"  v-if="arrPositive.length>0">
                <strong>Alumnos Asignados</strong>
                <line-chart :chartData="arrPositive" :options="chartOp" label='Alumnos asignados'></line-chart>
            </div>            
            <div class="col-1"></div>
            <div class="col-3" v-if="arrAsistencia.length>0">
                <strong>Atenciones</strong>
                <pie-chart id="reporte" :chartData="arrAsistencia" :options="chartOp2" label='Alumnos asignados'></pie-chart>
            </div>
        </div>
      </div>

  </div>
</template>



<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import LineChart from '@/components/Reportes/LineChart.vue'
import PieChart from '@/components/Reportes/PieChart.vue'
//import moment from 'moment';
export default {
    components:{
        LineChart,
        PieChart,

    },
    data(){
        return{
            arrPositive:[],
            arrAsistencia:[],
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
                responsive: true,
                maintainAspectRatio:false
            },
            chartOp2:{
                responsive: true,
                maintainAspectRatio:false
            },
            
        }

    },
    created(){
        this.RatioAsignado();
        this.RatioAsistencia();
    },
    methods:{
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
            const doc = new jsPDF();
            /** WITH CSS */
            var canvasElement = document.createElement('canvas');
                html2canvas(this.$refs.content, { canvas: canvasElement 
                }).then(function (canvas) {
                const img = canvas.toDataURL("image/jpeg", 20);
                doc.addImage(img,'JPEG',10,10);
                doc.save("sample.pdf");
            });
        },
        async RatioAsignado(){
            const params = {
                id_programa: this.$store.state.programaActual.id_programa,
            };
            const { data } =await axios.post("registros/cantAlumnos", params);
            console.log(data);

            data.forEach(d=>{
                const date=d.nombre+"\n"+d.apellidos;
                const {
                    cantalum
                }=d;
                this.arrPositive.push({date,total:cantalum});
                
            })
        },
        async RatioAsistencia(){
            const params = {
                id_programa: this.$store.state.programaActual.id_programa,
                fecha_ini:"2020-05-02",
                fecha_fin:"2020-06-15",
            };
            const { data } =await axios.post("programa/cantAtendidos", params);
            console.log(data);

            data.forEach(d =>{
                if(d.asistencia=="asi") this.arrAsistencia.push({date:"Atendidos",total:d.cantalum});
                else if(d.asistencia=="noa") this.arrAsistencia.push({date:"No Atendidos",total:d.cantalum});
                else if(d.asistencia=="pen") this.arrAsistencia.push({date:"Pendientes",total:d.cantalum});

                
            })
            console.log(this.arrAsistencia);
            console.log(this.arrPositive);

/*
            data.forEach(d=>{
                const date=d.nombre+"\n"+d.apellidos;
                const {
                    cantalum
                }=d;
                this.arrPositive.push({date,total:cantalum});
                
            })*/
        },
    }

    
}



</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>