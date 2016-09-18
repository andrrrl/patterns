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
		
		var 
		css_cruz = { 
			background: this.css.color_hilo, 
			width: this.css.ancho_hilo,
			height: this.css.alto,
			border: '1px solid rgba(100,100,100,0.25)',
			borderRadius:this.css.ancho_hilo
		},
		css_cuadrado = {
			background: this.css.color_hilo, 
			border: '1px solid rgba(100,100,100,0.25)',
			width: '100%',
			height: '100%'
		},
		css_linea = {
			background: this.css.color_hilo,
			border: '1px solid rgba(100,100,100,0.25)'
		},
		css_linea_arriba = css_linea_abajo = $.extend( 
			{},
			css_linea, 
			{ height: this.css.ancho_hilo }
		),
		css_linea_izquierda = css_linea_derecha = css_linea_horizontal = css_linea_vertical = $.extend(
			{},
			css_linea,
			{ width: this.css.ancho_hilo }
		),
		css_linea_horizontal = $.extend(
			{},
			css_linea,
			{ height: this.css.ancho_hilo }
		),
		css_linea_vertical = $.extend(
			{},
			css_linea,
			{ width: this.css.ancho_hilo }
		),
		css_circulo = $.extend(
			{},
			css_cuadrado,
			{ 
				width: this.css.ancho_hilo, 
				height: this.css.ancho_hilo, 
				borderRadius: '50%' 
			} 
		),
		css_rasti = {
			background: this.css.color_hilo, 
			zIndex: 1
		},
		css_rasti_hor = {
			background: this.css.color_hilo, 
			height: '50%',
			top: '-75%',
			left: '-25%',
			width: '150%',
			background: this.css.color_hilo,
			borderRadius: '2px'
		},
		css_rasti_vert = {
			background: this.css.color_hilo, 
			width: '50%',
			left: '25%',
			top: '-125%',
			height: '150%',
			background: this.css.color_hilo,
			borderRadius: '2px'
		};

		this.puntos = {
			linea_arriba:
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_linea_arriba ),
					
			linea_abajo:
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_linea_abajo ),
					
			linea_izquierda:
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_linea_izquierda ),
					
			linea_derecha:
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_linea_derecha ),
					
			linea_horizontal:
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_linea_horizontal ),
					
			linea_vertical:
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_linea_vertical ),
					
			diagonal1: 
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_cruz ),
					
			diagonal2: 
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_cruz ),
					
			cruz: 
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto + 1)
					.css( css_cruz )
					.add(
						$(this.css.start_tag + this.css.end_tag)
							.addClass(this.css.tipo_punto + 2)
							.css( css_cruz )
					),
					
			cuadrado: 
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_cuadrado ),
			
			circulo:
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_circulo ),
					
			rasti_hor: 
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_rasti )
					.add( 
						$(this.css.start_tag + this.css.end_tag)
							.addClass(this.css.tipo_punto)
							.css( css_rasti_hor )
					),
					
			rasti_vert: 
				$(this.css.start_tag + this.css.end_tag)
					.addClass(this.css.tipo_punto)
					.css( css_rasti )
					.add( 
						$(this.css.start_tag + this.css.end_tag)
							.addClass(this.css.tipo_punto)
							.css( css_rasti_vert )
					),
			
			// TODO: complex CSS stitch		
			// frasco: 
			// 	$('<div class="flask-material row">'+
			// 		'<div class="material-container">'+
			// 			'<div class="liquid-bottom"></div>'+
			// 			'<div class="liquid-container">'+
			// 				'<div class="liquid-left"></div>'+
			// 				'<div class="liquid-right"></div>'+
			// 			'</div>'+
			// 			'<div class="cap"></div>'+
			// 			'<div class="body">'+
			// 				'<div class="label">'+
			// 				'<span>2</span>'+
			// 			'</div>'+
			// 		'</div>'+
			// 	'</div>')
				
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
