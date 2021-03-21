new Chart(document.getElementById("myChart"), {
    type: 'bar',
    data: {
      labels: ["Hillsborough","Pinellas","Athens"],
      datasets: [
        {
          label: "Percentage of Population that Completed Education (%)",
          backgroundColor: ["#3e95cd","#e8c3b9","#c45850"],
          data: [33.5,31.7,30.2]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Bar Chart depicting the counties with Highest Education Completion rates'
      }
    }
});