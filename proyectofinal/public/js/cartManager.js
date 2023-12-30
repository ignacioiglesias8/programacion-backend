let currentCart

function getCart(event) {
    event.preventDefault();

    const cartId = document.getElementById('cartId').value;

    fetch(`/api/carts/${cartId}`, {
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
        currentCart = data.cart[0]; 
        updateCartData(data);
    })
    .catch(error => {
        console.error('Error al obtener datos del carrito:', error);
    });
}

function updateCartData(cart) {
    const cartDataContainer = document.getElementById('cartDataContainer');

    cartDataContainer.innerHTML = '';
    
    const data = cart.cart[0]; 
    const idElement = document.createElement('p');
    idElement.textContent = 'Id del carrito: ' + data._id;

    cartDataContainer.append(idElement);

    if (data.products.length > 0) {
        data.products.forEach((product, index) => {
            const productElement = document.createElement('p');
            productElement.textContent = 
                `Producto ${index + 1}: ${product.product.title}, 
                ID: ${product._id}, 
                Cantidad: ${product.quantity}`;
            cartDataContainer.appendChild(productElement);
        });
    } else {
        const emptyCartElement = document.createElement('p');
        emptyCartElement.textContent = 'El carrito está vacío';
        cartDataContainer.appendChild(emptyCartElement);
    }
}

function clearOneCart(event) {
    event.preventDefault();

    if (!currentCart) {
        alert('No se ha seleccionado un carrito para eliminar');
        return;
    }

    const cartId = currentCart._id;

    fetch(`/api/carts/${cartId}`, {
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
    alert("El carrito ha sido vaciado exitosamente");
    getCart(event);
    })
    .catch(error => {
        console.error('Error al vaciar el carrito:', error);
    });
}