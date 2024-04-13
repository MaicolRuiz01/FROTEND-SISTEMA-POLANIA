async function imprimir(fila) {
    try {
        // Obtener el elemento iframe
        const iframe = document.getElementById('iframeTicket');
        var precio = fila.precio1 + fila.precio2;

        var fechaCompleta = new Date(fila.fechaHora);
        fechaCompleta.setDate(fechaCompleta.getDate() - 1);
        // Configurar la zona horaria para Madrid
        var opcionesFechaHora = {
            timeZone: 'Europe/Madrid',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            
        };

        // Formatear la fecha y la hora
        var fechaHoraFormateada = fechaCompleta.toLocaleString('es-ES', opcionesFechaHora);
        // Crear una URL con los datos de fila
        const url = new URL('./pages/plantilla.html', window.location.href);
        url.searchParams.append('fecha', fechaHoraFormateada);
        url.searchParams.append('turno', fila.turno);
        url.searchParams.append('vehiculo', fila.vehiculo);
        url.searchParams.append('cantidad', fila.cantidad);
        url.searchParams.append('precio', precio);
        url.searchParams.append('chavetas', fila.chavetas);
        url.searchParams.append('flauta', fila.flauta);




        // Cargar el contenido de la página "plantilla.html" en el iframe
        iframe.src = url;

        // Esperar a que el contenido se cargue completamente en el iframe
        await new Promise(resolve => {
            iframe.onload = resolve;
        });

        // Imprimir el contenido del iframe
        iframe.contentWindow.print();

    } catch (error) {
        console.error("Error al imprimir el ticket:", error);
        alert("Hubo un error al imprimir el ticket. Por favor, revisa la consola para más detalles.");
    }
}
