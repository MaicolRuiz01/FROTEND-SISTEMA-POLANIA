$(document).ready(function() {
  // Agregar un evento que se active cada vez que el modal se muestre
  $('#modal-pago').on('show.bs.modal', function() {
    // Restablecer todos los valores de los campos del formulario a su estado inicial
    $('#form-editar-id').val('');
    $('#metodo_pago').val('EFECTIVO');
    $('#metodo_pago2').val('N/A');
    $('#varios_metodos').prop('checked', false);
    $('#precio1').val('');
    $('#entregadoCheckbox').prop('checked', false);
  });
});

function editarModal(id, precio1, pago1, pago2) {
  $("#modal-pago").modal('show');

  document.getElementById("form-editar-id").value = id;
  document.getElementById("precio1").value = precio1;
  document.getElementById("metodo_pago").value = pago1;
  document.getElementById("metodo_pago2").value = pago2;
}

$(document).ready(function () {
  $("#varios_metodos").change(function () {
    if (this.checked) {
      $("#metodo_pago_2").show();
    } else {
      $("#metodo_pago_2").hide();
    }
  });
});

$("body").on("submit", "#form-editar", function (event) {
  event.preventDefault();

  if ($("#form-editar").valid()) {
    editarElemento();
  }
});

function editarElemento() {
  const id = document.getElementById("form-editar-id").value;

  fetch(`http://sistema-polania-production.up.railway.app/servicios/${id}`)
    .then(response => response.json())
    .then(elementos => modificarDatos(elementos));
}

function modificarDatos(elementos) {
  const id = document.getElementById("form-editar-id").value;
  const metodoPago1 = document.getElementById("metodo_pago").value;
  const metodoPago2 = document.getElementById("metodo_pago2").value;
  const precio1 = document.getElementById("precio1").value;
  var entregado = document.getElementById('entregadoCheckbox').checked;
  const precioAnterior = elementos.precio1 + elementos.precio2;
  var fechaActual = new Date();
  var fechaHoraFormateada = fechaActual.toISOString().slice(0, 19); // Obtener la fecha y hora sin los milisegundos
  var precio2 = 0;

  if (precioAnterior != precio1) {
    precio2 = precioAnterior - precio1; // Calcular la diferencia entre el precio nuevo y el anterior
  }



  var cliente = elementos.nombreCliente;
  var vehiculo = elementos.vehiculo;
  var cantidad = elementos.cantidad;
  var chavetas = elementos.chavetas;
  var flauta = elementos.flauta;
  var listo = elementos.listo;
  var turno = elementos.turno;
  var tiempoEspecial = elementos.tiempo;
  var demora = elementos.demora;
  var diagnostico = elementos.diagnostico;

  if(listo == "proceso" && entregado == 1){

    alert('No ha dado un diagnostico al servicio, no puede ser entregado');
    entregado = 0;
  }

  if(entregado == 0){
    fechaHoraFormateada = elementos.fechaHora;
  }
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
    precio1: precio1,
    precio2: precio2,
    pago1: metodoPago1,
    pago2: metodoPago2,
    demora: demora,
    diagnostico: diagnostico
  }

  fetch(`http://sistema-polania-production.up.railway.app/servicios/save/${id}`, { // Utiliza "id" en la URL
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
      $("#modal-pago").modal('hide');
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
