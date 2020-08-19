 /////// DEVELOPER : PRAJJWAL SINGH : 
 /////// GITHUB: PrajjwalS
 /////// EMAIL : prajjwals12@gmail.com


 ////////// LEAFLET EXTENSION JS PLUGIN FOR POP ATTRIBUTES WITH GEOSERVER WMS/////     
  L.TileLayer.WMS_with_popup_attributes = L.TileLayer.WMS.extend({
  
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);

    map.fitBounds(this.options.bounding_extents);

  },
  
  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },
  
  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
        showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      async:false,
      url: url,
      success: function (data, status, xhr) {
        var err = typeof data === 'string' ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);  
      }
    });
  },
  
  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
        size = this._map.getSize(),
        
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: this.wmsParams.styles,
          transparent: this.wmsParams.transparent,
          version: this.wmsParams.version,      
          format: this.wmsParams.format,
          bbox: this._map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: this.wmsParams.layers,
          query_layers: this.wmsParams.layers,
          info_format: 'text/html'
        };
    
    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
    
    return this._url + L.Util.getParamString(params, this._url, true);
  },
  
  showGetFeatureInfo: function (err, latlng, content) 
  { 
    
    // check if request didn't have errors
    if (err) 
    { 
      console.log(err); 
      return; 
    } // do nothing if there's an error
    

    // check if content doesnt have a table row to show
    // will occur on clicking on pixels having no data attributes
    if(!content.includes("<tr>"))
    { 

      return;
    }

    // check if layer asked for specific attributes from attribute table
    // if no... go ahead and make pop from content
    // if yes... then process the content, and remove the <td> tags of unwanted attributes
    
    if(this.options.popup_attributes) // attributes were specified
    { 
     
      pop_attr = this.options.popup_attributes;

      var tag_th_regx = /<\s*th\s*>/;
      var tag_td_regx = /<\s*td\s*>/;
      var dummy_content =  content.split(/\r?\n/);
      var att_list = []; 

     
      
      for(var i=0;i<dummy_content.length;i++)
        if( tag_th_regx.test(dummy_content[i]) )
          {
            var n=dummy_content[i].indexOf('>')+1;
            var m=dummy_content[i].lastIndexOf('<');
            att_list.push( dummy_content[i].substring(n,m));
            
          }
      k=0;
      att_val_map = new Map();    
      for(var i=0;i<dummy_content.length;i++)
        if( tag_td_regx.test(dummy_content[i]) )
          {
            var n=dummy_content[i].indexOf('>')+1;
            var m=dummy_content[i].lastIndexOf('<');
            att_val_map.set(att_list[k++],dummy_content[i].substring(n,m));
          }
      var header = '<html><head><title>Geoserver GetFeatureInfo output</title></head><style type="text/css">table.featureInfo, table.featureInfo td, table.featureInfo th {border:1px solid #ddd;border-collapse:collapse;margin:0;padding:0;font-size: 90%;padding:.2em .1em;}table.featureInfo th {padding:.2em .2em;font-weight:bold;background:#eee;}table.featureInfo td{background:#fff;}table.featureInfo tr.odd td{background:#eee;}table.featureInfo caption{text-align:left;font-size:100%;font-weight:bold;padding:.2em .2em;}</style><body><table class="featureInfo">';
      var footer = '</table><br/></body></html>';
      var body = '';
      th_tags ='';
      td_tags ='';

      
      for(var i=0;i<att_list.length;i++)
      {
        if(pop_attr[att_list[i]])
        {
            th_tags= th_tags.concat('<th>',pop_attr[att_list[i]],'</th>');
            td_tags= td_tags.concat('<td>',att_val_map.get(att_list[i]),'</td>');
        }
      } 
      body = body.concat('<tr>',th_tags,'</tr>','<tr>',td_tags,'</tr>');
      content = header.concat(body,footer);
    }
    
    
    L.popup({ maxWidth: 800})
      .setLatLng(latlng)
      .setContent(content)
      .openOn(this._map);
  }
});

L.tileLayer.WMS_with_popup_attributes = function (url, options) 
{
  return new L.TileLayer.WMS_with_popup_attributes(url, options);  
};








////////////////////////// for geoJson WFS //////////////////////
 ////////// LEAFLET EXTENSION JS PLUGIN FOR POP ATTRIBUTES WITH GEOSERVER WMS/////     
 L.GeoJson_with_popup_attributes = L.GeoJSON.extend
 (
  { 
    onAdd: function (map) 
    {
      
      L.GeoJSON.prototype.onAdd.call(this, map);
      map.fitBounds(this.getBounds());

      // showing div for point buffer input
      bi = document.getElementById("buffer_input")
      bi.style.display = "block";
      br = document.getElementById("buffer_radius")
      br.value='0';
      manage_buffer_radius_input(0)
    },
  
    onRemove: function (map) 
    {
      L.GeoJSON.prototype.onRemove.call(this, map);
      bi = document.getElementById("buffer_input")
      bi.style.display = "none";
      br = document.getElementById("buffer_radius")
      br.value='0';
       manage_buffer_radius_input(0)
    },
  
 }
);


L.geoJSON_with_popup_attributes = function (geojsonurl, options) 
{ 
  var obj=10;
  $.ajax({
    async: false,
  dataType: "json",
  url:geojsonurl,
  success: hey,
});
  function hey (layer_geojson_obj)
{
  
   geoJSONobj = layer_geojson_obj;
 
}


  
  // adding popupattributes to each feature
  attr_dict = options["popup_attributes"];
   options["onEachFeature"]= function (feature, marker) 
   {
            //console.log(feature.properties['NAME']);
            var header = '<html><head><title>Geoserver GetFeatureInfo output</title></head><style type="text/css">table.featureInfo, table.featureInfo td, table.featureInfo th {border:1px solid #ddd;border-collapse:collapse;margin:0;padding:0;font-size: 90%;padding:.2em .1em;}table.featureInfo th {padding:.2em .2em;font-weight:bold;background:#eee;}table.featureInfo td{background:#fff;}table.featureInfo tr.odd td{background:#eee;}table.featureInfo caption{text-align:left;font-size:100%;font-weight:bold;padding:.2em .2em;}</style><body><table class="featureInfo">';
            var footer = '</table><br/></body></html>';
            //var tmplt = header;
            var th_list ="";
            var td_list ="";
            
            Object.keys(attr_dict).forEach(function loop(key)
              {
                  th_list += "<th>"+attr_dict[key]+"</th>";
                  td_list += "<td>"+feature.properties[key]+"</td>";
              });

            var tmplt =header +"<tr>" +th_list+"</tr>" + "<tr>" + td_list+ "</tr>" + footer;
            marker.bindPopup(tmplt);
            

    };
  return new L.GeoJson_with_popup_attributes(geoJSONobj, options);  
};