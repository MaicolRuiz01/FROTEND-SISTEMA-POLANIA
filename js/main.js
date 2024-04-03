function obtenerGananciasDelDia() {
    // Obtener la fecha actual en formato ISO 8601
    var fechaActual = new Date().toISOString().slice(0, 10);

    // Hacer la solicitud al backend para obtener los servicios del día
    fetch('https://sistema-polania-production.up.railway.app/servicios')
    .then(response => response.json())
    .then(data => {
        // Sumar las ganancias para los servicios pagados en efectivo y del día de hoy
        let gananciasTotales = 0;
        let gananciasDavivienda=0;
        let gananciasBancolombia=0;
        let credito=0;
        data.forEach(servicio => {
            // Extraer la fecha del servicio y obtener solo la parte de la fecha (sin la hora)
            const fechaServicio = servicio.fechaHora.substring(0, 10);

            // Verificar si el servicio se realizó en el día de hoy y si fue pagado en efectivo
            if (fechaServicio === fechaActual &&
                (servicio.pago1 === 'EFECTIVO' || servicio.pago2 === 'EFECTIVO')) {
                gananciasTotales += servicio.precio1 + servicio.precio2;
            }
            if (fechaServicio === fechaActual &&
                (servicio.pago1 === 'DAVIVIENDA' || servicio.pago2 === 'DAVIVIENDA')) {
                gananciasDavivienda += servicio.precio1 + servicio.precio2;
            }
            if (fechaServicio === fechaActual &&
                (servicio.pago1 === 'BANCOLOMBIA' || servicio.pago2 === 'BANCOLOMBIA')) {
                gananciasBancolombia += servicio.precio1 + servicio.precio2;
            }
            if (fechaServicio === fechaActual &&
                (servicio.pago1 === 'CREDITO' || servicio.pago2 === 'CREDITO')) {
                credito += servicio.precio1 + servicio.precio2;
            }
        });
        // Mostrar las ganancias en un div en el frontend
        const divGanancias = document.getElementById('gananciasDelDia');
        const divDavivienda = document.getElementById('davivienda');
        const divBancolombia = document.getElementById('bancolombia');
        const divCredito = document.getElementById('credito');

        divGanancias.textContent = `EFECTIVO: ${gananciasTotales}`;
        divDavivienda.textContent = `DAVIVIENDO: ${gananciasDavivienda}`;
        divBancolombia.textContent = `BANCOLOMBIA: ${gananciasBancolombia}`;
        divCredito.textContent = `CREDITO: ${credito}`;
    })
    .catch(error => console.error('Error al obtener las ganancias del día:', error));
}

// Llamar a la función para obtener las ganancias del día
obtenerGananciasDelDia();
