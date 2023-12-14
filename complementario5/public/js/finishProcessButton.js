document.addEventListener("DOMContentLoaded", function () {
    let finishProcessButton = document.querySelector(".finishButton");
    if (finishProcessButton){
        finishProcessButton.addEventListener("click", function () {
        
        fetch(`/tickets/finish`, {
            method: "PUT",
        })
        .then((response) => {
            if (response.ok) {
                window.location.href = '/products'
            } else {
                console.error("Error al eliminar el ticket.");
            }
        })
        .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
            });
        });
    }
});
