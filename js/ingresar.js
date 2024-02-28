$(document).ready(function() {
    var fechaActual = new Date();
    var mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11
    var dia = fechaActual.getDate();
    var anio = fechaActual.getFullYear();
    var horas = fechaActual.getHours();
    var minutos = fechaActual.getMinutes();
    
    // Formatear la fecha
    var fechaFormateada = anio + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
    // Formatear la hora y los minutos
    var horaFormateada = (horas < 10 ? '0' : '') + horas + ':' + (minutos < 10 ? '0' : '') + minutos;
    
    // Establecer el valor del campo de fecha y hora
    $('#fecha').val(fechaFormateada + ' ' + horaFormateada);
});
