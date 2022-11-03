

function mostrarDatoEnId(valor,idElemento){
    let idDato = document.getElementById(idElemento);
    idDato.textContent = valor.textContent;
    cy.visit("/interaccionHTML.html");
    cy.get(`section[id=]`);
}

function mostrarGastoWeb(){

}

function mostrarGastosAgrupadosWeb(){

}






//NO MODIFICAR.
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}