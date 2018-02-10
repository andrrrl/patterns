function PuntoCSS(datos_punto) {
    this.css = {
        tipo_punto: datos_punto.punto_base || "cruz",
        color_hilo: datos_punto.color_hilo || "#000000",
        ancho_hilo: datos_punto.ancho_hilo || 3,
        start_tag: "<div>",
        end_tag: "</div>"
    };
}

function PuntoSVG(datos_punto) {
    this.svg = {
        tipo_punto: datos_punto.punto_base || "cruz",
        color_hilo: datos_punto.color_hilo || "#000000",
        ancho_hilo: datos_punto.ancho_hilo || 3,
        start_tag: '<svg baseProfile="full" xmlns="http://www.w3.org/2000/svg" version="1.1" style="width:100%; height:100%">',
        end_tag: "</svg>",
        clase: ".celda"
    };
}

function Bordado(nombre_bordado, contenedor) {
    switch (this.type = "nodejs", this.mode = "css", this.type) {
        case "php":
            this.ajax_script = "php/bordado.php", this.load_action = "?action=load&bordado=",
                this.save_action = "?action=save", this.delete_action = "?action=delete&id=", this.list_action = "?action=list";
            break;

        case "nodejs":
            this.ajax_script = "/", this.load_action = "bordados/", this.save_action = "bordados/",
                this.delete_action = "bordados/", this.list_action = "bordados/";
    }
    this.contenedor = contenedor || "caneva", this.bordado_html = "", this.btn_save = "#guardar-bordado",
        this.puntos = "", this.malla = !0, this.pintar = !0, this.mostrar = !0, this.animar = {
            speed: 0,
            gif: !1
        }, this.registrados = !1, this.debug_coords = !1, this.data = {
            id: "",
            bordado: nombre_bordado || "Bordado " + Math.floor(1e3 * Math.random(0, 1e3)),
            filas: 25,
            columnas: 50,
            punto_base: "cruz",
            ancho_punto: 15,
            ancho_hilo: 3,
            color_hilo: "#000000",
            color_bg: "#FFFFFF",
            color_malla: "#CCCCCC",
            coords: [],
            creado_el: Date.now()
        };
}

