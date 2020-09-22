


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
console.log(current_base_layer);
base_select_tag.selectedIndex = Object.keys(base_layers).indexOf(default_base_layer_name);
current_base_layer.addTo(map);

/////////////////////////////////////////////////////////////////



//////// poppulating overlay layer set selector with options /////////
// var overlay_select_tag = document.getElementById("select_overlay_layer_set");
// for(i in Object.keys(overlay_layer_sets))
// {
//    var opt = document.createElement("option");
//    opt.value= Object.keys(overlay_layer_sets)[i];
//    opt.innerHTML = Object.keys(overlay_layer_sets)[i]; 
//    overlay_select_tag.appendChild(opt);
// }

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


///// managing control for overlay layers ////
// function manage_selected_layers(selectedObject)
// {
//   // this functions gets called when new overlay layer is selected from UI
//   layer_control = L.control.layers(null,overlay_layer_sets);
  
// }
layer_control = L.control.layers(null,overlay_layer_sets);
layer_control.addTo(map);

///////////////////////////////////////////////

///// managing control for overlay layer sets ////
// current_layer_control = L.control.layers();
// function manage_selected_layer_set_controller(selectObject) 
// {
//   // this function gets called when new layer set is selected from UI
//    map.eachLayer(function (layer) 
//    {
//      if(layer.options.pane=="overlay_pane" || layer.options.pane=="overlay_marker_pane")
//        map.removeLayer(layer);
//    });
//    current_layer_control.remove();

//    var val = selectObject.value;
   
//    if(val == "None")
//     return;
//    else 
//      current_layer_control = L.control.layers(null, overlay_layer_sets[val],overlay_layer_sets[val]);

//    // adding selected layer set's controller to map
//    current_layer_control.addTo(map);
//    // applying selected layer set's first layer to map
//    overlay_layer_sets[val][Object.keys(overlay_layer_sets[val])[0]].addTo(map);
// }
//////////////////////////////////////////////////

//////// managing buffer radius input for point layers /////
current_point_buffer_layer = L.geoJSON();
function manage_buffer_radius_input(input)
{ 

  //current_point_buffer_layer.remove();
  map.eachLayer(function(layer)
  {
    if(layer.options.pane=="overlay_buffer_pane")
    {
      layer.remove();
    }
  });

  if(input == 0 || input.value == 0)
    return;
  
  radius_km = input.value;
   map.eachLayer(function (layer) 
   {
     if(layer.options.pane=="overlay_marker_pane")
      { 
         pointbufferJSON = turf.buffer(layer.toGeoJSON(),radius_km, {units : 'kilometers'});
         
         current_point_buffer_layer = L.geoJSON(pointbufferJSON,
            {  
              style : {color:'yellow',dashArray:'5.5',fillOpacity:0.2},
              pane:'overlay_buffer_pane',
            },
         );
         current_point_buffer_layer.addTo(map);
         current_point_buffer_layer.bringToFront();
        
      }
   });

}

//////////////////////////////////////////////////////


// UI interaction changes 
map.on('mousemove', function(e) 
{
  document.getElementById("latlon").innerHTML = "Lat: "+e.latlng.lat.toFixed(6)+" Lon: "+e.latlng.lng.toFixed(6);
});
map.on('mouseout', function(e) 
{
  document.getElementById("latlon").innerHTML = "______";    
});



// HANDLING THE CHART UI
function draw_chart(chart_title, list_x_y)
{
    

     var chart =  new CanvasJS.Chart("chartContainer", 
        {
          title:{
            text: chart_title,              
          },
          data: [              
          {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "doughnut",
            dataPoints: list_x_y,
          }
          ]
        });
     chart.render();

};