let currentUser

function getUser(event) {
    event.preventDefault();

    const userEmail = document.getElementById('userEmail').value;

    fetch(`/api/users/${userEmail}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        currentUser = data.user[0]; 
        updateUserData(data);
    })
    .catch(error => {
        console.error('Error al obtener datos del usuario:', error);
    });
}

function updateUserData(user) {
    const userDataContainer = document.getElementById('userDataContainer');

    userDataContainer.innerHTML = '';

    const data = user.user[0]; 
    console.log(data);
    const nameElement = document.createElement('p');
    nameElement.textContent = 'Nombre: ' + data.first_name;

    const lastNameElement = document.createElement('p');
    lastNameElement.textContent = 'Apellido: ' + data.last_name;

    const emailElement = document.createElement('p');
    emailElement.textContent = 'Correo electrónico: ' + data.email;

    const roleElement = document.createElement('p');
    roleElement.textContent = 'Rol: ' + data.role;
    roleElement.id = 'userRole';

    const cartStatusElement = document.createElement('p');
    let cartStatus
    if (data.cart[0].cartInfo.products.length > 0) {
        cartStatus = 'Hay productos pendientes de compra';
    } else {
        cartStatus = 'El carrito se encuentra vacío';
    }
    cartStatusElement.textContent = 'Estado del carrito: ' + cartStatus

    const lastConnectionElement = document.createElement('p');
    const formattedDate = formateDate(data.last_connection)
    lastConnectionElement.textContent = 'Última conexión: ' + formattedDate;

    const idElement = document.createElement('p');
    idElement.textContent = 'ID: ' + data._id;

    userDataContainer.append(nameElement, lastNameElement, emailElement, roleElement, 
        cartStatusElement, lastConnectionElement, idElement);
}

function changeUserRole(event) {
    event.preventDefault();

    if (!currentUser) {
        alert('No se ha seleccionado un usuario para eliminar');
        return;
    }

    const userId = currentUser._id;

    fetch(`/api/users/premium/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
    alert(data.message);
    getUser(event);
    })
    .catch(error => {
        console.error('Error al cambiar el rol del usuario:', error);
    });
}

function formateDate(data){
    const lastConnectionDate = new Date(data);
    const day = lastConnectionDate.getDate();
    const month = lastConnectionDate.getMonth() + 1; 
    const year = lastConnectionDate.getFullYear();
    const hours = lastConnectionDate.getHours();
    const minutes = lastConnectionDate.getMinutes();
    const seconds = lastConnectionDate.getSeconds();
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate
}

function deleteUser(event) {
    event.preventDefault();

    if (!currentUser) {
        alert('No se ha seleccionado un usuario para eliminar');
        return;
    }

    const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar el usuario?');

    if (!confirmDelete) {
        return;
    }

    const userId = currentUser._id;

    fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        getUser(event);
    })
    .catch(error => {
        console.error('Error al eliminar el usuario:', error);
    });
}