//a tener en cuenta

//clase = Clase
//objeto = cualquierObjeto
//var inicio = new Date;
/*function tiempo_carga(){
var fin = new Date;
var segundos = (fin-inicio)/1000;
var salida = "La pagina ha sido cargada en "+segundos +" segundos";
document.getElementById("tiempoCarga").innerHTML = salida;
return segundos;
}
 function load() {
	var r =  tiempo_carga();
	console.log(r);
	var cajaOnload = crear('div');
		cajaOnload.id = 'cajaOnload';
		cajaOnload.style.width = '100%';
		cajaOnload.style.height = '1200px';
		cajaOnload.style.background = 'green';
		cajaOnload.style.transition = 'all 2s';
		obtID('menu_horizontal').style.display = 'none'
    document.body.insertBefore(cajaOnload , obtID('menu_horizontal'));
	 alert('hey');
		obtID('menu_horizontal').style.display = 'block'
	document.body.removeChild(cajaOnload);
 }
 window.onload = load;*/



//detectar ie 11
function GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");
  // If IE, return version number.
  if (Idx > 0)
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./))
    return 11;

  else
    return 0; //It is not IE

}
//detectar ie 11
//funciones cross browser
function removeEvent(elemento,evento,funcion) {
 if (elemento.removeEventListener) 
    elemento.removeEventListener (evento,funcion,false);
 if (elemento.detachEvent)
    elemento.detachEvent ('on'+evento,funcion); 
}

