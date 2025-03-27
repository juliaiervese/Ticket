document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('ticket-form');
  const avatarInput = document.getElementById('avatar');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const githubInput = document.getElementById('github');

  const ticketDisplay = document.getElementById('ticket-display');
  const ticketName = document.getElementById('ticket-name');
  const ticketGithub = document.getElementById('ticket-github');
  const ticketEmail = document.getElementById('congrats-email');
  const ticketCongrats = document.getElementById('congrats-name');
  const ticketAvatar = document.getElementById('ticket-avatar');

  const avatarError = document.getElementById('avatar-error');
  const nameError = document.getElementById('name-error');
  const mailError = document.getElementById('mail-error');
  const gitError = document.getElementById('git-error');
  const confirmationMessage = document.getElementById('upload-confirmation');

  // File upload validation
  avatarInput.addEventListener('change', function() {
    avatarError.textContent = ''; // Clear previous errors
    confirmationMessage.textContent = ''; // Clear previous messages

    if (this.files && this.files.length > 0) {
      const file = this.files[0];
      
      // File size validation
      if (file.size > 2 * 1024 * 1024) {
        avatarError.textContent = 'Image must be smaller than 2MB.';
        this.value = ''; // Clear the file input
        return;
      }

      // File type validation
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        avatarError.textContent = 'Please upload a valid image (JPEG, PNG, GIF, WEBP).';
        this.value = ''; // Clear the file input
        return;
      }

      // Success message
      confirmationMessage.textContent = `✅ Image "${file.name}" uploaded successfully!`;
    }
  });

  // Form submission validation
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Reset previous error messages
    avatarError.textContent = '';
    nameError.textContent = '';
    mailError.textContent = '';
    gitError.textContent = '';

    let isValid = true;

    // Avatar validation
    if (!avatarInput.files.length) {
      avatarError.textContent = 'Please upload an avatar.';
      isValid = false;
    }

    // Name validation
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Please enter your full name.';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
      mailError.textContent = 'Please enter an email address.';
      isValid = false;
    } else if (!emailPattern.test(emailInput.value)) {
      mailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    // GitHub username validation
    if (githubInput.value.trim() === '') {
      gitError.textContent = 'Please enter your GitHub username.';
      isValid = false;
    }

    // If all validations pass
    if (isValid) {
      const file = avatarInput.files[0];
      
      // Additional image type check
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        avatarError.textContent = 'Invalid image format. Please upload a JPEG, PNG, or GIF.';
        return;
      }
      
      // Create image URL
      const imageUrl = URL.createObjectURL(file);
      
      // Populate ticket details
      ticketName.textContent = nameInput.value;
      ticketGithub.textContent = `@${githubInput.value.replace(/^@/, '')}`;
      ticketCongrats.textContent = nameInput.value;
      ticketEmail.textContent = emailInput.value;
      ticketAvatar.src = imageUrl;
      ticketAvatar.alt = nameInput.value;
      
      // Show ticket, hide form
      ticketDisplay.classList.remove('hidden');
      document.getElementById('form-section').classList.add('hidden');
      
      console.log('Form submitted successfully');
    }
  });
});