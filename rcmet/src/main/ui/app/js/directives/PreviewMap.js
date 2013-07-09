App.Directives.directive('previewMap', function($rootScope) {
	return {
		restrict: 'A',
		replace: true,
		scope: {dataset: '=previewMap'},
		template: '<div id="{{dataset.name}}" class="preview-map"></div>',
		link: function(scope, element, attrs) {
			var map = L.map(attrs.id, {
				//center: [40, 0],
				zoom: 0,
				scrollWheelZoom: false,
				zoomControl: false,
				attributionControl: false,
			});

			//create a CloudMade tile layer and add it to the map
			L.tileLayer('http://{s}.tile.cloudmade.com/57cbb6ca8cac418dbb1a402586df4528/997/256/{z}/{x}/{y}.png', {}).addTo(map);

			// Zoom the map to the dataset bound regions (or at least try our best to do so)
			var datasetBounds = [[scope.dataset.latlonVals.latMax, scope.dataset.latlonVals.lonMin], 
								 [scope.dataset.latlonVals.latMin, scope.dataset.latlonVals.lonMax]];
			map.fitBounds(datasetBounds, {});

			// Draw a colored overlay on the region of the map
			var maplatlon = scope.dataset.latlonVals;
			var bounds = [[maplatlon.latMax, maplatlon.lonMin], [maplatlon.latMin, maplatlon.lonMax]];

			var polygon = L.rectangle(bounds,{
				stroke: false,
				fillColor: $rootScope.fillColors[i],
				fillOpacity: 0.6
			});

			// Add layer to Group
			var rectangleGroup = L.layerGroup();
			rectangleGroup.addLayer(polygon);

			// Add the overlay to the map
			rectangleGroup.addTo(map);
		}
	};
});
