
////////// poppulating base layer selector with options /////////
////////// and selecting and applying default base layer/////////

var base_select_tag = document.getElementById("select_base_layer");
for(i in Object.keys(base_layers))
{
   var opt = document.createElement("option");
   opt.value= Object.keys(base_layers)[i];
   opt.innerHTML = Object.keys(base_layers)[i]; 
   base_select_tag.appendChild(opt);
}
var default_base_layer_name = "Google Street Map";
var current_base_layer = base_layers[default_base_layer_name];
base_select_tag.selectedIndex = Object.keys(base_layers).indexOf(default_base_layer_name);
current_base_layer.addTo(map);

/////////////////////////////////////////////////////////////////



////////// poppulating overlay layer set selector with options /////////
var overlay_select_tag = document.getElementById("select_overlay_layer_set");
for(i in Object.keys(overlay_layer_sets))
{
   var opt = document.createElement("option");
   opt.value= Object.keys(overlay_layer_sets)[i];
   opt.innerHTML = Object.keys(overlay_layer_sets)[i]; 
   overlay_select_tag.appendChild(opt);
}
// by default selecting none (which is by default at index 0)
 overlay_select_tag.selectedIndex = 0;

///////////////////////////////////////////////////////////////////////


///// managing control for base layers ////
function manage_selected_base_layer(selectedObject)
{
  // this functions gets called when new base layer is selected from UI
   var val = selectedObject.value;
   current_base_layer.remove();
   current_base_layer = base_layers[val];
   current_base_layer.addTo(map); 
}
///////////////////////////////////////////////

///// managing control for overlay layer sets ////
current_layer_control = L.control.layers();
function manage_selected_layer_set_controller(selectObject) 
{
  // this function gets called when new layer set is selected from UI
   map.eachLayer(function (layer) 
   {
     if(layer.options.pane=="overlay_pane")
       map.removeLayer(layer);
   });
   current_layer_control.remove();

   var val = selectObject.value;
   
   if(val == "None")
    return;
   else 
     current_layer_control = L.control.layers(overlay_layer_sets[val]);

   // adding selected layer set's controller to map
   current_layer_control.addTo(map);
   // applying selected layer set's first layer to map
   overlay_layer_sets[val][Object.keys(overlay_layer_sets[val])[0]].addTo(map);
}
//////////////////////////////////////////////////


// UI interaction changes 
map.on('mousemove', function(e) 
{
   
     // document.getElementById("latitude").innerHTML = "" + e.latlng.lat;    
     // document.getElementById("longitude").innerHTML = "" + e.latlng.lng;
       document.getElementById("latlon").innerHTML = "Lat: "+e.latlng.lat.toFixed(6)+" Lon: "+e.latlng.lng.toFixed(6);    
  
      $('#sidebar').addClass('active');


});
map.on('mouseout', function(e) 
{
    
     // document.getElementById("latitude").innerHTML = "" ;    
     // document.getElementById("longitude").innerHTML = "";   
            document.getElementById("latlon").innerHTML = "";    

      $('#sidebar').removeClass('active');

});
map.on('mouseover', function(e) 
{ 
      $('#sidebar').addClass('active');

});

