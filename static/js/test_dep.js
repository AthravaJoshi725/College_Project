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
    const scoreDiv = document.getElementById('score');
    scoreDiv.innerHTML = `<p>Total Score: <b>${score}</b></p><p>Depression Level: <b>${depressionLevel}</b></p>`;

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

    // Display consultation messages
    const consultationMessage = getConsultationMessage(depressionLevel);
    const consultationDiv = document.getElementById('consultation-message');
    consultationDiv.innerHTML = consultationMessage +  '<button id="chat-btn" class="chat-btn">Chat with Noodle</button>';

    // Add event listener for chat button
    document.getElementById('chat-btn').addEventListener('click', function() {
        window.location.href = '/ChatBot';
    });
}

// Function to get consultation message based on depression level
function getConsultationMessage(depressionLevel) {
    switch(depressionLevel) {
        case "Minimal Depression":
            return `<p>It's great that you're checking in on your mental health. Minimal depression can cause slight mood changes but is generally manageable. Consider incorporating these practices into your routine:</p>
                    <ul>
                        <li>Regular Exercise: Even a short daily walk can boost your mood.</li>
                        <li>Healthy Diet: Eating balanced meals helps maintain stable energy levels.</li>
                        <li>Sleep Hygiene: Ensure you get enough rest each night.</li>
                        <li>Social Connection: Spend time with friends or family.</li>
                    </ul>`;
        case "Mild Depression":
            return `<p>Mild depression can affect your daily life but often improves with small changes. Here are some tips:</p>
                    <ul>
                        <li>Stay Active: Engage in physical activities that you enjoy.</li>
                        <li>Mindfulness and Relaxation: Practices like meditation or yoga can help.</li>
                        <li>Set Small Goals: Achieving small tasks can improve your sense of accomplishment.</li>
                        <li>Seek Support: Talking to friends or family can provide comfort.</li>
                    </ul>`;
        case "Moderate Depression":
            return `<p>Moderate depression can be challenging but manageable with the right strategies:</p>
                    <ul>
                        <li>Therapy: Consider speaking with a therapist to explore your feelings.</li>
                        <li>Medication: Your doctor might suggest antidepressants.</li>
                        <li>Support Groups: Joining a support group can provide a sense of community.</li>
                        <li>Healthy Lifestyle: Maintain regular exercise, a balanced diet, and good sleep habits.</li>
                    </ul>`;
        case "Moderately Severe Depression":
            return `<p>Moderately severe depression requires more attention. Here are some steps to take:</p>
                    <ul>
                        <li>Professional Help: Consult a mental health professional for personalized guidance.</li>
                        <li>Medication and Therapy: A combination of medication and cognitive behavioral therapy (CBT) can be effective.</li>
                        <li>Stay Connected: Keep in touch with loved ones, even if it's challenging.</li>
                        <li>Self-care: Engage in activities you once enjoyed, even if they don’t seem appealing at the moment.</li>
                        <li>If necessary, please contact a mental health care consultant or doctor.</li>
                    </ul>`;
        case "Severe Depression":
            return `<p>Severe depression is serious and requires immediate attention. Here are important steps to take:</p>
                    <ul>
                        <li>Contact a Mental Health Professional: Immediate consultation with a psychiatrist or psychologist is crucial.</li>
                        <li>Crisis Support: Reach out to mental health facilities for urgent care.</li>
                        <li>Medication: Antidepressants may be prescribed by a healthcare provider.</li>
                        <li>Therapy: Intensive therapy sessions can provide significant relief.</li>
                        <li>Stay Safe: Ensure a safe environment, and avoid being alone if you have suicidal thoughts.</li>
                    </ul>
                    <p>In India, you can contact the following for help:</p>
                    <p>Indian Health Care Center: Mental Health Helpline</p>
                    <p>Helpline Number: 9152987821</p>`;
        default:
            return `<p>Invalid score. Please consult a healthcare professional for further assistance.</p>`;
    }
}
