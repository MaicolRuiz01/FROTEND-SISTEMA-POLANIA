const URLPlugin = "http://localhost:8000"

function mostrar_impresoras(){
    connetor_plugin.obtenerImpresoras()
                .then(impresoras => {                    
                 console.log(impresoras)
                });
}

const imprimirImagenes = async (nombreImpresora) => {
    const conector = new ConectorPluginV3(URLPlugin);
    conector.Iniciar();
        conector.CorteParcial();
        conector.EscribirTexto("Multirepuestos Polania");
        conector.Feed(1);
        conector.Iniciar(); //Nota: esto solo es necesario en ocasiones, por ejemplo en mi impresora debo hacerlo siempre que acabo de imprimir una imagen
        conector.Feed(1);
        conector.Corte(2);
        conector.CorteParcial();
    
   
    const respuesta = await conector
        .imprimirEn(nombreImpresora);
    if (respuesta === true) {
        alert("Impreso correctamente");
    } else {
        alert("Error: " + respuesta);
    }
}