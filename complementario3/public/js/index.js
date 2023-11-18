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
                  alert("No puedes agregar tu propio producto al carrito.");
                  console.error("Error al agregar el producto al carrito.");
              }
          })
          .catch(function (error) {
              console.error("Error al realizar la solicitud:", error);
          });
      });
  });

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
            console.error("Error al eliminar el producto.");
        }
        })
        .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        });
    });
  }

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
            status
        };

    fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(modifications)
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
            console.error("Error al modificar el producto.");
        }
        })
        .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        });
    });
  }
});

//configuración chat

console.log("Hola desde un archivo público");

const socket = io();

let user;
let chatBox = document.querySelector("#chatBox");

Swal.fire({
  title: "Identifícate",
  input: "text",
  text: "Ingresa el usuario para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "¡Necesitas escribir un nombre de usuario para continuar!";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;

  socket.emit("userConnect", result.value);
});

chatBox.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        user: user,
        message: chatBox.value,
      });
    }
    chatBox.value = "";
  }
});

socket.on("messagesLogs", (data) => {
  let log = document.querySelector("#messagesLogs");
  let messages = "";
  data.forEach((message) => {
    messages += `${message.user}: ${message.message} </br>`;
  });

  log.innerHTML = messages;
});

socket.on("newUser", (data) => {
  Swal.fire({
    text: `${data} se ha unido al chat`,
    toast: true,
    position: "top-right",
  });
});
