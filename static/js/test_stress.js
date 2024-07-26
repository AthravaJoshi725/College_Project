function submitForm() {
    const form = document.getElementById('test-form'); // Fixed ID
    const formData = new FormData(form);
    let score = 0;

    // Calculate the total score from form inputs
    for (let [name, value] of formData.entries()) {
        score += parseInt(value, 10);
    }

    let stressLevel;
    if (1 <= score && score <= 7) stressLevel = "Minimal Stress";
    else if (8 <= score && score <= 12) stressLevel = "Mild Stress";
    else if (13 <= score && score <= 17) stressLevel = "Moderate Stress";
    else if (18 <= score && score <= 22) stressLevel = "Moderately Severe Stress";
    else if (23 <= score && score <= 30) stressLevel = "Severe Stress";
    else stressLevel = "Invalid score";

    // Display score and Stress level
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>Total Score: <b>${score}</b></p><p>Stress Level: <b>${stressLevel}</b></p>`;

    // Data for gauge chart
    const gaugeData = [{
        type: 'indicator',
        mode: 'gauge+number+delta',
        value: score,
        gauge: {
            axis: { range: [0, 30] },
            bar: { color: 'blue' },
            steps: [
                { range: [0, 7], color: 'lightgreen' },
                { range: [7, 12], color: 'yellowgreen' },
                { range: [12, 17], color: 'yellow' },
                { range: [17, 22], color: 'orange' },
                { range: [22, 30], color: 'red' }
            ],
            threshold: {
                line: { color: 'red', width: 4 },
                thickness: 0.75,
                value: score,
                title: { text: "Stress Score", font: { size: 24 }}
            }
        }
    }];

    const layoutGauge = {
        title: "Stress Level Gauge",
        paper_bgcolor: 'white',
        font: { size: 16 }
    };

    // Render gauge chart
    Plotly.newPlot('gauge-chart', gaugeData, layoutGauge);
}
