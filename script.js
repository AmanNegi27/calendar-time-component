let chart;

function runSimulation() {

    // Inputs
    let tau = parseFloat(document.getElementById("tau").value);
    let mu = parseFloat(document.getElementById("mu").value);
    let theta = parseFloat(document.getElementById("theta").value);
    let mur = parseFloat(document.getElementById("mur").value);

    let lambda = parseFloat(document.getElementById("lambda").value);
    let P = parseFloat(document.getElementById("P").value);
    let rho = parseFloat(document.getElementById("rho").value);

    // Validation
    if ([tau, mu, theta, mur, lambda, P, rho].some(isNaN)) {
        alert("Please enter all values correctly!");
        return;
    }

    if (rho <= 0 || P <= 0) {
        alert("Utilization (ρ) and Resources (P) must be greater than 0!");
        return;
    }

    // Resource Usage
    let Xr = (theta * tau) + (mur * mu);

    // Calendar Time Factor
    let k = (theta + mur * lambda) / (P * rho);

    // Calendar Time
    let t = k * tau;

    // Display result with UNITS
    document.getElementById("result").innerText =
        `Resource Usage = ${Xr.toFixed(2)} units | Calendar Time = ${t.toFixed(2)} days`;

    // 🔍 Interpretation (SMART PART)
    let interpretation = "";

    if (t > tau) {
        interpretation = "⚠️ Calendar time is higher than execution time due to limited resources or low utilization.";
    } else if (t < tau) {
        interpretation = "✅ Efficient system: calendar time is optimized with good resource utilization.";
    } else {
        interpretation = "⚖️ Calendar time equals execution time (ideal condition).";
    }

    // Additional insights
    if (rho < 0.5) {
        interpretation += " Low utilization is slowing down the process.";
    }

    if (lambda > 5) {
        interpretation += " High failure intensity is increasing delay.";
    }

    document.getElementById("interpretation").innerText = interpretation;

    // Graph Data
    let tauValues = [];
    let tValues = [];

    for (let i = 0; i <= tau; i++) {
        tauValues.push(i);
        tValues.push(k * i);
    }
    // ----------- GRAPH 2: Utilization vs Calendar Time -----------

let rhoValues = [];
let tRhoValues = [];

for (let r = 0.1; r <= 1; r += 0.1) {
    rhoValues.push(r.toFixed(1));
    let k_temp = (theta + mur * lambda) / (P * r);
    tRhoValues.push((k_temp * tau).toFixed(2));
}

// Destroy old chart if exists
if (window.utilChartInstance) window.utilChartInstance.destroy();

const ctx2 = document.getElementById('utilChart').getContext('2d');

window.utilChartInstance = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: rhoValues,
        datasets: [{
            label: 'Calendar Time vs Utilization',
            data: tRhoValues,
            tension: 0.3
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Utilization (ρ)' } },
            y: { title: { display: true, text: 'Calendar Time (days)' } }
        }
    }
});


// ----------- GRAPH 3: Failure Intensity vs Calendar Time -----------

let lambdaValues = [];
let tLambdaValues = [];

for (let l = 1; l <= 10; l++) {
    lambdaValues.push(l);
    let k_temp = (theta + mur * l) / (P * rho);
    tLambdaValues.push((k_temp * tau).toFixed(2));
}

if (window.lambdaChartInstance) window.lambdaChartInstance.destroy();

const ctx3 = document.getElementById('lambdaChart').getContext('2d');

window.lambdaChartInstance = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: lambdaValues,
        datasets: [{
            label: 'Calendar Time vs Failure Intensity',
            data: tLambdaValues,
            tension: 0.3
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Failure Intensity (λ)' } },
            y: { title: { display: true, text: 'Calendar Time (days)' } }
        }
    }
});


// ----------- BONUS: Efficiency -----------

let efficiency = tau / t;

document.getElementById("interpretation").innerText +=
    ` | Efficiency = ${efficiency.toFixed(2)}`;

    // Destroy old chart
    if (chart) chart.destroy();

    const ctx = document.getElementById('myChart').getContext('2d');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tauValues,
            datasets: [{
                label: 'Calendar Time (days)',
                data: tValues,
                tension: 0.3,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Execution Time (CPU hours)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Calendar Time (days)'
                    }
                }
            }
        }
    });
}