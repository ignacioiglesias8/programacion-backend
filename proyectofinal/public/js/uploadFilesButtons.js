document.querySelectorAll('.uploadButton').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        const userId = button.getAttribute('data-user-id');
        const inputId = button.previousElementSibling.id;
        const typeButton = button.previousElementSibling.name;

        const fileInput = document.getElementById(inputId);
        const file = fileInput.files[0];

        if (!file) {
            alert('Por favor, selecciona un archivo.');
            return;
        }

        const type = typeButton;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        fetch(`/api/users/${userId}/documents`, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo.');
            }
            return response.json();
        })
        .then(data => {
            alert("Archivo cargado exitosamente");
            window.location.href = '/profile'
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al cargar el archivo.');
        });
    });
});