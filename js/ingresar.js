document.addEventListener('DOMContentLoaded', function () {
    var turno = localStorage.getItem('turno');
    if (!turno) {
        // Si no hay un valor guardado para turno, establecerlo en 1
        turno = 1;
    } else {
        // Convertir el valor recuperado a un número entero
        turno = parseInt(turno);
    }

    document.getElementById('formularioServicio').addEventListener('submit', function (event) {
        // Prevenir el comportamiento predeterminado de envío del formulario
        event.preventDefault();

        var fechaActual = new Date();
        var fechaHoraFormateada = fechaActual.toISOString(); // Obtener la fecha y hora sin los milisegundos

        // Obtener los valores de los campos del formulario
        var cliente = document.getElementById('cliente').value;
        var vehiculo = document.getElementById('vehiculo').value;
        var cantidad = document.getElementById('cantidad').value;
        var chavetas = document.getElementById('chavetas').value;
        var precio = document.getElementById('especial').value;
        var flauta = document.getElementById('flexSwitchCheckDefault').checked;
        var tiempoEspecial = document.getElementById('tiempoEspecialCheckbox').checked;
        var tiposervicio = document.getElementById('tiposervicio').value;
        var manobra = document.getElementById('manobra').value;

        var pago = "Sin Pagar"
        var pago2 = "N/A"
        var precio2 = 0
        var listo = "proceso";
        var entregado = 0;




        if (precio == '') {
            if (cantidad == '') {
                cantidad == 0;
                precio = 0;
            } else {
                precio = ((cantidad * 5000) + 10000);
            }
        } else {
            precio = precio * 1000;
        }

        if (manobra == '') {
            manobra = 0;
        }

        if (chavetas == '') {
            chavetas = 0;
        }

        manobra = manobra * 1000;

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
            entregado: entregado,
            tipoServicio: tiposervicio,
            manoObra: manobra
        };

        // Incrementar el turno y reiniciarlo si alcanza el límite (12)
        turno = turno % 12 + 1;

        // Guardar el nuevo valor de turno en el localStorage
        localStorage.setItem('turno', turno);

        fetch('https://sistema-polania-production.up.railway.app/servicios/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(function (response) {
                // Verificar si la solicitud fue exitosa
                if (response.ok) {
                    // Si la respuesta es exitosa, mostrar una alerta de éxito
                    mostrarExito('Servicio guardado exitosamente.');
                    if (datos.manoObra == 0) {
                        imprimir(datos);
                    }


                } else {
                    // Si hay un error en la respuesta, obtener el mensaje de error del servidor
                    response.json().then(function (data) {
                        // Mostrar una alerta de error con el mensaje del servidor
                        mostrarError('Error: ' + data.message);
                    }).catch(function (error) {
                        // Si no se puede obtener el mensaje de error del servidor, mostrar un mensaje genérico
                        mostrarError('Error en la respuesta del servidor.');
                    });
                }
            })
            .catch(function (error) {
                // Capturar y manejar errores de la solicitud
                console.error('Error:', error);
                // Mostrar una alerta de error genérico
                mostrarError('Ocurrió un error al guardar el servicio.');
            });
    });
});

// Función para mostrar una alerta de éxito
function mostrarExito(mensaje) {
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: mensaje,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Cerrar el modal
            $("#formulario").modal('hide');
            obtenerDatos();
            limpiarModal();
        }
    });
}

// Función para mostrar una alerta de error
function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
    });
}

function limpiarModal() {
    // Aquí debes limpiar los campos del modal según tus necesidades
    // Por ejemplo, si tienes campos de entrada de texto, puedes establecer su valor a vacío
    $('#cliente').val('');
    $('#vehiculo').val('');
    $('#cantidad').val('');
    $('#chavetas').val('');
    $('#especial').val('');
    $('#flexSwitchCheckDefault').val('');
    $('#activarServicio').prop('checked', false);
    $('#tiposervicio').val('');
    $('#manobra').val('');

    document.getElementById('activarServicio').addEventListener('change', function () {
        var formularioMetodoPago = document.getElementById('formularioTipoServicio');
        var manobra = document.getElementById('manobra');
        if (this.checked) {
          formularioMetodoPago.style.display = 'block';
          manobra.style.display = 'block';
        } else {
          formularioMetodoPago.style.display = 'none';
          manobra.style.display = 'none';
        }
      });
    // Y así sucesivamente para todos los campos que necesites limpiar
}
