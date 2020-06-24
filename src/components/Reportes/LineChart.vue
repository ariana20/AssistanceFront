<script>
import {HorizontalBar} from "vue-chartjs";

export default {
    extends: HorizontalBar,
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
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
           }]

        },
        this.options
        );
    }
    
}
</script>