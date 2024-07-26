function submitForm() {
    const form = document.getElementById('test-form');
    const formData = new FormData(form);
    let score = 0;

    // Calculate the total score from form inputs
    for (let [name, value] of formData.entries()) {
        score += parseInt(value, 10);
    }

    let anxietyLevel;
    if (1 <= score && score <= 7) anxietyLevel = "Minimal Anxiety";
    else if (8 <= score && score <= 12) anxietyLevel = "Mild Anxiety";
    else if (13 <= score && score <= 17) anxietyLevel = "Moderate Anxiety";
    else if (18 <= score && score <= 22) anxietyLevel = "Moderately Severe Anxiety";
    else if (23 <= score && score <= 30) anxietyLevel = "Severe Anxiety";
    else anxietyLevel = "Invalid score";

    // Display score and Anxiety level
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>Total Score: <b>${score}</b></p><p>Anxiety Level: <b>${anxietyLevel}</b></p>`;

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
                title: { text: "Anxiety Score", font: { size: 24 }}
            }
        }
    }];

    const layoutGauge = {
        title: "Anxiety Level Gauge",
        paper_bgcolor: 'white',
        font: { size: 16 }
    };

    // Render gauge chart
    Plotly.newPlot('gauge-chart', gaugeData, layoutGauge);
}
