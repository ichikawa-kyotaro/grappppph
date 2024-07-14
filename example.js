const ctx = document.querySelector('#myChart').getContext('2d');
const addButton = document.querySelector('.add-button');
const inputFields = document.querySelector('.input-fields');
 
let labels = [],
    data = [];

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels, 
        datasets: [{
            label: '', 
            data, 
            borderColor: '#a9cbdf' 
        }]
    },
    options: {
        responsive: true, 
        maintainAspectRatio: true, 
        
        animation: {
            duration: 2000,
            easing: 'ease-in-out' 
        },
        scales: {
            y: {
                min: 1, 
                max: 9, 
                ticks: {
                    reverse: false, 
                    stepSize: 1 
                }
            }
        },
        plugins: {
            legend: {
                display: false 
            },
            title: {
                display: true,
                text: '등급 그래프'
            },
        }
    }
});

function addData(chart, label, data) {
    chart.data.labels.push(label); 
    chart.data.datasets[0].data.push(data); 
    chart.update(); 
}

function updateChart() {
    const xValues = document.querySelectorAll('.x-value');
    const yValues = document.querySelectorAll('.y-value');
    
    for (let i = 0; i < xValues.length; i++) {
        const x = xValues[i].value,
              y = yValues[i].value;
        
        if (i < labels.length) {
            if (labels[i] !== x || data[i] !== y) {
                labels[i] = x; 
                data[i] = y; 
                chart.update(); 
            }
        } else {
            addData(chart, x, y);
        }
    }
}
