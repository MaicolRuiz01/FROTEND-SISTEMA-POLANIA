function obraModal(id, manoObra) {
    $("#mano-obra").modal('show');

    document.getElementById("form-obra-id").value = id;
    document.getElementById("manoobra").value = manoObra;
}

$("body").on("submit", "#form-obra", function (event) {
    event.preventDefault();

    if ($("#form-obra").valid()) {
        editarDatos();
    }
});

function editarDatos() {


    const id = document.getElementById("form-obra-id").value;

    fetch(`https://sistema-polania-production.up.railway.app/servicios/${id}`)
        .then(response => response.json())
        .then(elementos => modificarDiagnostico(elementos));


}

function modificarDiagnostico(elementos) {
    var id = document.getElementById("form-obra-id").value;
    var manoObra = document.getElementById("manoobra").value;


    var cliente = elementos.nombreCliente;
    var vehiculo = elementos.vehiculo;
    var cantidad = elementos.cantidad;
    var chavetas = elementos.chavetas;
    var flauta = elementos.flauta;
    var turno = elementos.turno;
    var tiempoEspecial = elementos.tiempo;
    var entregado = elementos.entregado;
    var fechaHoraFormateada = elementos.fechaHora;
    var precio1 = elementos.precio1;
    var precio2 = elementos.precio2;
    var metodoPago1 = elementos.pago1;
    var metodoPago2 = elementos.pago2;
    var demoraCargada = elementos.demora;
    var tiposervicio = elementos.tipoServicio;
    var listo = elementos.listo;
    var diag = elementos.diagnostico;

    var demora = demoraCargada;


    var datos = {
        nombreCliente: cliente,
        vehiculo: vehiculo,
        cantidad: cantidad,
        chavetas: chavetas,
        flauta: flauta,
        listo: listo,
        turno: turno,
        tiempo: tiempoEspecial,
        entregado: entregado,
        fechaHora: fechaHoraFormateada,
        diagnostico: diag,
        precio1: precio1,
        precio2: precio2,
        pago1: metodoPago1,
        pago2: metodoPago2,
        demora: demora,
        tipoServicio: tiposervicio,
        manoObra: manoObra
    }

    fetch(`https://sistema-polania-production.up.railway.app/servicios/save/${id}`, { // Utiliza "id" en la URL
        method: 'PUT',
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
}

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
            $("#mano-obra").modal('hide');
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


