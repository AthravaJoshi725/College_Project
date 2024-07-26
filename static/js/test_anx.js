function submitForm() {
    const form = document.getElementById('test-form');
    const formData = new FormData(form);
    let score = 0;

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

    const resultsDiv = document.getElementById('results');
    const scoreDiv = document.getElementById('score');
    scoreDiv.innerHTML = `<p>Total Score: <b>${score}</b></p><p>Anxiety Level: <b>${anxietyLevel}</b></p>`;

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
                title: { text: "Anxiety Score", font: { size: 24 }}
            }
        }
    }];

    const layoutGauge = {
        title: "Anxiety Level Gauge",
        paper_bgcolor: 'white',
        font: { size: 16 }
    };

    Plotly.newPlot('gauge-chart', gaugeData, layoutGauge);

    const consultationMessage = getConsultationMessage(anxietyLevel);
    const consultationDiv = document.getElementById('consultation-message');
    consultationDiv.innerHTML = consultationMessage + '<button id="chat-btn" class="chat-btn">Chat with Noodle</button>';

    document.getElementById('chat-btn').addEventListener('click', function() {
        window.location.href = '/ChatBot';
    });
}

function getConsultationMessage(anxietyLevel) {
    switch(anxietyLevel) {
        case "Minimal Anxiety":
            return `<p>Experiencing minimal anxiety can be a normal part of life, but managing it can help you feel more at ease. Consider:</p>
                    <ul>
                        <li>Breathing Exercises: Deep breathing can help calm your nerves.</li>
                        <li>Mindfulness: Practicing mindfulness or meditation can reduce stress.</li>
                        <li>Physical Activity: Regular exercise is known to reduce anxiety.</li>
                        <li>Healthy Habits: Maintain a balanced diet and good sleep routine.</li>
                    </ul>`;
        case "Mild Anxiety":
            return `<p>Mild anxiety can interfere with your daily life, but there are effective ways to manage it:</p>
                    <ul>
                        <li>Routine Activities: Engage in activities that you enjoy and find relaxing.</li>
                        <li>Mindfulness Techniques: Practices like meditation can help reduce anxiety.</li>
                        <li>Set Goals: Break tasks into smaller, manageable steps to reduce overwhelm.</li>
                        <li>Connect with Others: Talk to friends or family for support.</li>
                    </ul>`;
        case "Moderate Anxiety":
            return `<p>Moderate anxiety can be more persistent and impact your quality of life. Here are some strategies:</p>
                    <ul>
                        <li>Professional Support: Consider seeing a therapist or counselor for targeted strategies.</li>
                        <li>Cognitive Behavioral Therapy (CBT): CBT can help change negative thought patterns.</li>
                        <li>Relaxation Techniques: Techniques like progressive muscle relaxation can be beneficial.</li>
                        <li>Medication: Consult with a healthcare provider about the possibility of medication.</li>
                    </ul>`;
        case "Moderately Severe Anxiety":
            return `<p>Moderately severe anxiety requires more focused intervention:</p>
                    <ul>
                        <li>Therapeutic Support: Regular sessions with a mental health professional are recommended.</li>
                        <li>Medication: A psychiatrist may prescribe medication to help manage symptoms.</li>
                        <li>Structured Routine: Establishing a daily routine can provide stability and reduce anxiety.</li>
                        <li>Support Groups: Joining a support group can offer additional comfort and strategies.</li>
                        <li>If needed, please contact a mental health care consultant for personalized support.</li>
                    </ul>`;
        case "Severe Anxiety":
            return `<p>Severe anxiety can be overwhelming and requires immediate attention:</p>
                    <ul>
                        <li>Professional Help: Seek immediate consultation with a psychiatrist or clinical psychologist.</li>
                        <li>Crisis Support: Reach out to mental health facilities for urgent care and support.</li>
                        <li>Intensive Therapy: Intensive therapy or counseling can provide significant relief.</li>
                        <li>Medication: A healthcare provider may prescribe medication to manage severe symptoms.</li>
                    </ul>
                    <p>For help in India, you can contact:</p>
                    <p>Indian Health Care Center: Mental Health Helpline</p>
                    <p>Helpline Number: 9152987821</p>`;
        default:
            return `<p>Invalid score. Please consult a healthcare professional for further assistance.</p>`;
    }
}
