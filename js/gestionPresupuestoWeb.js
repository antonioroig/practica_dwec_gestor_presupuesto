function mostrarDatoEnId(valor, idElemento) {
    let div = document.createElement('div');
    div.className = idElemento;
    div.innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto) {

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}