/**
 * build map
 */
"use strict";
$(document).ready(function () {

    // retrieving initial default values of san antonio
    var lat = $("#lat").val();
    var lng = $("#lng").val();
    var map;
    var marker;
    var address;
    var idVar;
    var infoContent = "Drag me to change locations";
    var infowindow = new google.maps.InfoWindow({
        content: infoContent
    });
    var day;
    var today;
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    


    function focusMap() {
        map.setCenter(marker.position);//resets center of map.. NOO reload!
        // map.setZoom(9);      // zoom in on city
        infowindow.open(map, marker);
    }

    function focusMarker() {   //sets marker if location moved by other means
        marker.setPosition({
            lat: lat,
            lng: lng
        })
    }

    function updateInputs() {
        $("#lat").val(lat.toFixed(6));    // update input values to current location
        $("#lng").val(lng.toFixed(6));
    }

    // map and marker function
    function initializeMap() {
        var mapOptions = {
            center: {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            },           
            zoom: 6,
            scrollwheel: false,	
            disableDefaultUI: true,
			mapTypeControl: true,
			mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position: google.maps.ControlPosition.LEFT_TOP,
            mapTypeIds: ['roadmap','terrain','hybrid','satellite']				
			},
			zoomControl: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.LEFT_BOTTOM
			},
			streetViewControl: true,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.BOTTOM_CENTER
			},
            styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#000000'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        };
        //create map
        map = new google.maps.Map(document.getElementById("map"), mapOptions, {streetViewControl: true});
        
		var thePanorama = map.getStreetView(address);

		google.maps.event.addListener(thePanorama, 'visible_changed', function() {
			if (thePanorama.getVisible() === true) {
				var locationName = thePanorama.location.shortDescription;
				jQuery('.year-entry').val(locationName);
				jQuery('.searchInstagram').click();
				jQuery('#start_button').addClass('hide');
				jQuery('#weatherContainer').removeClass('hide');
				jQuery('.coverflow').addClass('panoramic');
				jQuery('.video-background').addClass('hide');
				jQuery('.next-arrow, .prev-arrow, .search-open').addClass('hide');
				jQuery('.video-control').addClass('hide');
				jQuery('.video-control-play').addClass('hide');
				jQuery('.coverflow').removeClass('hide');

				
			} else if(!thePanorama.getVisible()) {
				jQuery('#start_button').removeClass('hide');
				jQuery('.next-arrow, .prev-arrow, .search-open').removeClass('hide');
				jQuery('.coverflow').removeClass('panoramic');
				jQuery('#weatherContainer').addClass('hide');
				jQuery('.video-control').removeClass('hide');
				jQuery('.video-control-play').removeClass('hide');

			}

		});   
		
		google.maps.event.addListener(map,'zoom_changed',function (event) {
				jQuery('.video-background').addClass('hide');
		});
		     
		google.maps.event.addListener( map, 'maptypeid_changed', function() { 
			document.getElementById( "map" ).value = map.getMapTypeId();
			// add classes to remove video
			if(this.mapTypeId === 'hybrid' || this.mapTypeId === 'terrain' || this.mapTypeId === 'satellite'){
				jQuery('.video-background').addClass('hide');
			} 
			if(this.mapTypeId === 'roadmap') {
				jQuery('.video-background').removeClass('hide');


			} 
		});
        // create marker
        marker = new google.maps.Marker({
            position: {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            },
            map: map,
            draggable: true
        });
        //call info window up
        infowindow.open(map, marker);
        // drag event
        google.maps.event.addListener(marker, 'dragend', function () {
            lat = marker.position.lat();    // getting current lat of marker
            lng = marker.position.lng();     // getting current lng of marker
            loadWeather();                     //updating weather and map
            updateInputs();
            focusMap();
        });

        //address search button  geocode function
        $("#searchBtn").click(function () {
            address = $("#search").val();  //get address from input
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({address: address}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    lat = results[0].geometry.location.lat();  // update global lat and lng variables to results
                    lng = results[0].geometry.location.lng();
                    loadWeather();
                    updateInputs();
                    focusMarker();     //update map and marker to new location
                    focusMap();

                } else {
                    alert("Please enter a valid location");
                }
            });
        });

    }
