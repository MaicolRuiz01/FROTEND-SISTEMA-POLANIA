
document.addEventListener('DOMContentLoaded', function () {

    var turno = localStorage.getItem('turno');
    if (!turno) {
        // Si no hay un valor guardado para turno, establecerlo en 1
        turno = 1;
    }

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
        var tiempoEspecial = document.getElementById('tiempoEspecialCheckbox').checked;

        var pago = "Sin Pagar"
        var pago2 = "N/A"
        var precio2 = 0
        var listo = "proceso";
        var entregado = 0;
        if (precio == '') {
            precio = ((cantidad * 5000) + 10000);
        }


        if (chavetas == '') {
            chavetas = 0;
        }







        // Crear el objeto de datos para enviar al servidor
        var datos = {
            fechaHora: fechaHoraFormateada, // Agregar la fecha actual
            nombreCliente: cliente,
            vehiculo: vehiculo,
            cantidad: cantidad,
            chavetas: chavetas,
            flauta: flauta,
            precio1: precio,
            precio2: precio2,
            pago1: pago,
            pago2: pago2,
            listo: listo,
            turno: turno,
            tiempo: tiempoEspecial,
            entregado: entregado

            // Agrega aquí los otros campos del formulario según tus necesidades
        };

        //                           Incrementar el turno y reiniciarlo si alcanza el límite (12)
        turno = turno % 12 + 1;

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

                    alert('Servicio guardado exitosamente.');
                    

                } else {
                    // Si hay un error en la respuesta, obtener el mensaje de error del servidor
                    response.json().then(function (data) {
                        // Mostrar el mensaje de error al usuario
                        alert('Error: ' + data.message);
                    }).catch(function (error) {
                        // Si no se puede obtener el mensaje de error del servidor, mostrar un mensaje genérico
                        alert('Error en la respuesta del servidor.');
                    });
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
