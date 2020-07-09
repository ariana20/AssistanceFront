var data = [{
    data: [50, 55, 60, 33],
    backgroundColor: [
      "#4b77a9",
      "#5f255f",
      "#d21243",
      "#B27200"
    ],
    borderColor: "#fff"
  }];
  
  var options = {
    tooltips: {
      enabled: true
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
  
          let sum = ctx.dataset._meta[0].total;
          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
  
  
        },
        color: '#fff',
      }
    }
  };
  
  
  var ctx = document.getElementById("pie-chart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
    labels: ['India', 'China', 'US', 'Canada'],
      datasets: data
    },
    options: options
  });