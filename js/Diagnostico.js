function diagModal(id, tiempoRestanteDetenido) {
  $("#modal-diag").modal('show');

  document.getElementById("form-diag-id").value = id;
  document.getElementById("form-diag-detenido").value = tiempoRestanteDetenido;
}

$("body").on("submit", "#form-diag", function (event) {
  event.preventDefault();

  if ($("#form-diag").valid()) {
    editarDatos();
  }
});

function editarDatos() {


  const id = document.getElementById("form-diag-id").value;

  fetch(`https://sistema-polania-production.up.railway.app/servicios/${id}`)
    .then(response => response.json())
    .then(elementos => modificarDiagnostico(elementos));


}

function modificarDiagnostico(elementos) {
  var id = document.getElementById("form-diag-id").value;
  var demora = document.getElementById("form-diag-detenido").value;

  var pulso = document.getElementById("pulso").value;
  var goteo = document.getElementById("goteo").value;
  var directo = document.getElementById('directo').value;
  var mas = document.getElementById('mas').value;
  var menos = document.getElementById('menos').value;
  var diag = "";

  if (pulso != "") {
    diag = diag + "P: " + pulso;
  }

  if (goteo != "") {
    diag = diag + "G: " + goteo;
  }

  if (directo != "") {
    diag = diag + "D: " + directo;
  }

  if (mas != "") {
    diag = diag + "mas: " + mas;
  }

  if (menos != "") {
    diag = diag + "menos: " + menos;
  }

  if (diag == "") {
    diag = "Todo bien";
  }



  var listo = "listo";




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
  var manobra = elementos.manoObra;

  if (demoraCargada != null) {
    demora = demoraCargada;
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
    diagnostico: diag,
    precio1: precio1,
    precio2: precio2,
    pago1: metodoPago1,
    pago2: metodoPago2,
    demora: demora,
    tipoServicio: tiposervicio,
    manoObra: manobra
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
      $("#modal-diag").modal('hide');
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


