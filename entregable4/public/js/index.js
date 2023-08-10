console.log('Hola desde un archivo público')

const socket = io();

/*
socket.on('product-created', (product) => {
    const productContainer = document.querySelector('.product-list');
    const newProductDiv = document.createElement('div');
    newProductDiv.className = 'product-card'; 

    const titleElement = document.createElement('h2');
    titleElement.textContent = product.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = product.description;

    const priceElement = document.createElement('p');
    priceElement.textContent = `Precio: ${product.price}`;

    const stockElement = document.createElement('p');
    stockElement.textContent = `Stock: ${product.stock}`;

    newProductDiv.appendChild(titleElement);
    newProductDiv.appendChild(descriptionElement);
    newProductDiv.appendChild(priceElement);
    newProductDiv.appendChild(stockElement);

    productContainer.appendChild(newProductDiv);
});*/