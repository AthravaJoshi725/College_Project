function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  
  // Show or hide the button based on scroll position
  window.onscroll = function() {scrollFunction()};
  
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


  // Button part starting 
  document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is loaded and working!');

    // Redirect to the basic screen page when the assess button is clicked
    document.getElementById('assess').addEventListener('click', function() {
        window.location.href = "/basic-screen";
    });
});

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Show or hide the button based on scroll position-Assess btn
window.onscroll = function() {scrollFunction()};

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

// button end

// Show or hide the Know More buttons based on scroll position -know more btn
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const knowMoreBtn1 = document.getElementById("know-more-1");
    const knowMoreBtn2 = document.getElementById("know-more-2");
    const knowMoreBtn3 = document.getElementById("know-more-3");
    const bot_btn = document.getElementById("bot-btn");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        knowMoreBtn1.style.display = "block";
        knowMoreBtn2.style.display = "block";
        knowMoreBtn3.style.display = "block";
        bot_btn.style.display = "block";
    } else {
        knowMoreBtn1.style.display = "none";
        knowMoreBtn2.style.display = "none";
        knowMoreBtn3.style.display = "none";
        bot_btn.style.display = "none";
    }
}

// Redirect to respective URLs when the Know More buttons are clicked
document.getElementById("know-more-1").onclick = function() {
    window.location.href = "/depression";
};

document.getElementById("know-more-2").onclick = function() {
    window.location.href = "/anxiety";
};

document.getElementById("know-more-3").onclick = function() {
    window.location.href = "/autism";
};

document.getElementById("bot-btn").onclick = function() {
    window.location.href = "/ChatBot";
};
// know more button end



  
  