// this java script needs to be called before handle_map js
// it defines the map variable linked to id=map div and 2 lists of layers
//	1st : base_layers 
//  2nd : over_layers



// //defining the map
var map = L.map('map', 
{
        zoom: 2,
        center:[0,0],
});

//defining panes for base and overlay layers
map.createPane('base_pane');
map.createPane('overlay_pane');
map.getPane('base_pane').style.zIndex = 1;
map.getPane('overlay_pane').style.zIndex = 200;




// defining base layers list object
var base_layers = 
{
	// order them as you want to show them in selector

    "Open Street Map" : new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            pane: 'base_pane'
        }),
    "Open Street Map Black n' White" : new L.TileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
        {
            pane: 'base_pane'
        }),
    "Google Street Map" : new L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
            //maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3'],
            pane: 'base_pane'
        }),
    "Google Hybrid Map" : new L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        {
            //maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3'],
            pane: 'base_pane'
        }),
    "Google Satellite Map" : new L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        {
            //maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3'],
            pane: 'base_pane'
        }),
    "Google Terrain Map" : new L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
        {
            //maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3'],
            pane: 'base_pane'
        }),

    // add more base maps
};

// defining overlay layer groups list object
// i.e. each key has value of a set of layers

// define to geoserver workspace (our workspace name was 'rsac_test')
var wms_workspace_url = 'http://localhost:8080/geoserver/rsac_test/wms';

var overlay_layer_sets =
{

	"India" : 
	{
			 // Layer 1:
        'India Boundary': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
          //options:
          {
           layers: 'India_Boundary',
           transparent: true,
           format: 'image/png',
           pane: 'overlay_pane' ,
           popup_attributes : {'source':"SOURCE"},
           bounding_extents : [ [8.076644669515929,68.09347709739018], [37.07719207475452,97.41149826013668] ]
          }
        ),

        //Layer 2:
        'India States': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
        //options:
        {
          layers: 'Indian_States',
          transparent: true,
          format: 'image/png',
          pane: 'overlay_pane' ,
          popup_attributes : {'st_nm':"STATE NAME"},
          bounding_extents : [ [8.076644669515929,68.09347709739018], [37.07719207475452,97.41149826013668] ]
        }
        ),

        //Layer 3:
        'India Assembly': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
        // option:
        {
            layers: 'India_Assembly',
            transparent: true,
            format: 'image/png',
            pane: 'overlay_pane' ,
            popup_attributes : {'dt_code':'DISTRICT CODE','dist_name':'DISTRICT NAME','st_code':'STATE CODE','st_name':'STATE NAME'},
            bounding_extents : [ [8.076644669515929,68.09347709739018], [37.07719207475452,97.41149826013668] ]
        }),
        'Point Layer' : L.geoJSON_with_popup_attributes("http://localhost:8080/geoserver/tiger/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tiger%3Apoi&maxFeatures=50&outputFormat=application%2Fjson",
         //options:
        { 
          
          pane:'overlay_pane',
          popup_attributes : {'NAME':'NAME','MAINPAGE':'MAINPAGE',},
          // no need to put layer name or bounding extents 
        }
        ),
	},

	"Indonesia" :
	{

		'Indonesia Boundary': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
	    {
	        layers: 'Indonesia_Boundary',
	        transparent: true,
	        format: 'image/png',
	        pane: 'overlay_pane' ,
	        popup_attributes : {'country':"COUNTRY NAME"},
	        bounding_extents : [ [-11.007641,95.0107985], [6.076744,141.0200345] ]
	        
	    }),
   		'Indonesia Provinces': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
	    {
	        layers: 'Indonesia_Polygon',
	        transparent: true,
	        format: 'image/png',
	        pane: 'overlay_pane' ,
	        popup_attributes : {'country':"COUNTRY NAME",'name':"PROVINCE"},
	        bounding_extents : [ [-11.007641,95.0107985], [6.076744,141.0200345] ]
	    }),
	},

	"Brazil" :
	{
		'Brazil Boundary': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
	    {
	        layers: 'Brazil_Boundary',
	        transparent: true,
	        format: 'image/png',
	        pane: 'overlay_pane' ,
	        popup_attributes : {'country':"COUNTRY NAME"},
	        bounding_extents : [ [-33.7511725,-73.9830625], [5.2693306,-28.8476083] ]
	        
	    }),
	    'Brazil Regions': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
	    {
	        layers: 'Brazil_Regions',
	        transparent: true,
	        format: 'image/png',
	        pane: 'overlay_pane' ,
	        popup_attributes : {'country':"COUNTRY NAME",'name':"PROVINCE"},
	        bounding_extents : [ [-33.7511725,-73.9830625], [5.2693306,-28.8476083] ]
	    }),
		},
};

////// print functionality :


      window.print = function () {
        return domtoimage
            .toPng(document.querySelector(".grid-print-container"))
            .then(function (dataUrl) {
              var link = document.createElement('a');
              link.download = map.printControl.options.documentTitle || "exportedMap" + '.png';
              link.href = dataUrl;
              link.click();
            });
      };


// L.control.browserPrint({
//   title: 'Just print me!',
//   documentTitle: 'Map printed using leaflet.browser.print plugin',
  
//   printModes: [
//     L.control.browserPrint.mode.auto("Download PNG")
//   ],
//   manualMode: false
// }).addTo(map);
// map.on(L.Control.BrowserPrint.Event.PrintStart, function(e){
//         /*on print start we already have a print map and we can create new control and add it to the print map to be able to print custom information */
//         L.legendControl({position: 'bottomright'}).addTo(e.printMap);
//       });


// complete test // 

     

      // Here we hide all controls from end image
      map.on(L.Control.BrowserPrint.Event.PrintStart, function() {
        map._controlCorners.topleft.style.display = "none";
        map._controlCorners.topright.style.display = "none";
      });

      // Here we show all controls after image was created
      map.on(L.Control.BrowserPrint.Event.PrintEnd, function() {
        map._controlCorners.topleft.style.display = "";
        map._controlCorners.topright.style.display = "";
      });
      


        L.control.browserPrint({
        documentTitle: "printImage",
        printModes: [
          L.control.browserPrint.mode.auto("Download PNG")
        ]
      }).addTo(map);

      map.on(L.Control.BrowserPrint.Event.PrintStart, function(e){
        /*on print start we already have a print map and we can create new control and add it to the print map to be able to print custom information */
        //L.legendControl({position: 'bottomright'}).addTo(e.printMap);
      });


