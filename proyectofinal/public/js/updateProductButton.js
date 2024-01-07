document.addEventListener("DOMContentLoaded", function () {
    let updateProductButton = document.querySelector(".updateProduct");
    if (updateProductButton) {
        updateProductButton.addEventListener("click", function () {
            const productId = document.getElementById("productId").value;
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const price = document.getElementById("price").value;
            const code = document.getElementById("code").value;
            const stock = document.getElementById("stock").value;
            const category = document.getElementById("category").value;
            const status = document.getElementById("status").value;

        if (!productId) {
            alert("Por favor, ingrese un ID de producto válido.");
            return;
        }

        if (!confirm("¿Está seguro de que desea modificar este producto?")) {
            return;
        }

        const modifications = {
            title,
            description,
            price,
            code,
            stock,
            category,
            status,
        };

        fetch(`/api/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(modifications),
        })
        .then((response) => {
            if (response.ok) {
                alert("Producto modificado correctamente");
                document.getElementById("productId").value = "";
                document.getElementById("title").value = "";
                document.getElementById("description").value = "";
                document.getElementById("price").value = "";
                document.getElementById("code").value = "";
                document.getElementById("stock").value = "";
            } else {
                alert("No estás autorizado a modificar este producto.")
                console.error("Error al modificar el producto.");
            }
        })
        .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
            });
        });
    }
});
