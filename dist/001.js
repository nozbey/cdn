var gridView = document.querySelector('.grid-view');
var graphView = document.querySelector('.graph');
var controlView = document.querySelector('.control');
var statusType = document.querySelector('.status-type');

var sensorBoxes = document.querySelector('.sensor-boxes');
var graphArea = document.querySelector('.graph-area');
var controlArea = document.querySelector('.control-area');

gridView.addEventListener('click', function () {
    gridView.classList.add('active');
    graphView.classList.remove('active');
    controlView.classList.remove('active');
    statusType.textContent = 'SENSOR VALUES';
    sensorBoxes.style.display = 'flex';
    graphArea.style.display = 'none';
    controlArea.style.display = 'none';
});

graphView.addEventListener('click', function () {
    graphView.classList.add('active');
    gridView.classList.remove('active');
    controlView.classList.remove('active');
    statusType.textContent = 'GRAPH OF SENSORs';
    sensorBoxes.style.display = 'none';
    graphArea.style.display = 'flex';
    controlArea.style.display = 'none';
});

controlView.addEventListener('click', function () {
    controlView.classList.add('active');
    gridView.classList.remove('active');
    graphView.classList.remove('active');
    statusType.textContent = 'CONTROL DEVICE';
    sensorBoxes.style.display = 'none';
    graphArea.style.display = 'none';
    controlArea.style.display = 'flex';
});

const canvas = document.getElementById('myChart');

function pad(value) {
    if (value < 10) {
        return '0' + value;
    } else {
        return value;
    }
}
curDate = new Date();
const labels = [pad(curDate.getHours()) + ":" + pad(curDate.getMinutes()) + ":" + pad(curDate.getSeconds())];


const data = {
    labels: labels,
    datasets: [{
        label: 'Voltage',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0],
        yAxisID: 'y0',
        "id": "Voltage"
    }, {
        label: 'Current',
        backgroundColor: 'rgb(157, 18, 222)',
        borderColor: 'rgb(157, 18, 222)',
        data: [1],
        yAxisID: 'y1',
        id: "Current"
    }, {
        label: 'Power',
        backgroundColor: 'rgb(25, 99, 132)',
        borderColor: 'rgb(25, 99, 132)',
        data: [1],
        yAxisID: 'y2',
        id: "Power"
    }]
};

function clickevent(evt, legendItem, legend) {
    const index = legendItem.datasetIndex;
    const ci = legend.chart;
    if (ci.isDatasetVisible(index)) {
        ci.hide(index);
        legendItem.hidden = true;
        myChart.options.scales[ci.data.datasets[index].yAxisID].display = false;

    } else {
        ci.show(index);
        legendItem.hidden = false;
        myChart.options.scales[ci.data.datasets[index].yAxisID].display = true;
    };
}
const config = {
    type: 'line',
    data: data,
    options: {
        lineTension: 0.4,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            legend: {
                onClick: clickevent
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        scales: {
            y0: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Voltage'
                },
                ticks: {
                    precision: 0
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Current'
                },
                ticks: {
                    precision: 2
                }
            },
            y2: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Power'
                },
                ticks: {
                    precision: 1
                }
            },
        }
    }
};
const myChart = new Chart(
    canvas,
    config
);
// function to update the chart
function addData(chart, label, data, data2, data3) {
    if (chart.data.datasets[0].data.length > 20) {
        // Remove the oldest data and label
        // iterate arguments data and data2 and data3 and shift
        for (let i = 0; i < chart.data.datasets.length; i++) {
            chart.data.datasets[i].data.shift();
        }
        chart.data.labels.shift();
    }
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(data);
    chart.data.datasets[1].data.push(data2);
    chart.data.datasets[2].data.push(data3);
    chart.update();
}


