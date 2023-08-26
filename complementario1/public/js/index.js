console.log('Hola desde un archivo público')

const socket = io();

socket.on('loadproducts', async (products) => {
    const container = document.querySelector('.product-list');

    container.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <h2>${product.title}</h2>
                <p>Id:${product.id}</p>
                <p>${product.description}</p>
                <p>Precio: ${product.price}</p>
                <p>Stock: ${product.stock}</p>
            </div>
        `;

        container.innerHTML += productCard;
    });
});

function sendEvent(){
    const productData = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        price: document.querySelector('#price').value,
        code: document.querySelector('#code').value,
        stock: document.querySelector('#stock').value,
        category: document.querySelector('#category').value,
    };

    socket.emit('sendProduct', productData);

    const inputFields = ['title', 'description', 'price', 'code', 'stock', 'category'];
    inputFields.forEach(field => document.querySelector(`#${field}`).value = '');
}

socket.on('showProduct', (product) => {
    const container = document.querySelector('.product-list');

    const productCard = `
        <div class="product-card">
            <h2>${product.title}</h2>
            <p>Id:${product.id}</p>
            <p>${product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Stock: ${product.stock}</p>
        </div>
    `;

    container.innerHTML += productCard;
});

function deleteProduct() {
    const productId = document.querySelector('#product-id').value;

    socket.emit('deleteProduct', { id: productId });

    document.querySelector('#product-id').value = '';
}

//configuración chat
let user;
let chatBox = document.querySelector('#chatBox');

Swal.fire({
    title: 'Identifícate',
    input: 'text',
    text: 'Ingresa el usuario para identificarte en el chat',
    inputValidator: (value) => {
        return !value && '¡Necesitas escribir un nombre de usuario para continuar!'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value

    socket.emit('userConnect', result.value);
});

chatBox.addEventListener('keypress', e => {
    if (e.key == 'Enter') {
        if (chatBox.value.trim().length > 0) {
            console.log(chatBox.value);
            socket.emit('message', {
                user: user,
                message: chatBox.value
            });
        }
        chatBox.value = '';
    }
});

socket.on('messagesLogs', data => {
    let log = document.querySelector('#messagesLogs');
    let messages = '';
    data.forEach(message => {
        messages += `${message.user}: ${message.message} </br>`
    });

    log.innerHTML = messages;
})

socket.on('newUser', data => {
    Swal.fire({
        text: `${data} se ha unido al chat`,
        toast: true,
        position: 'top-right'
    });
});