document.addEventListener("DOMContentLoaded", function () {
    let deleteProductButton = document.querySelector(".deleteProduct");
    if (deleteProductButton) {
        deleteProductButton.addEventListener("click", function () {
        const productId = document.getElementById("productId").value;

        if (!productId) {
            alert("Por favor, ingrese un ID de producto válido.");
            return;
        }

        if (!confirm("¿Está seguro de que desea eliminar este producto?")) {
            return;
        }

        fetch(`/api/products/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                }
            })
        .then((response) => {
            if (response.ok) {
                alert("Producto eliminado correctamente");
                document.getElementById("productId").value = "";
            } else {
                alert("No estas autorizado a eliminar este producto");
                console.error("Error al eliminar el producto.");
            }
        })
        .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
            });
        });
    }
});