var gauge0 = new JustGage({
    id: "gauge0",
    value: 220,
    min: 190,
    max: 250,
    decimals: 1,
    gaugeWidthScale: 1,
    relativeGaugeSize: true,
    title: "Voltage",
    label: "Volts"
});
var gauge1 = new JustGage({
    id: "gauge1",
    value: 0.05,
    min: 0,
    max: 10,
    decimals: 3,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: "Current",
    label: "Amps"
});
var gauge2 = new JustGage({
    id: "gauge2",
    value: 0.50,
    min: 0,
    max: 1000,
    decimals: 2,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    label: "Watts"
});
var gauge3 = new JustGage({
    id: "gauge3",
    value: 0.50,
    min: 0,
    max: 1000,
    decimals: 2,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    label: "VAR"
});
var gauge4 = new JustGage({
    id: "gauge4",
    value: 0.50,
    min: 0,
    max: 1000,
    decimals: 2,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    label: "VA"
});
var gauge5 = new JustGage({
    id: "gauge5",
    value: 10.0,
    min: 0,
    max: 180,
    decimals: 2,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    label: "Hz"
});
setInterval(() => {
    fetch('/sensorresult').then(response => response.json()).then(data => {
        gauge0.refresh(data.Vrms);
        gauge1.refresh(data.Irms);
        gauge2.refresh(data["Active Power"]);
        gauge3.refresh(data["Reactive Power"]);
        gauge4.refresh(data["Power"]);
        gauge5.refresh(data["Frequency"]);
        curDate = new Date();
        const newLabel = pad(curDate.getHours()) + ":" + pad(curDate.getMinutes()) + ":" + pad(curDate.getSeconds());
        addData(myChart, newLabel, data.Vrms, data.Irms, data["Active Power"]);
    });
}, 1000);

fetch('/doraid')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('id').textContent = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

fetch('/firmware')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        // Inject the fetched text into the HTML element with id 'firmware'
        document.getElementById('firmware').textContent = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

const rsp = document.getElementById("response");
// Create a MutationObserver instance
const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.target === rsp) {
            const scrolH = rsp.scrollHeight
            if (scrolH > 40) {
                const scaleFactor = 40 / scrolH;
                const newFontSize = 20 * scaleFactor;
                rsp.style.fontSize = newFontSize + 'px';
            } else {
                rsp.style.fontSize = '16px';
            }
        }
    }
});
observer.observe(rsp, { childList: true, characterData: true, subtree: true });
async function tD() {
    try {
        const response = await fetch('/debug_toggle');
        const responseData = await response.text();
        rsp.innerText = responseData;
    } catch (error) {
        console.error("Error:", error);
        rsp.innerText = "Error: " + error.message;
        document.getElementById("tDbg").checked = false;
    }
};
async function tI() {
    try {
        const response = await fetch('/invertercheck');
        const responseData = await response.text();
        rsp.innerText = responseData;
    } catch (error) {
        console.error("Error:", error);
        rsp.innerText = "Error: " + error.message;
        document.getElementById("tInv").checked = false;
    }
};
async function tF() {
    try {
        const response = await fetch('/ftcmode');
        const responseData = await response.text();
        rsp.innerText = responseData;
    } catch (error) {
        console.error("Error:", error);
        rsp.innerText = "Error: " + error.message;
        document.getElementById("tFtc").checked = false;
    }
};
async function tT() {
    try {
        const response = await fetch('/triaconoff');
        const responseData = await response.text();
        rsp.innerText = responseData;
    } catch (error) {
        console.error("Error:", error);
        rsp.innerText = "Error: " + error.message;
        document.getElementById("tTri").checked = true;
    }
};
async function tR() {
    try {
        const response = await fetch('/resetesp');
        const responseData = await response.text();
        rsp.innerText = responseData;
    } catch (error) {
        console.error("Error:", error);
        rsp.innerText = "Error: " + error.message;
        document.getElementById("tRst").checked = false;
    }
};
function sendJson() {
    const jsonTemplate = document.getElementById("jsonTemplate").value;

    fetch("/sendftc", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonTemplate
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            rsp.innerText = data;
        })
        .catch(error => {
            console.error("Error:", error);
            rsp.innerText = "Error: " + error.message;
        });
}