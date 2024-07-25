document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is loaded and working!');

    // Redirect to the basic screen page when the assess button is clicked
    document.getElementById('assess').addEventListener('click', function() {
        window.location.href = "/basic-screen";
    });

    // Handle form submission
    document.getElementById('submit-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Call the function to handle form submission
        submitForm();
    });
});

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
    const totalScore = stressScore + anxietyScore + depressionScore;

    // Check if the sum of all scores is 0
    if (totalScore === 0) {
        alert("You seem to be in a healthy mental state. Feel free to check out MindMate Bot for mental health exercises or visit our Awareness section.");
        return;
    }

    // // Check if the total score is 3 for every question
    // if (totalScore === 9) {
    //      // Redirect to depression test
    //     return;
    // }
   
    // Determine the primary area of concern
    let redirectUrl = '';
    if (stressScore > anxietyScore && stressScore > depressionScore) {
        redirectUrl = '/test-stress'; // Replace with your actual URL
    } else if (anxietyScore >= stressScore && anxietyScore > depressionScore) {
        redirectUrl = '/test-anxiety'; // Replace with your actual URL
    } else if (depressionScore >= stressScore && depressionScore >= anxietyScore) {
        redirectUrl = '/test-depression'; // Replace with your actual URL
    } else if (totalScore == 9){
        redirectUrl = '/test-depression';
    }

    // Redirect to the detailed questionnaire
    if (redirectUrl) {
        window.location.href = redirectUrl;
    } else {
        alert('Error: Unable to determine the primary area of concern.');
    }
}

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Show or hide the button based on scroll position
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

// Scroll to the top when the button is clicked
document.getElementById("scrollTopBtn").onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};
