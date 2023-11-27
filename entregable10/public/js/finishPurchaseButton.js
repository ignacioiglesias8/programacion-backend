document.addEventListener("DOMContentLoaded", function () {
    let finishPurchaseButton = document.querySelector(".purchase");
    if (finishPurchaseButton){
        finishPurchaseButton.addEventListener("click", function () {

        fetch("/purchase", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.error("Error al finalizar la compra.");
            }
        })
        .then(function (data) {
            console.log("Ticket generado:", data);
            window.location.href = '/ticket';
        })
        .catch(function (error) {
            console.error("Error al realizar la solicitud:", error);
            });
        });
    }
});