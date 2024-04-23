function obtenerGananciasDelDia() {
    // Obtener la fecha actual en formato ISO 8601
    var fechaActual = new Date().toISOString().slice(0, 10);

    // Hacer la solicitud al backend para obtener los servicios del día
    fetch('https://sistema-polania-production.up.railway.app/servicios')
        .then(response => response.json())
        .then(data => {
            // Sumar las ganancias para los servicios pagados en efectivo y del día de hoy
            let gananciasTotales = 0;
            let gananciasDavivienda = 0;
            let gananciasBancolombia = 0;
            let credito = 0;
            let bajada = 0;
            let sincro = 0;
            let manoBra = 0;
            let suspension = 0;
            let otro = 0;
            let cambioPartes = 0;

            data.forEach(servicio => {
                // Extraer la fecha del servicio y obtener solo la parte de la fecha (sin la hora)
                const fechaServicio = servicio.fechaHora.substring(0, 10);

                // Verificar si el servicio se realizó en el día de hoy y si fue pagado en efectivo
                if (fechaServicio === fechaActual &&
                    (servicio.pago1 === 'EFECTIVO')) {
                    gananciasTotales += servicio.precio1;
                }

                if (fechaServicio === fechaActual &&
                    (servicio.pago2 === 'EFECTIVO')) {
                    gananciasTotales += servicio.precio2;
                }

                if (fechaServicio === fechaActual &&
                    (servicio.pago1 === 'DAVIVIENDA')) {
                    gananciasDavivienda += servicio.precio1;
                }

                if (fechaServicio === fechaActual &&
                    (servicio.pago2 === 'DAVIVIENDA')) {
                    gananciasDavivienda += servicio.precio2;
                }


                if (fechaServicio === fechaActual &&
                    (servicio.pago1 === 'BANCOLOMBIA')) {
                    gananciasBancolombia += servicio.precio1;
                }

                if (fechaServicio === fechaActual &&
                    (servicio.pago2 === 'BANCOLOMBIA')) {
                    gananciasBancolombia += servicio.precio2;
                }


                if (fechaServicio === fechaActual &&
                    (servicio.pago1 === 'CREDITO')) {
                    credito += servicio.precio1;
                }

                if (fechaServicio === fechaActual &&
                    (servicio.pago2 === 'CREDITO')) {
                    credito += servicio.precio2;
                }


                if (fechaServicio === fechaActual &&
                    (servicio.tipoServicio === 'BAJADA')) {
                    bajada += servicio.manoObra;
                }
                if (fechaServicio === fechaActual &&
                    (servicio.tipoServicio === 'SINCRONIZACION')) {
                    sincro += servicio.manoObra;
                }

                if (fechaServicio === fechaActual &&
                    (servicio.pago1 != 'Sin Pagar')) {
                    manoBra += servicio.manoObra;
                }

                if (fechaServicio === fechaActual &&
                    (servicio.tipoServicio === 'SUSPENSION')) {
                    suspension += servicio.manoObra;
                }

                if (fechaServicio === fechaActual &&
                    (servicio.tipoServicio === 'OTRO')) {
                    otro += servicio.manoObra;
                }

                if (fechaServicio === fechaActual &&
                    (servicio.tipoServicio === 'CAMBIO PARTES')) {
                    cambioPartes += servicio.manoObra;
                }

            });
            // Mostrar las ganancias en un div en el frontend
            const divGanancias = document.getElementById('gananciasDelDia');
            const divDavivienda = document.getElementById('davivienda');
            const divBancolombia = document.getElementById('bancolombia');
            const divCredito = document.getElementById('credito');
            const divBajada = document.getElementById('bajadas');
            const divSincro = document.getElementById('sincro');
            const divSuspension = document.getElementById('suspension');
            const divmano = document.getElementById('manoObra');
            const divOtro = document.getElementById('otro');
            const divCambioPartes = document.getElementById('cambioPartes');


            divGanancias.textContent = `EFECTIVO: ${gananciasTotales/1000}`;
            divDavivienda.textContent = `DAVIVIENDA: ${gananciasDavivienda/1000}`;
            divBancolombia.textContent = `BANCOLOMBIA: ${gananciasBancolombia/1000}`;
            divCredito.textContent = `CREDITO: ${credito/1000}`;
            divBajada.textContent = `BAJADA: ${bajada/1000}`;
            divSincro.textContent = `SINCRONIZACION: ${sincro/1000}`;
            divSuspension.textContent = `SUSPENSION: ${suspension/1000}`;
            divOtro.textContent = `OTRO: ${otro/1000}`;
            divCambioPartes.textContent = `CAMBIO PARTES: ${cambioPartes/1000}`;
            divmano.textContent = `MANO DE OBRA: ${manoBra/1000}`;
        })
        .catch(error => console.error('Error al obtener las ganancias del día:', error));
}

// Llamar a la función para obtener las ganancias del día
obtenerGananciasDelDia();

