var tiempoRestanteDetenido = '';
var intervalos = [];
// Función para cargar los datos en la tabla
function cargarDatosEnTabla(datos) {
  var tabla = $('#tablaDatos tbody');
  // Limpiar la tabla antes de cargar nuevos datos
  tabla.empty();

  var datosFiltrados = datos.filter(function (fila) {
    // Obtener la fecha actual en el formato "YYYY-MM-DD"
    // Verificar si la fecha de la fila es igual a la fecha actual
    return  fila.pago1 == "Sin Pagar" || fila.entregado == 0 || fila.listo == "proceso";
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
    // Obtener la fecha de la cadena de fecha y hora
    var fechaCompleta = new Date(fila.fechaHora);
    var dia = fechaCompleta.getDate();
    var mes = fechaCompleta.getMonth() + 1; // Sumar 1 porque los meses se indexan desde 0
    // Formatear el día y el mes para que tengan dos dígitos si es necesario
    var diaFormateado = dia < 10 ? '0' + dia : dia;
    var mesFormateado = mes < 10 ? '0' + mes : mes;
    // Obtener la hora y los minutos
    var hora = fechaCompleta.getHours();
    var minutos = fechaCompleta.getMinutes();
    // Formatear la hora y los minutos para que tengan dos dígitos si es necesario
    var horaFormateada = hora < 10 ? '0' + hora : hora;
    var minutosFormateados = minutos < 10 ? '0' + minutos : minutos;
    // Crear la cadena de fecha en el formato DD-MM
    var fechaFormateada = diaFormateado + '-' + mesFormateado;
    // Crear la cadena de hora y minutos en el formato HH:MM
    var horaMinutosFormateados = horaFormateada + ':' + minutosFormateados;
    // Agregar la fecha formateada y la hora con salto de línea a la fila
    nuevaFila.append('<td>' + fechaFormateada + '<br>' + horaMinutosFormateados + '</td>');

    nuevaFila.append('<td>' + fila.turno + '</td>');
    nuevaFila.append('<td>' + fila.nombreCliente + '</td>');
    nuevaFila.append('<td>' + fila.vehiculo + '</td>');
    nuevaFila.append('<td>' + fila.cantidad + '</td>');



    if (fila.pago1 == "Sin Pagar") {
      nuevaFila.append('<td>' + "SIN P" + '</td>');
    } else {
      nuevaFila.append('<td>' + fila.pago1 + '</td>');
    }


    nuevaFila.append('<td>' + fila.pago2 + '</td>');
    nuevaFila.append('<td>' + fila.precio1 / 1000 + '</td>');
    nuevaFila.append('<td>' + fila.precio2 / 1000 + '</td>');
    nuevaFila.append('<td>' + (fila.flauta == 0 ? "N" : "S") + '</td>');
    nuevaFila.append('<td>' + fila.chavetas + '</td>');
    nuevaFila.append('<td>' + fila.listo + '</td>');
    nuevaFila.append('<td>' + (fila.entregado == 0 ? "NO" : "SI") + '</td>');

    var tiempoTemp = 0;

    if (fila.tiempo == 1) {
      tiempoTemp = 7200;
    } else {
      tiempoTemp = 3600;
    }


    // Crear un elemento para el temporizador y agregarlo a la fila
    var celdaTemporizador = $('<td>').addClass('temporizador'); // Añadir clase "temporizador"
    var temporizador = $('<span>'); // Inicialmente 1 hora
    celdaTemporizador.append(temporizador);
    nuevaFila.append(celdaTemporizador);

    // Crear una celda para los botones de dinero y diagnóstico y agregar los botones dentro de ella


    var botonDiag = $('<button>').addClass('btn btn-warning').append('<span class="material-symbols-outlined">check_box</span>');
    var botonPago = $('<button>').addClass('btn btn-success').append('<span class="material-symbols-outlined">payments</span>');
    var botonEditarTd = $('<td>').append(botonPago, botonDiag);
    nuevaFila.append(botonEditarTd);
    
    
    
    // Agregar la función onclick al botón
    botonPago.on('click', function() {
        editarModal(fila.id, fila.precio1, fila.pago1, fila.pago2);
    });

    botonDiag.on('click', function() {
      diagModal(fila.id, tiempoRestanteDetenido);
  });


    var temporizadorInterval, cronometroInterval;

   


    // Función para actualizar el temporizador
    function actualizarTemporizador() {
      // Obtener la fecha y hora actual
      var ahora = new Date();
      // Calcular la diferencia entre la fechaHora de la fila y la fecha actual
      var diferencia = ahora - new Date(fila.fechaHora);
      // Calcular el tiempo restante en segundos
      var tiempoRestante = Math.floor((3600 - diferencia / 1000) % tiempoTemp); // 1 hora = 3600 segundos
      // Convertir segundos a horas, minutos y segundos
      var horas = Math.floor(tiempoRestante / 3600);
      var minutos = Math.floor((tiempoRestante % 3600) / 60);
      var segundos = tiempoRestante % 60;
      // Formatear el tiempo restante como una cadena (por ejemplo, "01:59:59")
      var tiempoRestanteFormateado = (horas < 10 ? '0' : '') + horas + ':' + (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
      // Actualizar el texto del temporizador
      temporizador.text(tiempoRestanteFormateado);
      // Cambiar el color del temporizador cuando llegue a cero
      tiempoRestanteDetenido = tiempoRestanteFormateado + " T";
      if (tiempoRestante <= 0) {
        clearInterval(temporizadorInterval); // Detener el temporizador principal
        
        actualizarcronometro();
      }
    }

    // Llamar a la función de actualización del temporizador cada segundo
    var temporizadorInterval = setInterval(actualizarTemporizador, 1000);




    // Función para iniciar el cronómetro
    function actualizarcronometro() {


      var ahora = new Date();
      // Calcular la diferencia entre la fechaHora de la fila y la fecha actual
      var diferencia = (ahora - new Date(fila.fechaHora));
      // Calcular el tiempo restante en segundos
      var tiempoTranscurrido = Math.floor((diferencia / 1000) % tiempoTemp); // 1 hora = 3600 segundos}
      tiempoTranscurrido = tiempoTranscurrido;
      // Convertir segundos a horas, minutos y segundos
      var horas = Math.floor(tiempoTranscurrido / 3600);
      var minutos = Math.floor((tiempoTranscurrido % 3600) / 60);
      var segundos = tiempoTranscurrido % 60;
      // Formatear el tiempo restante como una cadena (por ejemplo, "01:59:59")
      var tiempoTranscurridoFormateado = (horas < 10 ? '0' : '') + horas + ':' + (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
      // Actualizar el texto del temporizador
      
      tiempoRestanteDetenido = tiempoTranscurridoFormateado + " C";

      var cronometroInterval = setInterval(actualizarcronometro, 1000);

    }

    intervalos.push(temporizadorInterval); // Agregar la referencia al intervalo al array

    // Agregar la fila a la tabla
    tabla.append(nuevaFila);

    if (fila.listo == "listo") {
      clearInterval(temporizadorInterval);
      clearInterval(cronometroInterval); // Detener el cronómetro si ya está entregado
      temporizador.text(fila.demora);
    }




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
  fetch('http://localhost:8080/servicios')
    .then(response => response.json())
    .then(data => cargarDatosEnTabla(data))
    .catch(error => mostrarError('Error al obtener los datos de la tabla: ' + error));
}



obtenerDatos();

// Capturar el evento de clic en el botón "Ingresar"
$('#btnIngresar').click(function () {
  $('#formulario').modal('show');
});

