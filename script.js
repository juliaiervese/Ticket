document.getElementById('ticket-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const githubInput = document.getElementById('github');
    const avatarInput = document.getElementById('avatar');
  
    const ticketDisplay = document.getElementById('ticket-display');
    const ticketName = document.getElementById('ticket-name');
    const ticketGithub = document.getElementById('ticket-github');
    const ticketEmail = document.getElementById('congrats-email');
    const ticketCongrats = document.getElementById('congrats-name');
    const ticketAvatar = document.getElementById('ticket-avatar');
  
    if (!nameInput.value.trim() || !emailInput.value.trim() || !githubInput.value.trim()) {
        alert('All fields are required.');
        return;
      }
      
    const avatarError = document.getElementById('avatar-error');

    if (!avatarInput.files.length) {
    avatarError.textContent = "Please upload an avatar.";
    return;
    } else {
    avatarError.textContent = "";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    const file = avatarInput.files[0];
    if (file.size > 2 * 1024 * 1024) {
      alert('The image file is too large. Please upload an image smaller than 2MB.');
      return;
    }
  
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('Invalid image format. Please upload a JPEG, PNG, or GIF.');
      return;
    }
  
    const imageUrl = URL.createObjectURL(file);
  
    ticketName.textContent = nameInput.value;
    ticketGithub.textContent = `@${githubInput.value.replace(/^@/, '')}`;
    ticketCongrats.textContent = nameInput.value;
    ticketEmail.textContent = emailInput.value;
    ticketAvatar.src = imageUrl;
    ticketAvatar.alt = nameInput.value;
  
    ticketDisplay.classList.remove('hidden');
    document.getElementById('form-section').classList.add('hidden');
  });
  