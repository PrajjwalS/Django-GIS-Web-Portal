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
map.createPane('bed_base_pane');
map.createPane('overlay_marker_pane');
map.createPane('overlay_buffer_pane');
map.getPane('bed_base_pane').style.zIndex = 1;
map.getPane('base_pane').style.zIndex = 2;
map.getPane('overlay_pane').style.zIndex = 3;
map.getPane('overlay_marker_pane').style.zIndex = 4;
map.getPane('overlay_buffer_pane').style.zIndex = 90;



/*
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
*/


// define to geoserver workspace (our workspace name was 'rsac_test')
var wms_workspace_url = 'http://localhost:8080/geoserver/rsac_test/wms';

// defining base layers list object
var base_layers = 
{
	// order them as you want to show them in selector

    "India Boundary": new L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
          //options:
          {
           layers: 'India_Boundary',
           transparent: true,
           format: 'image/png',
           pane: 'base_pane' ,
           popup_attributes : {'source':"SOURCE"},
           bounding_extents : [ [8.076644669515929,68.09347709739018], [37.07719207475452,97.41149826013668] ]
          }
        ),
     'India States': new L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
        //options:
        {
          layers: 'Indian_States',
          transparent: true,
          format: 'image/png',
          pane: 'base_pane' ,
          popup_attributes : {'st_nm':"STATE NAME"},
          bounding_extents : [ [8.076644669515929,68.09347709739018], [37.07719207475452,97.41149826013668] ]
        }
        ),
     'India Assembly': new L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
        // option:
        {
            layers: 'India_Assembly',
            transparent: true,
            format: 'image/png',
            pane: 'base_pane' ,
            popup_attributes : {'dt_code':'DISTRICT CODE','dist_name':'DISTRICT NAME','st_code':'STATE CODE','st_name':'STATE NAME'},
            bounding_extents : [ [8.076644669515929,68.09347709739018], [37.07719207475452,97.41149826013668] ]
        }),
  
    // add more base maps
};

// defining overlay layer groups list object
// i.e. each key has value of a set of layers



// var overlay_layer_sets =
// {

// 	"Uttar Pradesh" : 
// 	{ 
//     "wms_layers":
//      {
//         'UP Natural Features': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
//         {
//           layers: 'uttar_pradesh_natural',
//           transparent: true,
//           format: 'image/png',
//           pane: 'overlay_pane' ,
//           popup_attributes : {'fid':"FID",'TYPE':'TYPE'},
//           bounding_extents : [ [23.836287546909702,77.06007269591628], [30.450513301147215,84.79772293845014] ]
//         }),
//         'UP Highway': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
//         {
//           layers: 'uttar_pradesh_highway',
//           transparent: true,
//           format: 'image/png',
//           pane: 'overlay_pane' ,
//           popup_attributes : {'fid':"FID",'TYPE':'TYPE'},
//           bounding_extents : [ [23.836287546909702,77.06007269591628], [30.450513301147215,84.79772293845014] ]
//         }),
// 			  'GP Boundary': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
//         {
//           layers: 'GP_BOUNDARY',
//           transparent: true,
//           format: 'image/png',
//           pane: 'overlay_pane' ,
//           popup_attributes : {'gp_name':"Gram Panchayat Name",'gpcode':"Gram Panchayat Code"},
//           bounding_extents : [ [23.836287546909702,77.06007269591628], [30.450513301147215,84.79772293845014] ]
//         }),
//     },
//     "point_layers":
//     {
//         'LKO Mark' : L.geoJSON_with_popup_attributes("http://localhost:8080/geoserver/rsac_test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rsac_test%3Alko_mark&maxFeatures=50&outputFormat=application%2Fjson",
//          //options:
//         { 
          
//           pane:'overlay_marker_pane',
//           popup_attributes : {'fid':'Feat. ID',},
//           // no need to put layer name or bounding extents 
//         }
//         ),

//        'UP Points 1' : L.geoJSON_with_popup_attributes("http://localhost:8080/geoserver/rsac_test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rsac_test%3AUP_Points1n&maxFeatures=50&outputFormat=application%2Fjson",
//          //options:
//         { 
          
//           pane:'overlay_marker_pane',
//           popup_attributes : {'fid':'Feat. ID',},
//           // no need to put layer name or bounding extents 
//         }
//         ),
//         'UP Points 2' : L.geoJSON_with_popup_attributes("http://localhost:8080/geoserver/rsac_test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rsac_test%3AUP_Points2n&maxFeatures=50&outputFormat=application%2Fjson",
//          //options:
//         { 
          
