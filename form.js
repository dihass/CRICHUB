document.querySelector('.form-submit button').addEventListener('click', function (event) {

  event.preventDefault();

  const rating = document.querySelector('input[name="number-selection"]:checked');
  const feedback = document.getElementById("feedback").value;
  const feedback2 = document.getElementById("feedback2").value;
  const feedback3 = document.getElementById("feedback3").value;

  if (!rating) {
      alert("Please select a rating.");
      return;
  }

  if (feedback.trim() === "") {
      alert("Please provide your reasons for giving this rating.");
      return;
  }

  const email = "dihas.amarasinghe@gmail.com";
  const subject = encodeURIComponent("Feedback Form Submission");
  const body = encodeURIComponent(`Rating: ${rating.value}\nFeedback: ${feedback}\nHow did you complete this task today?: ${feedback2}\nIf you had to complete this task again, how would you prefer to do it?: ${feedback3}`);
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink

  // Hide the form and show the thank you message
  const form = document.querySelector('.comment-holder');
  const thankYouContainer = document.createElement('div');
  thankYouContainer.classList.add('thx-container');
  const thankYouMsg = document.createElement('p');
  thankYouMsg.innerHTML = "Thank you for your feedback!";
  thankYouMsg.classList.add('thankyou');
  thankYouContainer.appendChild(thankYouMsg);
  form.parentNode.insertBefore(thankYouContainer, form.nextSibling);
  form.style.display = 'none';

  // Style the thank you message container
  thankYouContainer.style.width = form.offsetWidth + "px";
  thankYouContainer.style.margin = "0 auto";
  thankYouContainer.style.borderRadius = "10px";
  thankYouContainer.style.backgroundColor = "white";

  // Style the thank you message
  thankYouMsg.style.color = "black";

});
