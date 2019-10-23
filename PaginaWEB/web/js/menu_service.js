// The root URL for the RESTful services
var rootURL = "http://localhost:3000/bebidas";

var currentWine;

// Retrieve wine list when application starts 
findAll();

// Nothing to delete in initial application state
$('#btnDelete').hide();

// Register listeners
$('#btnSearch').click(function() {
	search($('#searchKey').val());
	return false;
});

// Trigger search when pressing 'Return' on search key input field
$('#searchKey').keypress(function(e){
	if(e.which == 13) {
		search($('#searchKey').val());
		e.preventDefault();
		return false;
    }
});

$('#btnAdd').click(function() {
	newWine();
	return false;
});

$('#btnSave').click(function() {
	if ($('#wineId').val() == '')
		addWine();
	else
		updateWine();
	return false;
});

$('#btnDelete').click(function() {
	deleteWine();
	return false;
});

$('#wineList a').live('click', function() {
	findById($(this).data('identity'));
});

// Replace broken images with generic wine bottle
$("img").error(function(){
  $(this).attr("src", "pics/generic.jpg");

});

function search(searchKey) {
	if (searchKey == '') 
		findAll();
	else
		findByName(searchKey);
}

function newWine() {
	$('#btnDelete').hide();
	currentWine = {};
	renderDetails(currentWine); // Display empty form
}

function findAll() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
		success: renderList
	});
}

function findByName(searchKey) {
	console.log('findByName: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: rootURL + '/search/' + searchKey,
		dataType: "json",
		success: renderList 
	});
}

function findById(id) {
	console.log('findById: ' + id);
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + id,
		dataType: "json",
		success: function(data){
			$('#btnDelete').show();
			console.log('findById success: ' + data.catalogo);
			currentWine = data;
			renderDetails(currentWine);
		}
	});
}

function addWine() {
	console.log('addWine');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Wine created successfully');
			$('#btnDelete').show();
			$('#wineId').val(data.id);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addWine error: ' + textStatus);
		}
	});
}

function updateWine() {
	console.log('updateWine');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/' + $('#wineId').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Wine updated successfully');
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateWine error: ' + textStatus);
		}
	});
}

function deleteWine() {
	console.log('deleteWine');
	$.ajax({
		type: 'DELETE',
		url: rootURL + '/' + $('#wineId').val(),
		success: function(data, textStatus, jqXHR){
			alert('Wine deleted successfully');
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('deleteWine error');
		}
	});
}






function renderList(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
        
        
        


	$('#wineList li').remove();
	$.each(list, function(index, wine) {
		$('#wineList').append('<li><a href="#" data-identity="' + wine.id + '">'+wine.catalogo+'</a></li>');
                
                  // creo la tabla y muestro los datos
      $tabla = $('<table></table>');
      
      
var divOut = document.getElementById('txtOut');
    var txtOut = "";
    for (var k in list) {
  
   txtOut += '<div class="p_recype_item_main" >';
   txtOut += '<div class="row p_recype_item_active" >';
   
   txtOut += '<div class="media" >';
   txtOut +=  '<div class="media-left" >';
   txtOut +=  '<img src="img/menu-grid/bebidas.jpg" alt="" width="200">';
   txtOut +=  '</div>';
   txtOut +=  '<div class="media-body" >';
   txtOut += ('<h3> '+ list[k].catalogo +'</h3>');
   txtOut += '<br>';
   txtOut +=('<h3>' + list[k].nombre + '</h3>');
   txtOut += ('<h4>' + ('$') + list[k].valor + '</h4>');
   txtOut += ('<p>' + list[k].descripcion + '</p>');
   txtOut +=  '<a class="read_mor_btn" href="#">Agregar</a>';
   txtOut +=  '</div>';
   txtOut += '</div>';
   txtOut += '</div>';
   txtOut += '</div>';
   txtOut += '</div>';
   
    }
    divOut.innerHTML = txtOut;
	});               
        
        
        
        
        function filtradoBebidas (list){
            return list.catalogo ="Bebidas";
        }
        
        function despliegueBebidas(){
            
                 
    var divOut = document.getElementById('txtOutBebidas');
    var txtOutBebidas = "";
    for (var k in filtradoBebidas) {
  
   txtOutBebidas += '<div class="p_recype_item_main" >';
   txtOutBebidas += '<div class="row p_recype_item_active" >';
   
   txtOutBebidas += '<div class="media" >';
   txtOutBebidas +=  '<div class="media-left" >';
   txtOutBebidas +=  '<img src="img/menu-grid/bebidas.jpg" alt="" width="200">';
   txtOutBebidas +=  '</div>';
   txtOutBebidas +=  '<div class="media-body" >';
  txtOutBebidas += ('<h3> '+ filtradoBebidas[k].catalogo +'</h3>');
  txtOutBebidas += '<br>';
   txtOutBebidas +=('<h3>' + filtradoBebidas[k].nombre + '</h3>');
   txtOutBebidas += ('<h4>' + ('$') + filtradoBebidas[k].valor + '</h4>');
   txtOutBebidas += ('<p>' + filtradoBebidas[k].descripcion + '</p>');
   txtOutBebidas +=  '<a class="read_mor_btn" href="#">Agregar</a>';
   txtOutBebidas+=  '</div>';
   txtOutBebidas += '</div>';
   txtOutBebidas += '</div>';
   txtOutBebidas+= '</div>';
   txtOutBebidas += '</div>';
   
    }
    divOut.innerHTML = txtOutBebidas;
            
            
        }
        
        
}





  
    

function renderDetails(wine) {
	$('#wineId').val(wine.id);
	$('#catalogo').val(wine.catalogo);
	$('#nombre').val(wine.nombre);
	$('#descripcion').val(wine.descripcion);
	$('#region').val(wine.region);
	$('#valor').val(wine.valor);
	$('#pic').attr('src', 'pics/' + wine.picture);
	$('#description').val(wine.description);
}

// Helper function to serialize all the form fields into a JSON string
function formToJSON() {
	var wineId = $('#wineId').val();
	return JSON.stringify({
		"id": wineId == "" ? null : wineId, 
		"catalogo": $('#catalogo').val(), 
		"nombre": $('#nombre').val(),
		"descripcion": $('#descripcion').val(),
		"region": $('#region').val(),
		"valor": $('#valor').val(),
		"picture": currentWine.picture,
		"description": $('#description').val()
		});
}
