let txtNombre = document.getElementById("Name"), txtNumber = document.getElementById("Number"),
    btnClear = document.getElementById("btnClear"), btnAgregar = document.getElementById("btnAgregar"),
    alertValidaciones = document.getElementById("alertValidaciones"),
    alertValidacionesTexto = document.getElementById("alertValidacionesTexto"),
    cuerpoTabla = document.querySelector('#tablaListaCompras>tbody'),
    contadorProductos = document.getElementById("contadorProductos"),
    productosTotal = document.getElementById('productosTotal'), precioTotal = document.getElementById('precioTotal');


let idTimeout, precio = 0, contador = 0, totalEnProductos = 0, costoTotal = 0, isValid = true;

// * Limpiar Campos
btnClear.addEventListener("click", (e) => {
    e.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    cuerpoTabla.innerHTML = "";
    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    contadorProductos.innerText = "0";
    productosTotal.innerText = "0";
    precioTotal.innerText = "$ 0";
//     Limpiando local storage
    localStorage.removeItem(`contadorProductos`);
    localStorage.removeItem(`totalEnProductos`);
    localStorage.removeItem(`precioTotal`);
})

// * -------------

// * Validadcion txtNumber
function validarCantidad() {
    if (txtNumber.value.length === 0) {
        return false
    }
    if (parseFloat(txtNumber.value) <= 0) {
        return false
    }
    if (isNaN(txtNumber.value)) {
        return false;
    }

    return true;
}// * -------------

// * Precio random
function getPrecio() {
    return Math.floor(Math.random() * 50 * 100) / 100;
}// * -------------

btnAgregar.addEventListener("click", (e) => {
    e.preventDefault();
    isValid = true;
    clearTimeout(idTimeout);

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    let lista = `Los siguientes campos deben ser llenados correctamente: <ul>`;
    if (txtNombre.value.length < 2) {
        txtNombre.style.border = "solid thin red"
        lista += `<li>Se debe escribir un nombre valido</li>`
        alertValidaciones.style.display = " block";
        isValid = false;
    } else {
        txtNombre.style.border = "";
    }

    if (!validarCantidad()) {
        txtNumber.style.border = "solid thin red"
        lista += `<li>Se debe escribir un numero valido</li>`
        alertValidaciones.style.display = " block";
        isValid = false;
    } else {
        txtNumber.style.border = ""
    }

    lista += "</ul>"
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista)

    idTimeout = setTimeout(() => {
        alertValidaciones.style.display = " none";
    }, 5000)
    if (isValid) {
        precio = getPrecio();
        contador++;
        let row = `<tr>
                        <th>${contador}</th>
                        <td>${txtNombre.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                       </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText = `${contador}`;
        totalEnProductos += parseFloat(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
        // ? Guardando Manera local
        localStorage.setItem(`contadorProductos`, contador);
        localStorage.setItem(`totalEnProductos`, totalEnProductos);
        localStorage.setItem(`precioTotal`, costoTotal.toFixed(2));
        // ? ----------------------
        txtNombre.value = " ";
        txtNumber.value = " ";
        txtNombre.focus();
    }

})
txtNumber.addEventListener("blur", (e) => {
    e.preventDefault()
    txtNumber.value = txtNumber.value.trim();
})
txtNombre.addEventListener("blur", (e) => {
    e.preventDefault()
    txtNombre.value = txtNombre.value.trim();
})

window.addEventListener("load", (e) => {
    if (localStorage.getItem("contadorProductos") == null) {
        localStorage.setItem("contadorProductos", "0")
    }
    if (localStorage.getItem("totalEnProductos") == null) {
        localStorage.setItem("totalEnProductos", "0")
    }
    if (localStorage.getItem("precioTotal") == null) {
        localStorage.setItem("precioTotal", "0.0")
    }


    contador = parseInt(localStorage.getItem(`contadorProductos`))
    totalEnProductos = parseInt(localStorage.getItem(`totalEnProductos`));
    costoTotal = parseFloat(localStorage.getItem(`precioTotal`));

    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal}`;
})