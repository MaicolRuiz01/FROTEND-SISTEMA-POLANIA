// Función para cargar los datos en la tabla
function cargarDatosEnTabla(datos) {
  var tabla = $('#tablaDatos tbody');
  // Limpiar la tabla antes de cargar nuevos datos
  tabla.empty();

  datos.forEach(function (fila) {
    var nuevaFila = $('<tr>');
    // Obtener la fecha de la cadena de fecha y hora
    var fechaCompleta = new Date(fila.fechaHora);
    // Formatear la fecha como "YYYY-MM-DD"
    var fechaFormateada = fechaCompleta.toISOString().split('T')[0];
    // Agregar la fecha formateada a la fila
    nuevaFila.append('<td>' + fechaFormateada + '</td>');
    nuevaFila.append('<td>' + fila.turno + '</td>');
    nuevaFila.append('<td>' + fila.nombreCliente + '</td>');
    nuevaFila.append('<td>' + fila.vehiculo + '</td>');
    nuevaFila.append('<td>' + fila.cantidad + '</td>');
    nuevaFila.append('<td>' + fila.pago1 + '</td>');
    nuevaFila.append('<td>' + fila.precio1 + '</td>');
    nuevaFila.append('<td>' + (fila.flauta == 0 ? "NO" : "SI") + '</td>');
    nuevaFila.append('<td>' + fila.chavetas + '</td>');
    nuevaFila.append('<td>' + fila.listo + '</td>');
    nuevaFila.append('<td>' + (fila.entregado == 0 ? "NO" : "SI") + '</td>');

    // Crear un elemento para el temporizador y agregarlo a la fila
    var celdaTemporizador = $('<td>').addClass('temporizador'); // Añadir clase "temporizador"
    var temporizador = $('<span>'); // Inicialmente 1 hora
    celdaTemporizador.append(temporizador);
    nuevaFila.append(celdaTemporizador);

    tabla.append(nuevaFila);

    
    // Función para actualizar el temporizador
    function actualizarTemporizador() {
      // Obtener la fecha y hora actual
      var ahora = new Date();
      // Calcular la diferencia entre la fechaHora de la fila y la fecha actual
      var diferencia = ahora - new Date(fila.fechaHora);
      // Calcular el tiempo restante en segundos
      var tiempoRestante = Math.floor((20 - diferencia / 1000) % 3600); // 1 hora = 3600 segundos
      // Convertir segundos a horas, minutos y segundos
      var horas = Math.floor(tiempoRestante / 3600);
      var minutos = Math.floor((tiempoRestante % 3600) / 60);
      var segundos = tiempoRestante % 60;
      // Formatear el tiempo restante como una cadena (por ejemplo, "01:59:59")
      var tiempoRestanteFormateado = (horas < 10 ? '0' : '') + horas + ':' + (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
      // Actualizar el texto del temporizador
      temporizador.text(tiempoRestanteFormateado);
      // Cambiar el color del temporizador cuando llegue a cero
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
      var tiempoTranscurrido = Math.floor((diferencia / 1000) % 3600); // 1 hora = 3600 segundos}
      tiempoTranscurrido = tiempoTranscurrido - 19;
      // Convertir segundos a horas, minutos y segundos
      var horas = Math.floor(tiempoTranscurrido / 3600);
      var minutos = Math.floor((tiempoTranscurrido % 3600) / 60);
      var segundos = tiempoTranscurrido % 60;
      // Formatear el tiempo restante como una cadena (por ejemplo, "01:59:59")
      var tiempoTranscurridoFormateado = (horas < 10 ? '0' : '') + horas + ':' + (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
      // Actualizar el texto del temporizador
      temporizador.text(tiempoTranscurridoFormateado);

      
  var cronometroInterval = setInterval(actualizarcronometro, 1000);
      
  }




});
}




// Llamada a la API REST para obtener los datos de la tabla
fetch('http://localhost:8080/servicios')
  .then(response => response.json())
  .then(data => cargarDatosEnTabla(data))
  .catch(error => console.error('Error al obtener los datos de la tabla:', error));

// Capturar el evento de clic en el botón "Ingresar"
$('#btnIngresar').click(function () {
  $('#formulario').modal('show');
});
