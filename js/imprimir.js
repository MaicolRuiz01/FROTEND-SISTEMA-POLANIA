const URLPlugin = "http://localhost:8000"

function mostrar_impresoras() {
    connetor_plugin.obtenerImpresoras()
        .then(impresoras => {
            console.log(impresoras)
        });
}

const imprimirImagenes = async (nombreImpresora) => {
    const conector = new ConectorPluginV3(URLPlugin);
    conector.Iniciar();
    conector.Corte(1);
    conector.EscribirTexto("Multirepuestos Polania");
    conector.Feed(1);
    conector.Iniciar(); //Nota: esto solo es necesario en ocasiones, por ejemplo en mi impresora debo hacerlo siempre que acabo de imprimir una imagen
    conector.Feed(1);
    conector.Corte(1);



    const respuesta = await conector
        .imprimirEn(nombreImpresora);
    if (respuesta === true) {
        conector.Corte(1);
        alert("Impreso correctamente");
    } else {
        alert("Error: " + respuesta);
    }
}