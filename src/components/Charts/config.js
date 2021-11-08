
export const basicOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  responsive: true,
};

export const advancedOptions = {
  maintainAspectRatio: false,
  legend: {
    display: true
  },
  responsive: true,
}
export let blueChartOptions = {
  ...basicOptions,
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#f5f5f5',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#FFFFFF"
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#FFFFFF"
      }
    }]
  }
}

export let doughnutChartOptions = {
  ...advancedOptions,
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 5,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  legend: {
     display:true,
    position: 'right',    
    labels: {
      usePointStyle: true,
      fontColor: "#FFFFFF"
    },

    item:{
      paddingY: 10,
      
    },

    
  },
}

export let bigBarChartOptions = {
  ...basicOptions,
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    
    // Include dollar sign for tooltip
    callbacks: {
      label: function(tooltipItems, data) {
          return "$" + tooltipItems.yLabel.toString();
      }
    }
  },
  scales: {
    yAxes: [{
        ticks: {
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + value;
          },
          beginAtZero: true,

          fontColor: "#FFFFFF"
        }
    }],

    xAxes: [{
     
      ticks: {
        padding: 20,
        fontColor: "#FFFFFF"
      }
    }]
  }
}

export let purpleChartOptions = {
  ...basicOptions,
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#f5f5f5',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#FFFFFF"
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(225,78,202,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#FFFFFF"
      }
    }]
  }
}

export let orangeChartOptions = {
  ...basicOptions,
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 50,
        suggestedMax: 110,
        padding: 20,
        fontColor: "#ff8a76"
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(220,53,69,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#FFFFFF"
      }
    }]
  }

}
export let greenChartOptions = {
  ...basicOptions,
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#f5f5f5',
    bodyFontColor: '#f5f5f5',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 50,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#FFFFFF"
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(0,242,195,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#FFFFFF"
      }
    }]
  }
}

export let barChartOptions = {
  ...basicOptions,
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  scales: {
    yAxes: [{

      gridLines: {
        drawBorder: false,
        color: '#FFFFFF',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 120,
        padding: 20,
        fontColor: "#FFFFFF"
      }
    }],
    xAxes: [{

      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#FFFFFF"
      }
    }]
  }

}