PuntoCSS.prototype = {
    constructor: PuntoCSS,
    generarPunto: function (tipo_punto) {
        this.css.tipo_punto = tipo_punto || this.css.tipo_punto;
        var css_cruz = {
                background: this.css.color_hilo,
                width: this.css.ancho_hilo,
                height: this.css.alto,
                border: "1px solid rgba(100,100,100,0.25)",
                borderRadius: this.css.ancho_hilo
            },
            css_cuadrado = {
                background: this.css.color_hilo,
                border: "1px solid rgba(100,100,100,0.25)",
                width: "100%",
                height: "100%"
            },
            css_linea = {
                background: this.css.color_hilo,
                border: "1px solid rgba(100,100,100,0.25)"
            },
            css_linea_intersec_arriba = $.extend({}, css_linea, {
                height: this.css.ancho_hilo,
                top: "-" + (this.css.ancho_hilo / 2 + .5) + "px"
            }),
            css_linea_intersec_abajo = $.extend({}, css_linea, {
                height: this.css.ancho_hilo,
                bottom: "-" + this.css.ancho_hilo / 2 + "px"
            }),
            css_linea_intersec_izquierda = $.extend({}, css_linea, {
                width: this.css.ancho_hilo,
                left: "-" + this.css.ancho_hilo / 2 + "px"
            }),
            css_linea_intersec_derecha = $.extend({}, css_linea, {
                width: this.css.ancho_hilo,
                right: "-" + (this.css.ancho_hilo / 2 + .5) + "px"
            }),
            css_linea_arriba = css_linea_abajo = $.extend({}, css_linea, {
                height: this.css.ancho_hilo
            }),
            css_linea_izquierda = css_linea_derecha = css_linea_horizontal = css_linea_vertical = $.extend({}, css_linea, {
                width: this.css.ancho_hilo
            }),
            css_linea_horizontal = $.extend({}, css_linea, {
                height: this.css.ancho_hilo
            }),
            css_linea_vertical = $.extend({}, css_linea, {
                width: this.css.ancho_hilo
            }),
            css_circulo = $.extend({}, css_cuadrado, {
                width: this.css.ancho_hilo,
                height: this.css.ancho_hilo,
                borderRadius: "50%"
            }),
            css_rasti = {
                background: this.css.color_hilo,
                zIndex: 1
            },
            css_rasti_hor = {
                background: this.css.color_hilo,
                height: "50%",
                top: "-75%",
                left: "-25%",
                width: "150%",
                background: this.css.color_hilo,
                borderRadius: "2px"
            },
            css_rasti_vert = {
                background: this.css.color_hilo,
                width: "50%",
                left: "25%",
                top: "-125%",
                height: "150%",
                background: this.css.color_hilo,
                borderRadius: "2px"
            };
        return this.puntos = {
            linea_intersec_arriba: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_linea_intersec_arriba),
            linea_intersec_abajo: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_linea_intersec_abajo),
            linea_intersec_derecha: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_linea_intersec_derecha),
            linea_intersec_izquierda: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_linea_intersec_izquierda),
            linea_arriba: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_linea_arriba),
            linea_abajo: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_linea_abajo),
            linea_izquierda: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_linea_izquierda),
            linea_derecha: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_linea_derecha),
            linea_horizontal: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_linea_horizontal),
            linea_vertical: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_linea_vertical),
            diagonal1: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_cruz),
            diagonal2: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_cruz),
            cruz: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto + 1).css(css_cruz).add($(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto + 2).css(css_cruz)),
            cuadrado: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_cuadrado),
            circulo: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_circulo),
            rasti_hor: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_rasti).add($(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_rasti_hor)),
            rasti_vert: $(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_rasti).add($(this.css.start_tag + this.css.end_tag).addClass(this.css.tipo_punto).css(css_rasti_vert))
        }, tipo_punto === !1 ? this.puntos : this.puntos[tipo_punto] || this.puntos.cruz;
    },
    verPuntos: function () {
        return this.generarPunto(!1);
    },
    colorHilo: function (color) {
        return this.css.color_hilo = color || this.css.color_hilo, this.css.color_hilo;
    },
    anchoHilo: function (ancho) {
        return this.css.ancho_hilo = ancho || this.css.ancho_hilo, this.css.ancho_hilo;
    },
    tipoPunto: function (punto) {
        return this.css.tipo_punto = punto, this.css.tipo_punto;
    }
}, PuntoSVG.prototype = {
    constructor: PuntoSVG,
    generarPunto: function (tipo_punto) {
        return this.puntos = {
            cruz: this.svg.start_tag + '<line x1="0" y1="0" x2="100%" y2="100%" style="stroke-linecap: round; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" /><line x1="100%" y1="0" x2="0" y2="100%" style="stroke-linecap: round; stroke: ' + this.svg.color_hilo + "; stroke-width: " + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            mas: this.svg.start_tag + '<line x1="0" y1="50%" x2="100%" y2="50%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" /><line x1="50%" y1="0" x2="50%" y2="100%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width: " + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            punto: this.svg.start_tag + '<circle cx="50%" cy="50%" r="' + this.svg.ancho_hilo + '" style="stroke: ' + this.svg.color_hilo + "; fill:" + this.svg.color_hilo + ';"/>' + this.svg.end_tag,
            linea_arriba: this.svg.start_tag + '<line x1="0" y1="10%" x2="100%" y2="10%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            linea_centro: this.svg.start_tag + '<line x1="0" y1="50%" x2="100%" y2="50%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            linea_abajo: this.svg.start_tag + '<line x1="0" y1="90%" x2="100%" y2="90%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            linea_izq: this.svg.start_tag + '<line x1="10%" y1="0" x2="10%" y2="100%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            linea_centro_vert: this.svg.start_tag + '<line x1="50%" y1="0" x2="50%" y2="100%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            linea_der: this.svg.start_tag + '<line x1="90%" y1="0" x2="90%" y2="100%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            linea_oblicua1: this.svg.start_tag + '<line x1="0" y1="0" x2="100%" y2="100%" style="stroke-linecap: round; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            linea_oblicua2: this.svg.start_tag + '<line x1="100%" y1="0" x2="0" y2="100%" style="stroke-linecap: round; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            horiz_3: this.svg.start_tag + '<line x1="0" y1="10%" x2="100%" y2="10%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" /><line x1="0" y1="50%" x2="100%" y2="50%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" /><line x1="0" y1="90%" x2="100%" y2="90%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            vert_3: this.svg.start_tag + '<line x1="10%" y1="0" x2="10%" y2="100%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" /><line x1="50%" y1="0" x2="50%" y2="100%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" /><line x1="90%" y1="0" x2="90%" y2="100%" style="stroke-linecap: butt; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" />' + this.svg.end_tag,
            cuadrado: this.svg.start_tag + '<rect width="100%" height="100%" stroke-width="' + this.svg.ancho_hilo + '" style="stroke: ' + this.svg.color_hilo + "; fill:" + this.svg.color_hilo + ';" />' + this.svg.end_tag,
            tres: this.svg.start_tag + '<line x1="0" y1="0" x2="100%" y2="100%" style="stroke-linecap: round; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" /><line x1="100%" y1="0" x2="0" y2="100%" style="stroke-linecap: round; stroke: ' + this.svg.color_hilo + "; stroke-width:" + this.svg.ancho_hilo + ';" />' + this.svg.end_tag
        }, tipo_punto === !1 ? this.puntos : (tipo_punto = tipo_punto || this.svg.tipo_punto,
            this.puntos[tipo_punto] || this.puntos.cruz);
    },
    verPuntos: function () {
        return this.generarPunto(!1);
    },
    colorHilo: function (color) {
        return this.svg.color_hilo = color || this.svg.color_hilo, this.svg.color_hilo;
    },
    anchoHilo: function (ancho) {
        return this.svg.ancho_hilo = ancho || this.svg.ancho_hilo, this.svg.ancho_hilo;
    },
    tipoPunto: function (punto) {
        return this.svg.tipo_punto = punto, this.svg.tipo_punto;
    }
}, Bordado.prototype = {
    constructor: Bordado,
    cargar: function (bordado_id, opciones) {
        opciones = opciones || {}, this.mostrar = "undefined" == typeof opciones.mostrar ? this.mostrar : opciones.mostrar,
            this.animar = "undefined" == typeof opciones.animar ? this.animar : opciones.animar;
        var Bordado = this;
        Bordado.data.id = bordado_id || Bordado.data.id, console.info("[INFO] $.ajax: Cargando bordado: " + Bordado.data.bordado),
            Bordado.data.id && $.ajax({
                url: this.ajax_script + this.load_action + bordado_id,
                method: "GET",
                dataType: "JSON",
                success: function (db_data) {
                    if (db_data.id || db_data._id) {
                        db_data.id = db_data._id || db_data.id;
                        var coords = "object" != typeof db_data.coords ? JSON.parse(db_data.coords) : db_data.coords;
                        return Bordado.data = db_data, Bordado.data.coords = coords, $("input[name=velocidad]").prop("disabled") === !1 && (Bordado.animar.speed = $("input[name=velocidad]").val() || Bordado.animar.speed),
                            $("input[name=velocidad-gif]").prop("disabled") === !1 && (Bordado.animar.gif = $("input[name=velocidad-gif]").val() || Bordado.animar.gif),
                            Bordado.grilla(opciones), console.info("[OK] $.ajax: Bordado cargado."), !0;
                    }
                    return console.info("[INFO] $.ajax: No existe el bordado."), !1;
                },
                error: function () {
                    return console.info("[ERROR] $.ajax: Error al cargar el bordado: " + Bordado.data.bordado), !1;
                }
            });
    },
    guardar: function (bordado_nombre) {
        this.data.bordado = bordado_nombre || this.data.bordado;
        var Bordado = this;
        if (Bordado.data) {
            var btn_save = this.btn_save,
                btn_states = {
                    save: $(this.btn_save).data("save-text") || "Guardar",
                    saving: $(this.btn_save).data("saving-text") || "Guardando...",
                    saved: $(this.btn_save).data("saved-text") || "Guardado"
                };
            $(btn_save).html(btn_states.saving), Bordado._method = Bordado.data.id ? "PUT" : "POST",
                $.ajax({
                    url: this.ajax_script + this.save_action + (Bordado.data.id || ""),
                    method: Bordado._method,
                    beforeSend: function (xhr) {
                        "PUT" == Bordado._method && xhr.setRequestHeader("X-HTTP-Method-Override", "PUT");
                    },
                    cache: !1,
                    data: this.data,
                    dataType: "JSON",
                    success: function (res) {
                        switch (res.result) {
                            case "ok":
                                $(btn_save).html(btn_states.saved), 0 === $("body").find("[data-id=" + (Bordado.data.id || res._id) + "]").length && ($("#lista-bordados-borrar ul").find("li").filter(':contains("No hay bordados guardados")') && $("#lista-bordados-borrar").html(""),
                                    $("#lista-bordados-borrar").prepend('<li class="list-group-item"><a data-id="' + res._id + '" data-toggle="tooltip" data-title="Abrir" href="#' + res._id + '">' + res.bordado + '</a><span class="pull-right"><a class="delete" href="#delete" data-delete-id="' + res._id + '" data-bordado="' + res.bordado + '" data-title="Eliminar"class="delete-bordado"><i class="glyphicon glyphicon-remove"></i></a></span></li>'),
                                    $("#lista-bordados-borrar").find("li a").on("click", function (e) {
                                        e.preventDefault();
                                        var id = $(this).data("id");
                                        if (console.log("Bordado.data.id: " + id), $(this).hasClass("delete")) {
                                            var delete_id = $(this).data("delete-id"),
                                                bordado = $(this).data("bordado");
                                            console.info('Se está por eliminar el bordado: "' + bordado + '" con ID "' + delete_id + '"'),
                                                BootstrapDialog.confirm({
                                                    title: 'Eliminar Bordado: "' + bordado + '"',
                                                    message: "¿Confirmar?",
                                                    type: BootstrapDialog.TYPE_WARNING,
                                                    closable: !0,
                                                    draggable: !0,
                                                    btnCancelLabel: "Cancelar",
                                                    btnOKLabel: "Eliminar",
                                                    btnOKClass: "btn-danger",
                                                    callback: function (resultado) {
                                                        return resultado ? void Bordado.eliminar(delete_id) : void console.info('Acción cancelada: No se eliminó el bordado: "' + bordado + '"');
                                                    }
                                                });
                                        } else console.info("Se va a cargar el bordado con _id: " + Bordado.data.id), e.preventDefault(),
                                            Bordado.data.id = id, Bordado.cargar(id);
                                    }));
                                break;

                            case "error":
                                $(btn_save).html(btn_states.save);
                                break;

                            case "warning":
                                $(btn_save).html(btn_states.save);
                        }
                    },
                    error: function () {
                        $(btn_save).html(btn_states.save), alert("No se pudo guardar el bordado..."), console.error("$.ajax: No se pudo guardar el bordado...");
                    }
                });
        }
    },
    eliminar: function (id) {
        return "undefined" == typeof id ? (console.info("No se pudo eliminar el bordado: se requiere un ID..."), !1) : (console.info("$.ajax: Eliminando el bordado..."), void $.ajax({
            url: this.ajax_script + this.delete_action + id,
            method: "DELETE",
            dataType: "JSON",
            success: function (res) {
                switch (res.result) {
                    case "ok":
                        return $("body").find("[data-delete-id=" + id + "]").parentsUntil("ul").delay(200).remove(),
                            console.info("$.ajax: Se eliminó el bordado"), 0 === $("body").find("[data-delete-id]").length && ($("#lista-bordados-borrar").html('<li class="list-group-item">No hay bordados guardados</li>'),
                                $("button[name=cargar]").hide(), console.info("[INFO] $.ajax: No hay bordados para listar.")), !0;

                    case "error":
                        return console.info("$.ajax: No se pudo eliminar el bordado..."), console.log(res), !1;
                }
            },
            error: function (error) {
                return console.info("$.ajax: No se pudo eliminar el bordado..."), !1;
            }
        }));
    },
    listar: function () {
        console.info("[INFO] $.ajax: Cargando lista de bordados.");
        var Bordado = this;
        $.ajax({
            url: this.ajax_script + this.list_action,
            method: "GET",
            dataType: "JSON",
            success: function (db_data) {
                if (db_data.length > 0) {
                    var lista_bordados = "";
                    $.each(db_data, function (key, db_bordado) {
                        lista_bordados += '<li><a data-id="' + db_bordado._id + '" data-toggle="tooltip"data-title="Abrir" href="#' + db_bordado._id + '">' + db_bordado.bordado + "</a></li>";
                    }), $("#lista-bordados-borrar").html($(lista_bordados)).find("li").addClass("list-group-item").each(function (key, li) {
                        $(li).append('<span class="pull-right"><a class="delete" href="#delete" data-delete-id="' + $(this).find("a").data("id") + '" data-bordado="' + $(this).text() + '" data-title="Eliminar"class="delete-bordado"><i class="glyphicon glyphicon-remove"></i></a></span>');
                    }), $("#lista-bordados-borrar").find("li a").on("click", function (e) {
                        e.preventDefault();
                        var id = $(this).data("id");
                        if (console.log("Bordado.data.id: " + id), $(this).hasClass("delete")) {
                            var delete_id = $(this).data("delete-id"),
                                bordado = $(this).data("bordado");
                            console.info('Se está por eliminar el bordado: "' + bordado + '" con ID "' + delete_id + '"'),
                                BootstrapDialog.confirm({
                                    title: 'Eliminar Bordado: "' + bordado + '"',
                                    message: "¿Confirmar?",
                                    type: BootstrapDialog.TYPE_WARNING,
                                    closable: !0,
                                    draggable: !0,
                                    btnCancelLabel: "Cancelar",
                                    btnOKLabel: "Eliminar",
                                    btnOKClass: "btn-danger",
                                    callback: function (resultado) {
                                        return resultado ? void Bordado.eliminar(delete_id) : void console.info('Acción cancelada: No se eliminó el bordado: "' + bordado + '"');
                                    }
                                });
                        } else console.info("Se va a cargar el bordado con _id: " + Bordado.data.id), e.preventDefault(),
                            Bordado.data.id = id, Bordado.cargar(id);
                    }), $("#lista-bordados-borrar li a").tooltip(), $("input[name=animar]").on("click", function () {
                        $("input[name=velocidad]").prop("disabled", !$("input[name=velocidad]").prop("disabled")),
                            $("input[name=velocidad]").prop("disabled") === !0 && (Bordado.animar.speed = 0);
                    }), $("input[name=gif]").on("click", function () {
                        $("input[name=velocidad-gif]").prop("disabled", !$("input[name=velocidad-gif]").prop("disabled")),
                            $("input[name=velocidad-gif]").prop("disabled") === !0 && (Bordado.animar.gif = !1);
                    }), $("input[name=toggle-malla]").on("click", function () {
                        console.log($("input[name=toggle-malla]").prop("checked")), $("input[name=toggle-malla]").prop("checked") === !1 ? Bordado.malla = !1 : Bordado.malla = !0;
                    }), console.info("[OK] $.ajax: Lista de bordados cargada.");
                } else $("#lista-bordados-borrar").html('<li class="list-group-item">No hay bordados guardados</li>'),
                    $("button[name=cargar]").hide(), console.info("[INFO] $.ajax: No hay bordados para listar.");
            },
            error: function () {
                return console.info("[ERROR] $.ajax: Error al cargar lista de bordados."), !1;
            }
        });
    },
    grilla: function (opciones) {
        this.data = opciones.data ? opciones.data : this.data;
        var filas = parseInt(this.data.filas),
            columnas = parseInt(this.data.columnas),
            ancho = parseInt(this.data.ancho_punto);
        switch (this.width = columnas * ancho + 1, this.height = filas * ancho + 1, this.mode) {
            case "svg":
                this.puntos = new PuntoCSS("cruz");
                break;

            case "css":
                this.puntos = new PuntoCSS("cruz");
        }
        console.info("Nuevo objecto PuntoSVG creado");
        var primera_linea = "";
        console.info("Generando bordado: " + this.data.bordado), this.debug_coords && (console.info("[Modo depuración!]"),
            console.log(this.data));
        this.coordenadas();
        this.bordado_html = '<div class="' + this.contenedor + '" style="width: ' + this.width + "px; height: " + this.height + 'px; margin:auto;">';
        for (var y = 0; y < this.data.filas; y++)
            for (var x = 0; x < this.data.columnas; x++) primera_linea = 0 === x ? " primera-linea" : "",
                next_coord = x + "," + y, this.bordado_html += '<div data-toogle="tooltip" data-title="' + x + "," + y + '" class="celda' + primera_linea + '" style="width: ' + ancho + "px; height: " + ancho + 'px;"' + (this.debug_coords ? ' style="font-size:9px;line-height:20px;""' : "") + ' rel="' + x + "," + y + '">' + (this.debug_coords ? x + "," + y : " ") + "</div>";
        return this.bordado_html += "</div>", this.mostrar ? void this.ventana() : this.bordado_html;
    },
    ventana: function () {
        var Bordado = this;
        $bordado_html = $(Bordado.bordado_html);
        var select_cambiar_punto = '<ul class="dropdown-menu" name="cambiar_punto" id="punto">';
        $.each(Bordado.puntos.verPuntos(), function (punto, svg) {
            select_cambiar_punto += '<li value="' + punto + '"><a href="#punto" data-punto="' + punto + '">' + punto.replace(/\_/g, " ") + "</a></li>";
        }), select_cambiar_punto += "</ul>";
        Bordado.puntos.generarPunto(Bordado.data.punto_base);
        $form = $('<form name="guardar" class="form-inline">' + (Bordado.data.id ? "" : '<input type="text" class="form-control" name="bordado" id="bordado" value="' + $("#bordado-nuevo").val() + '" placeholder="Nombre de tu bordado">') + '<button id="guardar-bordado" class="btn btn-success" name="guardar" data-save-text="Guardar" data-saving-text="Guardando..." data-saved-text="Guardado!" autocomplete="off">Guardar</button> <button id="limpiar" class="btn btn-danger">Limpiar</button></form><aside class="container opciones-ventana alert alert-info"><div class="row"><form name="opciones" class="form"><div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Punto <span class="caret"></span></button>' + select_cambiar_punto + '</div><br><span id="punto-actual-texto">' + Bordado.data.punto_base + '</span><div class="text-center"><div id="punto-actual" class="celda_muestra" data-punto-actual=""></div></div><hr><div class="form-group"><label for="ancho_hilo">Grosor de hilo:</label><input class="form-control" type="number" name="cambiar_ancho_hilo" value="' + Bordado.data.ancho_hilo + '" min="1" max="20" step="1"></div><!--div class="form-group"><label for="ancho_punto">Ancho de punto:</label><input class="form-control" type="number" name="cambiar_ancho_punto" value="' + Bordado.data.ancho_punto + '" min="1" max="30" step="1"></div--><div class="form-group"><label for="color_hilo">Color de hilo:</label><input class="form-control" type="color" name="cambiar_color_hilo" value="' + Bordado.data.color_hilo + '"></div><div class="form-group"><label for="color_bg">Color de tela:</label><input class="form-control" type="color" name="cambiar_color_bg" value="' + Bordado.data.color_bg + '"></div><label for="color_picker">Tomar color:</label><span class="input-group-addon"><input name="color_picker" type="checkbox" aria-label="animar"></span><br><div class="form-group"><button class="btn btn-info" name="toggle-malla">Ocultar malla</button><hr><button class="btn btn-success" name="save-frame" data-toggle="tooltip" data-title="Sólo local"><small>Generar PNG</small></button><div class="save-frame-message"></div></div></form></div></aside>'),
            $bordado_html.hide();
        var dialog_size = Bordado.data.columnas >= 50 ? "60vw" : Bordado.data.columnas >= 30 ? "50vw" : "35vw";
        BootstrapDialog.show({
            size: BootstrapDialog.SIZE_LARGE,
            title: Bordado.data.bordado + " ~ " + Bordado.data.filas + "x" + Bordado.data.columnas,
            message: $bordado_html,
            closable: !0,
            closeByBackdrop: !1,
            closeByKeyboard: !1,
            onshow: function (dialogRef) {
                dialogRef.getModalFooter().append($form).css({
                    display: "inline"
                });
            },
            onshown: function (dialogRef) {
                if ($(".modal-dialog .modal-content").css({
                        width: Bordado.width + 50 + "px"
                    }), Bordado.malla === !1 ? $(".celda").removeClass("clicked").css({
                        borderLeft: "transparent",
                        borderBottom: "transparent"
                    }) : $(".celda").removeClass("clicked").css({
                        borderLeft: "1px solid " + Bordado.data.color_malla,
                        borderBottom: "1px solid " + Bordado.data.color_malla
                    }), $(".caneva").css({
                        borderRight: "1px solid " + Bordado.data.color_malla,
                        borderTop: "1px solid " + Bordado.data.color_malla,
                        background: Bordado.data.color_bg
                    }), $(".opciones-ventana").css({
                        display: "block"
                    }), $(".modal-dialog").css({
                        width: dialog_size
                    }), $bordado_html.show(), "undefined" != typeof Bordado.animar && Bordado.animar.speed > 0) {
                    $(".celda").html(""), Bordado.animar.gif && (Bordado.animar.speed = 1e3);
                    var i = 0,
                        n = "",
                        interval2 = setInterval(function () {
                            Bordado.puntos.colorHilo(Bordado.data.coords[i].color_hilo), Bordado.puntos.anchoHilo(Bordado.data.coords[i].ancho_hilo);
                            var rel = Bordado.data.coords[i].coord.x + "," + Bordado.data.coords[i].coord.y;
                            $('.celda[rel="' + rel + '"]').html(Bordado.puntos.generarPunto(Bordado.data.coords[i].punto)),
                                Bordado.animar.gif && (10 > i ? n = "-000" + i : 100 > i ? n = "-00" + i : 1e3 > i && (n = "-0" + i),
                                    Bordado.render(Bordado.data.bordado + n, !1)), i++, i == Bordado.data.coords.length && (clearInterval(interval2),
                                    setTimeout(function () {
                                        $.ajax({
                                            url: "/bordados/renders/animation",
                                            method: "post",
                                            data: {
                                                bordado: Bordado.data.bordado
                                            },
                                            dataType: "json",
                                            success: function (result) {
                                                console.log("OK"), console.log(result);
                                            },
                                            error: function (error) {
                                                console.log("Error"), console.log(error);
                                            }
                                        });
                                    }, 5e3));
                        }, Bordado.animar.speed);
                } else
                    for (var p = 0; p < Bordado.data.coords.length; p++) {
                        Bordado.puntos.colorHilo(Bordado.data.coords[p].color_hilo), Bordado.puntos.anchoHilo(Bordado.data.coords[p].ancho_hilo),
                            Bordado.puntos.tipoPunto(Bordado.data.coords[p].punto);
                        var rel = Bordado.data.coords[p].coord.x + "," + Bordado.data.coords[p].coord.y;
                        $('.celda[rel="' + rel + '"]').html(Bordado.puntos.generarPunto(Bordado.data.coords[p].punto));
                    }
                $(".caneva").after('<button class="btn-xs add-row"><i class="glyphicon glyphicon-plus"></i> </button>'),
                    Bordado.eventos(), console.info("[INFO] Eventos registrados.");
            },
            onhide: function (dialogRef) {
                $(".celda").removeClass("clicked"), "undefined" != typeof $interval2 && clearInterval($interval2);
            },
            onhidden: function (dialogRef) {
                console.info("Se cerró el Canevá.");
            }
        });
    },
    eventos: function () {
        if (!this.registrados) {
            var Bordado = this;
            $color_hilo = $("[name=cambiar_color_hilo]"), $ancho_hilo = $("[name=cambiar_ancho_hilo]"),
                $punto_actual = $("#punto-actual"), $('[data-toggle="tooltip"]').tooltip(), $(this.btn_save).unbind("click").on("click", function (e) {
                    e.preventDefault(), Bordado.data.punto_base = $punto_actual.data("punto-actual"),
                        Bordado.guardar($("#bordado").val());
                }), $("#punto-actual").html(Bordado.puntos.generarPunto(Bordado.data.punto_base));
            var can_drag = !1;
            $(".celda, svg").on("mousedown", function (e) {
                e.preventDefault(), can_drag = !0, prev_rel = $(this).attr("rel");
            }).on("mousemove", function (e) {
                if (e.preventDefault(), can_drag === !0) {
                    var rel = $(this).attr("rel");
                    if (1 == e.which) {
                        $(".celda").removeClass("clicked"), Bordado.puntos.colorHilo($color_hilo.val()),
                            Bordado.puntos.anchoHilo($ancho_hilo.val());
                        var rel = $(this).attr("rel"),
                            punto_actual = $("#punto-actual").text() || Bordado.data.punto_base;
                        if (" " === $(this).html() && punto_actual.match(/rasti_/)) {
                            punto_actual = "rasti_hor" == punto_actual ? "rasti_vert" : "rasti_hor", Bordado.data.punto_base = punto_actual;
                            var muestra_punto = Bordado.puntos.generarPunto(punto_actual);
                            $("#punto-actual-texto").html(punto_actual), $("#punto-actual").data("punto-actual", punto_actual),
                                $("#punto-actual").html(muestra_punto);
                        }
                        var punto_css = Bordado.puntos.generarPunto(punto_actual);
                        if ($(this).html(punto_css).addClass("clicked"), rel) {
                            var xy = rel.split(",");
                            Bordado.agregar({
                                coord: {
                                    x: xy[0],
                                    y: xy[1]
                                },
                                punto: punto_actual,
                                color_hilo: $color_hilo.val(),
                                ancho_hilo: $ancho_hilo.val()
                            });
                        }
                    }
                    3 == e.which && Bordado.quitar(rel);
                }
            }).on("mouseup", function (e) {
                e.preventDefault(), can_drag = !1;
            }), $(".celda").removeClass("clicked"), $(".celda").unbind("click").on("click", function (e) {
                e.preventDefault();
                var self = $(this);
                if ($("input[name=color_picker]").prop("checked") === !0) {
                    if ($("input[name=color_picker]").prop("checked", !1), " " == $(this).text()) return void $("input[name=cambiar_color_hilo]").val($("input[name=color_bg]").val());
                    var hexcolor = "";
                    return void $("input[name=cambiar_color_hilo]").val(function () {
                        if (self.css("background").match(/(rgb)\((.*)\)/g).length) {
                            var rgb = self.find("div").css("background").match(/(rgb)\((.*)\)/g);
                            return rgb = rgb[0].replace(/([a-z\(\)\,]*)/g, "").split(" ").forEach(function (color) {
                                hexcolor += 1 == parseInt(color).toString(16).length ? "0" + parseInt(color).toString(16) : parseInt(color).toString(16);
                            }), "#" + hexcolor;
                        }
                        return self.find("svg").length ? (self.find("svg").children().prop("style").stroke.replace(/([a-z\(\)\,]*)/g, "").split(" ").forEach(function (color) {
                            hexcolor += 1 == parseInt(color).toString(16).length ? "0" + parseInt(color).toString(16) : parseInt(color).toString(16);
                        }), "#" + hexcolor) : void 0;
                    });
                }
                $(".celda").removeClass("clicked"), Bordado.puntos.colorHilo($color_hilo.val()),
                    Bordado.puntos.anchoHilo($ancho_hilo.val());
                var rel = $(this).attr("rel"),
                    punto_actual = $("#punto-actual").text() || Bordado.data.punto_base;
                if (punto_actual.match(/rasti_/)) {
                    punto_actual = "rasti_hor" == punto_actual ? "rasti_vert" : "rasti_hor", Bordado.data.punto_base = punto_actual;
                    var muestra_punto = Bordado.puntos.generarPunto(punto_actual);
                    $("#punto-actual-texto").html(punto_actual), $("#punto-actual").data("punto-actual", punto_actual),
                        $("#punto-actual").html(muestra_punto);
                }
                var punto_css = Bordado.puntos.generarPunto(punto_actual);
                console.log(punto_css), $(this).html(punto_css).addClass("clicked");
                var xy = rel.split(",");
                Bordado.agregar({
                    coord: {
                        x: xy[0],
                        y: xy[1]
                    },
                    punto: punto_actual,
                    color_hilo: $color_hilo.val(),
                    ancho_hilo: $ancho_hilo.val()
                });
            }).on("contextmenu", function (e) {
                e.preventDefault();
                var rel = $(this).attr("rel");
                " " != $(this).html && Bordado.quitar(rel);
            }), $("#color_hilo").unbind("change").on("change", function (e) {
                e.preventDefault(), Bordado.puntos.colorHilo($(this).val());
            }), $(document).unbind("keydown").bind("keydown", function (e) {
                switch (e.which) {
                    case 37:
                        Bordado.moverPunto("left"), e.preventDefault();
                        break;

                    case 75:
                        Bordado.moverPunto("left-down");
                        break;

                    case 38:
                        Bordado.moverPunto("up"), e.preventDefault();
                        break;

                    case 73:
                        Bordado.moverPunto("left-up");
                        break;

                    case 39:
                        Bordado.moverPunto("right"), e.preventDefault();
                        break;

                    case 79:
                        Bordado.moverPunto("right-up");
                        break;

                    case 40:
                        Bordado.moverPunto("down"), e.preventDefault();
                        break;

                    case 76:
                        Bordado.moverPunto("right-down");
                        break;

                    default:
                        return;
                }
            }), $("body").unbind("keypress").bind("keypress", function (e) {
                var code = e.keyCode ? e.keyCode : e.which;
                32 == code && (e.preventDefault(), Bordado.pintar = !Bordado.pintar);
            }), $("#punto a").on("click", function (e) {
                e.preventDefault(), Bordado.data.punto_base = $(this).data("punto");
                var muestra_punto = Bordado.puntos.generarPunto(Bordado.data.punto_base);
                $("#punto-actual-texto").html($(this).text()), $("#punto-actual").data("punto-actual", $(this).data("punto")),
                    $("#punto-actual").html(muestra_punto);
            }), $("[name=cambiar_ancho_hilo]").on("change", function (e) {
                e.preventDefault(), Bordado.data.ancho_hilo = $(this).val(), console.log("ancho_hilo (grosor): " + $(this).val());
            }), $("[name=cambiar_ancho_punto]").on("change", function (e) {
                e.preventDefault(), Bordado.data.ancho_punto = $(this).val(), console.log("ancho_punto (tamaño): " + $(this).val());
            }), $("[name=cambiar_color_hilo]").on("change", function (e) {
                e.preventDefault(), Bordado.puntos.colorHilo($(this).val()), Bordado.data.color_hilo = $(this).val();
            }), $("[name=cambiar_color_bg]").on("change", function () {
                Bordado.data.color_bg = $(this).val(), $(".caneva").css({
                    background: Bordado.data.color_bg
                });
            }), $("[name=toggle-malla]").unbind("click").on("click", function (e) {
                e.preventDefault(), Bordado.malla ? ($(".celda, .caneva").css({
                    "border-color": "rgba(0,0,0,0)"
                }), $(this).text("Mostrar malla"), console.info("Malla oculta.")) : ($(".celda, .caneva").css({
                    "border-color": Bordado.data.color_malla || "#ccc"
                }), $(this).text("Ocultar malla"), console.info("Malla visible.")), Bordado.malla = !Bordado.malla;
            }), $("#limpiar").on("click", function (e) {
                e.preventDefault(), $(".type-warning .modal-content").css({
                    width: "200px"
                }), BootstrapDialog.confirm({
                    title: "Limpiar Canevá",
                    message: "¿Confirmar?",
                    type: BootstrapDialog.TYPE_WARNING,
                    closable: !0,
                    draggable: !0,
                    btnCancelLabel: "Cancelar",
                    btnOKLabel: "Limpiar",
                    btnOKClass: "btn-warning",
                    callback: function (resultado) {
                        resultado && ($(".celda").html(" "), Bordado.data.coords = []);
                    }
                });
            }), $('button[name="save-frame"]').on("click", function (e) {
                e.preventDefault(), Bordado.render(Bordado.data.bordado + "-frame-" + Math.random(0, 1e3));
            }), $(".add-row").unbind("click").bind("click", function () {
                Bordado.addRow();
            });
        }
    },
    moverPunto: function (punto_dir) {
        if ($(".clicked").length) {
            var punto = this.puntos.generarPunto($("#punto-actual").text() || this.data.punto_base),
                coord = $(".clicked").attr("rel").split(","),
                celda = "";
            switch ($(".celda").removeClass("clicked"), console.log("this.pintar: " + this.pintar),
                punto_dir) {
                case "up":
                    if (parseInt(coord[1]) > 0) {
                        var coord_up = coord[0] + "," + (parseInt(coord[1]) - 1);
                        celda = $('.celda[rel="' + coord_up + '"]'), this.pintar ? (this.agregar({
                                coord: {
                                    x: coord[0],
                                    y: parseInt(coord[1]) - 1
                                },
                                punto: $("#punto-actual").text() || Bordado.data.punto_base || Bordado.data.punto_actual || 'cruz',
                                color_hilo: $("[name=cambiar_color_hilo]").val() || Bordado.data.color_hilo,
                                ancho_hilo: $("[name=cambiar_ancho_hilo]").val() || Bordado.data.ancho_hilo
                            }), console.log("Punto pintado de " + coord[0] + "," + coord[1] + " a " + coord_up)) : ($('.celda[rel="' + coord[0] + "," + coord[1] + '"]').html(""),
                                this.quitar(coord[0], coord[1]), console.log("Punto movido de " + coord[0] + "," + coord[1] + " a " + coord_up)),
                            celda.html(punto).addClass("clicked");
                    }
                    break;

                case "right":
                    if (parseInt(coord[0]) < parseInt(this.data.columnas) - 1) {
                        var coord_right = parseInt(coord[0]) + 1 + "," + coord[1];
                        celda = $('.celda[rel="' + coord_right + '"]'), this.pintar ? (this.agregar({
                                coord: {
                                    x: parseInt(coord[0]) + 1,
                                    y: coord[1]
                                },
                                punto: $("#punto-actual").text() || Bordado.data.punto_base || Bordado.data.punto_actual || 'cruz',
                                color_hilo: $("[name=cambiar_color_hilo]").val() || Bordado.data.color_hilo,
                                ancho_hilo: $("[name=cambiar_ancho_hilo]").val() || Bordado.data.ancho_hilo
                            }), console.log("Punto movido de " + coord[1] + "," + coord[0] + " a " + coord_right)) : ($('.celda[rel="' + coord[0] + "," + coord[1] + '"]').html(""),
                                this.quitar(coord[0], coord[1]), console.log("Punto pintado de " + coord[1] + "," + coord[0] + " a " + coord_right)),
                            celda.html(punto).addClass("clicked");
                    }
                    break;

                case "down":
                    if (parseInt(coord[1]) < parseInt(this.data.filas) - 1) {
                        var coord_down = coord[0] + "," + (parseInt(coord[1]) + 1);
                        celda = $('.celda[rel="' + coord_down + '"]'), this.pintar ? (this.agregar({
                                coord: {
                                    x: coord[0],
                                    y: parseInt(coord[1]) + 1
                                },
                                punto: $("#punto-actual").text() || Bordado.data.punto_base || Bordado.data.punto_actual || 'cruz',
                                color_hilo: $("[name=cambiar_color_hilo]").val() || Bordado.data.color_hilo,
                                ancho_hilo: $("[name=cambiar_ancho_hilo]").val() || Bordado.data.ancho_hilo
                            }), console.log("Punto movido de " + coord[0] + "," + coord[1] + " a " + coord_down)) : ($('.celda[rel="' + coord[0] + "," + coord[1] + '"]').html(""),
                                this.quitar(coord[0] + "," + coord[1]), console.log("Punto pintado de " + coord[0] + "," + coord[1] + " a " + coord_down)),
                            celda.html(punto).addClass("clicked");
                    }
                    break;

                case "left":
                    if (parseInt(coord[0]) > 0) {
                        var coord_left = parseInt(coord[0]) - 1 + "," + coord[1];
                        celda = $('.celda[rel="' + coord_left + '"]'), this.pintar ? (this.agregar({
                                coord: {
                                    x: parseInt(coord[0]) - 1,
                                    y: coord[1]
                                },
                                punto: $("#punto-actual").text() || Bordado.data.punto_base || Bordado.data.punto_actual || 'cruz',
                                color_hilo: $("[name=cambiar_color_hilo]").val() || Bordado.data.color_hilo,
                                ancho_hilo: $("[name=cambiar_ancho_hilo]").val() || Bordado.data.ancho_hilo
                            }), console.log("Punto movido de " + coord[0] + "," + coord[1] + " a " + coord_left)) : ($('.celda[rel="' + coord[0] + "," + coord[1] + '"]').html(""),
                                this.quitar(coord[0] + "," + coord[1]), console.log("Punto pintado de " + coord[0] + "," + coord[1] + " a " + coord_left)),
                            celda.html(punto).addClass("clicked");
                    }
                    break;

                default:
                    return;
            }
        } else console.info("No hay punto para mover! Haz click en la grilla.");
    },
    coordenadas: function () {
        return this.data.coords.map(function (e) {
            return e.coord;
        }).sort(function (a, b) {
            return a.x > b.y;
        });
    },
    colores: function (data) {
        return data.coord.x + "," + data.coord.y === next_coord;
    },
    shuffle: function () {
        for (var temporaryValue, randomIndex, currentIndex = this.data.coords.length; 0 !== currentIndex;) randomIndex = Math.floor(Math.random() * currentIndex),
            currentIndex -= 1, temporaryValue = this.data.coords[currentIndex], this.data.coords[currentIndex] = this.data.coords[randomIndex],
            this.data.coords[randomIndex] = temporaryValue;
        return this.data.coords;
    },
    ordenar: function () {
        this.data.coords = this.data.coords.sort(function (coord1, coord2) {
            return coord2.coord < coord1.coord;
        });
    },
    agregar: function (punto) {
        var punto_nuevo = punto.coord.x + "," + punto.coord.y,
            coords = this.data.coords.map(function (e) {
                return e.coord.x + "," + e.coord.y;
            }),
            color_hilo = punto.color_hilo,
            ancho_hilo = punto.ancho_hilo,
            tipo_punto = punto.punto; -
        1 == coords.indexOf(punto_nuevo) ? (this.data.coords.push(punto), console.info("Punto generado en " + punto_nuevo)) : (this.data.coords[coords.indexOf(punto_nuevo)].color_hilo = color_hilo,
            this.data.coords[coords.indexOf(punto_nuevo)].ancho_hilo = ancho_hilo, this.data.coords[coords.indexOf(punto_nuevo)].punto = tipo_punto);
    },
    quitar: function (coord) {
        for (var i = 0;
            "undefined" != typeof this.data.coords[i];) {
            var index = this.data.coords.map(function (e) {
                return e.coord.x + "," + e.coord.y;
            }).indexOf(coord);
            index > -1 && (this.data.coords.splice(index, 1), $('.celda[rel="' + coord + '"]').html(" ").removeClass("clicked"),
                console.info("Punto elminado de " + coord)), i++;
        }
    },
    render: function (img_name, show_alert) {
        var Bordado = this,
            bordado_html = $(".caneva");
        html2canvas(bordado_html, {
            onrendered: function (canvas) {
                Bordado.png(canvas, img_name, show_alert);
            }
        });
    },
    png: function (canvas, img_name, show_alert) {
        var Bordado = this;
        show_alert = show_alert || !1;
        var img = {};
        img.data = canvas.toDataURL("image/png"), img.data = img.data.replace(/data:image\/png;base64,/, ""),
            img.name = img_name || Bordado.data.bordado, img.id = Bordado.data.id, $.ajax({
                url: "/bordados/renders/save",
                method: "post",
                dataType: "json",
                data: {
                    image: img.data,
                    bordado: img.name,
                    id: img.id
                },
                success: function (res) {
                    "ok" == res.message && (console.info("PNG " + img.name + " guardado"), $(".save-frame-message").html("<small>Frame guardado!</small>"),
                        show_alert && BootstrapDialog.alert({
                            title: "Generar Frame PNG",
                            message: "Frame guardado!"
                        }));
                },
                error: function (err) {
                    console.log('ERROR!', err);
                }
            });
    },
    addRow: function () {
        var columnas = (parseInt(this.data.filas), parseInt(this.data.columnas)),
            ancho = parseInt(this.data.ancho_punto);
        celda = "", h = parseInt($(".celda:last-child").attr("rel").split(",")[1]) + 1,
            this.height = this.height + ancho, this.data.filas++, console.log(this.height);
        for (var x = 0; columnas >= x; x++) celda = '<div data-toogle="tooltip" data-title="' + x + "," + h + '" class="celda' + (0 == x ? "primera-linea" : "") + '" style="width: ' + ancho + "px; height: " + ancho + 'px;"' + (this.debug_coords ? ' style="font-size:9px;line-height:20px;""' : "") + ' rel="' + x + "," + h + '">' + (this.debug_coords ? x + "," + h : " ") + "</div>",
            $("." + this.contenedor).css({
                height: this.height + "px"
            }).append(celda);
        $(".celda").css({
            borderLeft: "1px solid " + this.data.color_malla,
            borderBottom: "1px solid " + this.data.color_malla
        }), this.eventos();
    }
};