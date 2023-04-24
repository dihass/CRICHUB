
  const emailInput = document.getElementById("email");
  
  emailInput.addEventListener("input", function() {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailInput.setCustomValidity("Invalid email address");
    } else {
      emailInput.setCustomValidity("");
    }
  });

  
  
  