function loadWeather() {
        $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
            APPID: "a824ef2e2591bd239228beab33789010",
            lat: lat,
            lon: lng,
            units: "imperial",
            cnt: "10"
        }).done(function (data) {
            data.list.forEach(function (el, i) {
                today = new Date().getDay();
                if(i === 0){
                    day = "Today";
                }else if (today + i < 7) {
                    day = daysOfWeek[today + i];
                } else {
                        day = daysOfWeek[today + i - 7];
                }
                var appendStr = '';
                var appendStrLeft = " ";
                var appendStrRight = ' ';
                var appendStrCenter = ' ';
                idVar = "#day" + i;   // to cycle between  weather divs
                var maxTemp = Math.round(data.list[i].temp.max);
                var minTemp = Math.round(data.list[i].temp.min);
                var iconUrl = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
                appendStr +=("<h2>" + day + "</h2>");
                appendStr += ("<h4>" + maxTemp + "&deg/" + minTemp + "&deg</h4>");
                appendStr += ("<img src='" + iconUrl + "' alt='Icon'>");
                appendStr += ("<p><strong>" + data.list[i].weather[0].main + ":</strong> " + data.list[i].weather[0].description + "</p>");
                appendStr += ("<p><strong>Humidity: </strong>" + data.list[i].humidity + "</p>");
                appendStr += ("<p><strong>Wind: </strong>" + data.list[i].speed + "</p>");
                appendStr += ("<p><strong>Pressure: </strong>" + data.list[i].pressure + "</p>");

                $(idVar).html(appendStr);  //inserting new weather

                // reformated weather string for today box
                appendStrLeft += ("<h4>High: " + Math.round(data.list[0].temp.max) + "&deg</h4>");
                appendStrLeft += ("<h4>Low: " + Math.round(data.list[0].temp.min) + "&deg</h4>");
                appendStrRight += ("<h4><strong>" + data.list[0].weather[0].main + ":</strong> " + data.list[0].weather[0].description + "</h4>");
                appendStrRight += ("<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt='Icon'>");
                appendStrCenter += ("<p><strong>Humidity: </strong>" + data.list[0].humidity + "</p>");
                appendStrCenter += ("<p><strong>Wind: </strong>" + data.list[0].speed + "</p>");
                appendStrCenter += ("<p><strong>Pressure: </strong>" + data.list[0].pressure + "</p>");

                $("#todayLeft").html(appendStrLeft);  //inserting new weather
                $('#todayCenter').html(appendStrCenter);
                $("#todayRight").html(appendStrRight);
                infoContent = "<h2 class='center-text'>" + data.city.name + ',&nbsp;'+ data.city.country +"</h2><img src='" + iconUrl + "' alt='Icon' class='center-block' height='80'>" + "<h2 class='center-text'>" + Math.round(data.list[0].temp.max) + "&deg/" + Math.round(data.list[0].temp.min) + "&deg" + "</h2><br /><p>"+'Population '+""+ data.city.population.toLocaleString() +"</p>";
                
                infowindow.setContent(infoContent);
            });
        
            $("#currentCity").html(data.city.name);  //update current city


        });
    }


    //day selector buttons
    $("#today").click(function () {
        $(".weatherBoxDivs").removeClass("active three fiveTens");
        $(".todayBox").addClass("active");
    });

    $("#threeDay").click(function () {
        $(".weatherBoxDivs").removeClass("active three fiveTens");
        $(".threeDayBox").addClass("active three");
    });

    $("#fiveDay").click(function () {
        $(".weatherBoxDivs").removeClass("active three fiveTens");
        $(".fiveDayBox").addClass("active fiveTens");
    });

    $("#tenDay").click(function () {
        $(".weatherBoxDivs").removeClass("active three fiveTens");
        $(".tenDayBox").addClass("active fiveTens");
    });
    // update map button
    $("#locSubmit").click(function () {
        lat = $("#lat").val();   //updating position to value in input
        lng = $("#lng").val();
        console.log(lat);
        console.log(lng);
        loadWeather();// update map and weather
        initializeMap();
    });


initializeMap();  // initial map load
loadWeather(); // initial weather load

});