//           pane:'overlay_marker_pane',
//           popup_attributes : {'fid':'Feat. ID',},
//           // no need to put layer name or bounding extents 
//         }
//         ),
// 	  }
//   },
// };



var overlay_layer_sets =
{

  "Uttar Pradesh" : 
  { 
    
        'UP Natural Features': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
        {
          layers: 'uttar_pradesh_natural',
          transparent: true,
          format: 'image/png',
          pane: 'overlay_pane' ,
          popup_attributes : {'fid':"FID",'TYPE':'TYPE'},
          bounding_extents : [ [23.836287546909702,77.06007269591628], [30.450513301147215,84.79772293845014] ]
        }),
        'UP Highway': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
        {
          layers: 'uttar_pradesh_highway',
          transparent: true,
          format: 'image/png',
          pane: 'overlay_pane' ,
          popup_attributes : {'fid':"FID",'TYPE':'TYPE'},
          bounding_extents : [ [23.836287546909702,77.06007269591628], [30.450513301147215,84.79772293845014] ]
        }),
        'GP Boundary': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
        {
          layers: 'GP_BOUNDARY',
          transparent: true,
          format: 'image/png',
          pane: 'overlay_pane' ,
          popup_attributes : {'gp_name':"Gram Panchayat Name",'gpcode':"Gram Panchayat Code"},
          bounding_extents : [ [23.836287546909702,77.06007269591628], [30.450513301147215,84.79772293845014] ]
        }),


        // point layers:::
     'LKO Mark' : L.geoJSON_with_popup_attributes("http://localhost:8080/geoserver/rsac_test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rsac_test%3Alko_mark&maxFeatures=50&outputFormat=application%2Fjson",
         //options:
        { 
          
          pane:'overlay_marker_pane',
          popup_attributes : {'fid':'Feat. ID',},
          // no need to put layer name or bounding extents 
        }
        ),

       'UP Points 1' : L.geoJSON_with_popup_attributes("http://localhost:8080/geoserver/rsac_test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rsac_test%3AUP_Points1n&maxFeatures=50&outputFormat=application%2Fjson",
         //options:
        { 
          
          pane:'overlay_marker_pane',
          popup_attributes : {'fid':'Feat. ID',},
          // no need to put layer name or bounding extents 
        }
        ),
        'UP Points 2' : L.geoJSON_with_popup_attributes("http://localhost:8080/geoserver/rsac_test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rsac_test%3AUP_Points2n&maxFeatures=50&outputFormat=application%2Fjson",
         //options:
        { 
          
          pane:'overlay_marker_pane',
          popup_attributes : {'fid':'Feat. ID',},
          // no need to put layer name or bounding extents 
        }
        ),
  }   
};




	// "Indonesia" :
	// {

	// 	'Indonesia Boundary': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
	//     {
	//         layers: 'Indonesia_Boundary',
	//         transparent: true,
	//         format: 'image/png',
	//         pane: 'overlay_pane' ,
	//         popup_attributes : {'country':"COUNTRY NAME"},
	//         bounding_extents : [ [-11.007641,95.0107985], [6.076744,141.0200345] ]
	        
	//     }),
 //   		'Indonesia Provinces': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
	//     {
	//         layers: 'Indonesia_Polygon',
	//         transparent: true,
	//         format: 'image/png',
	//         pane: 'overlay_pane' ,
	//         popup_attributes : {'country':"COUNTRY NAME",'name':"PROVINCE"},
	//         bounding_extents : [ [-11.007641,95.0107985], [6.076744,141.0200345] ]
	//     }),
	// },

	// "Brazil" :
	// {
	// 	'Brazil Boundary': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
	//     {
	//         layers: 'Brazil_Boundary',
	//         transparent: true,
	//         format: 'image/png',
	//         pane: 'overlay_pane' ,
	//         popup_attributes : {'country':"COUNTRY NAME"},
	//         bounding_extents : [ [-33.7511725,-73.9830625], [5.2693306,-28.8476083] ]
	        
	//     }),
	//     'Brazil Regions': L.tileLayer.WMS_with_popup_attributes(wms_workspace_url, 
	//     {
	//         layers: 'Brazil_Regions',
	//         transparent: true,
	//         format: 'image/png',
	//         pane: 'overlay_pane' ,
	//         popup_attributes : {'country':"COUNTRY NAME",'name':"PROVINCE"},
	//         bounding_extents : [ [-33.7511725,-73.9830625], [5.2693306,-28.8476083] ]
	//     }),
	// 	},


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


