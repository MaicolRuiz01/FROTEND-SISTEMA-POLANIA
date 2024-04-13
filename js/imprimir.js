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
    const url = "https://scontent.fcuc1-1.fna.fbcdn.net/v/t39.30808-1/374462390_122111429378019951_2695154912822763709_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEcXpfNom0PpNl6yP9sKggyTjRnX3Xw5tdONGdfdfDm18U7VPsEc3kZ7bjol8iMlO8GpYgQCeIgQETQG9Zi9jz6&_nc_ohc=qIc10nTXwdwAb7cuNaE&_nc_ht=scontent.fcuc1-1.fna&oh=00_AfAf6eUU-m1_z3OQVgJSLFzPBQMqYPmMki4WD24ESV7bug&oe=661FA89E";

    conector.Iniciar();
    conector.Corte(1);
    conector.DescargarImagenDeInternetEImprimir(url, 1, 2);
    conector.Feed(2);
    conector.EscribirTexto("MULTIREPUESTOS POLANIA");
     conector.Feed(2);
    conector.EscribirTexto("Fecha: " + fechaFormateada + horaMinutosFormateados);
    conector.Feed(1);
    conector.EscribirTexto("Turno: " + fila.turno);
    conector.Feed(1);
    conector.EscribirTexto("------------------------------------------");
    conector.Feed(1);
    conector.EscribirTexto("Vehiculo: " + fila.vehiculo);
    conector.Feed(1);
    conector.EscribirTexto("Cantidad : " + fila.cantidad);
    conector.Feed(1);
    conector.EscribirTexto("Precio : $" + precioTotal);
    conector.Feed(1);
    if (fila.flauta == 1) {
        conector.EscribirTexto("Flauta : Si");
    }
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
