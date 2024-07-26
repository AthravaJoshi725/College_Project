function submitForm() {
    const form = document.getElementById('test-form');
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

    // Display score and stress level
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>Total Score: <b>${score}</b></p>
        <p>Stress Level: <b>${stressLevel}</b></p>
        <div id="gauge-chart" style="width: 100%; height: 400px;"></div>
        <div id="consultation-message" class="consultation-box">
            ${getConsultationMessage(stressLevel)}
            <button id="chat-btn" class="chat-btn">Chat with Noodle</button>
        </div>
    `;

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

    // Add event listener for chat button
    document.getElementById('chat-btn').addEventListener('click', function() {
        window.location.href = '/ChatBot';
    });
}

// Function to get consultation message based on stress level
function getConsultationMessage(stressLevel) {
    switch(stressLevel) {
        case "Minimal Stress":
            return `<p>Minimal stress is common and usually manageable. Here are some tips to keep it in check:</p>
                <ul>
                    <li>Deep Breathing: Practice deep breathing exercises to calm your mind.</li>
                    <li>Stay Active: Regular physical activity can help reduce stress levels.</li>
                    <li>Mindfulness: Engage in mindfulness or meditation practices.</li>
                    <li>Balanced Life: Maintain a healthy balance between work and leisure activities.</li>
                </ul>`;

        case "Mild Stress":
            return `<p>Mild stress can impact your daily life but can be managed with some adjustments:</p>
                    <ul>
                        <li>Time Management: Prioritize tasks and manage your time effectively.</li>
                        <li>Healthy Lifestyle: Ensure a balanced diet, regular exercise, and adequate sleep.</li>
                        <li>Relaxation Techniques: Practice yoga, deep breathing, or progressive muscle relaxation.</li>
                        <li>Social Support: Talk to friends or family for emotional support.</li>
                    </ul>`;

        case "Moderate Stress":
            return `<p>Moderate stress can interfere with your quality of life. Consider these strategies:</p>
                    <ul>
                        <li>Professional Guidance: Seek help from a counselor or therapist.</li>
                        <li>Cognitive Behavioral Techniques: Learn techniques to manage stress-related thoughts.</li>
                        <li>Physical Activity: Regular exercise can significantly reduce stress.</li>
                        <li>Relaxation Practices: Engage in activities like yoga or meditation to relax.</li>
                    </ul>`;

        case "Moderately Severe Stress":
            return `<p>Moderately severe stress needs more focused intervention:</p>
                    <ul>
                        <li>Therapy: Regular sessions with a mental health professional can provide support.</li>
                        <li>Stress Management Programs: Join programs designed to manage stress effectively.</li>
                        <li>Healthy Habits: Maintain a regular exercise routine, healthy diet, and good sleep hygiene.</li>
                        <li>Relaxation Techniques: Practice mindfulness, deep breathing, or progressive muscle relaxation.</li>
                        <li>If necessary, consult a mental health care professional for personalized strategies.</li>
                    </ul>`;

        case "Severe Stress":
            return `<p>Severe stress requires immediate attention and intervention:</p>
                    <ul>
                        <li>Seek Professional Help: Consult a mental health professional, such as a therapist or psychiatrist.</li>
                        <li>Crisis Support: Reach out to mental health facilities for urgent care.</li>
                        <li>Intensive Therapy: Intensive therapy or counseling can provide significant relief.</li>
                        <li>Medication: A healthcare provider may prescribe medication to help manage severe stress symptoms.</li>
                        <li>Create a Safe Environment: Ensure you have a supportive and safe environment.</li>
                    </ul>
                    <p>For help in India, you can contact:</p>
                    <p>Indian Health Care Center: Mental Health Helpline</p>
                    <p>Helpline Number: 9152987821</p>`;

        default:
            return `<p>Invalid score. Please consult a healthcare professional for further assistance.</p>`;
    }
}
