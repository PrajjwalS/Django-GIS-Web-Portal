
// DESCRIPTION:


// creating map object for the html having a map with id='map'
// change the center and zoom as per your use, we used [28,80] at 4.5x
// for centering india
var map = L.map('map',{center: [20,80],zoom:4.5});

      
// define to geoserver workspace (our workspace name was 'rsac_test')
var wms_workspace_url = 'http://localhost:8080/geoserver/rsac_test/wms';
      


// Now to create layers or set of layers (like it is usually done in leaflet)
// do not call L.tileLayer.WMS() or L.tileLayer.Wms()

// call our custom function L.tileLayer.WMS_with_popup_attributes()
// which extends the leaflet function to server getFeatureInfo requests from
// geoserver using AJAX query, also the programmer can add the shapefile
// attribute table column heads value that he/she wants to show on map click 
// popup with the desired coulmn head text that he/she desire to show on front 
// end pop ups, by mentioning popup_attributes : ['':'','':'',...]
// while creating layer ... example can be seen in below code
// NOTE: when no popup_attributes are mentioned, then all the default 
// attribute table features of the shapefile appear in the popup, as
// they were stored in the shapefile.

// here we create a basemap, to have a select window of multiple layers
// each layer will be applied on when the user selects its name

var set_of_layers = 
{
        // first layer we want as option is India_Boundary
        // so for each Layer we pass the workspace url along with it as options
        // the name of the layer, and along with it the value of the 
        // attributes that we want to show in the popup, with their
        // appearing names

        //Layer 1:
        India_Boundary: L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
          //options:
          {
           layers: 'India_Boundary',
          }
        ),

        //Layer 2:
        Indian_States: L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
        //options:
        {
        layers: 'Indian_States'
        }
        ),

        //Layer 3:
        India_Assembly: L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
        // option:
        {
        layers: 'India_Assembly',
        popup_attributes : {'objectid':'OBJ ID','st_code':'STATE CODE','st_name':'STATE NAME'}
        })

        // ADD MORE COMMA SEPEARATED CODE FOR ADDING MORE LAYERS

};// end of definition of set_of_layers


// now simply call the addTo(< var map>) for the set of layers we created above
L.control.layers(set_of_layers).addTo(map);

// to select the default layer when page reloads
// set that layer by default by passing layer name below
// like we want the default layer as India_Boundary so:
set_of_layers.India_Boundary.addTo(map);

