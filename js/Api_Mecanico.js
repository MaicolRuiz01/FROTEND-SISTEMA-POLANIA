var tiempoRestanteDetenido = '';
var intervalos = [];
var nombreImpresora = "POS-80";
// Función para cargar los datos en la tabla
function cargarDatosEnTabla(datos) {
  var tabla = $('#tablaDatos tbody');
  // Limpiar la tabla antes de cargar nuevos datos
  tabla.empty();

  var datosFiltrados = datos.filter(function (fila) {
    // Restar 5 horas a la fecha de la fila
    var fechaFila = new Date(fila.fechaHora);
    fechaFila.setTime(fechaFila.getTime() - (5 * 60 * 60 * 1000)); // Restar 5 horas

    // Obtener la fecha actual en el mismo formato
    var hoy = new Date();

    // Extraer solo el año, mes y día de la fecha actual y la fecha de la fila
    var hoySoloFecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1).toString().padStart(2, '0') + '-' + hoy.getDate().toString().padStart(2, '0');
    var filaSoloFecha = fechaFila.getFullYear() + '-' + (fechaFila.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaFila.getDate().toString().padStart(2, '0');

    // Verificar si la fecha de la fila restada de 5 horas es igual a la fecha actual (solo comparando año, mes y día)
    return hoySoloFecha === filaSoloFecha && fila.manoObra > 0;
  });



  // Si no se encuentran datos que cumplan con los criterios de filtrado, mostrar una alerta
  if (datosFiltrados.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Sin resultados',
      text: 'No se encontraron datos que cumplan con los criterios de filtrado.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    });
  }

  // Limpiar intervalos anteriores
  intervalos.forEach(intervalo => clearInterval(intervalo));
  intervalos = [];


  datosFiltrados.forEach(function (fila) {
    var nuevaFila = $('<tr>');
    var fechaHora = new Date(fila.fechaHora);

    // Restar 5 horas (5 * 60 * 60 * 1000 milisegundos)
    fechaHora.setTime(fechaHora.getTime() - (5 * 60 * 60 * 1000));

    // Obtener los componentes de la fecha y hora
    var dia = ('0' + fechaHora.getDate()).slice(-2);
    var mes = ('0' + (fechaHora.getMonth() + 1)).slice(-2);
    var hora = ('0' + fechaHora.getHours()).slice(-2);
    var minutos = ('0' + fechaHora.getMinutes()).slice(-2);

    // Formatear la fecha y hora como "DD-MM HH:MM"
    var fechaFormateada = dia + '-' + mes + ' ' + hora + ':' + minutos;

    // Agregar la fecha y hora formateadas a la fila
    nuevaFila.append('<td>' + fechaFormateada + '</td>');

    nuevaFila.append('<td>' + fila.turno + '</td>');
    nuevaFila.append('<td>' + fila.vehiculo + '</td>');
    nuevaFila.append('<td>' + fila.manoObra / 1000 + '</td>');

    var botonDiag = $('<button>').addClass('btn btn-warning').append('<span class="material-symbols-outlined">check_box</span>');
    // Verificar si fila.pago1 es diferente de "Sin Pagar"
    if (fila.pago1 !== "Sin Pagar") {
      // Si no es "Sin Pagar", desactivar el botón
      botonDiag.prop('disabled', true);
    }
    var botonEditarTd = $('<td>').append(botonDiag);

    nuevaFila.append(botonEditarTd);

    // Agregar la función onclick al botón
    botonDiag.on('click', function () {
      obraModal(fila.id, fila.manoObra);
    });

    // Agregar la fila a la tabla
    tabla.append(nuevaFila);
  });

}


function mostrarExito(mensaje) {
  Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: mensaje,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Aceptar'
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

// Función para obtener los datos de la tabla
function obtenerDatos() {
  // Llamada a la API REST para obtener los datos de la tabla
  fetch('https://sistema-polania-production.up.railway.app/servicios')
    .then(response => response.json())
    .then(data => cargarDatosEnTabla(data))
    .catch(error => mostrarError('Error al obtener los datos de la tabla: ' + error));
}



obtenerDatos();

// Capturar el evento de clic en el botón "Ingresar"
$('#btnIngresar').click(function () {
  $('#formulario').modal('show');
});

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