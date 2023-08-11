console.log('Hola desde un archivo público')

const socket = io();

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
            <p>${product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Stock: ${product.stock}</p>
        </div>
    `;

    container.innerHTML += productCard;
});