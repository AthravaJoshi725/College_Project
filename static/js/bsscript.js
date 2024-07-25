    function submitForm() {
        const form = document.getElementById('screening-form');
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = parseInt(value);
        });

        // Calculate scores
        const stressScore = (data.q3 || 0) + (data.q4 || 0) + (data.q6 || 0);
        const anxietyScore = (data.q1 || 0) + (data.q3 || 0) + (data.q4 || 0);
        const depressionScore = (data.q2 || 0) + (data.q5 || 0) + (data.q7 || 0);

        // Determine the primary area of concern
        let redirectUrl = '';
        if (stressScore >= anxietyScore && stressScore >= depressionScore) {
            redirectUrl = '/stress-questionnaire'; // Replace with your actual URL
        } else if (anxietyScore >= stressScore && anxietyScore >= depressionScore) {
            redirectUrl = '/anxiety-questionnaire'; // Replace with your actual URL
        } else if (depressionScore >= stressScore && depressionScore >= anxietyScore) {
            redirectUrl = '/depression-questionnaire'; // Replace with your actual URL
        }

        // Redirect to the detailed questionnaire
        if (redirectUrl) {
            window.location.href = redirectUrl;
        } else {
            alert('Error: Unable to determine the primary area of concern.');
        }
    }
