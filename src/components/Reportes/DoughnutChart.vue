<script>
import {Doughnut} from "vue-chartjs";

export default {
    extends: Doughnut,
    props:{
        label:{
            type:String
        },
        chartData:{
            type:Array
        },
        options:{
            type:Object
        }
    },
    mounted(){
        const dates = this.chartData.map(d=>d.date).reverse();
        const totals = this.chartData.map(d=> d.total).reverse();

        this.renderChart({
           labels:dates,
           datasets:[{
                label:this.label,
                data:totals,
                // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                // borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)','rgba(153, 102, 255, 0.2)' ],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)','rgba(153, 102, 255, 1)'] ,
                borderWidth: 1
           }]

        },
        this.options
        );
    }
    
}
</script>