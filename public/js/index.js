//conexion de websocket del lado del cliente
const socket = io();

const formNewProduct = document.getElementById("productForm");

// enviar nuevo producto
formNewProduct.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formNewProduct);
    const productData = {};
    formData.forEach((value, key) => {
        productData[key] = value;
    });

    socket.emit("newProduct", productData);
    formNewProduct.reset();
});

// crear producto con boton eliminar
function createProductLi(product) {
    const li = document.createElement("li");
    li.innerHTML = `${product.title} - ${product.price} 
                    <button data-id="${product.id}">Eliminar</button>`;

    li.querySelector("button").addEventListener("click", () => {
        socket.emit("deleteProduct", product.id);
    });

    return li;
}

// agregar nuevos productos 
socket.on("productAdded", (newProduct) => {
    const productsList = document.getElementById("productList");
    const li = createProductLi(newProduct);
    productsList.appendChild(li);
});

// eliminar producto 
socket.on("productDeleted", (productId) => {
    const productsList = document.getElementById("productList");
    const item = productsList.querySelector(`button[data-id="${productId}"]`)?.parentElement;
    if (item) item.remove();
});

// agregar botones existentes
document.querySelectorAll("#productList button").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        socket.emit("deleteProduct", id);
    });
});