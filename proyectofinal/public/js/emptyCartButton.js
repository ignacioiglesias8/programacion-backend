document.addEventListener("DOMContentLoaded", function () {
    let emptyCartButton = document.querySelector(".empty-cart");

    emptyCartButton.addEventListener("click", function (event) {
        event.preventDefault();
        let cartId = document.getElementById("cart-id").getAttribute("data-cart-id");

        fetch(`/api/carts/${cartId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cartId: cartId }) 
        })
        .then(function (response) {
            if (response.ok) {
                alert("Carrito vaciado con éxito.");
                let productCards = document.querySelectorAll(".cart-card");
                productCards.forEach(function (card) {
                    card.parentNode.removeChild(card);
                });
            } else {
                alert("No puedes vaciar el carrito.");
                console.error("Error al vaciar el carrito.");
            }
        })
        .catch(function (error) {
            console.error("Error al realizar la solicitud:", error);
        });
    });
});