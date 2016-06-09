// Package Bordados

// ////////////////////////////////////////////////////
// Class Bordado                            		 //
// genera, carga, muestra, elimina y guarda bordados //
// ////////////////////////////////////////////////////

function Bordado(nombre_bordado, contenedor) {
    
    // Config
    this.type = 'nodejs'; // 'php'
    
    switch ( this.type ) {
        case 'php':
            this.ajax_script    = 'php/bordado.php';
            this.load_action    = '?action=load&bordado=';
            this.save_action    = '?action=save';
            this.delete_action  = '?action=delete&id=';
            this.list_action    = '?action=list';
        break;
        case 'nodejs':
            this.ajax_script    = '/';
            this.load_action    = 'bordados/';
            this.save_action    = 'bordados/';
            this.delete_action  = 'bordados/';
            this.list_action    = 'bordados/';
        break;
            
    }

	// Container CSS class name
	this.contenedor = contenedor || 'caneva';
	this.bordado_html = '';
    this.btn_save = '#guardar-bordado';
    
	this.puntos = '';

	// Grid border visible?
	this.malla = true;

	// Paint mode on?
	this.pintar = true;

	// Show Bordado? (if false, will return the data only)
	this.mostrar = true;

	// Animate?
	this.animar = { speed: 0 };

	// Mouse and Key events registered? (to avoid duplicated)
	this.registrados = false;

	// Debug coords? (Will show the coordinates in the grid)
	this.debug_coords = false;

	// Named "data" because is the part that will go into the DB
	this.data = {
		id: '',
		bordado: nombre_bordado || 'Bordado ' + Math.floor(Math.random(0, 1000) * 1000),
		filas: 25,
		columnas: 50,
		punto_base: 'cruz',
		ancho_punto: 15,
		ancho_hilo: 3,
		color_hilo: '#000000',
		color_bg: '#FFFFFF',
		color_malla: '#CCCCCC',
		coords: [],
		creado_el: Date.now(),
	};
}

