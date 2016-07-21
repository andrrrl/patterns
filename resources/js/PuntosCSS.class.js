function PuntoCSS(datos_punto) {
	
	// Defaults
	this.css = {
		tipo_punto: datos_punto.punto_base || 'cruz',
		color_hilo: datos_punto.color_hilo || '#000000',
		ancho_hilo: datos_punto.ancho_hilo || 3,
		start_tag: '<div>',
		end_tag: '</div>'
	};
}

PuntoCSS.prototype = {

    constructor: PuntoCSS,
	
	generarPunto: function(tipo_punto) {
		
		this.css.tipo_punto = tipo_punto || this.css.tipo_punto;
		
		var css = { 
			background: this.css.color_hilo, 
			width: this.css.ancho_hilo,
			border: '1px solid rgba(100,100,100,0.25)',
			borderRadius:this.css.ancho_hilo
		};
		
		this.puntos = {
			
			cruz: 
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto + 1)
					.css( css )
					.add(
						$(this.css.start_tag + this.css.end_tag)
							.addClass(this.css.tipo_punto + 2)
							.css( css )
					)
				
		}
		
		if ( tipo_punto === false ) {
			return this.puntos;
		}

		// return CSS class de este tipo de punto
        return this.puntos[tipo_punto] || this.puntos.cruz;
			
	},
	
	verPuntos: function() {

        return this.generarPunto(false);

    },
	
	colorHilo: function(color) {
        this.css.color_hilo = color || this.css.color_hilo;

        return this.css.color_hilo;

    },

	anchoHilo: function(ancho) {
        this.css.ancho_hilo = ancho || this.css.ancho_hilo;

        return this.css.ancho_hilo;

    },

	tipoPunto: function(punto) {
		this.css.tipo_punto = punto;

		return this.css.tipo_punto;
	}

}
