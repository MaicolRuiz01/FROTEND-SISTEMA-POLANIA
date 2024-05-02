function obtenerDatos() {
    // Llamada a la API REST para obtener los datos de la tabla
    fetch('https://sistema-polania-production.up.railway.app/servicios')
      .then(response => response.json())
      .then(data => cargarDatosEnTabla(data))
      .catch(error => mostrarError('Error al obtener los datos de la tabla: ' + error));
  }
  
  function cargarDatosEnTabla(data) {
    const tablaServicios = document.getElementById('tabla-servicios');
    const tbody = tablaServicios.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar la tabla antes de cargar los nuevos datos
  
    data.forEach(servicio => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${servicio.fechaHora}</td>
        <td>${servicio.turno}</td>
        <td>${servicio.nombreCliente}</td>
        <td>${servicio.vehiculo}</td>
        <td>${servicio.cantidad}</td>
        <td>${servicio.pago1}</td>
        <td>${servicio.pago2}</td>
        <td>${servicio.precio1}</td>
        <td>${servicio.precio2}</td>
        <td>${servicio.manoObra}</td>
        <td>${servicio.flauta}</td>
        <td>${servicio.chavetas}</td>
        <td>${servicio.listo}</td>
        <td>${servicio.entregado}</td>
        <td>${servicio.tiempo}</td>
        <td>${servicio.tipoServicio}</td>
        
        <!-- Agrega aquí las demás celdas que corresponden a las columnas de la base de datos -->
      `;
      tbody.appendChild(row);
    });
  }
  
  // Llamada a la función obtenerDatos al cargar la página
  window.onload = obtenerDatos;
  