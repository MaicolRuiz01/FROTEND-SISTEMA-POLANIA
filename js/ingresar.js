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
        };

        // Incrementar el turno y reiniciarlo si alcanza el límite (12)
        turno = turno % 12 + 1;

        // Guardar el nuevo valor de turno en el localStorage
        localStorage.setItem('turno', turno);

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
                // Si la respuesta es exitosa, mostrar una alerta de éxito
                mostrarExito('Servicio guardado exitosamente.');
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
            $('#formulario').modal('hide');
            // Actualizar la tabla
            obtenerDatos();
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

function mostrar_impresoras(){
    connetor_plugin.obtenerImpresoras()
                .then(impresoras => {                    
                 console.log(impresoras)
                });
}


async function imprimir(){
    let nombreImpresora = "SAM4S ELLIX20II";
    let api_key = "12345"
    
   
    const conector = new connetor_plugin()
                conector.fontsize("2")
                conector.textaling("center")
                conector.text("MULTIREPUESTOS POLANIA")
                conector.fontsize("1")
                conector.text("Calle de las margaritas #45854")
                conector.text("PEC7855452SCC")
                conector.feed("3")
                conector.textaling("left")
                conector.text("Fecha: Miercoles 8 de ABRIL 2022 13:50")                        
                conector.text("Cant.       Descripcion      Importe")
                conector.text("------------------------------------------")
                conector.text("1- Barrote 2x4x8                    $110")
                conector.text("3- Esquinero Vinil                  $165")
                conector.feed("1")
                conector.fontsize("2")
                conector.textaling("center")
                conector.text("Total: $275")
                conector.qr("https://abrazasoft.com")
                conector.feed("5")
                conector.cut("0") 

            const resp = await conector.imprimir(nombreImpresora, api_key);
            if (resp === true) {              
            
            } else {
                 console.log("Problema al imprimir: "+resp)                    
            
            }
}
