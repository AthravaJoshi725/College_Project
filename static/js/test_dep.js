// Function to calculate score and determine depression level
function submitForm() {
    const form = document.getElementById('test-form');
    const formData = new FormData(form);
    let score = 0;

    // Calculate the total score from form inputs
    for (let [name, value] of formData.entries()) {
        score += parseInt(value, 10);
    }

    let depressionLevel;
    if (1 <= score && score <= 7) depressionLevel = "Minimal Depression";
    else if (8 <= score && score <= 12) depressionLevel = "Mild Depression";
    else if (13 <= score && score <= 17) depressionLevel = "Moderate Depression";
    else if (18 <= score && score <= 22) depressionLevel = "Moderately Severe Depression";
    else if (23 <= score && score <= 30) depressionLevel = "Severe Depression";
    else depressionLevel = "Invalid score";

    // Display score and depression level
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>Total Score: <b>${score}</b></p><p>Depression Level: <b>${depressionLevel}</b></p>`;

    // Data for gauge chart
    const gaugeData = [{
        type: 'indicator',
        mode: 'gauge+number+delta',
        value: score,
        title: { text: " ", font: { size: 24 } },
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
                title: { text: "Depression Score", font: { size: 24 }}
            }
        }
    }];

    const layoutGauge = {
        title: "Depression Level Gauge",
        paper_bgcolor: 'white',
        font: { size: 16 }
    };

    // Render gauge chart
    Plotly.newPlot('gauge-chart', gaugeData, layoutGauge);
}
