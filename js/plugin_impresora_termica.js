document.addEventListener('DOMContentLoaded', function () {
    // Obtener los datos de turno y vehículo de la URL
    const params = new URLSearchParams(window.location.search);
    const fecha = params.get('fecha');
    const turno = params.get('turno');
    const vehiculo = params.get('vehiculo');
    const cantidad = params.get('cantidad');
    const precio = params.get('precio');
    const chavetas = params.get('chavetas');
    const flauta = params.get('flauta');
    const manoObra = params.get('manoObra');
    const total =parseFloat( manoObra) + parseFloat(precio);

    // Mostrar los datos en la página
    document.getElementById('fecha').textContent = fecha;
    document.getElementById('turno').textContent = turno;
    document.getElementById('vehiculo').textContent = vehiculo;
    document.getElementById('inyectores').textContent = cantidad;
    document.getElementById('precio').textContent = "$ " + precio;
    if (chavetas != 0) {
        document.getElementById('chavetas1').textContent = "Chavetas:";
        document.getElementById('chavetas2').textContent = chavetas;
    }
    if (flauta != "false") {
        document.getElementById('flauta1').textContent = "flauta:";
        document.getElementById('flauta2').textContent = "Si";
    }

    if (manoObra > 0) {
        document.getElementById('mano1').textContent = "Mano de Obra: ";
        document.getElementById('mano2').textContent = "$ "  + manoObra;
    }

    document.getElementById('total').textContent = "$ " + total;

});
