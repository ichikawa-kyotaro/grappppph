// 차트를 그릴 캔버스, x축,y축 텍스트필드, 추가 버튼을 가져온다
const ctx = document.querySelector('#myChart').getContext('2d');
const addButton = document.querySelector('.add-button');
const inputFields = document.querySelector('.input-fields');
 
// 초기 라벨과 데이터를 빈 배열로 만듭니다.
let labels = [],
    data = [];
// Chart.js를 이용해 차트 생성
const chart = new Chart(ctx, {
    type: 'line', // 차트의 종류 막대로 설정
    data: {
        labels, // x축에 해당하는 라벨을 빈 배열로 설정
        datasets: [{
            label: '', // 데이터셋의 라벨을 빈 문자열로 설정
            data, // y축 데이터를 빈 배열로 설정
            borderColor: '#1c6dd6' // 테두리 색상을 설정
        }]
    },
    options: {
		responsive: true, // 차트 크기가 자동으로 조절되도록 설정
		maintainAspectRatio: true, // 차트의 가로 세로 비율을 유지하지 않음
        // 차트 애니메이션 효과를 설정
        animation: {
            duration: 2000, // 애니메이션 지속 시간을 설정
            easing: 'ease-in-out' // 애니메이션의 변화 속도 설정
        },
        scales: {
            y: {
                beginAtZero: true // y축의 시작 값을 0으로 설정
            }
        },
        plugins: {
            legend: {
                display: false // 범례 표시 안함
            },
            title: {
                display: true,
                text: '등급 그래프'
            },
        }
    }
});
// Chart.js의 API를 이용해 차트에 새로운 데이터를 추가하는 함수
function addData(chart, label, data) {
    chart.data.labels.push(label); // 라벨 배열에 새로운 라벨을 추가
    chart.data.datasets[0].data.push(data); // 데이터 배열에 새로운 데이터를 추가
    chart.update(); // 차트를 업데이트
}
// 입력 필드의 값을 바탕으로 차트 데이터를 업데이트하는 함수
function updateChart() {
    // x값과 y값을 입력한 input 값을 가져온다
    const xValues = document.querySelectorAll('.x-value');
    const yValues = document.querySelectorAll('.y-value');
    // 각 input 요소에서 x값과 y값을 가져와, 데이터 배열을 업데이트
    for (let i = 0; i < xValues.length; i++) {
        // x값과 y값을 가져옵니다.
        const x = xValues[i].value,
            y = yValues[i].value;
        if (i < labels.length) {
            // 이미 입력된 데이터가 있을 경우, 변경된 데이터가 있는지 확인하고 업데이트
            if (labels[i] !== x || data[i] !== y) {
                labels[i] = x; // 라벨 배열에서 해당 인덱스의 값을 새로운 값으로 업데이트
                data[i] = y; // 데이터 배열에서 해당 인덱스의 값을 새로운 값으로 업데이트
                chart.update(); // 차트를 업데이트
            }
        } else {
            // 새로운 데이터를 추가
            addData(chart, x, y);
        }
    }
}