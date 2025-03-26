document.getElementById('ticket-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const githubInput = document.getElementById('github');
    const avatarInput = document.getElementById('avatar');
  
    if (!nameInput.value.trim() || !emailInput.value.trim() || !githubInput.value.trim() || !avatarInput.files.length) {
      alert('All fields are required.');
      return;
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
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const imageUrl = event.target.result;
  
      localStorage.setItem('name', nameInput.value);
      localStorage.setItem('email', emailInput.value);
      localStorage.setItem('github', githubInput.value);
      localStorage.setItem('avatar', imageUrl);
  
      window.location.href = 'ticket.html';
    };
  
    reader.readAsDataURL(file);
  });
  