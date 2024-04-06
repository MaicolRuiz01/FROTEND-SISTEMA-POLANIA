function mostrar_impresoras(){
    connetor_plugin.obtenerImpresoras()
                .then(impresoras => {                    
                 console.log(impresoras)
                });
}


async function imprimir(fila){
    let nombreImpresora = "SAM4S ELLIX20II";
    let api_key = "12345"

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
   
    const conector = new connetor_plugin()
                conector.fontsize("2")
                conector.textaling("center")
                conector.text("MULTIREPUESTOS POLANIA")
                conector.fontsize("1")
                conector.feed("3")
                conector.textaling("left")
                conector.text("Fecha: " + fechaFormateada + horaMinutosFormateados) 
                conector.text("------------------------------------------")
                conector.text("Turno: " + fila.turno)
                conector.text("Vehiculo: " + fila.vehiculo)
                conector.text("Cantidad : " + fila.cantidad)
                conector.text("Precio : $" + precioTotal)
                if(fila.flauta == 1){
                    conector.text("Flauta : Si")
                }

            const resp = await conector.imprimir(nombreImpresora, api_key);
            if (resp === true) {              
            
            } else {
                 console.log("Problema al imprimir: "+resp)                    
            
            }
}