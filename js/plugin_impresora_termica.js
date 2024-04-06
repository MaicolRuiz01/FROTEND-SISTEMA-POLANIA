class connetor_plugin {
    constructor(ruta) {
        if (!ruta) ruta = connetor_plugin.URL_PLUGIN_POR_DEFECTO;
        this.ruta = ruta;
        this.operaciones = [];
        return this;
    }

    // Método estático para obtener la lista de impresoras disponibles
    static async obtenerImpresoras(accion) {
        if (accion) connetor_plugin.URL_PLUGIN_POR_DEFECTO = accion;
        // Realiza una solicitud HTTP POST a la ruta /getprinters del plugin
        // y devuelve los datos en formato JSON
        return fetch(connetor_plugin.URL_PLUGIN_POR_DEFECTO + '/getprinters')
            .then(response => response.json());
    }

    // Métodos para agregar operaciones de impresión
    AccionText(texto) {
        this.operaciones.push(new connetor_plugin.OperacionTicket(connetor_plugin.Constantes.AccionText, texto));
        return this;
    }

    qr(codigo) {
        this.operaciones.push(new connetor_plugin.Accionqr(codigo));
        return this;
    }

    AccionFontsize(tamano) {
        this.operaciones.push(new connetor_plugin.OperacionTicket(connetor_plugin.Constantes.AccionFontsize, tamano));
        return this;
    }

    AccionTextaling(alineacion) {
        this.operaciones.push(new connetor_plugin.OperacionTicket(connetor_plugin.Constantes.AccionTextaling, alineacion));
        return this;
    }

    barcode_ean13(codigo) {
        this.operaciones.push(new connetor_plugin.OperacionTicket(connetor_plugin.Constantes.AccionBarcode_ean13, codigo));
        return this;
    }

    barcode_39(codigo) {
        this.operaciones.push(new connetor_plugin.OperacionTicket(connetor_plugin.Constantes.AccionBarcode_code39, codigo));
        return this;
    }

    barcode_128(codigo) {
        this.operaciones.push(new connetor_plugin.OperacionTicket(connetor_plugin.Constantes.AccionBarcode_code128, codigo));
        return this;
    }

    img_url(url) {
        this.operaciones.push(new connetor_plugin.OperacionTicket(connetor_plugin.Constantes.AccionImg_location, url));
        return this;
    }

    AccionCut(corte) {
        this.operaciones.push(new connetor_plugin.OperacionTicket(connetor_plugin.Constantes.AccionCut, corte));
        return this;
    }

    // Método para enviar las operaciones de impresión a la impresora especificada
    async imprimir(nombre_impresora, api_key) {
        const datos = {
            operaciones: this.operaciones,
            nombre_impresora: nombre_impresora,
            api_key: api_key
        };
        const respuesta = await fetch(this.ruta + '/imprimir', {
            method: 'POST',
            body: JSON.stringify(datos)
        });
        return await respuesta.json();
    }
}

// Definición de algunas constantes y clases internas
connetor_plugin.URL_PLUGIN_POR_DEFECTO = 'http://localhost:4567';
connetor_plugin.OperacionTicket = class {
    constructor(accion, datos) {
        this.accion = accion;
        this.datos = datos;
    }
};
connetor_plugin.Constantes = {
    AccionText: 'text',
    Accionqr: 'qr',
    AccionFontsize: 'fontsize',
    AccionTextaling: 'textaling',
    AccionFeed: 'feed',
    AccionBarcode_ean13: 'barcode_ean13',
    AccionBarcode_code39: 'barcode_39',
    AccionBarcode_code128: 'barcode_128',
    AccionImg_location: 'img_url',
    AccionCut: 'cut'
};

// Exportar la clase connetor_plugin
module.exports = connetor_plugin;
