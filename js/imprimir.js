const URLPlugin = "http://localhost:8000"

function mostrar_impresoras() {
    connetor_plugin.obtenerImpresoras()
        .then(impresoras => {
            console.log(impresoras)
        });
}

const imprimirImagenes = async (nombreImpresora, fila) => {
    

    var fechaCompleta = new Date(fila.fechaHora);
    var dia = fechaCompleta.getDate();
    var mes = fechaCompleta.getMonth() + 1; // Sumar 1 porque los meses se indexan desde 0
    // Formatear el día y el mes para que tengan dos dígitos si es necesario
    var diaFormateado = dia < 10 ? '0' + dia : dia;
    var mesFormateado = mes < 10 ? '0' + mes : mes;
    // Obtener la hora y los minutos
    var hora = fechaCompleta.getHours();
    var minutos = fechaCompleta.getMinutes();
    // Formatear la hora y los minutos para que tengan dos dígitos si es necesario
    var horaFormateada = hora < 10 ? '0' + hora : hora;
    var minutosFormateados = minutos < 10 ? '0' + minutos : minutos;
    // Crear la cadena de fecha en el formato DD-MM
    var fechaFormateada = diaFormateado + '-' + mesFormateado;
    // Crear la cadena de hora y minutos en el formato HH:MM
    var horaMinutosFormateados = horaFormateada + ':' + minutosFormateados;

    var precioTotal = fila.precio1 + fila.precio2;


    const conector = new ConectorPluginV3(URLPlugin);
    
    conector.Iniciar();

    conector.EstablecerEnfatizado("Bold");
    conector.EstablecerAlineacion("center");
    conector.EscribirTexto("MULTIREPUESTOS POLANIA");
    conector.Feed("3");
    conector.EstablecerAlineacion("left");
    conector.EscribirTexto("Fecha: " + fechaFormateada + horaMinutosFormateados);
    conector.EscribirTexto("------------------------------------------");
    conector.EscribirTexto("Turno: " + fila.turno);
    conector.EscribirTexto("Vehiculo: " + fila.vehiculo);
    conector.EscribirTexto("Cantidad : " + fila.cantidad);
    conector.EscribirTexto("Precio : $" + precioTotal);
    if (fila.flauta == 1) {
        conector.EscribirTexto("Flauta : Si");
    }

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