function editarModal(id) {
    $("#modal-editar").modal('show');
  
    fetch(`http://localhost:8080/servicios/${id}`)
      .then((response) => response.json())
      .then((elemento) => {
        document.getElementById("precio1").value = elemento[0].precio1;
        document.getElementById("precio2").value = elemento[0].precio2;
      })
  }
  