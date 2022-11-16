<!-- this is mapbox code -->
    var map = L.map('map').setView([47.25, -122.44], 11);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoiam9obmthbWF1IiwiYSI6ImNsYTkxNDBpODAxYmszb250aTM1enNhbXUifQ.yIea6qeBtneyMQlUO8D3zw',
        }).addTo(map);

<!-- this is the text box instructions for adding destination point -->
    L.Control.textbox = L.Control.extend({
        onAdd: function(map) {
            
        var text = L.DomUtil.create('div');
        text.id = "info_text";
        text.innerHTML = "<strong>Click on map to set starting point and ending point</strong>"
        return text;
        },

        onRemove: function(map) {
            // Nothing to do here
        }
    });
        L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
        L.control.textbox({ position: 'topright' }).addTo(map);

    var control = L.Routing.control({
      waypoints: [
        null
        //L.latLng(47.246587, -122.438830),
        //L.latLng(47.318017, -122.542970)
      ],
       routeWhileDragging: true,
       units:'imperial',
       collapsible: true,
       router: L.Routing.mapbox('pk.eyJ1Ijoiam9obmthbWF1IiwiYSI6ImNsYTkxNDBpODAxYmszb250aTM1enNhbXUifQ.yIea6qeBtneyMQlUO8D3zw'),
       geocoder: L.Control.Geocoder.photon(),

  }).addTo(map);
  
  function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);
        L.DomEvent.on(destBtn, 'click', function() {
            control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
            control.show();
            map.closePopup();
        });

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);  
        L.DomEvent.on(startBtn, 'click', function() {
            control.spliceWaypoints(0, 1, e.latlng);
            map.closePopup();
        });
        
 });