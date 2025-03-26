document.getElementById('ticket-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const avatarInput = document.getElementById('avatar');
    const ticketDisplay = document.getElementById('ticket-display');
    const ticketName = document.getElementById('ticket-name');
    const ticketEmail = document.getElementById('ticket-email');
    const ticketAvatar = document.getElementById('ticket-avatar');

    // Validação de campos vazios
    if (!nameInput.value.trim() || !emailInput.value.trim() || !avatarInput.files.length) {
        alert('All fields are required.');
        return;
    }

    // Validação de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validação de imagem
    const file = avatarInput.files[0];
    if (file.size > 2 * 1024 * 1024) { // Limite de 2MB
        alert('The image file is too large. Please upload an image smaller than 2MB.');
        return;
    }
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('Invalid image format. Please upload a JPEG, PNG, or GIF.');
        return;
    }

    // Criar URL para a imagem carregada
    const imageUrl = URL.createObjectURL(file);

    // Exibir os dados no ticket
    ticketName.textContent = nameInput.value;
    ticketEmail.textContent = emailInput.value;
    ticketAvatar.src = imageUrl;
    ticketAvatar.alt = nameInput.value;

    // Mostrar o ticket gerado
    ticketDisplay.classList.remove('hidden');
});
