// Función para cargar los datos en la tabla
function cargarDatosEnTabla(datos) {
  var tabla = $('#tablaDatos tbody');
  tabla.empty(); // Limpiar la tabla antes de cargar nuevos datos
  
  datos.forEach(function(fila) {
    var nuevaFila = $('<tr>');
    nuevaFila.append('<td>' + fila.id + '</td>');
    nuevaFila.append('<td>' + fila.fecha + '</td>');
    nuevaFila.append('<td>' + fila.nombreCliente + '</td>');
    nuevaFila.append('<td>' + fila.estado + '</td>');
    nuevaFila.append('<td>' + fila.cantidad + '</td>');
    
    // Crear un elemento para el temporizador y agregarlo a la fila
    var celdaTemporizador = $('<td>').attr('id', 'tempo');
    var temporizador = $('<span>').text(''); // 60 minutos
    celdaTemporizador.append(temporizador);
    nuevaFila.append(celdaTemporizador);
    
    tabla.append(nuevaFila);
    
    // Función para actualizar el temporizador cada segundo
    var tiempoRestante = 10; // 60 minutos * 60 segundos
    var temporizadorInterval = setInterval(function() {
      tiempoRestante--;
      var minutos = Math.floor(tiempoRestante / 60);
      var segundos = tiempoRestante % 60;
      temporizador.text((minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos);
      
      // Cambiar el color del temporizador cuando llegue a cero
      if (tiempoRestante <= 0) {
        clearInterval(temporizadorInterval);
        celdaTemporizador.addClass('temporizador-rojo')
        
        // Iniciar temporizador de retraso
        var tiempoRetraso = 0;
        setInterval(function() {
          tiempoRetraso++;
          var horas = Math.floor(tiempoRetraso / 3600);
          var minutos = Math.floor((tiempoRetraso % 3600) / 60);
          var segundos = tiempoRetraso % 60;
          temporizador.text('+ ' + (horas < 10 ? '0' : '') + horas + ' : ' + (minutos < 10 ? '0' : '') + minutos + ' : ' + (segundos < 10 ? '0' : '') + segundos);
        }, 1000);
      }
    }, 1000); // 1000ms = 1 segundo
  });
}

  // Llamada a la API REST para obtener los datos de la tabla
  fetch('http://localhost:8080/servicios')
  .then(response => response.json())
  .then(data => cargarDatosEnTabla(data))
  .catch(error => console.error('Error al obtener los datos de la tabla:', error));

    // Capturar el evento de envío del formulario
    $('#btnIngresar').click(function() {
      $('#formulario').modal('show');
    }
    );
    


