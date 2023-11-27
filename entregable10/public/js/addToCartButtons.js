document.addEventListener("DOMContentLoaded", function () {
    let addToCartButtons = document.querySelectorAll(".addToCart");  
    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            let productId = button.getAttribute("data-product-id");

            fetch("/addToCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId: productId }) 
            })
            .then(function (response) {
                if (response.ok) {
                    alert("Producto agregado al carrito con éxito.");
                } else {
                    alert("No puedes agregar este producto.");
                    console.error("Error al agregar el producto al carrito.");
                }
            })
            .catch(function (error) {
                console.error("Error al realizar la solicitud:", error);
            });
        });
    });

});