function addEvent(elemento, evento, funcion){
	if(elemento.addEventListener){
		elemento.addEventListener(evento, funcion);
	} else if(elemento.attachEvent){
		elemento.attachEvent('on'+evento, funcion);
	}
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
//otras funciones
function c(str){return console.log(str);}
function  obtID(str){ return document.getElementById(str); }
function crear(str){ return document.createElement(str);} 
//_______________________________________

//variables globales

var contendorCatalogo = obtID('cuerpo');
	contendorCatalogo.style.display = 'none';

var categorias = obtID('menu_categorias').getElementsByTagName('ul')[1].getElementsByTagName('li');

var cajaCatalogo = obtID('contenedor_catalogo');

var estaAbierto = false;
var tabla = crear('table')	;
	tabla.id = 'tabla-carrito'
var thead = crear('thead');
	thead.id = 'thead';
var tbody = crear('tbody');
var fila = crear ('tr');
var columnaBody = crear('td');
var columnaUno = crear('th');
var columnaDos = crear('th');
var columnaTres = crear('th');
var columnaCuatro = crear('th');
var columnaCinco = crear('th');
var columnaSeis = crear('th');
	
var botonMas = document.createElement('input');
var botonMenos = document.createElement('input');
var numeroCantidad = crear('span');
var cajaCantidad = crear('div')
var filaBody = fila.cloneNode(false);
var columnaUnoBody = columnaBody.cloneNode(false);
var columnaDosBody = columnaBody.cloneNode(false);
var columnaTresBody = columnaBody.cloneNode(false);
var columnaCuatroBody = columnaBody.cloneNode(false);
var columnaCincoBody = columnaBody.cloneNode(false);
var columnaSeisBody = columnaBody.cloneNode(false);
var linkBorrar = crear('a');
var numero = parseInt(numeroCantidad.innerHTML)
var subtotales = columnaCincoBody;

var	divCarrito = crear('div');
var tituloCarrito = crear ('h2');

var	filasConProductos = document.getElementsByTagName('tr')
var	numeroDeItems = parseInt(filasConProductos.length)+1
var	cantItems = crear('p');
	
var divResumenCarrito = crear('div');
var tituloResumenCarrito = crear('h2');
var subtotalResumen = crear('span');
var entregaResumen = crear('span');

var caja = crear ('div');
var listaDesordenada = crear ('ul');
var listItem = crear ('li');
var precioEntregaResumen = crear('span');
var totalResumen = crear('span');
var precioTotalResumen = crear('span');
var actualizar = crear('a');
var linkPago = crear('a');
var retroceso = crear('a');
var columnaBody = crear('td');
var columnaSeisBody = columnaBody.cloneNode(false);
var parrafo = crear ('p');

var parrafoSub = parrafo.cloneNode(false);
var parrafoEntr = parrafo.cloneNode(false);
var parrafoTotal = parrafo.cloneNode(false);


var precioSubtotalResumen = crear('span');


// Clase Producto
function Producto (modelo,marcaAuto,foto,precio,anio,OEM,marca,clase,combustible,motor,descripcion){
	this.nombre = modelo;
	this.marcaAuto = marcaAuto;
	this.foto = foto;
	this.precio = precio;
	this.modelos = anio;
	this.OEM = OEM;
	this.marca = marca;
	this.clase = clase;
	this.combustible = combustible;
	this.motor = motor;
	this.descripcion = descripcion;
	if(contenedor_catalogo){
		this.mostrarMinificha = crearMiniFicha;
	}
	else if(contenedorFichaProd){
		this.mostrarMinificha = crearFichaCompleta;
	}
}

// Clase Carrito
function Carrito (total,subtotal,envio,items){
	this.total = total;
	this.subtotal = subtotal;
	this.envio = envio;
	this.items = items;
	this.actualizarCarrito = verificarCarrito;
}

//Creo carrito vacio
var carritoVacio = new Carrito (0,0,'--no-definido',0);
carritoVacio.actualizarCarrito();


////////////////////////////////////////////////
var btn_logo = obtID("header").getElementsByTagName("h1")[0].getElementsByTagName("a")[0];
	addEvent(btn_logo,'click',function(){
		//
		
		if(obtID("slide")){
			obtID("slide").style.display = 'block'
		}
		if(obtID("cuerpo")){
			obtID("cuerpo").style.display = 'none'
		}
		if(obtID("menuMarcas")){
			obtID("menuMarcas").style.display = 'block'
		}
		
	})

var contenedor = crear ('ul');

function crearMiniFicha (){

	if(!obtID('div_filtros')){
		crear_panel_filtros()
	}
	   
	
	function crear_panel_filtros(){
		var div = crear('div');
			div.id = 'div_filtros';
			
			div.style.display = 'inline-block';
			insertAfter(div,obtID('contenedor_catalogo'));
			
			
			var subtitulo = crear('h2');
				subtitulo.id = 'titulo_carrito_fijo';
				subtitulo.textContent = 'Filtrar por:';
				div.appendChild(subtitulo);
			/////////////primer filtro/////////////////////////////
			 array_de_marcas = obtID('menuMarcas').getElementsByTagName('ul')[0].getElementsByTagName('li');
			
			var p = crear('p');
				p.id = 'titulo_filtro';
				p.textContent = 'Marca';
				div.appendChild(p);
			var listaDeso = crear('ul');
			    listaDeso.id = 'filtro_marca';
			for (var i = 0 ; i < array_de_marcas.length ; i++){
				//i)
				var listItem = crear('li');
					listItem.className = 'list_item_filtro_marcas';
				var link = crear ('a');
					link.setAttribute('href','#');
					link.setAttribute('title',array_de_marcas[i].getElementsByTagName('img')[0].alt);
					link.textContent = array_de_marcas[i].getElementsByTagName('img')[0].alt;
					
					listItem.appendChild(link);
				listaDeso.appendChild(listItem);
				div.appendChild(listaDeso);
			}
			
			var lisFiltroMarcas  = obtID('filtro_marca').getElementsByTagName('li');
			for(var i = 0 ; i < lisFiltroMarcas.length ; i++ ){
				addEvent(lisFiltroMarcas[i].getElementsByTagName('a')[0], 'click',filtrar);
			} 
					
			
			 
	}
	var itemList = crear ('li');
		itemList.className = 'ficha';
	
		addEvent(itemList,'mouseenter',ampliarFicha,true);
		addEvent(itemList,'mouseleave',reducirFicha,true);
		addEvent(itemList,'click',crearFichaCompleta,true);
	
	var headerFicha = crear ('p');
		headerFicha.id = 'modelo';
	
	var fotoProducto = crear ('img');
		fotoProducto.setAttribute("src", "img/"+this.foto); 
		fotoProducto.setAttribute("alt", this.nombre); 
	
	var precioProducto = crear ('p');
		precioProducto.className = 'precioProd';
		precioProducto.id = 'precio';
		
	var span = crear ('span');
		span.textContent = 'AR$'
		span.id = 'span';
		span.className = 'span';
	
	var fotoMarcaAuto = crear ('span');
		fotoMarcaAuto.className = 'marcaOculta';
		
	var atributosOcultos = crear('div');
		atributosOcultos.className = 'atributosOcultos';
	var modelos = crear('p');
		modelos.id = 'modelos';
		modelos.className = 'modelos';
	var oem = crear('p');
		oem.id = 'oem';
	var marca = crear('p');
		marca.id = 'fabricante';
	var clase = crear('p');
		clase.id = 'clase';
	var combustible = crear('p');
		combustible.id = 'combustible';
	var motor = crear('p');
		motor.id = 'motor';
	var marcaAuto = crear('p');
		marcaAuto.id = 'marca';
	var descripcion = crear('p');
		descripcion.id = 'descripcion';
	var boton_ver_ficha = crear ('a');
		boton_ver_ficha.setAttribute('href','#');
		boton_ver_ficha.setAttribute('title','Ver Ficha con especificaciones');
		boton_ver_ficha.textContent = 'Ver';
	contenedor.appendChild(itemList)
	cajaCatalogo.appendChild(contenedor);
	itemList.appendChild(fotoProducto);
	itemList.appendChild(descripcion);
	itemList.appendChild(precioProducto);
	itemList.appendChild(boton_ver_ficha);
	itemList.appendChild(atributosOcultos);

	atributosOcultos.appendChild(headerFicha);
	atributosOcultos.appendChild(motor);
	atributosOcultos.appendChild(modelos);
	atributosOcultos.appendChild(oem);
	atributosOcultos.appendChild(marca);
	atributosOcultos.appendChild(clase);
	atributosOcultos.appendChild(combustible);
	atributosOcultos.appendChild(marcaAuto);
	
	
	marcaAuto.innerHTML = this.marcaAuto;
	headerFicha.innerHTML = this.nombre;
	precioProducto.innerHTML = '$ARG '+this.precio;
	motor.innerHTML = this.motor
	descripcion.innerHTML = this.descripcion
	combustible.innerHTML = this.combustible
	clase.innerHTML = this.clase
	marca.innerHTML = this.marca
	oem.innerHTML = this.OEM
	modelos.innerHTML = this.modelos
	//c(this)
	return this;
} 
////////////////////////////////////////////
var productos = contenedor.getElementsByTagName('li');

function crearFichaCompleta(){
		
	if(obtID("contenedor_catalogo")){
		obtID('contenedor_catalogo').getElementsByTagName('h2')[0].textContent = 'La ficha del Producto'
		if(obtID('contenedor_catalogo').getElementsByTagName('h2')[0].textContent == 'La ficha del Producto'){
			var titulo_ficha_prod = obtID('contenedor_catalogo').getElementsByTagName('h2')[0];
				titulo_ficha_prod.style.background = 'white';
			
		}	
		obtID("contenedor_catalogo").getElementsByTagName('h3')[0].textContent = 'Revisa las especificaciones'		
	}
	
	if(this){
		
		this.parentNode.parentNode.id = 'contenedorFichaProd';
		this.removeEventListener("click",crearFichaCompleta,false);
		this.removeEventListener("mouseenter",ampliarFicha,false);
		this.removeEventListener("mouseleave",reducirFicha,false);
	}
	
	contenedor.style.display = 'none';

	var cajaFichaCompleta = crear ('div');
		cajaFichaCompleta.id = 'cajaFichaCompleta'; 
	
		cajaCatalogo.appendChild(cajaFichaCompleta);

	var divImagenesProd = crear ('div');
		divImagenesProd.id = 'cajaImagen';
	var imgProd = crear ('img');
		imgProd.setAttribute('src',this.getElementsByTagName('img')[0].src);
		imgProd.setAttribute('alt','imagen carrito');
		imgProd.style.width = '125%';
		divImagenesProd.id = 'cajaImagen';
		divImagenesProd.appendChild(imgProd);
		cajaFichaCompleta.appendChild(divImagenesProd);	
	
	var cajaEspecificaciones = crear ('div');//le agrego dos divs
		cajaEspecificaciones.id = 'cajaEspecificaciones';
		cajaEspecificaciones.style.display = "inline-block"
		
		cajaFichaCompleta.appendChild(cajaEspecificaciones);
	
	
	var array = this.getElementsByTagName('p');
	var y = array.length;
	var table = crear('table');
		table.id = "tablaEspe";
	var titulo = crear('caption');
		titulo.textContent = "Ver Caracteristicas";
			
		table.appendChild(titulo);
		addEvent(titulo,'click',abrirEe,false);
		titulo.style.background = 'url(img/indicador-up.png)  no-repeat';
		titulo.style.backgroundSize = '4% 24% ';
		titulo.style.backgroundPosition = '424px 19px';
		
		function abrirEe(){
			titulo.style.background = 'url(img/indicador.png) no-repeat';
			titulo.style.backgroundSize = '4% 24% ';
			titulo.style.backgroundPosition = '424px 19px';
			var trs = this.parentNode.getElementsByTagName('tr')
			for (var i = 0; i < trs.length; i++) {
				trs[i].style.display = 'block';
				var tds = trs[i].getElementsByTagName('td');
				for (var j = 0; j < tds.length; j++) {
					tds[j].style.display = 'table-cell';
				};
			};
			removeEvent(this,'click',abrirEe);
			addEvent(this,'click',cerrarEe);
		}	
		function cerrarEe(){
			titulo.style.background = 'url(img/indicador-up.png)  no-repeat';
			titulo.style.backgroundSize = '4% 24% ';
			titulo.style.backgroundPosition = '424px 19px';
			var trs = this.parentNode.getElementsByTagName('tr')
			for (var i = 0; i < trs.length; i++) {
				trs[i].style.display = 'none';
				var tds = trs[i].getElementsByTagName('td');
				for (var j = 0; j < tds.length; j++) {
					tds[j].style.display = 'table-cell';
				};
			};
			removeEvent(this,'click',cerrarEe);
			addEvent(titulo,'click',abrirEe,false);
		}
			
	for(var i = 0 ; i < y ; i++){
		
		var x = this.getElementsByTagName('p')[i].id;
		
		var tr = crear('tr');
			
		var td1 = crear('td');
			td1.textContent = x;
			
			tr.appendChild(td1);
		var td2 = crear('td');
			
		var p = crear('p');
			p.textContent = array[i].textContent;
			p.id = x;
			td2.appendChild(p)
			tr.appendChild(td2);
			table.appendChild(tr);
	}
	
			
	var contenedorLista = crear('ul');
		cajaEspecificaciones.appendChild(contenedorLista);
	
	var listItem = crear('li');
	var p = crear('p');
		p.textContent = this.getElementsByTagName('p')[0].textContent
		listItem.appendChild(p);
	var listItem1 = crear('li');
	var p1 = crear('p');
		p1.textContent = this.getElementsByTagName('p')[1].textContent;
		listItem1.appendChild(p1);
		
		contenedorLista.appendChild(listItem);
		contenedorLista.appendChild(listItem1);
		//obtID("descripcion"))
	
	
	
	if(!obtID('form1')){
		var formulario =  crear ('form');
		var text = crear('p');
			text.textContent = 'Indique Cantidad';
			
		var select = crear('select');
			select.name = 'select';
			select.id = 'select';
					
			formulario.appendChild(select);
			formulario.insertBefore(text,select);
			formulario.method = 'get';
			formulario.id = 'form1';
			formulario.className = 'form1';
							
		var optionUno = crear('option');
			optionUno.value = 'Uno';
			optionUno.text = 1;
			select.appendChild(optionUno);
		var optionDos = crear('option');
			optionDos.value = 'Dos';
			optionDos.text = 2;
			select.appendChild(optionDos);
			//('hey');
		var botonComprar = crear('input');
			botonComprar.type = 'button';
			botonComprar.value = 'Agregar';
			botonComprar.id = "btn-agregar"
			
		var retroceso = crear('input');
			retroceso.type = 'button';
			retroceso.id = "btn-back"
			
			retroceso.value = 'Catalogo';
			retroceso.title = 'VER TODO';
			formulario.appendChild(botonComprar);
			formulario.appendChild(retroceso);
		cajaEspecificaciones.appendChild(formulario);
		//
		obtID('cajaEspecificaciones').appendChild(table);
		
		//.info(obtID("btn-back"))
		animar_hover(obtID("btn-agregar"),'vacio');
		animar_hover(obtID("select"),'vacio');
		animar_hover(obtID("btn-back"),'vacio');
		addEvent(botonComprar,'click',agregarAlcarrito);
		addEvent(retroceso,'click',filtrarVerTodo);
	}
	

}
//////////////////////////////////////////

crearMiniCarritoFlotante();

function  crearMiniCarritoFlotante (){
	obtID('miniCarrito').appendChild(caja);
	caja.id = 'miniCarritoFlotante';
	caja.style.display = 'none';
	miniCarritoFlotante.appendChild(listaDesordenada)
	listaDesordenada.id = 'cajaDeCajitas'
}

if(	obtID('miniCarrito')){
    addEvent(obtID('iconoCarrito'),'click',verCarritoFlotante,false);
    function verCarritoFlotante(){
        obtID('miniCarritoFlotante').style.display = 'block';
        estaAbierto = true;
        this.className = "end"
        actualizarCarritoFlotante();
        var x = obtID('carritoVacio');
        if(estaAbierto === true){
            removeEvent(this,'click',verCarritoFlotante);
            estaAbierto = false;

        }

    }
}


function cerrarCarrito(e){

	e.stopPropagation();
	
	vaciarCarrito ();
	
	obtID('miniCarritoFlotante').style.display = 'none';
	
	addEvent(obtID('iconoCarrito'),"click",verCarritoFlotante);
}

function vaciarCarrito (){

	if(obtID('cajaDeCajitas')){
		obtID('miniCarritoFlotante').removeChild(obtID('cajaDeCajitas'));
		
	}
	if(obtID('header_miniCarritoFlotante')){
		obtID('miniCarritoFlotante').removeChild(obtID('header_miniCarritoFlotante'));
	}
	
	if(obtID('carritoVacio')){
		
		obtID('miniCarritoFlotante').removeChild(obtID('carritoVacio'));//parrafo carrito vacio //malditas variables
	}if(obtID('cajaBotones')){
		obtID('miniCarritoFlotante').removeChild(obtID('cajaBotones'));//parrafo carrito vacio //malditas variables
	} 
}
	
function actualizarCarritoFlotante(){
	//('actualizo')
	if(carritoVacio.items != 0){
		//(obtID('miniCarritoFlotante'))
		//obtID('miniCarritoFlotante'))
		vaciarCarrito();
		mostrarCarritoNoVacio();
		
	}else{
		//(obtID('miniCarritoFlotante'))
		//obtID('miniCarritoFlotante'))
		vaciarCarrito();
		mostrarCarritoVacio();
		
	} 
}

function mostrarCarritoNoVacio(){
	var miniCarritoFlotante = obtID('miniCarritoFlotante');
	var x = miniCarritoFlotante;
	var cajaDeCajitas = crear('ul');
	
	x.style.display = 'inline-block'
		
	
		cajaDeCajitas.id = 'cajaDeCajitas';
		x.appendChild(cajaDeCajitas)	
	var arrayDeImgs = document.getElementsByTagName('tbody')[0].getElementsByTagName('img');
		
			
	for(var i = 0 ; i < arrayDeImgs.length ; i ++ ){
	
		
		var listItem = crear ('li');
			listItem.id = 'producto';
		
		var img = crear ('img');
			img.setAttribute('src',arrayDeImgs[i].src);
			img.setAttribute('alt','imagen carrito');
			img.style.width = '25%';
		
		var link = crear ('a');
			link.setAttribute('href','#');
			link.setAttribute('alt','ver');
		
			miniCarritoFlotante.getElementsByTagName('ul')[0].appendChild(listItem);
			link.appendChild(img)
			listItem.appendChild(link);
			
			
		// agragamos una caja con los atributos del producto
			
		var cajita = crear ('div');
			cajita.id = 'atributos';
			
			miniCarritoFlotante.getElementsByTagName('ul')[0].getElementsByTagName('li')[i].appendChild(cajita);
			
		var nombreProducto = crear ('p');
			nombreProducto.id = 'nombreProd';
			nombreProducto.textContent = arrayDeImgs[i].parentNode.parentNode.getElementsByTagName('td')[1].textContent;
		
		var precioProducto = crear ('span');
			precioProducto.id = 'precioProducto';
			precioProducto.textContent = 'Precio Unitario : AR$'+arrayDeImgs[i].parentNode.parentNode.getElementsByTagName('td')[2].textContent;
			
		var cantidad = crear ('p');
			cantidad.id = 'cantidad';
			cantidad.textContent =  'Cantidad: '+arrayDeImgs[i].parentNode.parentNode.getElementsByTagName('td')[3].getElementsByTagName('div')[0].getElementsByTagName('span')[0].textContent;
			
		var subtotal = crear ('span');
			subtotal.id = 'subtotal';
			subtotal.textContent =  'Subtotal: AR$'+arrayDeImgs[i].parentNode.parentNode.getElementsByTagName('td')[4].textContent;
			
	
			cajita.appendChild(nombreProducto);
			cajita.appendChild(precioProducto);
			cajita.appendChild(cantidad);
			cajita.appendChild(subtotal);
			
			//.log(arrayDeImgs[i].parentNode.parentNode.getElementsByTagName('td'));
		
		
	}
	/////////header miniCarritoFlotante///////
	var caja2 = crear ('div')

    caja2.id = 'header_miniCarritoFlotante'
    var tituloCarritoflotante = crear('p');
    tituloCarritoflotante.textContent = 'Productos Agregados';
    if(!obtID("header_miniCarritoFlotante")){
        //("no existe el header")
		x.insertBefore(caja2,obtID('cajaDeCajitas'));
		var link = crear('a');
			link.id = 'btn_cerrar';
        link.setAttribute('href','#');
        link.className = 'boton omega btn_cerrar_carro_lleno';
			link.setAttribute('alt','Cerrar');
			link.textContent =  'X';
			addEvent(link,'click', cerrarCarrito,false);
		//caja2.innerHTML = 'header'
		caja2.appendChild(tituloCarritoflotante);
		caja2.appendChild(link);
		c()
	}
	//////fin header///////
	
	var caja = crear ('div');	
		caja.id = 'cajaBotones';
		
	var botonFinalizarCompra = crear ('a');
		botonFinalizarCompra.id = 'botonFinalizarCompra';
		botonFinalizarCompra.className = 'boton alpha';
		botonFinalizarCompra.setAttribute('href','#');
		botonFinalizarCompra.setAttribute('alt','ver');
		botonFinalizarCompra.textContent =  'Finalizar Compra';
		
	var botonVerCarrito = crear ('a');
		botonVerCarrito.id = 'botonVerCarrito';
		botonVerCarrito.className = 'boton omega';
		botonVerCarrito.setAttribute('href','#');
		botonVerCarrito.setAttribute('alt','ver');
		botonVerCarrito.textContent =  'Ver Carrito';
		
		
		addEvent(botonVerCarrito,'click',verCarrito);
		addEvent(botonFinalizarCompra,'click',pagar);
			
		
		miniCarritoFlotante.appendChild(caja);
		caja.appendChild(botonVerCarrito);
		caja.appendChild(botonFinalizarCompra);
		
		
}

function mostrarCarritoVacio(){
	   // removeEvent(obtID('miniCarrito'),'click',cerrarCarrito);
	   
	if(!obtID('carritoVacio')){
		var caja = crear ('div');	
			caja.id = 'cajaBotones';
			caja.style.position = 'absolute';
		var parrafo =  crear ('p');
			parrafo.id = 'carritoVacio';
			parrafo.textContent = 'Carrito Vacio :(';
			parrafo.style.display = 'none';
		
		var btn_cerrar = crear ('a');
			btn_cerrar.id = 'btn_cerrar';
			btn_cerrar.className = 'boton omega';
			btn_cerrar.setAttribute('href','#');
			btn_cerrar.setAttribute('alt','Cerrar');
			btn_cerrar.textContent =  'X';
			addEvent(btn_cerrar,'click', cerrarCarrito,false);
		
			//('ver carrito vacio')
		
			miniCarritoFlotante.appendChild(parrafo)
			caja.appendChild(btn_cerrar)
			miniCarritoFlotante.appendChild(caja)
			parrafo.style.display = 'block';
	}	
}		

/////////////////filtros slide y menuMarcas////////////////////////

var lisMenuMarcas  = document.getElementsByTagName('div')[6].getElementsByTagName('li');
for(var i = 0 ; i < lisMenuMarcas.length ; i++ ){
	addEvent(lisMenuMarcas[i], 'click', prefiltrar);
} 

function prefiltrar(){
	if(obtID('div_form')){
			obtID('div_form').style.display = 'none';
			
	}
	
	var cajaFichaCompleta = obtID('cajaFichaCompleta');
	var carrito = obtID('carrito');
	var cuerpo = obtID('cuerpo');
		cuerpo.getElementsByTagName('div')[0].id = 'contenedor_catalogo';
	//.log(this.getElementsByTagName('img')[0].alt)	
	switch(this.getElementsByTagName('img')[0].alt){
		case 'CHEVROLET':
	
			if(obtID('caja_publicidad_chev')){
				//obtID('caja_publicidad_chev'))
				//obtID('caja_publicidad_chev').getElementsByTagName('')[];	
			}	
			var cajaFichaCompleta = obtID('cajaFichaCompleta');
	
				contendorCatalogo.style.display = 'block';
				slide.style.display = 'none';
				menuMarcas.style.display = 'none';
				titulo.textContent = 'CHEVROLET';
				titulo.style.background = 'url(img/bg-chevrolet.png) 0% 0% ';
				titulo.style.backgroundSize = 'cover';
			var ul = cajaCatalogo.getElementsByTagName('ul')[0];
			var cantidad_produ = ul.getElementsByTagName('li').length;
				
				
				
				cajaCatalogo.insertBefore(titulo,ul);
			//('es chevrolet ')
			if(cajaFichaCompleta){
					//('existe caja ficha completa')
					//('se utilizo el filtro con la palabra: '+this.innerHTML)
				if(carrito){
					carrito.style.display = 'none';
				}
				cajaCatalogo.removeChild(cajaFichaCompleta)
				//.log(this)
				if (this.innerHTML == ('CHEVROLET')){
					//('entre al if ')
					for ( var i = 0 ; i < ul.getElementsByTagName('li').length ; i ++ ){
						//('entre al for ')
						addEvent(ul.getElementsByTagName('li')[i],"click",crearFichaCompleta);
						addEvent(ul.getElementsByTagName('li')[i],"mouseenter",ampliarFicha);
						addEvent(ul.getElementsByTagName('li')[i],"mouseleave",reducirFicha);
						
					}
				}
			}
			
			contenedor.style.display = 'block';
			if(obtID('form1')){
				var form1 = obtID('form1')
				form1.parentNode.removeChild(form1)
			}
			var listaProductos = cajaCatalogo.getElementsByTagName('ul')[0].getElementsByTagName('li');
			
			for (var i = 0; i < listaProductos.length ; i++){
				var marcas = listaProductos[i].getElementsByTagName('p');
					
				for (var j = 0; j < marcas.length ; j++){
					listaProductos[i].style.display = 'inline-block';
					if( marcas[j].innerHTML != 'Chevrolet'){
						listaProductos[i].style.display = 'none';
					}
					else if(marcas[j].innerHTML == 'Chevrolet'){
						listaProductos[i].style.display = 'inline-block';
						
						subtitulo.textContent = 'Mostrando '+(i+1)+' productos en stock';	
						cajaCatalogo.insertBefore(subtitulo,ul);
					}
				}
			}
		break;
		case 'FORD': 
				if(obtID('caja_publicidad_chev')){
			
			
	}
				contendorCatalogo.style.display = 'block';
				slide.style.display = 'none';
				menuMarcas.style.display = 'none';
				titulo.textContent = 'FORD';
				titulo.style.background = 'url(img/bg-ford.png) 0% 0% ';
				titulo.style.backgroundSize = 'cover';
			var ul = cajaCatalogo.getElementsByTagName('ul')[0];
					
				cajaCatalogo.insertBefore(titulo,ul);
			
			var cajaFichaCompleta = obtID('cajaFichaCompleta');
			if(cajaFichaCompleta){
				if(carrito){
					carrito.style.display = 'none';
				}
			
				cajaCatalogo.removeChild(cajaFichaCompleta)
								
				if (this.innerHTML == 'FORD'){
				
					for ( var i = 0 ; i < ul.getElementsByTagName('li').length ; i ++ ){
						
						addEvent(ul.getElementsByTagName('li')[i],"click",crearFichaCompleta);
						addEvent(ul.getElementsByTagName('li')[i],"mouseenter",ampliarFicha);
						addEvent(ul.getElementsByTagName('li')[i],"mouseleave",reducirFicha);
						
					}
				}
			}
			
			contenedor.style.display = 'block';
			if(obtID('form1')){
				var form1 = obtID('form1')
				form1.parentNode.removeChild(form1)
			}
			var listaProductos = cajaCatalogo.getElementsByTagName('ul')[0].getElementsByTagName('li');
			for (var i = 0; i < listaProductos.length ; i++){
				var marcas = listaProductos[i].getElementsByTagName('p');
				for (var j = 0; j < marcas.length ; j++){
				listaProductos[i].style.display = 'inline-block';
					g = 1
					if( marcas[j].innerHTML != 'Ford'){
						listaProductos[i].style.display = 'none';
						
					}
					else if(marcas[j].innerHTML == 'Ford'){
						listaProductos[i].style.display = 'inline-block';
						
						g++;
						
						subtitulo.textContent = 'Mostrando '+(g+2)+' productos en stock';	
						cajaCatalogo.insertBefore(subtitulo,ul);
					}
				}
			}
		break;
		case 'VOLSKWAGEN': 
				contendorCatalogo.style.display = 'block';
				slide.style.display = 'none';
				menuMarcas.style.display = 'none';
				titulo.textContent = 'VOLSKWAGEN';
			var ul = cajaCatalogo.getElementsByTagName('ul')[0];
		
				cajaCatalogo.insertBefore(titulo,ul);
			
				var cajaFichaCompleta = obtID('cajaFichaCompleta');
			if(cajaFichaCompleta){
				if(carrito){
					carrito.style.display = 'none';
				}
			
				cajaCatalogo.removeChild(cajaFichaCompleta)
								
				if (this.innerHTML == 'VOLSKWAGEN'){
				
					for ( var i = 0 ; i < ul.getElementsByTagName('li').length ; i ++ ){
						
						addEvent(ul.getElementsByTagName('li')[i],"click",crearFichaCompleta);
						addEvent(ul.getElementsByTagName('li')[i],"mouseenter",ampliarFicha);
						addEvent(ul.getElementsByTagName('li')[i],"mouseleave",reducirFicha);
						
					}
				}
			}
			
			contenedor.style.display = 'block';
			if(obtID('form1')){
				var form1 = obtID('form1')
				form1.parentNode.removeChild(form1)
			}
			var listaProductos = cajaCatalogo.getElementsByTagName('ul')[0].getElementsByTagName('li');
			for (var i = 0; i < listaProductos.length ; i++){
				var marcas = listaProductos[i].getElementsByTagName('p');
				for (var j = 0; j < marcas.length ; j++){
				listaProductos[i].style.display = 'inline-block';
					g = 1
					if( marcas[j].innerHTML != 'Volskwagen'){
						listaProductos[i].style.display = 'none';
						
					}
					else if(marcas[j].innerHTML == 'Volskwagen'){
						listaProductos[i].style.display = 'inline-block';
						g++;
						subtitulo.textContent = 'Mostrando '+(g+3)+' productos en stock';	
						cajaCatalogo.insertBefore(subtitulo,ul);
					}
				}
			}
		break;
		case 'RENAULT':
				contendorCatalogo.style.display = 'block';
				slide.style.display = 'none';
				menuMarcas.style.display = 'none';
				titulo.textContent = 'RENAULT';
			var ul = cajaCatalogo.getElementsByTagName('ul')[0];
		
				cajaCatalogo.insertBefore(titulo,ul);
			
				var cajaFichaCompleta = obtID('cajaFichaCompleta');
			if(cajaFichaCompleta){
				if(carrito){
					carrito.style.display = 'none';
				}
			
				cajaCatalogo.removeChild(cajaFichaCompleta)
								
				if (this.innerHTML == 'RENAULT'){
				
					for ( var i = 0 ; i < ul.getElementsByTagName('li').length ; i ++ ){
						
						addEvent(ul.getElementsByTagName('li')[i],"click",crearFichaCompleta);
						addEvent(ul.getElementsByTagName('li')[i],"mouseenter",ampliarFicha);
						addEvent(ul.getElementsByTagName('li')[i],"mouseleave",reducirFicha);
						
					}
				}
			}
			
			contenedor.style.display = 'block';
			if(obtID('form1')){
				var form1 = obtID('form1')
				form1.parentNode.removeChild(form1)
			}
			var listaProductos = cajaCatalogo.getElementsByTagName('ul')[0].getElementsByTagName('li');
			for (var i = 0; i < listaProductos.length ; i++){
				var marcas = listaProductos[i].getElementsByTagName('p');
				for (var j = 0; j < marcas.length ; j++){
				listaProductos[i].style.display = 'inline-block';
					g = 1
					if( marcas[j].innerHTML != 'Renault'){
						listaProductos[i].style.display = 'none';
						
					}
					else if(marcas[j].innerHTML == 'Renault'){
						listaProductos[i].style.display = 'inline-block';
						g++;
						subtitulo.textContent = 'Mostrando '+(g+2)+' productos en stock';	
						cajaCatalogo.insertBefore(subtitulo,ul);
					}
				}
			}
		break;
	}
}

var botonVerStock  = document.getElementsByTagName('div')[5].getElementsByTagName('a')[0];
addEvent(botonVerStock, 'click', filtrarVerTodo);

function filtrarVerTodo(){
	if(obtID('div_form')){
		obtID('div_form').style.display = 'none';
		
	}else if(obtID('div_form')){
		obtID('div_form').style.display = 'none';
		
	}
	var cajaFichaCompleta = obtID('cajaFichaCompleta');
	var carrito = obtID('carrito');
	var cuerpo = obtID('cuerpo');
		cuerpo.getElementsByTagName('div')[0].id = 'contenedor_catalogo';
	//.log(this.title)	
	if(this.title =='VER TODO'){
			c('HOLAPPP')
			var cajaFichaCompleta = obtID('cajaFichaCompleta');
	
				contendorCatalogo.style.display = 'block';
				slide.style.display = 'none';
				menuMarcas.style.display = 'none';
				titulo.textContent = 'Stock completo';
				titulo.style.background = 'url(img/Lacor-Fotos-Almacén-3.png) 0% 0% ';
				titulo.style.backgroundSize = 'cover';
			var ul = cajaCatalogo.getElementsByTagName('ul')[0]
			var cantidad_produ = ul.getElementsByTagName('li').length;
				
				subtitulo.textContent = 'Mostrando '+cantidad_produ+' productos en stock';
			
			cajaCatalogo.insertBefore(titulo,ul);
			cajaCatalogo.insertBefore(subtitulo,ul);
			
			if(cajaFichaCompleta){
				
				cajaCatalogo.removeChild(cajaFichaCompleta)
								
				if(carrito){
					carrito.style.display = 'none';
				}
				
				for ( var i = 0 ; i < ul.getElementsByTagName('li').length ; i ++ ){
					
					addEvent(ul.getElementsByTagName('li')[i],"click",crearFichaCompleta);
					addEvent(ul.getElementsByTagName('li')[i],"mouseenter",ampliarFicha);
					addEvent(ul.getElementsByTagName('li')[i],"mouseleave",reducirFicha);
					
				}
			}
						
			contenedor.style.display = 'block';
			if(obtID('imagenProdSeleccionado')){
				var img = obtID('imagenProdSeleccionado')
					img.style.display = 'block';
			}
			if(obtID('form1')){
				var form1 = obtID('form1')
					form1.parentNode.removeChild(form1)
			}
			var listaProductos = cajaCatalogo.getElementsByTagName('ul')[0].getElementsByTagName('li');
			
			for (var i = 0; i < listaProductos.length ; i++){
				var marcas = listaProductos[i].getElementsByTagName('p');
				for (var j = 0; j < marcas.length ; j++){
					if( marcas[j].innerHTML ){
						listaProductos[i].style.display = 'inline-block';
					
					}
				}
			}
		
	}
}


/////////////////////////////////////////


function verificarCarrito(){
	//c(this)
	if(!obtID('especificacionesCarrito')){
		//.log(this)
		var listItem_total = crear ('li');
			listItem_total.className = 'badge';
			
		var listaEspecifCarrito =  crear ('ul');
			listaEspecifCarrito.id = 'especificacionesCarrito';
			//listaEspecifCarrito.className = 'badge';
			listItem_total.textContent = 'Total: $'+this.total;
			listaEspecifCarrito.appendChild(listItem_total);
		//var listItem_subtotal = crear ('li');
		var listItem_Items = crear ('li');
			listItem_Items.className = 'badge';
			//listaEspecifCarrito.style.display = 'none';
			
		//listItem_subtotal.textContent = 'subTotal: $'+this.subtotal;
		
		//listaEspecifCarrito.appendChild(listItem_subtotal);
		
		listItem_Items.textContent = 'Productos:'+' '+this.items;
		listaEspecifCarrito.appendChild(listItem_Items);
		////////////////////////
		
		
		
		
		
		
		
		
		//BOTON ACTUALIZAR
		
		
		var boton_actualizar = crear('a');
			boton_actualizar.id = 'btn-actualizar';
			boton_actualizar.setAttribute('href','#')
			boton_actualizar.setAttribute('title','')
			boton_actualizar.innerHTML = "actualizar"
			obtID('miniCarrito').insertBefore(boton_actualizar,obtID('especificacionesCarrito'));
		
		addEvent(boton_actualizar,'click', function(){
			
			actualizarCarritoFlotante();
			
		});
		
		
		
		
		
		
		
		
		///////////////////////////////////////////
		miniCarrito.appendChild(listaEspecifCarrito);
		
		
	}else{
		
		//.log('de nuevo por aqui, el subtotal es :'+this.subtotal)
		var nuevoTotal = especificacionesCarrito.getElementsByTagName('li')[0];
			nuevoTotal.textContent ='Total: $'+this.total;
		var nuevoItem_Items = especificacionesCarrito.getElementsByTagName('li')[1];
			nuevoItem_Items.textContent =' Productos: '+this.items;
			precioSubtotalResumen.innerHTML = this.subtotal;
			precioTotalResumen.innerHTML =this.total;
		//.info(carritoVacio)
	}
	
 }
			
function crearCarrito (){
	
	cuerpo = obtID('contenedorFichaProd');
	divCarrito.id = 'carrito';
	divCarrito.style.display = 'none';
	//tituloCarrito.textContent = 'Mi Carrito';
	
	
	//divCarrito.appendChild(tituloCarrito);
	
	cuerpo.appendChild(divCarrito);
	
	
	
		
}
	
function crearFilaCarrito (){
	

	//traigo los datos del producto 
	var tablaDatos = obtID('tablaEspe')
	var imagenProd = obtID('cajaImagen').getElementsByTagName('img')[0];
	var imagenProdClon = imagenProd.cloneNode(false);
		imagenProdClon.style.width = '50%'; 
		imagenProdClon.style.margin = '20px 0px'; 
	var descripcion = tablaDatos.getElementsByTagName('p')[0].innerHTML;
	//.log(tablaDatos)
	var fabricante = tablaDatos.getElementsByTagName('p')[6].innerHTML;
	var precio = tablaDatos.getElementsByTagName('p')[1].innerHTML;
	//.log(tablaDatos.getElementsByTagName('p')[1])
	var cantidad = obtID('select').select;
	
	var numOp = obtID('select').selectedIndex;//cantidad
	var botonMas = document.createElement('input');
		botonMas.type = 'submit';
		botonMas.value = '+';
		botonMas.id = 'btn_mas';

	var botonMenos = document.createElement('input');
		botonMenos.type = 'submit';
		botonMenos.value = '-';
		botonMenos.id = 'btn_menos';

	var numeroCantidad = crear('span');
		numeroCantidad.id = "variable";
		numeroCantidad.innerHTML = numOp+1
	var cajaCantidad = crear('div')
		cajaCantidad.id = 'padre'
		cajaCantidad.appendChild(numeroCantidad);
		cajaCantidad.insertBefore(botonMas,numeroCantidad)
		cajaCantidad.appendChild(botonMenos)
		
			//le agrgo funcionalidad a los botones	
		addEvent(botonMas,'click',function(){
			var numero = parseInt(numeroCantidad.innerHTML);
			//si las unidades de un producto son menos de 5 continue
			if(numero<5){
				//si se presiono sume 1
				numero = numero+1;
				numeroCantidad.innerHTML = numero;
				
				//subtotal es igual a precio por cantidad de unidades
				var precioPosta =  extraePrecio(precio);
				function extraePrecio(precio){
					var re = /[0-9]+/
					var p = re.exec(precio);
					if (p == null){
						return "";
					}else{
						return p[0];	
					}
					
				}
				columnaCincoBody.textContent = precioPosta*numero;
				
				carritoVacio.items = carritoVacio.items+1;
				carritoVacio.subtotal = carritoVacio.subtotal+parseInt(precioPosta);
				carritoVacio.total = carritoVacio.subtotal;
				carritoVacio.actualizarCarrito();
				
				subtotales = columnaCincoBody;
				
				
				/* if(subtotales){
					nuevoSub = parseInt(subtotales.innerHTML)
					acomulado = nuevoSub	
					////.log(nuevoSub)
					////.log(acomulado)
				} */
			}
		});
	//le agrgo funcionalidad a los botones	
		addEvent(botonMenos,'click',function(){
			var  numero = parseInt(numeroCantidad.innerHTML);
				if(numero>0){
					numero = numero-1;
					numeroCantidad.innerHTML = numero;
					var precioPosta =  extraePrecio(precio);
					function extraePrecio(precio){
						var re = /[0-9]+/
						var p = re.exec(precio);
						if (p == null){
							return "";
						}else{
							return p[0];	
						}
						
					}
					columnaCincoBody.textContent = precioPosta*numero;
				
					carritoVacio.items = carritoVacio.items-1;
					carritoVacio.subtotal = carritoVacio.subtotal-parseInt(precioPosta);
					carritoVacio.total = carritoVacio.subtotal;
					carritoVacio.actualizarCarrito();
				
					subtotales = columnaCincoBody;
					//'soy yoooo y actualiceeee')
					if(subtotales){
						nuevoSub = parseInt(subtotales.innerHTML)
						acomulado = nuevoSub	
						////.log(nuevoSub)
						////.log(acomulado)
					}
					
				}
				
		});
// final -- cantidad + o menos
	var filaBody = fila.cloneNode(false);
	var columnaUnoBody = columnaBody.cloneNode(false);
		columnaUnoBody.appendChild(imagenProdClon);
	var columnaDosBody = columnaBody.cloneNode(false);
		columnaDosBody.textContent = descripcion;
		columnaDosBody.id = "descripcion";
	var columnaTresBody = columnaBody.cloneNode(false);
	
	var precioPosta =  extraePrecio(precio);
	function extraePrecio(precio){
		var re = /[0-9]+/
		var p = re.exec(precio);
		if (p == null){
			return "";
		}else{
			return p[0];	
		}
		
	}
		columnaTresBody.textContent = precioPosta;
		columnaTresBody.id = 'precioProducto'
	var columnaCuatroBody = columnaBody.cloneNode(false);
		columnaCuatroBody.appendChild(cajaCantidad);
	var columnaCincoBody = columnaBody.cloneNode(false);
		columnaCincoBody.id = 'subtotalProducto'
	var columnaSeisBody = columnaBody.cloneNode(false);
	var linkBorrar = crear('a');
		linkBorrar.innerHTML = "borrar";
		linkBorrar.id = 'link_borrar';
		linkBorrar.setAttribute("href", "#"); 
		linkBorrar.setAttribute("alt", "borrar");
		columnaSeisBody.appendChild(linkBorrar);
		//'cuantosItems???')
		//carrito.items)
		addEvent(linkBorrar,'click',BorrarProductoDeCarrito);
	var numero = parseInt(numeroCantidad.innerHTML)
		//.log(precio)
		columnaCincoBody.textContent = precioPosta*numero;
		filaBody.appendChild(columnaUnoBody);
		filaBody.appendChild(columnaDosBody);
		filaBody.appendChild(columnaTresBody);
		filaBody.appendChild(columnaCuatroBody);
		filaBody.appendChild(columnaCincoBody);
		filaBody.appendChild(columnaSeisBody);
		
		fila.appendChild(columnaUno);
		fila.appendChild(columnaDos);
		fila.appendChild(columnaTres);
		fila.appendChild(columnaCuatro);
		fila.appendChild(columnaCinco);
		fila.appendChild(columnaSeis);
		thead.appendChild(fila);
		
		//resumen carrito
		
		divResumenCarrito.id = 'resumenCarrito';
		//divResumenCarrito)	
		tituloResumenCarrito.innerHTML = 'Resumen del Carrito';
		
		var s = subtitulo.cloneNode(false)
		s.innerHTML = 'Resumen del Carrito';
		subtotalResumen.innerHTML = 'Subtotal';
		
		var div = crear('div');
			div.id = 'resumen_compra'
			
			entregaResumen.innerHTML = 'Entrega';
			precioSubtotalResumen.innerHTML = this.subtotal;
			precioEntregaResumen.innerHTML = 'Flete Gratis' ;
			totalResumen.innerHTML = 'Total del pedido';
			precioTotalResumen.innerHTML =this.total;
			
			linkPago.innerHTML = "Caja";
			//linkPago.className = 'boton';
			linkPago.id = 'linkPago';
			linkPago.setAttribute("href", "#"); 
			linkPago.setAttribute("alt", "Pagar");
			
			
			addEvent(linkPago,'click',pagar);
			
			retroceso.innerHTML = "VER TODO";
			retroceso.className = 'retroceso_c';
			retroceso.id = 'retroceso';
			retroceso.setAttribute("href", "#"); 
			retroceso.setAttribute("alt", "retroceso");
			retroceso.setAttribute("title", "El catalogo completo");
							
			addEvent(retroceso,'click',filtrar);
			
			
			if(!obtID("resumen_compra")){
				divResumenCarrito.appendChild(tituloResumenCarrito);
				divResumenCarrito.appendChild(s);
				parrafoSub.appendChild(subtotalResumen);
				parrafoSub.appendChild(precioSubtotalResumen);
				divResumenCarrito.appendChild(div);
				div.appendChild(parrafoSub);
				parrafoEntr.appendChild(entregaResumen);
				parrafoEntr.appendChild(precioEntregaResumen);
				div.appendChild(parrafoEntr);
				parrafoTotal.appendChild(totalResumen);
				parrafoTotal.appendChild(precioTotalResumen);
				div.appendChild(parrafoTotal);
				divResumenCarrito.appendChild(linkPago);
				divResumenCarrito.appendChild(retroceso);
			
			}
		
		//.log('de nuevo por aqui, el subtotal es :'+this.subtotal)
		/* ---fin---resumen carrito*/
		tabla.appendChild(thead);
		tabla.appendChild(tbody);
		
		divCarrito.appendChild(tabla);
		divCarrito.appendChild(divResumenCarrito);
		tbody.appendChild(filaBody)
		filaBody.id = 'filaItem';
	
	animar_hover(obtID("btn_menos"),'vacio');
	/* var subtotales = columnaCincoBody;
	if(subtotales){
		nuevoSub = parseInt(subtotales.innerHTML)
		acomulado = nuevoSub	
	} */
}

function consultarCarrito (itemSeleccionado){
		
	//.log(obtID('tabla-carrito'))
	var tds = obtID('tabla-carrito').getElementsByTagName('td');
	
	for(var i = 0 ; i < tds.length ; i++){
		var itemsDelCarrito = tds[i];
			//.log(itemsDelCarrito)	
			//.log(itemSeleccionado)	
		if(itemsDelCarrito.textContent == itemSeleccionado){
			
			return true;
			
		}
	}
	
}

function determinarFila(itemSeleccionado){
	var tds = obtID('tabla-carrito').getElementsByTagName('td');
	for(var i = 0 ; i < tds.length ; i++){
		var itemsDelCarrito = tds[i];
			//.log(itemsDelCarrito)	
		if(itemsDelCarrito.textContent == itemSeleccionado){
			
			return itemsDelCarrito.parentNode;
		}
	}
	
}

function creacionThead(){
			// creo tabla para ordenar productos agregados
			cuerpo = obtID('contenedorFichaProd');
			tbody.id = "tbody";
				
			columnaUno.textContent = 'item';
			columnaDos.textContent = 'Descripcion';
			columnaTres.textContent = 'Precio en $ARG';
			columnaCuatro.textContent = 'Cantidad';
			columnaCinco.textContent = 'Subtotal';
			columnaSeis.textContent = 'Borrar';
						
		}	

function agregarAlcarrito (){
	c(this)
	
	if(!obtID('carrito')){	
		crearCarrito();
	}/* else{
		obtID('carrito').getElementsByTagName('h2')[0].textContent = 'Carrito';
	} */
	
	if(!obtID('miniCarritoFlotante')){	
		crearCarrito();
	}/* else{
		obtID('carrito').getElementsByTagName('h2')[0].textContent = 'Carrito';
	}
	 */
	
	if(!obtID('thead')){ 
		creacionThead();
		
	}
	if(obtID('resumenCarrito')){
		obtID('resumenCarrito').style.display = 'block';
		obtID('resumenCarrito').appendChild(obtID('retroceso'))
	}
	
	if(obtID('carrito')){
		
		if(!obtID('filaItem')){
			
			crearFilaCarrito();
			
		}else{
			var nombreItemSeleccionado = this.parentNode.parentNode.getElementsByTagName('p')[0].textContent;
			//.log(this.parentNode.parentNode)
			var resultadoConsulta = consultarCarrito(nombreItemSeleccionado);
			//resultadoConsulta)		
			if(resultadoConsulta === true){
				var filaDeterminada = determinarFila(nombreItemSeleccionado);
				//.info(filaDeterminada)
				var nuevaCantidad = parseInt(filaDeterminada.getElementsByTagName('span')[0].textContent) + (select.selectedIndex+1);
				filaDeterminada.getElementsByTagName('span')[0].textContent = nuevaCantidad; 
				filaDeterminada.getElementsByTagName('td')[4].textContent = nuevaCantidad*parseInt(filaDeterminada.getElementsByTagName('td')[2].textContent)
			}
			if(resultadoConsulta != true){
				
				crearFilaCarrito();
				
			} 
		
			
		}
	}
	
		
	//traigo los datos del producto
	
	var especificacionesProd = obtID('cajaEspecificaciones');
	
	var descripcion = especificacionesProd.getElementsByTagName('p')[0].innerHTML;
		descripcion.name = 'otronombremas'
		
	var  precioDelProducto = especificacionesProd.getElementsByTagName('p')[1].innerHTML;
	var precioParaAgregar =  extraePrecio(precioDelProducto);
	function extraePrecio(precioDelProducto){
		var re = /[0-9]+/
		var precio = re.exec(precioDelProducto);
		if (precio == null){
			return "";
		}else{
			return precio[0];	
		}
		
	}
	
	numOp = obtID('select').selectedIndex;//cantidad
	
	//guardo cifras	
	items = (numOp+1)+carritoVacio.items;
	subtotal = (precioParaAgregar*(numOp+1)) + carritoVacio.subtotal;
	total = subtotal; // + envio
	
	
	//nueva instancia de  objeto carrito 
	carritoVacio = new Carrito (total,subtotal,'--no-definido',items);
	
	//actualizo carrito
	carritoVacio.actualizarCarrito();
	
	//carritoVacio)
	var cajaFichaCompleta = obtID('cajaFichaCompleta');
		
	//creo una notificacion de agregado
	
	if(!obtID('cajaNotificacionAgregado')){
	
		var cajaNotificacionAgregado = crear('div');
		
			cajaNotificacionAgregado.id = 'cajaNotificacionAgregado';
			
		var	parrafoNotificacion = crear('p');
		var strong = crear('strong')
			strong.textContent = 'fue adicionado al carrito';
			parrafoNotificacion.innerHTML = ' " '+descripcion+' " ';
			parrafoNotificacion.appendChild(strong);
			
			cajaNotificacionAgregado.appendChild(parrafoNotificacion);
			//obtID("tablaEspe"))
			insertAfter(cajaNotificacionAgregado,obtID('form1'));
			//obtID("contenedorFichaProd").style.margin = '0 auto';
			cajaFichaCompleta.style.display = 'block';
			
		var linkCarrito = crear('a');
		
			linkCarrito.innerHTML = "Ver Carrito";
			linkCarrito.id = "btn_ver_carrito"
			linkCarrito.setAttribute("href", "#"); 
			linkCarrito.setAttribute("alt", "carrito");
			cajaNotificacionAgregado.appendChild(linkCarrito);
			addEvent(linkCarrito,'click',verCarrito);
			
			//tiempos();
	}
	

}


	

function tiempos() {
    var z = setInterval(function(){ 
	if(obtID("cajaNotificacionAgregado")){
		obtID("cajaNotificacionAgregado").className = "begin";
		obtID("cajaNotificacionAgregado").parentNode.removeChild(obtID("cajaNotificacionAgregado"))
	}
	
	if(obtID("caja_publicidad")){
		obtID("caja_publicidad").className = "begin";
		obtID('caja_publicidad').parentNode.removeChild(obtID("caja_publicidad"));
	
	}
		
		
	
	//'hola de nuevo estoy en tiempos')
		var d = new Date();
		var t = d.toLocaleTimeString();
		//t)
		
	clearInterval(z);
	}, 10000);
	
}
	
function verCarrito(){
	if(obtID('div_form')){
		obtID('div_form').style.display = 'none'; 
		
	}
	if(obtID('cajaFichaCompleta')){
		var cajaFichaCompleta = obtID('cajaFichaCompleta');
		var divCarrito = obtID('carrito');
		obtID('contenedorFichaProd').getElementsByTagName('h2')[0].textContent = 'Mi Carrito';
		obtID('contenedorFichaProd').getElementsByTagName('h3')[0].textContent = 'Mi Carrito';
		cajaFichaCompleta.style.display = 'none';
		divCarrito.style.display = 'inline-block';
		
	}

	if(this.parentNode){	
		this.parentNode.parentNode.style.display = 'none';
	}
	
	if(obtID('contenedor_catalogo')){
		var titulo = obtID('contenedor_catalogo').getElementsByTagName('h2')[0];
		var lista = obtID('contenedor_catalogo').getElementsByTagName('ul')[0];
		var divCarrito = obtID('carrito');
		titulo.style.display = 'none';
		lista.style.display = 'none';
		divCarrito.style.display = 'inline-block';
		
	}
	/*  */
	obtID('contenedorFichaProd').getElementsByTagName('h3')[0].textContent = 'Lista con todos los productos agregados recientemente'	                                       ;
	divCarrito.style.display = 'inline-block';

}

function pagar (){
	
	//'vamos a continuar con la compra') ;
	if(obtID("cajaFichaCompleta")){
		obtID("cajaFichaCompleta").style.display = 'none';
	}
	if(obtID("carrito")){
		obtID("carrito").style.display = 'none';
		// obtID("div_filtros").getElementsByTagName('span')[0].style.textContent = 'Continuar comprando';
	}
	if(obtID("contenedor_catalogo")){
		obtID('contenedor_catalogo').getElementsByTagName("ul")[0].style.display = 'none';
	//	obtID("div_filtros").getElementsByTagName('span')[0].style.textContent = 'Continuar comprando';
	} 
	if(!obtID('div_form')){
		var div_form = crear ('div');
			div_form.id = 'div_form';
		//alert();	
		obtID('cuerpo').appendChild(div_form);
		crear_formulario ();
		obtID("div_filtros").getElementsByTagName('h2')[0].style.display = "none";
		obtID("div_filtros").getElementsByTagName('p')[0].style.display = "none";
		obtID("div_filtros").getElementsByTagName('ul')[0].style.display = "none";
		var link_continuar_comprando = crear ('span');
			link_continuar_comprando.textContent = 'Continuar comprando';
			
			obtID("div_filtros").appendChild(link_continuar_comprando);
			addEvent(link_continuar_comprando, 'click' , function (){
				this.textContent = 'VER TODO'
				filtrar(this.textContent);
				removeEvent(this,'click',filtrar );
			});
		
	}else{
		obtID("div_form").style.display = 'block';
		obtID("div_filtros").getElementsByTagName('h2')[0].style.display = "none";
		obtID("div_filtros").getElementsByTagName('p')[0].style.display = "none";
		obtID("div_filtros").getElementsByTagName('ul')[0].style.display = "none";
		obtID("div_filtros").getElementsByTagName('span')[0].style.display = "block";
		obtID("div_filtros").getElementsByTagName('span')[0].textContent = 'Continuar comprando';
		addEvent(obtID("div_filtros").getElementsByTagName('span')[0], 'click' , function (){
				this.textContent = 'VER TODO'
				filtrar(this.textContent);
				removeEvent(filtrar,'click',this );
			});
	}
	
	
}
function crear_formulario(){
			//obtID('cuerpo'))
			//obtID('contenedorFichaProd'))
			if(obtID('contenedorFichaProd')){
				
				obtID('contenedorFichaProd').getElementsByTagName('h2')[0].textContent = 'Estas en la Caja!'
			obtID('contenedorFichaProd').getElementsByTagName('h3')[0].textContent = 'LLena los datos necesarios para asegurar el correcto envio de tu producto'
			}else{
				
					
				obtID('contenedor_catalogo').getElementsByTagName('h2')[0].textContent = 'Estas en la Caja!'
			obtID('contenedor_catalogo').getElementsByTagName('h3')[0].textContent = 'LLena los datos necesarios para asegurar el correcto envio de tu producto'
			}
			
			
			
			var subtitulo1 = crear ('h3');
				subtitulo1.textContent = 'Detalles de Facturacion, informacion personal y pago.'
			var div_datos_personales = crear ('div');
				div_datos_personales.id = 'div_datos_personales';
				div_datos_personales.className = 'gruposForm';
			
			var div_datos_envio = crear ('div');
				div_datos_envio.id = 'div_datos_envio';
				div_datos_envio.className = 'gruposForm';		
			
			var div_datos_pago = crear ('div');
				div_datos_pago.id = 'div_datos_pago';
				div_datos_pago.className = 'gruposForm';
			
			var div_btn_submit = crear ('div');
				div_btn_submit.id = 'div_btn_submit';
				div_btn_submit.className = 'gruposForm';
				
			var f = document.createElement("form");
				f.id = 'form'; 
				f.method = "post";
				f.action = "checkout.php";
				f.appendChild(subtitulo1);
				div_form.appendChild(f);
				crearControl(div_datos_personales,'nombre','nombre','','text','Nombre*');
				crearControl(div_datos_personales,'apellido','apellido','','text','Apellido*');
				crearControl(div_datos_personales,'edad','edad','','text','Edad*');
				crearSelect('Consumidor final?',div_datos_personales,'select-tipo-persona','Tipo consumidor','persona fisica','persona juridica' );
				crearSelect('Eres hombre o mujer?',div_datos_personales,'select-tipo-sexo','Sexo','Femenino','Masculino' );
			var subtitulo2 = crear ('h4');
				subtitulo2.textContent = 'Datos de envio en CABA'
				f.appendChild(subtitulo2);
				
				crearControl(div_datos_envio,'cp','cp','','text','Codigo Postal*');
				crearControl(div_datos_envio,'calle','calle','','text','Calle*');
				crearControl(div_datos_envio,'numero','numero','','text','Numero*');
				crearControl(div_datos_envio,'piso','piso','','texto','Departamento');
				crearControl(div_datos_envio,'telefono','telefono','','text','Telefono*');
				crearControl(div_datos_envio,'celular','celular','','text','Celular');
				crearControl(div_datos_envio,'email','email','','text','E-mail*');
			
			var subtitulo3 = crear ('h4');
				subtitulo3.textContent = 'Forma de pago';
				f.appendChild(subtitulo3);
				crearControl(div_datos_pago,'rapipago','pago','rapipago','radio','Rapipago',true);	
				crearControl(div_datos_pago,'tarjeta','pago','tarjeta','radio','Tarjeta de Credito',false);	
			
			//////////submit//////////////////////
				
			function crearControl(padre,id,name,valor,tipo,texto,marcado,disabled,readonly){
				
				var d = crear('div');
					d.className = 'form-group';
					d.textContent = texto;
				var i = crear('input');
					i.setAttribute('type',tipo);
					
					i.id = id;
					i.setAttribute('checked',marcado);
					i.setAttribute('name',name);
					i.setAttribute('value',valor);
				
					d.appendChild(i);
					padre.appendChild(d);
					f.appendChild(padre);
			
			}
			
			function crearSelect (texto,padre,identificador,va_op1,va_op2,va_op3,va_op4,va_op5,va_op6,va_op7,va_op8,va_op9,va_op10,va_op11,va_op12){
				
				var d = crear('div');
					d.className = 'form-group';
					d.textContent = texto;
				var s = crear('select');
					s.id = identificador;
				
			
				
				var o1 = crear('option');
				var o2 = crear('option');
				var o3 = crear('option');	
				var o4 = crear('option');
				var o5 = crear('option');
				var o6 = crear('option');
				var o7 = crear('option');
				var o8 = crear('option');
				var o9 = crear('option');
				var o10 = crear('option');	
				var o11 = crear('option');
				var o12 = crear('option');
				
				
					o1.setAttribute('value',va_op1);
					o1.id = va_op1;
					o1.innerHTML = va_op1;
				
					o2.setAttribute('value',va_op2);
					o2.id = va_op2;
					o2.innerHTML = va_op2;
				
					o3.setAttribute('value',va_op3);
					o3.id = va_op3;
					o3.innerHTML = va_op3;
			
					o4.setAttribute('value',va_op4);
					o4.id = va_op4;
					o4.innerHTML = va_op4;
				
					o5.setAttribute('value',va_op4);
					o5.id = va_op4;
					o5.innerHTML = va_op4;
				
					o6.setAttribute('value',va_op6);
					o6.id = va_op6;
					o6.innerHTML = va_op6;
				
					o7.setAttribute('value',va_op7);
					o7.id = va_op7;
					o7.innerHTML = va_op7;
				
					o8.setAttribute('value',va_op8);
					o8.id = va_op8;
					o8.innerHTML = va_op8;
				
					o9.setAttribute('value',va_op9);
					o9.id = va_op9;
					o9.innerHTML = va_op9;
				
					o10.setAttribute('value',va_op10);
					o10.id = va_op10;
					o10.innerHTML = va_op10;
			
					o11.setAttribute('value',va_op11);
					o11.id = va_op11;
					o11.innerHTML = va_op11;
				
					o12.setAttribute('value',va_op12);
					o12.id = va_op12;
					o12.innerHTML = va_op12;
					
					s.appendChild(o1);	
					s.appendChild(o2);	
					s.appendChild(o3);	
					s.appendChild(o4);	
					s.appendChild(o5);	
					s.appendChild(o6);	
					s.appendChild(o7);	
					s.appendChild(o8);	
					s.appendChild(o9);	
					s.appendChild(o10);	
					s.appendChild(o11);	
					s.appendChild(o12);	
					d.appendChild(s);
					padre.appendChild(d);
					f.appendChild(padre);
				
				
			}
				
			
			var inputs = document.getElementsByTagName('input');
			var cant_inputs = inputs.length;
			
			for( var i = 0; i < cant_inputs; i++ ){ 
			
				if( inputs[i].type == 'radio'  ){ 
					
					addEvent(inputs[i],'click',function(){
						if( this.type == 'radio' && this.checked == true ){ 
							
							//this);
							if(this.id != 'rapipago'){
								 if(!obtID('n_tarjeta')){
									crearControl(div_datos_pago,'n_tarjeta','n_tarjeta','','text','Numero de Tarjeta');
									crearControl(div_datos_pago,'nom_tarjeta','nom_tarjeta','','text','Nombre titular');
									
									crearSelect('Mes de vencimiento',div_datos_pago,'mes_ven_tarjeta','01','02','03','04','05','06','07','08','09','10','11','12' );
									
									crearSelect('A&ntilde;o de vencimiento',div_datos_pago,'anio_ven_tarjeta','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2026','2028' ); 
									
									
									crearControl(div_datos_pago,'codigo','codigo','','text','Codigo');
									
									crearSelect('Numero de cuotas',div_datos_pago,'cuotas','01','02','03','04','05','06','07','08','09','10','11','12' );
																
									
									insertAfter(obtID('div_btn_submit'),obtID('div_datos_pago'));
								}else{
									var divS = this.parentNode.parentNode.getElementsByTagName('div');
									for(var i = 0 ; i < divS.length; i++){
										if(i>1){
											divS[i].style.display = 'block';
										}
										
									}
									
								}
								
							}
							else {
								
								var divS = this.parentNode.parentNode.getElementsByTagName('div');
								for(var i = 0 ; i < divS.length; i++){
									if(i>1){
										divS[i].style.display = 'none';
									}
									
								}
							
							}
						}	
						
					});
					
				}
				
			}
			var options = document.getElementsByTagName('option');
			var cant_ops = options.length;
			for( var i = 0; i < cant_ops; i++ ){ 
				//options[i].value);
				if( options[i].value == 'undefined'  ){ 	
					options[i].style.display = 'none';
				}
			}
			crearControl(div_btn_submit,'pagar','pagar','Finalizar Compra','submit');	
			
		}

function BorrarProductoDeCarrito (){
	//obtengo fila y cuerpo de la tabla del carrito y borro fila
	var fila = this.parentNode.parentNode;
	var tbody =this.parentNode.parentNode.parentNode;
	
	
	
	//resto del carrito
	

	var nombreItemSeleccionado = this.parentNode.parentNode.getElementsByTagName('td')[1].textContent;
	
	var filaDeterminada = determinarFila(nombreItemSeleccionado);
	var subtotal = filaDeterminada.getElementsByTagName('td')[4].textContent;
	var cantItems = filaDeterminada.getElementsByTagName('td')[3].getElementsByTagName('span')[0].textContent;
		
		carritoVacio.subtotal = carritoVacio.subtotal - subtotal;
		carritoVacio.items = carritoVacio.items - cantItems;
		carritoVacio.total = carritoVacio.subtotal;
		carritoVacio.actualizarCarrito();
		////.log(carritoVacio.total);
		
		
		tbody.removeChild(fila);

		
		//me fijo cuantos productos o items tengo
		filasConProductos = obtID('tabla-carrito').getElementsByTagName('tr');
		//.log(filasConProductos);
		//carritoVacio.items);
		numeroDeItems = parseInt(filasConProductos.length)-1;
		
		//muestro mensaje de los items seleccionados
		
	
	//si no hay nada desaparezco la tabla 
	if(numeroDeItems==0){
		var tabla = obtID('tabla-carrito');
			obtID('carrito').getElementsByTagName('h2')[0].textContent = 'Carrito Vacio :(';
			tabla.removeChild(obtID('thead'));
			obtID('contenedorFichaProd').getElementsByTagName('h3')[0].textContent = 'Has borrado todos los productos anteriormente cargados'	;
			obtID('resumenCarrito').style.display = 'none';	
			obtID('carrito').appendChild(obtID('retroceso'));
			
	}else{
		obtID('contenedorFichaProd').getElementsByTagName('h3')[0].textContent = 'Has borrado uno de los productos cargados'	;
		obtID('resumenCarrito').style.display = 'block';
	}
	
}

for (var i = 0; i < categorias.length ; i++){
	addEvent(categorias[i],'click',filtrar);
}
var parrafoCantidad = crear('p');
var titulo = crear('h2');
	titulo.id = 'h-productos';
var subtitulo = crear('h3');
var slide = obtID('slide');
var menuMarcas = obtID('menuMarcas');

function filtrar(e){
	console.log(this);
	if(obtID('div_form')){
		obtID('div_form').style.display = 'none';
		
	}
	var carrito = obtID('carrito');
	var cuerpo = obtID('cuerpo');
		cuerpo.getElementsByTagName('div')[0].id = 'contenedor_catalogo';
	if(obtID('div_filtros')){
				
	obtID("div_filtros").getElementsByTagName('h2')[0].style.display = "block";
		obtID("div_filtros").getElementsByTagName('p')[0].style.display = "block";
		obtID("div_filtros").getElementsByTagName('ul')[0].style.display = "block";		
			if(obtID("div_filtros").getElementsByTagName('span')[0]){
		obtID("div_filtros").getElementsByTagName('span')[0].style.display = "none";
			}		
	}
	switch(this.innerHTML || e){
		
		case 'VER TODO': 
			/*cambiar_barra ();
			function cambiar_barra (){
				
				//obtID("header").getElementsByTagName('h1')[0])
				//obtID("menu_categorias"))
				//obtID("btn-catalogo"))
				//obtID("btn_esquema"))

				var m_h = obtID ("menu_horizontal");
					m_h.style.background = 'blue';
					m_h.style.position = 'fixed';
					m_h.style.height = '67px';
				

			}*/
			
			var cajaFichaCompleta = obtID('cajaFichaCompleta');
	
				contendorCatalogo.style.display = 'block';
				slide.style.display = 'none';
				menuMarcas.style.display = 'none';
				titulo.textContent = 'Stock completo';
				titulo.style.background = 'url(img/Lacor-Fotos-Almacén-3.png) 0% 0%';
				titulo.style.backgroundSize = 'cover';
				
			var ul = cajaCatalogo.getElementsByTagName('ul')[0]
			var cantidad_produ = ul.getElementsByTagName('li').length;
				
				subtitulo.textContent = 'Mostrando '+cantidad_produ+' productos en stock';
			
			cajaCatalogo.insertBefore(titulo,ul);
			cajaCatalogo.insertBefore(subtitulo,ul);
			
			if(cajaFichaCompleta){
				
				cajaCatalogo.removeChild(cajaFichaCompleta)
								
				if(carrito){
					carrito.style.display = 'none';
				}
				
				for ( var i = 0 ; i < ul.getElementsByTagName('li').length ; i ++ ){
					
					addEvent(ul.getElementsByTagName('li')[i],"click",crearFichaCompleta);
					addEvent(ul.getElementsByTagName('li')[i],"mouseenter",ampliarFicha);
					addEvent(ul.getElementsByTagName('li')[i],"mouseleave",reducirFicha);
					
				}
			}
						
			contenedor.style.display = 'block';
			if(obtID('imagenProdSeleccionado')){
				var img = obtID('imagenProdSeleccionado')
					img.style.display = 'block';
			}
			if(obtID('form1')){
				var form1 = obtID('form1')
					form1.parentNode.removeChild(form1)
			}
			var listaProductos = cajaCatalogo.getElementsByTagName('ul')[0].getElementsByTagName('li');
			
			for (var i = 0; i < listaProductos.length ; i++){
				var marcas = listaProductos[i].getElementsByTagName('p');
				for (var j = 0; j < marcas.length ; j++){
					if( marcas[j].innerHTML ){
						listaProductos[i].style.display = 'inline-block';
					
					}
				}
			}
		break;	
		case 'CHEVROLET':
		
			var cajaFichaCompleta = obtID('cajaFichaCompleta');
	
				contendorCatalogo.style.display = 'block';
				slide.style.display = 'none';
				menuMarcas.style.display = 'none';
				titulo.textContent = 'CHEVROLET';
				titulo.style.background = 'url(img/bg-chevrolet.png) 0% 0% ';
				titulo.style.backgroundSize = 'cover';
				 
  
			var ul = cajaCatalogo.getElementsByTagName('ul')[0];
			var cantidad_produ = ul.getElementsByTagName('li').length;
				
				
			mostrar_banner_publicitario(this.innerHTML);
			
			cajaCatalogo.insertBefore(titulo,ul);
			//('es chevrolet ')
			if(cajaFichaCompleta){
					//('existe caja ficha completa')
					//('se utilizo el filtro con la palabra: '+this.innerHTML)
				if(carrito){
					carrito.style.display = 'none';
				}
				cajaCatalogo.removeChild(cajaFichaCompleta)
				//.log(this)
				if (this.innerHTML == ('CHEVROLET')){
					//('entre al if ')
					for ( var i = 0 ; i < ul.getElementsByTagName('li').length ; i ++ ){
						//('entre al for ')
						addEvent(ul.getElementsByTagName('li')[i],"click",crearFichaCompleta);
						addEvent(ul.getElementsByTagName('li')[i],"mouseenter",ampliarFicha);
						addEvent(ul.getElementsByTagName('li')[i],"mouseleave",reducirFicha);
						
					}
				}
			}
			
			contenedor.style.display = 'block';
			if(obtID('form1')){
				var form1 = obtID('form1')
				form1.parentNode.removeChild(form1)
			}
			var listaProductos = cajaCatalogo.getElementsByTagName('ul')[0].getElementsByTagName('li');
			
			for (var i = 0; i < listaProductos.length ; i++){
				var marcas = listaProductos[i].getElementsByTagName('p');
					
				for (var j = 0; j < marcas.length ; j++){
					listaProductos[i].style.display = 'inline-block';
					if( marcas[j].innerHTML != 'Chevrolet'){
						listaProductos[i].style.display = 'none';
					}
					else if(marcas[j].innerHTML == 'Chevrolet'){
						listaProductos[i].style.display = 'inline-block';
						
						subtitulo.textContent = 'Mostrando '+(i+1)+' productos en stock';	
						cajaCatalogo.insertBefore(subtitulo,ul);
					}
				}
			}
		break;
		case 'FORD': 
			
				contendorCatalogo.style.display = 'block';
				slide.style.display = 'none';
				menuMarcas.style.display = 'none';
				titulo.textContent = 'FORD';
				titulo.style.background = 'url(img/bg-ford.png) 0% 0% ';
				titulo.style.backgroundSize = 'cover';
			var ul = cajaCatalogo.getElementsByTagName('ul')[0];
			
			mostrar_banner_publicitario(this.innerHTML);
			
			cajaCatalogo.insertBefore(titulo,ul);
			
			var cajaFichaCompleta = obtID('cajaFichaCompleta');
			if(cajaFichaCompleta){
				if(carrito){
					carrito.style.display = 'none';
				}
			
				cajaCatalogo.removeChild(cajaFichaCompleta)
								
				if (this.innerHTML == 'FORD'){
				
					for ( var i = 0 ; i < ul.getElementsByTagName('li').length ; i ++ ){
						
						addEvent(ul.getElementsByTagName('li')[i],"click",crearFichaCompleta);
						addEvent(ul.getElementsByTagName('li')[i],"mouseenter",ampliarFicha);
						addEvent(ul.getElementsByTagName('li')[i],"mouseleave",reducirFicha);
						
					}
				}
			}
			
			contenedor.style.display = 'block';
			if(obtID('form1')){
				var form1 = obtID('form1')
				form1.parentNode.removeChild(form1)
			}
			var listaProductos = cajaCatalogo.getElementsByTagName('ul')[0].getElementsByTagName('li');
			for (var i = 0; i < listaProductos.length ; i++){
				var marcas = listaProductos[i].getElementsByTagName('p');
				for (var j = 0; j < marcas.length ; j++){
				listaProductos[i].style.display = 'inline-block';
					g = 1
					if( marcas[j].innerHTML != 'Ford'){
						listaProductos[i].style.display = 'none';
						
					}
					else if(marcas[j].innerHTML == 'Ford'){
						listaProductos[i].style.display = 'inline-block';
						
						g++;
						
						subtitulo.textContent = 'Mostrando '+(g+2)+' productos en stock';	
						cajaCatalogo.insertBefore(subtitulo,ul);
					}
				}
			}
		break;
		case 'VOLSKWAGEN': 
				contendorCatalogo.style.display = 'block';
				slide.style.display = 'none';
				menuMarcas.style.display = 'none';
				titulo.textContent = 'VOLSKWAGEN';
				titulo.style.background = 'url(img/bg-volskwagen.png) 0% 32% ';
				titulo.style.backgroundSize = 'cover';
			var ul = cajaCatalogo.getElementsByTagName('ul')[0];
				
				mostrar_banner_publicitario(this.innerHTML);
				cajaCatalogo.insertBefore(titulo,ul);
			
				var cajaFichaCompleta = obtID('cajaFichaCompleta');
			if(cajaFichaCompleta){
				if(carrito){
					carrito.style.display = 'none';
				}
			
				cajaCatalogo.removeChild(cajaFichaCompleta)
								
				if (this.innerHTML == 'VOLSKWAGEN'){
				
					for ( var i = 0 ; i < ul.getElementsByTagName('li').length ; i ++ ){
						
						addEvent(ul.getElementsByTagName('li')[i],"click",crearFichaCompleta);
						addEvent(ul.getElementsByTagName('li')[i],"mouseenter",ampliarFicha);
						addEvent(ul.getElementsByTagName('li')[i],"mouseleave",reducirFicha);
						
					}
				}
			}
			
			contenedor.style.display = 'block';
			if(obtID('form1')){
				var form1 = obtID('form1')
				form1.parentNode.removeChild(form1)
			}
			var listaProductos = cajaCatalogo.getElementsByTagName('ul')[0].getElementsByTagName('li');
			for (var i = 0; i < listaProductos.length ; i++){
				var marcas = listaProductos[i].getElementsByTagName('p');
				for (var j = 0; j < marcas.length ; j++){
				listaProductos[i].style.display = 'inline-block';
					g = 1
					if( marcas[j].innerHTML != 'Volskwagen'){
						listaProductos[i].style.display = 'none';
						
					}
					else if(marcas[j].innerHTML == 'Volskwagen'){
						listaProductos[i].style.display = 'inline-block';
						g++;
						subtitulo.textContent = 'Mostrando '+(g+3)+' productos en stock';	
						cajaCatalogo.insertBefore(subtitulo,ul);
					}
				}
			}
		break;
		case 'RENAULT':
				contendorCatalogo.style.display = 'block';
				slide.style.display = 'none';
				menuMarcas.style.display = 'none';
				titulo.textContent = 'RENAULT';
				titulo.style.background = 'url(img/bg-renault.png) 0% 44% ';
				titulo.style.backgroundSize = 'cover';
			var ul = cajaCatalogo.getElementsByTagName('ul')[0];
			
				mostrar_banner_publicitario(this.innerHTML);
				cajaCatalogo.insertBefore(titulo,ul);
			
				var cajaFichaCompleta = obtID('cajaFichaCompleta');
			if(cajaFichaCompleta){
				if(carrito){
					carrito.style.display = 'none';
				}
			
				cajaCatalogo.removeChild(cajaFichaCompleta)
								
				if (this.innerHTML == 'RENAULT'){
				
					for ( var i = 0 ; i < ul.getElementsByTagName('li').length ; i ++ ){
						
						addEvent(ul.getElementsByTagName('li')[i],"click",crearFichaCompleta);
						addEvent(ul.getElementsByTagName('li')[i],"mouseenter",ampliarFicha);
						addEvent(ul.getElementsByTagName('li')[i],"mouseleave",reducirFicha);
						
					}
				}
			}
			
			contenedor.style.display = 'block';
			if(obtID('form1')){
				var form1 = obtID('form1')
				form1.parentNode.removeChild(form1)
			}
			var listaProductos = cajaCatalogo.getElementsByTagName('ul')[0].getElementsByTagName('li');
			for (var i = 0; i < listaProductos.length ; i++){
				var marcas = listaProductos[i].getElementsByTagName('p');
				for (var j = 0; j < marcas.length ; j++){
				listaProductos[i].style.display = 'inline-block';
					g = 1
					if( marcas[j].innerHTML != 'Renault'){
						listaProductos[i].style.display = 'none';
						
					}
					else if(marcas[j].innerHTML == 'Renault'){
						listaProductos[i].style.display = 'inline-block';
						g++;
						subtitulo.textContent = 'Mostrando '+(g+2)+' productos en stock';	
						cajaCatalogo.insertBefore(subtitulo,ul);
					}
				}
			}
		break;
	}
}

function mostrar_banner_publicitario(marca){
	
		if(!obtID('caja_publicidad_chev')){
	
				var caja_publicidad = crear('div');
				var caja_publicidad_chev = crear('div');
				var header_publicidad = crear('div');
				var content_publicidad = crear('div');
				var content_porcentaje_publicidad = crear('div');
				var content_producto_publicidad = crear('div');
				var footer_publicidad = crear('div');
				
					caja_publicidad.id = 'caja_publicidad';
					caja_publicidad_chev.id = 'caja_publicidad_chev';
					header_publicidad.id = 'header_publicidad';
					content_publicidad.id = 'content_publicidad';
					content_porcentaje_publicidad.id = 'content_porcentaje_publicidad';
					content_producto_publicidad.id = 'content_producto_publicidad';
					footer_publicidad.id = 'footer_publicidad';
					
				var	h_header = crear('h3');
				var	p_header = crear('p');
				var	porcentajeDescuento = crear('p');
				var	parrafoNotificacion = crear('p');
				var strong = crear('strong')
					p_header.textContent = 'Esta publicidad desaparecera en 10 segundos';
					h_header.textContent = 'Promocion con chevrolet';
					h_header.id = 'h_header';
					var res = marca.toLowerCase();
					h_header.style.background = 'url(img/bg-'+res+'.png) 0% / cover ';
					p_header.id = 'temporizador';
					strong.textContent = 'en todos los radiadores de '+marca;
					porcentajeDescuento.textContent = '-20%  ';
					parrafoNotificacion.appendChild(strong);
					
					header_publicidad.appendChild(h_header);
					header_publicidad.appendChild(p_header);
					caja_publicidad_chev.appendChild(header_publicidad);
					caja_publicidad_chev.appendChild(content_publicidad);
					content_publicidad.appendChild(content_porcentaje_publicidad);
					content_publicidad.appendChild(content_producto_publicidad);
					content_producto_publicidad.appendChild(parrafoNotificacion);
					content_porcentaje_publicidad.appendChild(porcentajeDescuento);
					
					caja_publicidad.appendChild(caja_publicidad_chev);
					//obtID("tablaEspe"))
					insertAfter(caja_publicidad,contendorCatalogo);
					//obtID("contenedorFichaProd").style.margin = '0 auto';
					
					
				var linkCarrito = crear('a');
				
					linkCarrito.innerHTML = "ver m&aacute;s";
					linkCarrito.id = "btn_ver_carrito"
				
					linkCarrito.setAttribute("href", "#"); 
					linkCarrito.setAttribute("alt", "carrito");
					
					caja_publicidad_chev.appendChild(footer_publicidad);
					footer_publicidad.appendChild(linkCarrito);
				
				addEvent(linkCarrito,'click',function (){
					if(obtID("caja_publicidad")){
						obtID("caja_publicidad").className = "begin";
						obtID('caja_publicidad').parentNode.removeChild(obtID("caja_publicidad"));
					
					}
					
				});
				//('aqui empieza');
				tiempos();
				
					 
			}
		
}
animar_hover(obtID("btn_ver_todo"),'vacio');
animar_hover(obtID("header"),'vacio');

animar_hover(obtID("btn-catalogo"),'vacio');
animar_hover(obtID("btn_esquema"),'vacio');
animar_hover(obtID("btn-actualizar"),'Actulizar Carrito');
animar_hover(obtID("iconoCarrito"),'vacio');
animar_hover(obtID("menu_marcas_sprite"),'vacio');
animar_hover(obtID("btn_ver_carrito"),'');

function animar_hover (objeto,text_modal){

	//objeto)
	if(objeto){
		var t_o = String(objeto);// String :crea una Cadena primitiva - htmlDivElement 
		//.info(t_o);
	    var n = t_o.search(/input/i);// buscar si algun elemento html es input
	    if( n != -1 ){
			//.info(objeto)
			addEvent(objeto,'mouseenter',ver_modal_inputs);	
		}
		else{
			//.log(objeto)
			var x = objeto;
			
			//var img = btn_animate;
			
				x.className = 'begin';
				
			addEvent(x,'mouseenter',transformar);
		}
	}

	// /inputs////////
	function ver_modal_inputs(){
		if(text_modal != 'vacio'){
		
				var modal = crear('span');
				var modal_hija = crear('div');
					modal_hija.id = "ventana_modal_indicador"
					modal_hija.textContent = "prueba"
					modal.appendChild(modal_hija);
					
					modal.id = 'ventana_modal';
					modal.textContent = text_modal 
					modal.style.position = 'absolute'
					
					var nodo = objeto.id
					
					obtID(nodo).parentNode.insertBefore(modal,obtID(nodo).nextSibling);
					
			}
		
			removeEvent(objeto,'mouseenter',this);
			addEvent(objeto,'mouseleave',ocultar_modal_inputs);
			removeEvent(objeto,'mouseleave',ver_modal_inputs);

	}
	function ocultar_modal_inputs(){
		if(obtID('ventana_modal')){
			var nodo = objeto.id
			//.error(obtID(nodo).parentNode);
			obtID(nodo).parentNode.removeChild(obtID('ventana_modal'));
		}
		removeEvent(objeto,'mouseleave',this);
		addEvent(objeto,'mouseenter',ver_modal_inputs);
	//	removeEvent(x,'click',transformar);
	}
	// /fin---inputs///////

	function transformar(){
		
		

		if(text_modal != 'vacio'){
			
			var modal = crear('div');
				modal.id = 'ventana_modal';
				modal.textContent = text_modal 
				modal.style.position = 'absolute'
				x.appendChild(modal);

			var modal_hija = crear('div');
				modal_hija.id = "ventana_modal_indicador"
				//modal_hija.textContent = "prueba sdkfnsldkfmlksdmflksdmflkmdfskdmflskdmflksdmflksmdflkmsdlkfmlk"
				modal.appendChild(modal_hija);		
		}
			x.className = 'end';
			removeEvent(x,'mouseenter',this);
			addEvent(x,'mouseleave',transformar2);
			removeEvent(x,'mouseleave',transformar);
	}
	function transformar2(){
		if(obtID('ventana_modal')){
			x.removeChild(obtID('ventana_modal'))
		}
		x.className = 'begin';
		removeEvent(x,'mouseleave',this);
		addEvent(x,'mouseenter',transformar);
	//	removeEvent(x,'click',transformar);
	}

}

function ampliarFicha(){
	
	this.className = 'ficha fichaGrande';
}

function reducirFicha(){
	
	this.className = 'ficha'

}
function onload_header(){
	
	var fx=setInterval( function(){
		if ((GetIEVersion() > 0) || (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)){
			var opacity = 0;
			do{
			
				opacity += 0.01;
				obtID('slide').style.opacity = opacity;
				
			}while(opacity <= 1);
			var opacity = 0;
			do{
				var menu_horizontal = obtID('menu_horizontal');
			
					opacity += 0.1;
					menu_horizontal.style.opacity = opacity;
					
				
			}while(opacity <= 1);
			clearInterval(fx);
							
			
			
		}else {
			var opacity = 0;
			do{
			
				opacity += 0.05;
				obtID('slide').style.opacity = opacity;
				
			}while(opacity <= 1);
			var opacity = 0;
			do{
				var menu_horizontal = obtID('menu_horizontal');
			
					opacity += 0.001;
					menu_horizontal.style.opacity = opacity;
			}while(opacity <= 1);
			var opacity = 0;
			do{
				var barraInferior = obtID('barraInferior')
				
				opacity += 0.01;
				barraInferior.style.opacity = opacity;
				
				
			}while(opacity <= 1);
			var opacity = 0;
			do{
				var menuMarcas = obtID('menuMarcas')
				
				opacity += 0.01;
				menuMarcas.style.opacity = opacity;
				
				
			}while(opacity <= 1);
			/* var opacity = 0;
			do{
			//	var section_bio = obtID('biography')
				var section_inicio = obtID('inicio')
				
				opacity += 0.01;
			//	section_bio.style.opacity = opacity;
				section_inicio.style.opacity = opacity;
				
				
			}while(opacity <= 1);
			 */
			
			clearInterval(fx);
							
		}		
	}, 1000 );
	
}

//Chevrolet
var radiadorCorsa = new Producto ('Corsa','Chevrolet','chevrolet-corsa-classic-sedan-4p-ls-pack-1-4n-gama-2016.jpg',1500,'2011-2012-2013-2014','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Chevrolet Corsa');
var radiadorAveo = new Producto ('Aveo','Chevrolet','image.png',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Chevrolet Aveo ');
var radiadorDmax = new Producto ('D-max','Chevrolet','dmax-3-4-front.jpg',500,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Chevrolet D-max');
//____
radiadorCorsa.mostrarMinificha();
radiadorAveo.mostrarMinificha();
radiadorDmax.mostrarMinificha();
//Ford
var radiadorEcosport = new Producto ('Eco-Sport','Ford','ford-ecosport.jpg',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Ford Eco-Sport');
var radiadorFiesta = new Producto ('Fiesta','Ford','2013-ford-fiesta-5dr-hb-se-angular-front-exterior-view_100401830_h.jpg',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Ford Fiesta');
var radiadorFocus = new Producto ('Focus','Ford','VA_e175f4e15cc441fab744f8c5817effb7.jpg',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Ford Focus');
var radiadorKa = new Producto ('Ka','Ford','ford_ka_1.gif',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Ford Ka');
//_____
radiadorEcosport.mostrarMinificha();
radiadorFiesta.mostrarMinificha();
radiadorFocus.mostrarMinificha();
radiadorKa.mostrarMinificha();
//Peugeot
//Renault
var radiadorClio = new Producto ('Clio','Renault','renault-clio-bsp5-01.JPG',1100,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Renault Clio');
var radiadorDuster = new Producto ('Duster','Renault','2015-renault-duster-update-1.jpg',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Renault Duster');
var radiadorKangoo = new Producto ('Kangoo','Renault','P_fa375bdacd6a4b9bbd4cfe2c490afe2c.jpg',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Renault Kangoo');
var radiadorMegane = new Producto ('Megane','Renault','megane_berlina_limited.JPG',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Renault Megane');
//___
radiadorClio.mostrarMinificha();
radiadorDuster.mostrarMinificha();
radiadorKangoo.mostrarMinificha();
radiadorMegane.mostrarMinificha();
//VW
var radiadorGol = new Producto ('Gol','Volskwagen','vwgol.jpg',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Volskwagen Gol');
var radiadorGolf = new Producto ('Golf','Volskwagen','546b6f4d0f930_-_2012-volkswagen-golf-r-lg.jpg',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Volskwagen Golf');
var radiadorSuran = new Producto ('Suran','Volskwagen','VA_9940a8b372ac4b098986f7cd9d2b0979.jpg',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Volskwagen Suran');
var radiadorBora = new Producto ('Bora','Volskwagen','20.jpg',600,'2000-2010','3546d4f68dg486','facorsa','Aluminio','Nafta',1.6,'Radiador Volskwagen Bora');
//____
radiadorGol.mostrarMinificha();
radiadorGolf.mostrarMinificha();
radiadorSuran.mostrarMinificha();
radiadorBora.mostrarMinificha();