// Define prototypes
Bordado.prototype = {

	constructor: Bordado,

	// Cargar desde Base de Datos (SQLite|MySQL) ==> ver php/bordado.php
	cargar: function(bordado_id, opciones) {

		opciones = opciones || {};
		this.mostrar = typeof opciones.mostrar == 'undefined' ? this.mostrar : opciones.mostrar;
		this.animar  = typeof opciones.animar  == 'undefined' ? this.animar	 : opciones.animar;

		var Bordado = this; // Necesario para usarlo dentro de ajax.success()
		Bordado.data.id = bordado_id || Bordado.data.id;

		console.info('[INFO] $.ajax: Cargando bordado: ' + Bordado.data.bordado);

		if (Bordado.data.id) {
			$.ajax({
				url: this.ajax_script + this.load_action + bordado_id,
				method: 'GET',
				dataType: 'JSON',
				success: function(db_data) {
					if (db_data.id || db_data._id) {
						db_data.id = db_data._id || db_data.id;
						var coords = typeof db_data.coords != 'object' ? JSON.parse(db_data.coords) : db_data.coords;
						Bordado.data = db_data;
						Bordado.data.coords = coords;
						if ( $('input[name=velocidad]').prop('disabled') === false ) {
							Bordado.animar.speed = $('input[name=velocidad]').val() || Bordado.animar.speed;
						}

						Bordado.grilla(opciones);
						console.info('[OK] $.ajax: Bordado cargado.');
						return true;
					} else {
						console.info('[INFO] $.ajax: No existe el bordado.');
						return false;
					}
				},
				error: function() {
					//alert('Error al cargar el bordado: ' + Bordado.data.bordado);
					console.info('[ERROR] $.ajax: Error al cargar el bordado: ' + Bordado.data.bordado);
					return false;
				}
			});

		}

	},

	// Guardar
	guardar: function(bordado_nombre) {

		this.data.bordado = bordado_nombre || this.data.bordado;

		var Bordado = this; // Necesario para usarlo dentro de ajax.success()

		if (this.data) {

			var btn_save = this.btn_save,
				btn_states = {
					'save': $(this.btn_save).data('save-text') || 'Guardar',
					'saving': $(this.btn_save).data('saving-text') || 'Guardando...',
					'saved': $(this.btn_save).data('saved-text') || 'Guardado'
				};

			$(btn_save).html(btn_states.saving);

			$.ajax({
				url: this.ajax_script + this.save_action + (Bordado.data.id && this.type == 'php' ? '&id=' + Bordado.data.id : Bordado.data.id),
				method: ( Bordado.data.id ? 'PUT' : 'POST' ),
				data: this.data,
				dataType: 'JSON',
				success: function(res) {
					switch (res.result) {
						case 'ok':
							$(btn_save).html(btn_states.saved);
							break;
						case 'error':
							$(btn_save).html(btn_states.save);
							break;
						case 'warning':
							$(btn_save).html(btn_states.save);
							break;
					}
				},
				error: function() {
					$(btn_save).html(btn_states.save);
					alert('No se pudo guardar el bordado...');
					console.error('$.ajax: No se pudo guardar el bordado...');
				}
			});

		}

	},

	// Eliminar Bordado de la Base de Datos
	eliminar: function(id) {

		if ( typeof id == 'undefined' ) {
			console.info('No se pudo eliminar el bordado: se requiere un ID...');
			return false;
		}

		console.info('$.ajax: Eliminando el bordado...');

		$.ajax({
			url: this.ajax_script + this.delete_action + id,
			method: 'DELETE',
			dataType: 'JSON',
			success: function(res) {
				switch (res.result) {
					case 'ok':
						$('body').find('[data-delete-id=' + id + ']').parentsUntil('ul').delay(200).remove();
						console.info( '$.ajax: Se eliminó el bordado' );
						return true;
					case 'error':
						console.info('$.ajax: No se pudo eliminar el bordado...');
                        console.log(res);
						return false;
				}
			},
			error: function(error) {
				console.info('$.ajax: No se pudo eliminar el bordado...');
                
				return false;
			}

		});

	},

	// Listar Bordados
	listar: function() {

		console.info('[INFO] $.ajax: Cargando lista de bordados.');

		var Bordado = this;

		$.ajax({
			url: this.ajax_script + this.list_action,
			method: 'GET',
			dataType: 'JSON',
			success: function(db_data) {
				if (db_data.length > 0) {

					var lista_bordados = '';
					$.each(db_data, function(key, db_bordado) {

						lista_bordados += '<li><a data-id="' +  db_bordado._id + '" ' +
						'data-toggle="tooltip"' +
						'data-title="Abrir"' +
						' href="#' + db_bordado._id + '">' + db_bordado.bordado + '</a></li>';
					});

					// Attach list of Bordados for Deleting
					$('#lista-bordados-borrar')
						.html($(lista_bordados))
						.find('li')
						.addClass('list-group-item')
						.each(function(key,li){

							$(li)
								.append('<span class="pull-right">' +
									'<a class="delete" href="#delete" ' +
									'data-delete-id="' + $(this).find('a').data('id') + '" ' +
									'data-bordado="' + $(this).text() + '" ' +
									'data-title="Eliminar"' +
									'class="delete-bordado"><i class="glyphicon glyphicon-remove"></i></a>' +
								'</span>');
						});

						$('#lista-bordados-borrar').find('li a').on('click', function(e) {
							e.preventDefault();
                            var id 		= $(this).data('id');
                            console.log('Bordado.data.id: ' + id);

							if ( $(this).hasClass('delete') ){
                                var delete_id = $(this).data('delete-id');
								var bordado   = $(this).data('bordado');
                                
								// (!) Prompt to delete Bordado
								console.info( 'Se está por eliminar el bordado: "' + bordado + '" con ID "' + delete_id + '"' );
								BootstrapDialog.confirm({
									title: 'Eliminar Bordado: "' + bordado + '"',
									message: '¿Confirmar?',
									type: BootstrapDialog.TYPE_WARNING,
									closable: true,
									draggable: true,
									btnCancelLabel: 'Cancelar',
									btnOKLabel: 'Eliminar',
									btnOKClass: 'btn-danger',
									callback: function(resultado) {
										if (resultado) {
											Bordado.eliminar(delete_id);
										} else {
											console.info( 'Acción cancelada: No se eliminó el bordado: "' + bordado + '"' );
											return false;
										}
									}
								});
							} else {

                                
                                
								e.preventDefault();
                                Bordado.data.id = id;
								Bordado.cargar(id);

							}
						});

					$('#lista-bordados-borrar li a').tooltip();

					$('input[name=animar]').on('click', function(){
						$('input[name=velocidad]').prop('disabled', !$('input[name=velocidad]').prop('disabled'));
						if ( $('input[name=velocidad]').prop('disabled') === true ) {
							Bordado.animar.speed = 0;
						}
					});

					console.info('[OK] $.ajax: Lista de bordados cargada.');
				} else {

					$('#lista-bordados-borrar').html('<li class="list-group-item">No hay bordados guardados</li>');
					$('button[name=cargar]').hide();

					console.info('[INFO] $.ajax: No hay bordados para listar.');
				}
			},
			error: function() {
				//alert('Error al cargar lista de bordados.');
				console.info('[ERROR] $.ajax: Error al cargar lista de bordados.');
				return false;
			}
		});

	},

	// Generar grilla HTML
	grilla: function(opciones) {

		this.data = opciones.data ? opciones.data : this.data;

		var filas 		= parseInt(this.data.filas),
			columnas 	= parseInt(this.data.columnas),
			ancho 		= parseInt(this.data.ancho_punto);

			this.width 	= ( columnas 	* ancho + 1 ); // se le agrega el ancho del borde (1px)
			this.height = ( filas 		* ancho + 1 );

		this.puntos = new PuntoSVG(this.data);

		console.info('Nuevo objecto PuntoSVG creado');

		var primera_linea = '';

		console.info('Generando bordado: ' + this.data.bordado);

		if (this.debug_coords) {
			console.info('[Modo depuración!]');
			console.log(this.data);
		}

		// Extraer coordenadas
		var data_coords 	= this.coordenadas(),
			data_colores 	= {};

		// Comenzar Canevá
		this.bordado_html = '<div class="' + this.contenedor + '" style="width: ' + this.width + 'px; height: ' + this.height + 'px; margin:auto;">';

		// Loop que genera una malla de i filas por j columnas
		var i = 0;
		for (var y = 0; y < this.data.filas; y++) {

			for (var x = 0; x < this.data.columnas; x++) {
				if (x === 0) {
					primera_linea = ' primera-linea';
				} else {
					primera_linea = '';
				}
				next_coord = x + ',' + y + '';

				this.bordado_html += '<div data-toogle="tooltip" data-title="' + x + ',' + y + '" class="celda' + primera_linea + '" style="width: ' + ancho + 'px; height: ' + ancho + 'px;"' +
					(!this.debug_coords ? '' : ' style="font-size:9px;line-height:20px;""') +
					' rel="' + x + ',' + y + '">' +
					(!this.debug_coords ? ' ' : x + ',' + y) +
					'</div>';
			}

		}
		this.bordado_html += '</div>';

		// Mostrar o sólo devolver?
		if ( this.mostrar ) {
			this.ventana();
		} else {
			return this.bordado_html;
		}

	},

	// Generar HTML y Modal
	ventana: function() {

		var Bordado = this;

		$bordado_html = $(Bordado.bordado_html);

		$select_punto = $('<select class="form-control" name="punto" id="punto"></select>');
		$select_punto.val(Bordado.puntos.svg.tipo_punto);
		$select_punto.on('change', function() {
			Bordado.puntos.svg.tipo_punto = $(this).val();
		});

		var select_cambiar_punto = '<select class="form-control" name="cambiar_punto" id="punto">';

		$.each(Bordado.puntos.verPuntos(), function(punto, svg) {
			select_cambiar_punto += '<option value="' + punto + '"' + ( punto == Bordado.data.punto_base ? ' selected' : '' ) + '>' + punto.replace(/\_/g, ' ') + '</option>';
		});

		select_cambiar_punto += '</select>';

		// Opciones (guardar, etc)
		$form = $('<form name="guardar" class="form-inline">' +
			( !Bordado.data.id ? '<input type="text" ' +
				'class="form-control" ' +
				'name="bordado" ' +
				'id="bordado" ' +
				'value="' + $('#bordado-nuevo').val() + '" ' +
				'placeholder="Nombre de tu bordado">' : '' ) +
			'<button ' +
				'id="guardar-bordado" ' +
				'class="btn btn-success" ' +
				'name="guardar" ' +
				'data-save-text="Guardar" ' +
				'data-saving-text="Guardando..." ' +
				'data-saved-text="Guardado!" ' +
				'data-toggle="tooltip" ' +
				'data-title="Guardar bordado" ' +
				'autocomplete="off">Guardar' +
			'</button> ' +
			'<button id="limpiar" class="btn btn-danger">Limpiar</button>' +
			'</form>' +
			'<aside class="container opciones-ventana alert alert-info">' +
				'<div class="row">' +
					'<form name="opciones" class="form">' +
						'<div class="form-group">' +
							'<label for="cambiar_punto">Punto:</label>' +
							select_cambiar_punto +
						'</div>' +
						'<div class="form-group">' +
							'<label for="ancho_hilo">Grosor de hilo:</label>' +
							'<input class="form-control" type="number" name="cambiar_ancho_hilo" value="' + Bordado.data.ancho_hilo + '" min="1" max="20" step="1">' +
						'</div>' +
						'<!--div class="form-group">' +
							'<label for="ancho_punto">Ancho de punto:</label>' +
							'<input class="form-control" type="number" name="cambiar_ancho_punto" value="' + Bordado.data.ancho_punto + '" min="1" max="30" step="1">' +
						'</div-->' +
						'<div class="form-group">' +
							'<label for="color_hilo">Color de hilo:</label>' +
							'<input class="form-control" type="color" name="cambiar_color_hilo" value="' + Bordado.data.color_hilo + '">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="color_bg">Color de tela:</label>' +
							'<input class="form-control" type="color" name="cambiar_color_bg" value="' + Bordado.data.color_bg + '">' +
						'</div>' +
						'<label for="color_picker">Tomar color:</label>' +
						'<span class="input-group-addon">' +
							'<input name="color_picker" type="checkbox" aria-label="animar">' +
						'</span>' +
						//'<label for="color_malla">Color de malla:</label>' +
						//'<input class="form-control" type="color" name="cambiar_color_malla" value="' + Bordado.data.color_malla + '">' +
						'<br><div class="form-group">' +
							'<button class="btn btn-info" name="toggle-malla">Ocultar malla</button>' +
						'</div>' +
					'</form>' +
				'</div>' +
			'</aside>');

		// Esconder bordado
		$bordado_html.hide();

		// Determinar tamaño BootstrapDialog.SIZE_* es malísimo!
		var dialog_size = ( Bordado.data.columnas >= 50 ? '60vw' : ( Bordado.data.columnas >= 30 ? '50vw' : '35vw' ) );

		BootstrapDialog.show({
			size: BootstrapDialog.SIZE_LARGE,
			title: Bordado.data.bordado + ' ~ ' + Bordado.data.filas + 'x' + Bordado.data.columnas,
			message: $bordado_html,
			closable: true,
			closeByBackdrop: false,
			closeByKeyboard: false,

			onshow: function(dialogRef) {

				dialogRef.getModalFooter()
				.append($form)
				.css({
					display: 'inline'
				});

			},
			onshown: function(dialogRef) {

				$('.modal-dialog .modal-content').css({
					width: (Bordado.width + 50) + 'px'
				});

				$('.celda').removeClass('clicked').css({
					borderLeft: '1px solid ' + Bordado.data.color_malla,
					borderBottom: '1px solid ' + Bordado.data.color_malla
				});
                
				$('.caneva').css({
					borderRight: '1px solid ' + Bordado.data.color_malla,
					borderTop: '1px solid ' + Bordado.data.color_malla,
					background: Bordado.data.color_bg
				});

				$('.opciones-ventana').css({display:'block'});
				$('.modal-dialog').css({
					width: dialog_size
				});



				$bordado_html.show();

				if ( typeof Bordado.animar != 'undefined' && Bordado.animar.speed > 0 ) {

					$('.celda').html('');

					//Bordado.shuffle();
					var i = 0;
					$interval2 = setInterval(function() {
						Bordado.puntos.colorHilo(Bordado.data.coords[i].color_hilo);
						Bordado.puntos.anchoHilo(Bordado.data.coords[i].ancho_hilo);

						var rel = Bordado.data.coords[i].coord.x + ',' + Bordado.data.coords[i].coord.y;
						$('.celda[rel="' + rel + '"]').
							html(Bordado.puntos.generarPunto(Bordado.data.coords[i].punto));
						i++;
						if ( i == Bordado.data.coords.length ) {
							clearInterval($interval2);
						}

					}, Bordado.animar.speed);

				} else {

					for ( var p = 0; p < Bordado.data.coords.length; p++ ) {
						Bordado.puntos.colorHilo(Bordado.data.coords[p].color_hilo);
						Bordado.puntos.anchoHilo(Bordado.data.coords[p].ancho_hilo);
						Bordado.puntos.tipoPunto(Bordado.data.coords[p].punto);

						var rel = Bordado.data.coords[p].coord.x + ',' + Bordado.data.coords[p].coord.y;
						$('.celda[rel="' + rel + '"]').
							html(Bordado.puntos.generarPunto(Bordado.data.coords[p].punto));
					}

				}

				// Registrar eventos
				Bordado.eventos();
				console.info('[INFO] Eventos registrados.');

			},
			onhide: function(dialogRef) {
				$('.celda').removeClass('clicked');
				if ( typeof $interval2 != 'undefined' )
					clearInterval($interval2);
			},
			onhidden: function(dialogRef){
				console.info('Se cerró el Canevá.');
			}
		});

	},

	// Registrar Eventos
	eventos: function() {

		// Los eventos aún no fueron registrados?
		if (!this.registrados) {

			var Bordado = this;

			$color_hilo 	= $('[name=cambiar_color_hilo]');
			$ancho_hilo 	= $('[name=cambiar_ancho_hilo]');
			$select_punto 	= $('[name=cambiar_punto]');

			// Botón Guardar
			$(this.btn_save).unbind('click').on('click', function(e) {
				e.preventDefault();
				Bordado.data.punto_base = $select_punto.val();
				Bordado.guardar($('#bordado').val());
			});

			/**
			 * Dibujar/pintar con el mouse!
			 */
			var can_drag = false;
			$('.celda, svg')
				.on('mousedown', function(e){
					e.preventDefault();
					can_drag = true;
					prev_rel = $(this).attr('rel');
				})
				.on('mousemove', function(e){
					e.preventDefault();

					if ( can_drag === true ) {

						// Coordenada
						var rel = $(this).attr('rel');

						if (e.which == 1) {

							$('.celda').removeClass('clicked');
							// Color...
							Bordado.puntos.colorHilo( $color_hilo.val() );

							// Ancho...
							Bordado.puntos.anchoHilo( $ancho_hilo.val() );

							// Tipo de Punto...
							var punto_svg = Bordado.puntos.generarPunto(
								$select_punto.val() || Bordado.punto_base
							);

							// (1) Agregar nuevo punto SVG a la Grilla
							$(this).html(punto_svg);
							$(this).addClass('clicked');

							// (2) Agregar nuevo punto al Array de Puntos

							if ( rel ) {
								var xy = rel.split(',');
								Bordado.agregar({
									coord: {
										x: xy[0],
										y: xy[1]
									},
									punto: $select_punto.val() || Bordado.punto_base,
									color_hilo: $color_hilo.val(),
									ancho_hilo: $ancho_hilo.val()
								});
							}
						}

						if (e.which == 3) {
							// Quitar punto del Array de Puntos
							Bordado.quitar(rel);
						}
					}
				})
				.on('mouseup', function(e){
					e.preventDefault();
					can_drag = false;
				});

			/* Celdas */
			$('.celda').removeClass('clicked');

			$('.celda')
				.unbind('click')
				.on('click', function(e) {
					e.preventDefault();
					var self = $(this);

					// Picking color?
					if ( $('input[name=color_picker]').prop('checked') === true ) {

						// Reset color picker state
						$('input[name=color_picker]').prop('checked', false);

						// Take color from background
						if ( $(this).text() == ' ' ) {
							$('input[name=cambiar_color_hilo]').val( $('input[name=color_bg]').val() );
							return;
						}

						// Take color from SVG
						var hexcolor = '';
						$('input[name=cambiar_color_hilo]').val( function(){
							self.find('svg').children()
								.prop('style').stroke
								.replace(/([a-z\(\)\,]*)/g,'')
								.split(' ')
								.forEach(function(color){
									if ( parseInt(color).toString(16).length == 1 ){
										hexcolor += '0' + parseInt(color).toString(16);
									} else {
										hexcolor += parseInt(color).toString(16);
									}
								});
								return '#' + hexcolor;
							});
						return;
					}

					$('.celda').removeClass('clicked');

					// Color...
					Bordado.puntos.colorHilo( $color_hilo.val() );

					// Ancho...
					Bordado.puntos.anchoHilo( $ancho_hilo.val() );

					// Tipo de Punto...
					var punto_svg = Bordado.puntos.generarPunto(
						$select_punto.val() || Bordado.punto_base
					);

					// Coordenada
					var rel = $(this).attr('rel');

					// (1) Agregar nuevo punto SVG a la Grilla
					$(this).html(punto_svg);
					$(this).addClass('clicked');

					// (2) Agregar nuevo punto al Array de Puntos
					var xy = rel.split(',');
					Bordado.agregar({
						coord: {
							x: xy[0],
							y: xy[1]
						},
						punto: $select_punto.val() || Bordado.punto_base,
						color_hilo: $color_hilo.val(),
						ancho_hilo: $ancho_hilo.val()
					});

				})
				.on('contextmenu', function(e) {
					e.preventDefault();
					var rel = $(this).attr('rel');
					if ($(this).html != ' ') {
						Bordado.quitar(rel);
					}
				});

			/* Botones de formulario */

			// Botón cambiar color de hilo
			$('#color_hilo').unbind('change').on('change', function(e) {
				e.preventDefault();
				Bordado.puntos.colorHilo($(this).val());
			});


			/* Pintar / Mover */
			$(document).unbind('keydown').bind('keydown', function(e) {

				switch (e.which) {
					case 37: // left
						Bordado.moverPunto('left');
						e.preventDefault(); // prevent the default action (scroll / move caret)
						break;

					case 75: // k, left down
						Bordado.moverPunto('left-down');
						break;

					case 38: // up
						Bordado.moverPunto('up');
						e.preventDefault(); // prevent the default action (scroll / move caret)
						break;

					case 73: // i, left up
						Bordado.moverPunto('left-up');
						break;

					case 39: // right
						Bordado.moverPunto('right');
						e.preventDefault(); // prevent the default action (scroll / move caret)
						break;

					case 79: // o, right up
						Bordado.moverPunto('right-up');
						break;

					case 40: // down
						Bordado.moverPunto('down');
						e.preventDefault(); // prevent the default action (scroll / move caret)
						break;

					case 76: // l, right down
						Bordado.moverPunto('right-down');
						break;

					default:
						return; // exit this handler for other keys
				}
			});

			// Toggle Mover/Pintar
			$('body').unbind('keypress').bind('keypress', function(e) {

				var code = (e.keyCode ? e.keyCode : e.which);

				if (code == 32) { // spacebar?
					e.preventDefault();
					//$('[name="modo"]').not(':checked').prop("checked", true);
					Bordado.pintar = !Bordado.pintar;
				}
			});


			// Modificar Canevá dentro del Dialog
			//
			// Tipo de Punto
			$('[name=punto],[name=cambiar_punto]').on('change', function() {
				Bordado.punto_base = $(this).val();
			});

			// Grosor de Hilo:
			$('[name=cambiar_ancho_hilo]')
				.on('change', function(e){
					e.preventDefault();
					Bordado.data.ancho_hilo = $(this).val();
					Bordado.puntos.svg.ancho_hilo = $(this).val();
					console.log('ancho_hilo (grosor): ' +$(this).val());
			});

			// Tamaño de Punto
			$('[name=cambiar_ancho_punto]')
				.on('change', function(e){
					e.preventDefault();
					Bordado.data.ancho_punto = $(this).val();
					Bordado.puntos.svg.ancho_punto = $(this).val();
					console.log('ancho_punto (tamaño): ' + $(this).val());
			});

			// Color de Hilo
			$('[name=cambiar_color_hilo]')
				.on('change', function(e){
					e.preventDefault();
					Bordado.puntos.colorHilo( $(this).val() );
					Bordado.data.color_hilo = $(this).val();
					//Bordado.puntos.svg.color_hilo = $(this).val();
			});

			// Cambiar color de "tela" (background)
			$('[name=cambiar_color_bg]')
				.on('change', function(){

					Bordado.data.color_bg = $(this).val();
					$('.caneva').css({
						background: Bordado.data.color_bg
					});

			});

			// Color de Malla
			/*$('[name=cambiar_color_malla]')
				.unbind('keyup mouseup')
				.on('keyup mouseup', function(e){
					e.preventDefault();
					console.log($(this).val());
			});*/

			// Toggle ocultar/mostrar malla
			$('[name=toggle-malla]')
				.unbind('click')
				.on('click', function(e){
					e.preventDefault();

					if ( Bordado.malla ) {
						$('.celda, .caneva').css({
							'border-color': 'rgba(0,0,0,0)'
						});
						$(this).text('Mostrar malla');
						console.info('Malla oculta.');
					} else {
						$('.celda, .caneva').css({
							'border-color': Bordado.data.color_malla || '#ccc'
						});
						$(this).text('Ocultar malla');
						console.info('Malla visible.');
					}

					Bordado.malla = !Bordado.malla;
				});


			$('#limpiar').on('click', function(e) {
				e.preventDefault();

				$('.type-warning .modal-content').css({
					width: '200px'
				});

				BootstrapDialog.confirm({
					title: 'Limpiar Canevá',
					message: '¿Confirmar?',
					type: BootstrapDialog.TYPE_WARNING,
					closable: true,
					draggable: true,
					btnCancelLabel: 'Cancelar',
					btnOKLabel: 'Limpiar',
					btnOKClass: 'btn-warning',
					callback: function(resultado) {
						if (resultado) {
							$('.celda').html(' ');
							Bordado.data.coords = [];
						} else {
							return;
						}
					}
				});
			});
		} // fin de this.registrados
	}, // fin de eventos

	// Mover punto en la grilla
	moverPunto: function(punto_dir) {

		if ($('.clicked').length) {

			var punto = this.puntos.generarPunto($select_punto.val() || this.data.punto_base),
				coord = $('.clicked').attr('rel').split(','),
				celda = '';

			$('.celda').removeClass('clicked');

			console.log('this.pintar: ' + this.pintar);

			switch (punto_dir) {
				case 'up':
					if (parseInt(coord[1]) > 0) {
						var coord_up = coord[0] + ',' + (parseInt(coord[1]) - 1);
						celda = $('.celda[rel="' + coord_up + '"]');

						if (this.pintar) {
							this.agregar({
								coord: {
									x: coord[0],
									y: (parseInt(coord[1]) - 1)
								},
								punto: $select_punto.val() || Bordado.punto_base,
								color_hilo: $('[name=cambiar_color_hilo]').val() || Bordado.data.color_hilo,
								ancho_hilo:  $('[name=cambiar_ancho_hilo]').val() || Bordado.data.ancho_hilo
							});
							console.log('Punto pintado de ' + coord[0] + ',' + coord[1] + ' a ' + coord_up);
						} else {
							$('.celda[rel="' + coord[0] + ',' + coord[1] + '"]').html('');
							this.quitar(coord[0], coord[1]);
							console.log('Punto movido de ' 	+ coord[0] + ',' + coord[1] + ' a ' + coord_up);
						}
						celda.html(punto)
							.addClass('clicked');
					}
					break;
				case 'right':
					if (parseInt(coord[0]) < (parseInt(this.data.columnas) - 1)) {
						var coord_right = (parseInt(coord[0]) + 1) + ',' + coord[1];
						celda = $('.celda[rel="' + coord_right + '"]');

						if (this.pintar) {
							this.agregar({
								coord: {
									x: (parseInt(coord[0]) + 1),
									y: coord[1]
								},
								punto: $select_punto.val() || Bordado.punto_base,
								color_hilo: $('[name=cambiar_color_hilo]').val() || Bordado.data.color_hilo,
								ancho_hilo:  $('[name=cambiar_ancho_hilo]').val() || Bordado.data.ancho_hilo
							});
							console.log('Punto movido de ' + coord[1] + ',' + coord[0] + ' a ' + coord_right);
						} else {
							$('.celda[rel="' + coord[0] + ',' + coord[1] + '"]').html('');
							this.quitar(coord[0], coord[1]);
							console.log('Punto pintado de ' + coord[1] + ',' + coord[0] + ' a ' + coord_right);
						}
						celda.html(punto)
							.addClass('clicked');
					}
					break;
				case 'down':
					if (parseInt(coord[1]) < parseInt(this.data.filas) - 1) {
						var coord_down = coord[0] + ',' + (parseInt(coord[1]) + 1);
						celda = $('.celda[rel="' + coord_down + '"]');

						if (this.pintar) {
							this.agregar({
								coord: {
									x: coord[0],
									y: (parseInt(coord[1]) + 1)
								},
								punto: $select_punto.val() || Bordado.punto_base,
								color_hilo: $('[name=cambiar_color_hilo]').val() || Bordado.data.color_hilo,
								ancho_hilo:  $('[name=cambiar_ancho_hilo]').val() || Bordado.data.ancho_hilo
							});
							console.log('Punto movido de ' + coord[0] + ',' + coord[1] + ' a ' + coord_down);
						} else {
							$('.celda[rel="' + coord[0] + ',' + coord[1] + '"]').html('');
							this.quitar(coord[0] + ',' + coord[1]);
							console.log('Punto pintado de ' + coord[0] + ',' + coord[1] + ' a ' + coord_down);
						}
						celda.html(punto)
							.addClass('clicked');
					}
					break;
				case 'left':
					if (parseInt(coord[0]) > 0) {
						var coord_left = (parseInt(coord[0]) - 1) + ',' + coord[1];
						celda = $('.celda[rel="' + coord_left + '"]');

						if (this.pintar) {
							this.agregar({
								coord: {
									x: (parseInt(coord[0]) - 1),
									y: coord[1]
								},
								punto: $select_punto.val() || Bordado.punto_base,
								color_hilo: $('[name=cambiar_color_hilo]').val() || Bordado.data.color_hilo,
								ancho_hilo:  $('[name=cambiar_ancho_hilo]').val() || Bordado.data.ancho_hilo
							});
							console.log('Punto movido de ' + coord[0] + ',' + coord[1] + ' a ' + coord_left);
						} else {
							$('.celda[rel="' + coord[0] + ',' + coord[1] + '"]').html('');
							this.quitar(coord[0] + ',' + coord[1]);
							console.log('Punto pintado de ' + coord[0] + ',' + coord[1] + ' a ' + coord_left);
						}
						celda.html(punto)
							.addClass('clicked');
					}
					break;
				default:
					return;

			}

		} else {
			console.info('No hay punto para mover! Haz click en la grilla.s');
		}

	},

	// Obtener coordenadas ordenandas para la grilla
	coordenadas: function() {

		return this.data.coords.map(function(e){
			return e.coord;
		}).sort(function(a,b){
			return a.x > b.y;
		});

	},

	// Obtener colores, ordenados y listos para comparar con coordenadas de la grilla
	colores: function ( data ) {
		return (data.coord.x + ',' + data.coord.y) === next_coord;
	},

	// Shuffle coordenadas (para animación)
	shuffle: function() {

		var currentIndex = this.data.coords.length,
			temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = this.data.coords[currentIndex];
			this.data.coords[currentIndex] = this.data.coords[randomIndex];
			this.data.coords[randomIndex] = temporaryValue;
		}

		return this.data.coords;
	},

	// Ordenar coordenadas
	ordenar: function() {
		this.data.coords = this.data.coords.sort(function( coord1, coord2 ){
			return coord2.coord < coord1.coord;
		});
	},

	// Agregar coordenada
	agregar: function(punto){
		var punto_nuevo = punto.coord.x + ',' + punto.coord.y,
			coords = this.data.coords.map(function(e){
				return e.coord.x + ',' + e.coord.y;
			}),
			color_hilo  = punto.color_hilo,
			ancho_hilo 	= punto.ancho_hilo,
			tipo_punto  = punto.punto;

		// Si no existe el punto, lo agregamos al objeto
		if ( coords.indexOf(punto_nuevo) == -1 ) {
			this.data.coords.push(punto);
			// Mantener las coordenas ordenadas
			//this.data.coords.sort();
			console.info('Punto generado en ' + punto_nuevo);
		} else {
			// Si ya existe, sólo actualizar color y tipo de punto
			this.data.coords[coords.indexOf(punto_nuevo)].color_hilo = color_hilo;
			this.data.coords[coords.indexOf(punto_nuevo)].ancho_hilo = ancho_hilo;
			this.data.coords[coords.indexOf(punto_nuevo)].punto 	 = tipo_punto;
		}
	},

	// Quitar coordenada
	quitar: function(coord) {
		// Loop para limpiar coordenadas repetidas (por error de usuario)
		var i = 0;
		while( typeof this.data.coords[i] != 'undefined' ){
			var index = this.data.coords.map(function(e){
					return e.coord.x + ',' + e.coord.y;
				}).indexOf(coord);
			if (index > -1) {
				this.data.coords.splice(index, 1);
				// Mantener las coordenas ordenadas
				this.data.coords.sort();

				$('.celda[rel="' + coord + '"]').html(' ').removeClass('clicked');

				console.info('Punto elminado de ' + coord);
			}
			i++;
		}
	}

};
