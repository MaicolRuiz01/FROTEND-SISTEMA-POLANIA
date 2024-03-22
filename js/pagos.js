function editarModal(id, precio1) {
  $("#modal-editar").modal('show');

  
      document.getElementById("form-editar-id").value = id;
      document.getElementById("precio1").value = precio1;
      document.getElementById("precio2").value = 0;
   
}


$(document).ready(function () {
  $("#varios_metodos").change(function () {
    if (this.checked) {
      $("#metodo_pago_2").show();
      $("#precio2_container").show();
    } else {
      $("#metodo_pago_2").hide();
      $("#precio2_container").hide();
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
  const metodoPago1 = document.getElementById("metodo_pago").value;
  const metodoPago2 = document.getElementById("metodo_pago_2").value;
  const precio1 = document.getElementById("precio1").value;
  const precio2 = document.getElementById("precio2").value;
  var fechaActual = new Date();
  var fechaHoraFormateada = fechaActual.toISOString().slice(0, 19); // Obtener la fecha y hora sin los milisegundos

  var datos = {
    fechaHora: fechaHoraFormateada,
    precio1: precio1,
    precio2: precio2,
    pago1: metodoPago1,
    pago2: metodoPago2,
  }

  fetch(`http://localhost:8080/servicios/save/${id}`, { // Utiliza "id" en la URL
    method: 'PUT',
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
          obtenerDatos();
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
}

