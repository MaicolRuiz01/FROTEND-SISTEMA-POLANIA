const URLPlugin = "http://localhost:8000"

const imprimirImagenes = async (nombreImpresora) => {
    const conector = new ConectorPluginV3(URLPlugin);
    conector.Iniciar();
    const url = "https://scontent.cdninstagram.com/v/t51.2885-19/373376114_318773317376988_2859474416677294583_n.jpg?stp=dst-jpg_e0_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=OtLVLU8ppngAb4dMeis&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBfpXE70FaalFrn5B-TgRz8KulwIaSSAu8d0XAD-kTIyA&oe=66176E2F&_nc_sid=10d13b";
  
        conector.EscribirTexto("Multirepuestos Polania");
        conector.Feed(1);
        conector.DescargarImagenDeInternetEImprimir(url, ConectorPluginV3.TAMAÑO_IMAGEN_NORMAL, 160)
        conector.Iniciar(); //Nota: esto solo es necesario en ocasiones, por ejemplo en mi impresora debo hacerlo siempre que acabo de imprimir una imagen
        conector.Feed(1);
    
   
    const respuesta = await conector
        .imprimirEn(nombreImpresora);
    if (respuesta === true) {
        alert("Impreso correctamente");
    } else {
        alert("Error: " + respuesta);
    }
}