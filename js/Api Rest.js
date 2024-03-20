// Función para cargar los datos en la tabla
function cargarDatosEnTabla(datos) {
  var tabla = $('#tablaDatos tbody');
  // Limpiar la tabla antes de cargar nuevos datos
  tabla.empty();
  

  datos.forEach(function (fila) {
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

    if (fila.pago1 == "Sin Pagar")
      nuevaFila.append('<td>' + "SIN P" + '</td>');
    nuevaFila.append('<td>' + fila.pago2 + '</td>');
    nuevaFila.append('<td>' + fila.precio1/1000 + '</td>');
    nuevaFila.append('<td>' + fila.precio2 + '</td>');
    nuevaFila.append('<td>' + (fila.flauta == 0 ? "N" : "S") + '</td>');
    nuevaFila.append('<td>' + fila.chavetas + '</td>');
    nuevaFila.append('<td>' + fila.listo + '</td>');
    nuevaFila.append('<td>' + (fila.entregado == 0 ? "NO" : "SI") + '</td>');

    var tiempoTemp = 0;
    if(fila.tiempo == 0){
      tiempoTemp = 3600;
    }else{
      tiempoTemp = 7200;
    }


    // Crear un elemento para el temporizador y agregarlo a la fila
    var celdaTemporizador = $('<td>').addClass('temporizador'); // Añadir clase "temporizador"
    var temporizador = $('<span>'); // Inicialmente 1 hora
    celdaTemporizador.append(temporizador);
    nuevaFila.append(celdaTemporizador);

    // Crear una celda para los botones de dinero y diagnóstico y agregar los botones dentro de ella

    nuevaFila.append('<td><button class="btn btn-success" onclick="editarModal(' + fila.id + ')"><span class="material-symbols-outlined">payments</span></button></td>');


    tabla.append(nuevaFila);


    // Función para actualizar el temporizador
    function actualizarTemporizador() {
      // Obtener la fecha y hora actual
      var ahora = new Date();
      // Calcular la diferencia entre la fechaHora de la fila y la fecha actual
      var diferencia = ahora - new Date(fila.fechaHora);
      // Calcular el tiempo restante en segundos
      var tiempoRestante = Math.floor((tiempoTemp - diferencia / 1000) % tiempoTemp); // 1 hora = 3600 segundos
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
      var tiempoTranscurrido = Math.floor((diferencia / 1000) % tiempoTemp); // 1 hora = 3600 segundos}
      tiempoTranscurrido = tiempoTranscurrido;
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



function obtenerDatos() {
// Llamada a la API REST para obtener los datos de la tabla
fetch('http://localhost:8080/servicios')
  .then(response => response.json())
  .then(data => cargarDatosEnTabla(data))
  .catch(error => console.error('Error al obtener los datos de la tabla:', error));
}


function editarModal(id) {
  $("#modal-editar").modal('show');

  fetch(`http://localhost:8080/servicios/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
    .then(elemento => {
      // Verifica que los elementos con los IDs "precio1" y "precio2" existan
      var precio1Input = document.getElementById("precio1");
      var precio2Input = document.getElementById("precio2");
      
      if (precio1Input && precio2Input) {
        // Establece los valores de los inputs
        precio1Input.value = elemento.precio1;
        precio2Input.value = elemento.precio2;
      } else {
        console.error('Los elementos con los IDs "precio1" o "precio2" no existen en el DOM.');
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos del servicio:', error);
    });
}


obtenerDatos();

// Capturar el evento de clic en el botón "Ingresar"
$('#btnIngresar').click(function () {
  $('#formulario').modal('show');
});

