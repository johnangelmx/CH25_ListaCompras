let txtNombre = document.getElementById("Name"), txtNumber = document.getElementById("Number"),
    btnClear = document.getElementById("btnClear"), btnAgregar = document.getElementById("btnAgregar"),
    alertValidaciones = document.getElementById("alertValidaciones"),
    alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

// * Limpiar Campos
btnClear
    .addEventListener("click", (e) => {
        e.preventDefault();
        txtNombre.value = " ";
        txtNumber.value = " ";
    })

btnAgregar.addEventListener("click", (e) => {
    e.preventDefault();
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    let lista = `Los siguientes campos deben ser llenados correctamente: <ul>`;

    if (txtNombre.value.length === 0) {
        txtNombre.style.border = "solid thin red"
        lista += `<li>Se debe escribir un nombre valido</li>`
        alertValidaciones.style.display = " block";
    } else {
        txtNombre.style.border = "";
    }

    if (txtNumber.value.length === 0) {
        txtNumber.style.border = "solid thin red"
        lista += `<li>Se debe escribir un numero valido</li>`
        alertValidaciones.style.display = " block";
    } else {
        txtNumber.style.border = ""
    }

    lista += "</ul>"
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista)
})
txtNumber.addEventListener("blur", (e) => {
    e.preventDefault()
    txtNumber.value = txtNumber.value.trim();
})
txtNombre.addEventListener("blur", (e) => {
    e.preventDefault()
    txtNombre.value = txtNombre.value.trim();
})