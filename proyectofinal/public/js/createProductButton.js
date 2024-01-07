document.addEventListener("DOMContentLoaded", function () {
    let createProductButton = document.querySelector(".createProduct");
    if (createProductButton) {
        createProductButton.addEventListener("click", function () {
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const price = document.getElementById("price").value;
            const code = document.getElementById("code").value;
            const stock = document.getElementById("stock").value;
            const category = document.getElementById("category").value;
            const owner = document.getElementById("owner").value;

        if (!confirm("¿Está seguro de que desea crear este producto?")) {
            return;
        }

        const product = {
            title,
            description,
            price,
            code,
            stock,
            category,
            owner,
        };

        fetch(`/api/products/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
        .then((response) => {
            if (response.ok) {
                alert("Producto creado correctamente");
                document.getElementById("title").value = "";
                document.getElementById("description").value = "";
                document.getElementById("price").value = "";
                document.getElementById("code").value = "";
                document.getElementById("stock").value = "";
            } else {
                alert("Faltan datos obligatorios o son duplicados.")
                console.error("Error al crear el producto.");
            }
        })
        .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
            });
        });
    }
});