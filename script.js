// ========================================
// THEME TOGGLE (Dark/Light Mode)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const btn = document.getElementById("themeBtn");

  let savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
    btn.checked = true;
  } else {
    body.classList.add("light");
    btn.checked = false;
  }

  if (btn) {
    btn.addEventListener("change", () => {
      if (btn.checked) {
        body.classList.replace("light", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        body.classList.replace("dark", "light");
        localStorage.setItem("theme", "light");
      }
    });
  }
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// ========================================
// SKILLS PROGRESS BAR ANIMATION
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const progressFills = document.querySelectorAll(".progress-fill");

  const observerOptions = {
    threshold: 0.5, 
  };

  const onIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.getAttribute("data-percent");
        bar.style.width = percent;
        observer.unobserve(bar);
      }
    });
  };

  const observer = new IntersectionObserver(onIntersection, observerOptions);

  progressFills.forEach(bar => {
    observer.observe(bar);
  });
});

// ========================================
// STEP 2: CONTACT FORM VALIDATION + localStorage
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Clear previous errors
      clearErrors();
      
      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      
      let isValid = true;
      
      // Validate Name
      if (name === "") {
        showError("nameError", "Name is required");
        isValid = false;
      } else if (name.length < 2) {
        showError("nameError", "Name must be at least 2 characters");
        isValid = false;
      }
      
      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === "") {
        showError("emailError", "Email is required");
        isValid = false;
      } else if (!emailPattern.test(email)) {
        showError("emailError", "Please enter a valid email");
        isValid = false;
      }
      
      // Validate Message
      if (message === "") {
        showError("messageError", "Message is required");
        isValid = false;
      } else if (message.length < 10) {
        showError("messageError", "Message must be at least 10 characters");
        isValid = false;
      }
      
      // If valid, store in localStorage and redirect
      if (isValid) {
        const formData = {
          name: name,
          email: email,
          message: message,
          timestamp: new Date().toLocaleString()
        };
        
        // Store in localStorage
        localStorage.setItem("contactFormData", JSON.stringify(formData));
        
        // Show success message
        showSuccessMessage("Message sent successfully! Redirecting...");
        
        // Redirect after 1.5 seconds
        setTimeout(() => {
          window.location.href = "form-details.html";
        }, 1500);
      } else {
        showErrorMessage("Please fix the errors above");
      }
    });
  }
});

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-msg");
  errorMessages.forEach(msg => {
    msg.textContent = "";
    msg.style.display = "none";
  });
  
  const formMessage = document.getElementById("formMessage");
  if (formMessage) {
    formMessage.className = "form-message";
    formMessage.textContent = "";
  }
}

function showSuccessMessage(message) {
  const formMessage = document.getElementById("formMessage");
  if (formMessage) {
    formMessage.className = "form-message success";
    formMessage.textContent = message;
  }
}

function showErrorMessage(message) {
  const formMessage = document.getElementById("formMessage");
  if (formMessage) {
    formMessage.className = "form-message error";
    formMessage.textContent = message;
  }
}

// ========================================
// STEP 3: PROJECT CARDS CLICKABLE (NO <a> TAG)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");
  
  projectCards.forEach(card => {
    card.addEventListener("click", function() {
      const url = this.getAttribute("data-url");
      
      if (url && url !== "#") {
        window.location.href = url;
      } else {
        alert("Project link coming soon!");
      }
    });
    
    // Add hover effect
    card.style.cursor = "pointer";
  });
});

// ========================================
// STEP 4: CANVAS DRAWING (HTML5)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  
  if (canvas) {
    const ctx = canvas.getContext("2d");
    
    // Draw a simple colorful pattern
    
    // Background
    ctx.fillStyle = "#faf8f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw circles
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(80 + i * 70, 150, 40, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${i * 60}, 70%, 60%)`;
      ctx.fill();
      ctx.strokeStyle = "#c17d5c";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    
    // Draw text
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#c17d5c";
    ctx.textAlign = "center";
    ctx.fillText("Canvas Drawing Demo", canvas.width / 2, 50);
    
    // Draw lines
    ctx.strokeStyle = "#c17d5c";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(350, 250);
    ctx.stroke();
    
    // Draw rectangles
    ctx.fillStyle = "#e8d5c4";
    ctx.fillRect(150, 200, 100, 50);
    ctx.strokeStyle = "#c17d5c";
    ctx.strokeRect(150, 200, 100, 50);
  }
});

// ========================================
// STEP 5: IMAGE SLIDER (CSS + JavaScript)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".slider-image");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("sliderDots");
  
  if (!images.length || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  
  // Create dots
  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll(".dot");
  
  // Show specific slide
  function goToSlide(index) {
    images[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");
    
    currentIndex = index;
    
    images[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }
  
  // Next button
  nextBtn.addEventListener("click", () => {
    let nextIndex = (currentIndex + 1) % images.length;
    goToSlide(nextIndex);
  });
  
  // Previous button
  prevBtn.addEventListener("click", () => {
    let prevIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(prevIndex);
  });
  
  // Auto-play (optional - uncomment if you want)
  // setInterval(() => {
  //   let nextIndex = (currentIndex + 1) % images.length;
  //   goToSlide(nextIndex);
  // }, 3000);
});