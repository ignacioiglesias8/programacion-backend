document.addEventListener("DOMContentLoaded", function () {
    let deleteProductButtons = document.querySelectorAll(".delete-product");  
    deleteProductButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            let cartId = document.getElementById("cart-id").getAttribute("data-cart-id");
            let productId = button.getAttribute("data-product-id");

            fetch(`/api/carts/${cartId}/product/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId: productId }) 
            })
            .then(function (response) {
                if (response.ok) {
                    alert("Producto eliminado del carrito con éxito.");
                    let productCard = button.closest(".cart-card");
                    productCard.parentNode.removeChild(productCard);
                } else {
                    alert("No puedes eliminar este producto.");
                    console.error("Error al eliminar el producto al carrito.");
                }
            })
            .catch(function (error) {
                console.error("Error al realizar la solicitud:", error);
            });
        });
    });

});