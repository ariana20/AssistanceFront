import axios from 'axios';
var atenciones=[];


async function RatioAtenciones(){
    
    const params = {
        fecha_fin: "2020-07-08",
    fecha_ini: "2020-06-08",
    id_programa: 3
    };


    const { data } =await axios.post("programa/citasXDiaTodos", params)
    atenciones=data;


    console.log(atenciones);
}

RatioAtenciones();

const dates = atenciones.map(d=>d.data).reverse();
const totals = atenciones.map(d=> d.total).reverse();

export const planetChartData = {
    type: 'line',
    
    data: {
      labels:dates,
      datasets: [
        { // one line graph
          label: 'cosas',
          data: totals,
          backgroundColor: [
            'rgba(54,73,93,.5)', // Blue
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)',
            'rgba(54,73,93,.5)'
          ],
          borderColor: [
            '#36495d',
            '#36495d',
            '#36495d',
            '#36495d',
            '#36495d',
            '#36495d',
            '#36495d',
            '#36495d',
          ],
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,

    }
  }


export default planetChartData;