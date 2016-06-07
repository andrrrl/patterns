// Package SVG

///////////////////////////////////////////////////////////////////////////////////////
// Class puntoSVG                                                                    //
// Define los tipos de puntos para un objeti de clase Bordado                        //
// Genera los puntos sobre un Canevá virtual (grilla) definida por una clase Bordado //
///////////////////////////////////////////////////////////////////////////////////////
function PuntoSVG(datos_punto) {

    this.svg = {
        tipo_punto: datos_punto.punto_base || 'cruz',
        color_hilo: datos_punto.color_hilo || '#000000',
        ancho_hilo: datos_punto.ancho_hilo || 3,
        start_tag: '<svg baseProfile="full" ' +
            'xmlns="http://www.w3.org/2000/svg" ' +
            'version="1.1" ' +
            'style="width:100%; height:100%">',
        end_tag: '</svg>',
        clase: '.celda',
    };

}

PuntoSVG.prototype = {

    constructor: PuntoSVG,

    generarPunto: function(tipo_punto) {

		this.puntos = {

	        cruz: this.svg.start_tag +
	            '<line x1="0" y1="0" x2="100%" y2="100%" ' +
	            'style="stroke-linecap: round; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            '<line x1="100%" y1="0" x2="0" y2="100%" ' +
	            'style="stroke-linecap: round; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width: ' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,

	        mas: this.svg.start_tag +
	            '<line x1="0" y1="50%" x2="100%" y2="50%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            '<line x1="50%" y1="0" x2="50%" y2="100%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width: ' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,

	        //Punto
	        punto: this.svg.start_tag +
	            '<circle cx="50%" cy="50%" ' +
	            'r="' + this.svg.ancho_hilo + '" ' +
	            'style="stroke: ' + this.svg.color_hilo + '; ' +
	            'fill:' + this.svg.color_hilo + ';' +
	            '"/>' +
	            this.svg.end_tag,

	        // Líneas
	        linea_arriba: this.svg.start_tag +
	            '<line x1="0" y1="10%" x2="100%" y2="10%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,

	        linea_centro: this.svg.start_tag +
	            '<line x1="0" y1="50%" x2="100%" y2="50%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,

	        linea_abajo: this.svg.start_tag +
	            '<line x1="0" y1="90%" x2="100%" y2="90%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,

	        linea_izq: this.svg.start_tag +
	            '<line x1="10%" y1="0" x2="10%" y2="100%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,

	        linea_centro_vert: this.svg.start_tag +
	            '<line x1="50%" y1="0" x2="50%" y2="100%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,

	        linea_der: this.svg.start_tag +
	            '<line x1="90%" y1="0" x2="90%" y2="100%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,

	        linea_oblicua1: this.svg.start_tag +
	            '<line x1="0" y1="0" x2="100%" y2="100%" ' +
	            'style="stroke-linecap: round; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,

	        linea_oblicua2: this.svg.start_tag +
	            '<line x1="100%" y1="0" x2="0" y2="100%" ' +
	            'style="stroke-linecap: round; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,

	        horiz_3: this.svg.start_tag +
	            '<line x1="0" y1="10%" x2="100%" y2="10%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            '<line x1="0" y1="50%" x2="100%" y2="50%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            '<line x1="0" y1="90%" x2="100%" y2="90%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,

	        vert_3: this.svg.start_tag +
	            '<line x1="10%" y1="0" x2="10%" y2="100%" style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            '<line x1="50%" y1="0" x2="50%" y2="100%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            '<line x1="90%" y1="0" x2="90%" y2="100%" ' +
	            'style="stroke-linecap: butt; ' +
	            'stroke: ' + this.svg.color_hilo + '; ' +
	            'stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag,
	        // fin de Líneas

	        //Rectángulo cuadrado
	        cuadrado: this.svg.start_tag + '' +
	            '<rect width="100%" height="100%" stroke-width="' +
	            this.svg.ancho_hilo + '" style="stroke: ' +
	            this.svg.color_hilo + '; fill:' +
	            this.svg.color_hilo + ';" />' +
	            this.svg.end_tag,

	        // Tres
	        tres: this.svg.start_tag +
	            '<line x1="0" y1="0" x2="100%" y2="100%" style="stroke-linecap: round; stroke: ' +
	            this.svg.color_hilo + '; stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            '<line x1="100%" y1="0" x2="0" y2="100%" style="stroke-linecap: round; stroke: ' +
	            this.svg.color_hilo + '; stroke-width:' + this.svg.ancho_hilo + ';" />' +
	            this.svg.end_tag
	    };

		if ( tipo_punto === false ) {
			return this.puntos;
		}

        tipo_punto = tipo_punto || this.svg.tipo_punto;

		//console.log(this.puntos[tipo_punto]);
        return this.puntos[tipo_punto] || this.puntos.cruz;
    },

    verPuntos: function() {

        return this.generarPunto(false);

    },

    colorHilo: function(color) {
        this.svg.color_hilo = color || this.svg.color_hilo;

        return this.svg.color_hilo;

    },

	anchoHilo: function(ancho) {
        this.svg.ancho_hilo = ancho || this.svg.ancho_hilo;

        return this.svg.ancho_hilo;

    },

	tipoPunto: function(punto) {
		this.svg.tipo_punto = punto;

		return this.svg.tipo_punto;
	}
};
