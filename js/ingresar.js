
document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById('formularioServicio').addEventListener('submit', function (event) {
        // Prevenir el comportamiento predeterminado de envío del formulario
        event.preventDefault();



        var fechaActual = new Date();
        var fechaHoraFormateada = fechaActual.toISOString().slice(0, 19); // Obtener la fecha y hora sin los milisegundos

        



        // Obtener los valores de los campos del formulario
        var cliente = document.getElementById('cliente').value;
        var vehiculo = document.getElementById('vehiculo').value;
        var cantidad = document.getElementById('cantidad').value;
        var chavetas = document.getElementById('chavetas').value;
        var precio = document.getElementById('especial').value;
        var flauta = document.getElementById('flexSwitchCheckDefault').checked;
        var pago = "Sin Pagar"
        var listo = "en proceso";

        if (precio == '') {
            precio = ((cantidad * 5000) + 10000);
        }
        // Crear el objeto de datos para enviar al servidor
        var datos = {
            fechaHora: fechaHoraFormateada, // Agregar la fecha actual
            nombreCliente: cliente,
            vehiculo: vehiculo,
            cantidad: cantidad,
            chavetas: chavetas,
            flauta: flauta,
            precio: precio,
            pago: pago,
            listo: listo

            // Agrega aquí los otros campos del formulario según tus necesidades
        };

        // Enviar la solicitud POST al servidor
        fetch('http://localhost:8080/servicios/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(function (response) {
                // Verificar si la solicitud fue exitosa
                if (response.ok) {
                    // Si la respuesta es exitosa, mostrar un mensaje de éxito al usuario
                    obtenerYMostrarDatos();
                    alert('Servicio guardado exitosamente.');
                } else {
                    // Si hay un error en la respuesta, lanzar un error
                    throw new Error('Error en la respuesta del servidor.');
                }
            })
            .catch(function (error) {
                // Capturar y manejar errores de la solicitud
                console.error('Error:', error);
                // Mostrar un mensaje de error al usuario
                alert('Ocurrió un error al guardar el servicio.');
            });
    });
});
