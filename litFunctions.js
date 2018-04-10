		$(document).ready(function() {

			$("#logout1").hide();
			navigator.geolocation.getCurrentPosition (function(position){
			latitude1 = position.coords.latitude;
			longitude1 = position.coords.longitude;
			
			$("#info").click(function(){
				alert("For your Information! When a button on the top bar is clicked, locations will show in this box for arranging directions. Enjoy!");
			});
			
			$("#loginfo").click(function(){
				alert("Username: Andrew Panko | Password: charlie123");
			});
			
			$("#dir").click(function(){
				alert("Directions will appear here based on the location selected in the 'Location' panel.");
			});
			
			$("#login").click(function() {
			$user = $("#username").val();
			$pass = $("#password").val();
				if ($user == "Andrew Panko" && $pass == "charlie123")
				{
					$("#leveled1").hide();
					$("#myNavbar").append("<p id = 'signin' class='navbar-text navbar-right'>Signed in as <a href='#' class='navbar-link'>Andrew Panko</a></p>");
					$("#logout1").show();
					
				}
			});
			//Logout function 80%
			$("#logout1").click(function() {
				
				$("#leveled1").show();
				$("#signin").hide();
				$("#logout1").hide();
			});
			var map;
			map = new GMaps({
			
				div: '#map',
				zoom: 12,
				lat: latitude1,
				lng: longitude1});	
				
				map.addMarker({ lat: latitude1, lng: longitude1, icon: "images/hereIcon.png"});
				
				$("#All").click(function(){
					map.removeMarkers();
					map.cleanRoute();
					$("#places").empty();
					for (var i = 0; i < listStations.length; i++)
					{
						latitude2 = listStations[i].latitude;
						longitude2 = listStations[i].longtitude;
							//Current Location
							map.addMarker({ lat: latitude1, lng: longitude1, icon: "images/hereIcon.png"});
							
							//Adds icon to EMS Station
							if (listStations[i].name == "Ems Station 30" ){
							
								map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/emsIcon.png", infoWindow : {content: "<div id = infobox><img src = 'images/emsv2.jpg'><p><strong>"+ 
								listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"<br>Type of Station: " + listStations[i].type +"<br>Phone Number: 905-546-3333" +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
								
								//Adds location detail for EMS Station seperately
								$("#places").append("<ul class='media-list'>"+
															"<li class='media'>"+
															"<div class='media-left' >" +
															"<div><img src='images/firedeptv3.png'></div>"+
															"</div>"+
															"<div class='media-body'>"+
															"<a id = 'direct"+i+"' href = '#' class = 'media-heading'>"+listStations[i].name+"</a>"+
															"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
															"Provides EMS: " + listStations[i].EMS +
															"<br>Type of station: " + listStations[i].type +
                                                            "<br>Phone Number: 905-546-3333" +
															"</div><br></li></ul>"
												);
								i++;
							}
							//Adds all the markers to the map
							map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/firedeptv3icon.png", infoWindow : {content: "<div id = infobox><img src = 'images/firedeptv3.png'><p><strong>"+ 
							listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"<br>Type of Station: " + listStations[i].type +"<br>Phone Number: 905-546-3333" +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
						//Adds all location details of stations
						$("#places").append("<ul class='media-list'>"+
														"<li class='media'>"+
														"<div class='media-left' >" +
														"<div><img src='images/firedeptv3.png'></div>"+
														"</div>"+
														"<div class='media-body'>"+
														"<a id = 'direct"+i+"' href = '#"+i+"' class = 'media-heading'>"+listStations[i].name+"</a>"+
														"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
														"Provides EMS: " + listStations[i].EMS +
														"<br>Type of station: " + listStations[i].type +
                                                        "<br>Phone Number: 905-546-3333" +
														"</div><br></li></ul>"
											);
						var ctr = 1;					
						$("#direct0").click(function() //
						{	
							ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[0].latitude, listStations[0].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("King St E")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
						});	
						});
						
						$("#direct1").click(function()
						{	ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[1].latitude, listStations[1].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct2").click(function()
						{ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[2].latitude, listStations[2].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct3").click(function()
						{ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[3].latitude, listStations[3].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct4").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[4].latitude, listStations[4].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct5").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[5].latitude, listStations[5].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Parkside Dr")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct6").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[6].latitude, listStations[6].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct7").click(function()
						{ctr = 1;

						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[7].latitude, listStations[7].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct8").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[8].latitude, listStations[8].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Meadowbrook Dr")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct9").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[9].latitude, listStations[9].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct10").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[10].latitude, listStations[10].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct11").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[11].latitude, listStations[11].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct12").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[12].latitude, listStations[12].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct13").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[13].latitude, listStations[13].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct14").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[14].latitude, listStations[14].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct15").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[15].latitude, listStations[15].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct16").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[16].latitude, listStations[16].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct17").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[17].latitude, listStations[17].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct18").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[18].latitude, listStations[18].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct19").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[19].latitude, listStations[19].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct20").click(function()
						{ctr = 1;
						$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[20].latitude, listStations[20].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct21").click(function()
						{	ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[21].latitude, listStations[21].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct22").click(function()
						{	ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[22].latitude, listStations[22].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct23").click(function()
						{	ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[23].latitude, listStations[23].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct24").click(function()
						{	ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[24].latitude, listStations[24].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct25").click(function()
						{	ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[25].latitude, listStations[25].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct26").click(function()
						{	ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[26].latitude, listStations[26].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Hamilton Regional Rd 56 S")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct27").click(function()
						{	ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[27].latitude, listStations[27].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
							  
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Destination")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});	
						
						$("#direct28").click(function()
						{	ctr = 1;
							$("#instructions").empty();
							map.cleanRoute();
							map.travelRoute({
							  origin: [latitude1, longitude1],
							  destination: [listStations[28].latitude, listStations[28].longtitude],
							  travelMode: 'driving',
							  step: function(e) {
							  if (ctr ==1){
								$('#instructions').append('<li>'+e.instructions+'</li>');
								}
								$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
								  
								  if(e.instructions.includes("Chapel Hill")){
									ctr = 2;
								  }
								  //map.setCenter(e.end_location.lat(), e.end_location.lng());
								  map.drawPolyline({
									path: e.path,
									strokeColor: '#131540',
									strokeOpacity: 0.6,
									strokeWeight: 6
								  });
								});
							}
							});
						});

                        $("#direct29").click(function()
                        {	ctr = 1;
                            $("#instructions").empty();
                            map.cleanRoute();
                            map.travelRoute({
                                origin: [latitude1, longitude1],
                                destination: [listStations[29].latitude, listStations[29].longtitude],
                                travelMode: 'driving',
                                step: function(e) {
                                    if (ctr ==1){
                                        $('#instructions').append('<li>'+e.instructions+'</li>');
                                    }
                                    $("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {

                                        if(e.instructions.includes("Destination")){
                                            ctr = 2;
                                        }
                                        //map.setCenter(e.end_location.lat(), e.end_location.lng());
                                        map.drawPolyline({
                                            path: e.path,
                                            strokeColor: '#131540',
                                            strokeOpacity: 0.6,
                                            strokeWeight: 6
                                        });
                                    });
                                }
                            });
                        });

                    }
				});
				
				$("#EMS").click(function(){
				map.cleanRoute();
				map.removeMarkers();
				$("#instructions").empty();
				$("#places").empty();
					for (var i = 0; i < listStations.length; i++)
					{
						latitude2 = listStations[i].latitude;
						longitude2 = listStations[i].longtitude;
							//Current Location
							map.addMarker({ lat: latitude1, lng: longitude1, icon: "images/hereIcon.png"});
							
							//Adds icon to EMS Station
							if (listStations[i].EMS == "YES" ){
							
								map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/emsIcon.png", infoWindow : {content: "<div id = infobox><img src = 'images/emsv2.jpg'><p><strong>"+ 
								listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"<br>Type of Station: " + listStations[i].type +"<br>Phone Number: " + listStations[i].phone +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
								
								//Adds location detail for EMS Station seperately
								$("#places").append("<ul class='media-list'>"+
															"<li class='media'>"+
															"<div class='media-left' >" +
															"<div><img src='images/firedeptv3.png'></div>"+
															"</div>"+
															"<div class='media-body'>"+
															"<a id = 'direct"+i+"' href = '#"+i+"' class = 'media-heading'>"+listStations[i].name+"</a>"+
															"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
															"Provides EMS: " + listStations[i].EMS +
															"<br>Type of station: " + listStations[i].type +
                                                            "<br>Phone Number: " + listStations[i].phone +
															"</div><br></li></ul>"
												);
								i++;
							}
							
							var ctr = 1;					
							$("#direct3").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[3].latitude, listStations[3].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct5").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[5].latitude, listStations[5].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Parkside Dr")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct8").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[8].latitude, listStations[8].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Wilson Traffic Cir")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct10").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[10].latitude, listStations[10].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct12").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[12].latitude, listStations[12].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct15").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[15].latitude, listStations[15].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct18").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[18].latitude, listStations[18].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct20").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[20].latitude, listStations[20].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct22").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[22].latitude, listStations[22].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct24").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[24].latitude, listStations[24].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct26").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[26].latitude, listStations[26].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Hamilton Regional Rd 56 S")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct29").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[29].latitude, listStations[29].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
					}
			});
		
				$("#Ham").click(function(){
				map.removeMarkers();
				$("#places").empty();
				map.cleanRoute();
					for (var i = 0; i < listStations.length; i++)
					{
						latitude2 = listStations[i].latitude;
						longitude2 = listStations[i].longtitude;
							//Current Location
							map.addMarker({ lat: latitude1, lng: longitude1, icon: "images/hereIcon.png"});
							
							//Adds icon to EMS Station
							if (listStations[i].city == "Hamilton" ){
							
								map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/firedeptv3icon.png", infoWindow : {content: "<div id = infobox><img src = 'images/firedeptv3.png'><strong>"+ 
								listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
								
								//Adds location detail for Hamilton stations seperately
								$("#places").append("<ul class='media-list'>"+
															"<li class='media'>"+
															"<div class='media-left' >" +
															"<img src='images/firedeptv3.png'>"+
															"</div>"+
															"<div class='media-body'>"+
															"<a id = 'direct"+i+"' href = '#"+i+"' class = 'media-heading'>"+listStations[i].name+"</a>"+
															"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
															"Provides EMS: " + listStations[i].EMS +
															"<br>Type of station: " + listStations[i].type +
                                                            "<br>Phone Number: " + listStations[i].phone +
															"</div><br></li></ul>"
												);
							}
							
							var ctr = 1;					
							$("#direct7").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[7].latitude, listStations[7].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct9").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[9].latitude, listStations[9].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct10").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[10].latitude, listStations[10].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct10").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[10].latitude, listStations[10].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct11").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[11].latitude, listStations[11].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct12").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[12].latitude, listStations[12].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct13").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[13].latitude, listStations[13].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct14").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[14].latitude, listStations[14].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct15").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[15].latitude, listStations[15].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct16").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[16].latitude, listStations[16].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct17").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[17].latitude, listStations[17].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct18").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[18].latitude, listStations[18].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct19").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[19].latitude, listStations[19].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct22").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[22].latitude, listStations[22].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});

                        var ctr = 1;
                        $("#direct27").click(function()
                        {
                            ctr = 1;
                            $("#instructions").empty();
                            map.cleanRoute();

                            map.travelRoute({
                                origin: [latitude1, longitude1],
                                destination: [listStations[27].latitude, listStations[27].longtitude],
                                travelMode: 'driving',
                                step: function(e) {
                                    if (ctr ==1){
                                        $('#instructions').append('<li>'+e.instructions+'</li>');
                                    }
                                    $("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {

                                        if(e.instructions.includes("Destination")){
                                            ctr = 2;
                                        }
                                        //map.setCenter(e.end_location.lat(), e.end_location.lng());
                                        map.drawPolyline({
                                            path: e.path,
                                            strokeColor: '#131540',
                                            strokeOpacity: 0.6,
                                            strokeWeight: 6
                                        });
                                    });
                                }
                            });
                        });
							
					}
			});
		
				$("#Stoney").click(function(){
				map.removeMarkers();
				$("#places").empty();
				map.cleanRoute();
					for (var i = 0; i < listStations.length; i++)
					{
						latitude2 = listStations[i].latitude;
						longitude2 = listStations[i].longtitude;
							//Current Location
							map.addMarker({ lat: latitude1, lng: longitude1, icon: "images/hereIcon.png"});
							
							//Adds icon to EMS Station
							if (listStations[i].city == "Stoney Creek" ){
							
								map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/firedeptv3icon.png", infoWindow : {content: "<div id = infobox><img src = 'images/firedeptv3.png'><strong>"+ 
								listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
								
								//Adds location detail for Hamilton stations seperately
								$("#places").append("<ul class='media-list'>"+
															"<li class='media'>"+
															"<div class='media-left' >" +
															"<img src='images/firedeptv3.png'>"+
															"</div>"+
															"<div class='media-body'>"+
															"<a id = 'direct"+i+"' href = '#"+i+"' class = 'media-heading'>"+listStations[i].name+"</a>"+
															"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
															"Provides EMS: " + listStations[i].EMS +
															"<br>Type of station: " + listStations[i].type +
															"</div><br></li></ul>"
												);
							}
							
							var ctr = 1;					
							$("#direct21").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[21].latitude, listStations[21].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct23").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[23].latitude, listStations[23].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct24").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[24].latitude, listStations[24].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
					}
			});
		
				$("#Bin").click(function(){
				map.removeMarkers();
				$("#places").empty();
				map.cleanRoute();
					for (var i = 0; i < listStations.length; i++)
					{
						latitude2 = listStations[i].latitude;
						longitude2 = listStations[i].longtitude;
							//Current Location
							map.addMarker({ lat: latitude1, lng: longitude1, icon: "images/hereIcon.png"});
							
							//Adds icon to EMS Station
							if (listStations[i].city == "Binbrook" ){
							
								map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/firedeptv3icon.png", infoWindow : {content: "<div id = infobox><img src = 'images/firedeptv3.png'><strong>"+ 
								listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
								
								//Adds location detail for Hamilton stations seperately
								$("#places").append("<ul class='media-list'>"+
															"<li class='media'>"+
															"<div class='media-left' >" +
															"<img src='images/firedeptv3.png'>"+
															"</div>"+
															"<div class='media-body'>"+
															"<a id = 'direct"+i+"' href = '#"+i+"' class = 'media-heading'>"+listStations[i].name+"</a>"+
															"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
															"Provides EMS: " + listStations[i].EMS +
															"<br>Type of station: " + listStations[i].type +
															"</div><br></li></ul>"
												);
							}
							
							var ctr = 1;					
							$("#direct26").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[26].latitude, listStations[26].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Hamilton Regional Rd 56 S")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
					}
				});
		
				$("#Anc").click(function(){
				map.removeMarkers();
				$("#places").empty();
				map.cleanRoute();
					for (var i = 0; i < listStations.length; i++)
					{
						latitude2 = listStations[i].latitude;
						longitude2 = listStations[i].longtitude;
							//Current Location
							map.addMarker({ lat: latitude1, lng: longitude1, icon: "images/hereIcon.png"});
							
							//Adds icon to EMS Station
							if (listStations[i].city == "Ancaster" ){
							
								map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/firedeptv3icon.png", infoWindow : {content: "<div id = infobox><img src = 'images/firedeptv3.png'><strong>"+ 
								listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
								
								//Adds location detail for Hamilton stations seperately
								$("#places").append("<ul class='media-list'>"+
															"<li class='media'>"+
															"<div class='media-left' >" +
															"<img src='images/firedeptv3.png'>"+
															"</div>"+
															"<div class='media-body'>"+
															"<a id = 'direct"+i+"' href = '#"+i+"' class = 'media-heading'>"+listStations[i].name+"</a>"+
															"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
															"Provides EMS: " + listStations[i].EMS +
															"<br>Type of station: " + listStations[i].type +
															"</div><br></li></ul>"
												);
							}
							
							var ctr = 1;					
							$("#direct8").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[8].latitude, listStations[8].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Wilson Traffic Cir")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct29").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[29].latitude, listStations[29].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
					}
				});
				
				$("#Vol").click(function(){
				map.removeMarkers();
				$("#places").empty();
				map.cleanRoute();
					for (var i = 0; i < listStations.length; i++)
					{
						latitude2 = listStations[i].latitude;
						longitude2 = listStations[i].longtitude;
							//Current Location
							map.addMarker({ lat: latitude1, lng: longitude1, icon: "images/hereIcon.png"});
							
							//Adds icon to EMS Station
							if (listStations[i].type == "Volunteer" ){
							
								map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/firedeptv3icon.png", infoWindow : {content: "<div id = infobox><img src = 'images/firedeptv3.png'><strong>"+ 
								listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
								
								//Adds location detail for Hamilton stations seperately
								$("#places").append("<ul class='media-list'>"+
															"<li class='media'>"+
															"<div class='media-left' >" +
															"<img src='images/firedeptv3.png'>"+
															"</div>"+
															"<div class='media-body'>"+
															"<a id = 'direct"+i+"' href = '#"+i+"' class = 'media-heading'>"+listStations[i].name+"</a>"+
															"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
															"Provides EMS: " + listStations[i].EMS +
															"<br>Type of station: " + listStations[i].type +
															"</div><br></li></ul>"
												);
							}
							
							var ctr = 1;					
							$("#direct1").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[1].latitude, listStations[1].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct2").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[2].latitude, listStations[2].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct3").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[3].latitude, listStations[3].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct4").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[4].latitude, listStations[4].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct20").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[20].latitude, listStations[20].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct24").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[24].latitude, listStations[24].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct25").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[25].latitude, listStations[25].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct26").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[26].latitude, listStations[26].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Hamilton Regional Rd 56 S")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct28").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[28].latitude, listStations[28].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Chapel Hill Rd")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
					}
				});
				
				$("#Car").click(function(){
				map.removeMarkers();
				$("#places").empty();
				map.cleanRoute();
					for (var i = 0; i < listStations.length; i++)
					{
						latitude2 = listStations[i].latitude;
						longitude2 = listStations[i].longtitude;
							//Current Location
							map.addMarker({ lat: latitude1, lng: longitude1, icon: "images/hereIcon.png"});
							
							//Adds icon to EMS Station
							if (listStations[i].type == "Career" ){
							
								map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/firedeptv3icon.png", infoWindow : {content: "<div id = infobox><img src = 'images/firedeptv3.png'><strong>"+ 
								listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
								
								//Adds location detail for Hamilton stations seperately
								$("#places").append("<ul class='media-list'>"+
															"<li class='media'>"+
															"<div class='media-left' >" +
															"<img src='images/firedeptv3.png'>"+
															"</div>"+
															"<div class='media-body'>"+
															"<a id = 'direct"+i+"' href = '#"+i+"' class = 'media-heading'>"+listStations[i].name+"</a>"+
															"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
															"Provides EMS: " + listStations[i].EMS +
															"<br>Type of station: " + listStations[i].type +
															"</div><br></li></ul>"
												);
							}
							
							var ctr = 1;					
							$("#direct6").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[6].latitude, listStations[6].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct9").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[9].latitude, listStations[9].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct10").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[10].latitude, listStations[10].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct11").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[11].latitude, listStations[11].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct12").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[12].latitude, listStations[12].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct13").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[13].latitude, listStations[13].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct14").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[14].latitude, listStations[14].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct15").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[15].latitude, listStations[15].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct16").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[16].latitude, listStations[16].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct17").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[17].latitude, listStations[17].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct18").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[18].latitude, listStations[18].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});

                        var ctr = 1;
                        $("#direct19").click(function()
                        {
                            ctr = 1;
                            $("#instructions").empty();
                            map.cleanRoute();

                            map.travelRoute({
                                origin: [latitude1, longitude1],
                                destination: [listStations[19].latitude, listStations[19].longtitude],
                                travelMode: 'driving',
                                step: function(e) {
                                    if (ctr ==1){
                                        $('#instructions').append('<li>'+e.instructions+'</li>');
                                    }
                                    $("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {

                                        if(e.instructions.includes("Destination")){
                                            ctr = 2;
                                        }
                                        //map.setCenter(e.end_location.lat(), e.end_location.lng());
                                        map.drawPolyline({
                                            path: e.path,
                                            strokeColor: '#131540',
                                            strokeOpacity: 0.6,
                                            strokeWeight: 6
                                        });
                                    });
                                }
                            });
                        });
							
							var ctr = 1;					
							$("#direct22").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[22].latitude, listStations[22].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct23").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[23].latitude, listStations[23].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct29").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[29].latitude, listStations[29].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							}
							});
		
				$("#Unique").click(function(){
				map.removeMarkers();
				$("#places").empty();
				map.cleanRoute();
					for (var i = 0; i < listStations.length; i++)
					{
						latitude2 = listStations[i].latitude;
						longitude2 = listStations[i].longtitude;
							//Current Location
							map.addMarker({ lat: latitude1, lng: longitude1, icon: "images/hereIcon.png"});
							
							//Adds icon to EMS Station
							if (listStations[i].type == "Training Academy / Administration")
							{
							
								map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/acadIcon.png", infoWindow : {content: "<div id = infobox><img src = 'images/acadIcon.png'><strong>"+ 
								listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
								
								//Adds location detail for Hamilton stations seperately
								$("#places").append("<ul class='media-list'>"+
															"<li class='media'>"+
															"<div class='media-left' >" +
															"<img src='images/firedeptv3.png'>"+
															"</div>"+
															"<div class='media-body'>"+
															"<a id = 'direct"+i+"' href = '#"+i+"' class = 'media-heading'>"+listStations[i].name+"</a>"+
															"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
															"Provides EMS: " + listStations[i].EMS +
															"<br>Type of station: " + listStations[i].type +
															"</div><br></li></ul>"
												);
							}
							
							if (listStations[i].type == "Composite")
							{
								map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/firedeptv3icon.png", infoWindow : {content: "<div id = infobox><img src = 'images/firedeptv3.png'><strong>"+ 
								listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
								
								//Adds location detail for Hamilton stations seperately
								$("#places").append("<ul class='media-list'>"+
															"<li class='media'>"+
															"<div class='media-left' >" +
															"<img src='images/firedeptv3.png'>"+
															"</div>"+
															"<div class='media-body'>"+
															"<a id = 'direct"+i+"' href = '#"+i+"' class = 'media-heading'>"+listStations[i].name+"</a>"+
															"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
															"Provides EMS: " + listStations[i].EMS +
															"<br>Type of station: " + listStations[i].type +
															"</div><br></li></ul>"
												);
							}
							
							if (listStations[i].type == "EMS only - Fleet Centre")
							{
								map.addMarker({lat: listStations[i].latitude, lng: listStations[i].longtitude, icon: "images/emsIcon.png", infoWindow : {content: "<div id = infobox><img src = 'images/emsv2.jpg'><strong>"+ 
								listStations[i].name +"</strong><br>"+ listStations[i].address+"<br>"+listStations[i].city + "<br>Provides EMS: " + listStations[i].EMS +"</p><a href = 'https://www.google.ca/maps/place/"+listStations[i].address +", " +listStations[i].city +"'>Google Maps</a></div>"}});
								
								//Adds location detail for Hamilton stations seperately
								$("#places").append("<ul class='media-list'>"+
															"<li class='media'>"+
															"<div class='media-left' >" +
															"<img src='images/firedeptv3.png'>"+
															"</div>"+
															"<div class='media-body'>"+
															"<a id = 'direct"+i+"' href = '#"+i+"' class = 'media-heading'>"+listStations[i].name+"</a>"+
															"<div>"+listStations[i].address +", "+listStations[i].city +"</div>" +
															"Provides EMS: " + listStations[i].EMS +
															"<br>Type of station: " + listStations[i].type +
															"</div><br></li></ul>"
												);
							}
						var ctr = 1;					
							$("#direct5").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[5].latitude, listStations[5].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});

							var ctr = 1;					
							$("#direct8").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[8].latitude, listStations[8].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});		
							
							var ctr = 1;					
							$("#direct17").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[17].latitude, listStations[17].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct21").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[21].latitude, listStations[21].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
							
							var ctr = 1;					
							$("#direct27").click(function()
							{	
								ctr = 1;
								$("#instructions").empty();
								map.cleanRoute();
								
								map.travelRoute({
								  origin: [latitude1, longitude1],
								  destination: [listStations[27].latitude, listStations[27].longtitude],
								  travelMode: 'driving',
								  step: function(e) {
								  if (ctr ==1){
									$('#instructions').append('<li>'+e.instructions+'</li>');
									}
									$("#instructions li:eq(" + e.step_number + ")").fadeIn(200, function() {
									  
									  if(e.instructions.includes("Destination")){
										ctr = 2;
									  }
									  //map.setCenter(e.end_location.lat(), e.end_location.lng());
									  map.drawPolyline({
										path: e.path,
										strokeColor: '#131540',
										strokeOpacity: 0.6,
										strokeWeight: 6
									  });
									});
								}
							});	
							});
					}
							
				});
		
		});
	});
	
	window.onscroll = function() {scrollFunction()};

		function scrollFunction() {
			if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
				document.getElementById("myBtn").style.display = "block";
			} else {
				document.getElementById("myBtn").style.display = "none";
			}
		}

		// When the user clicks on the button, scroll to the top of the document
		function topFunction() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}
		var modal = document.getElementById('instructionModal');
        var helpme = document.getElementById('helpme');
        var closeBtn = document.getElementsByClassName('closeBtn')[0];

        modal.style.display = 'block';

        helpme.addEventListener('click', openModal);

        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', outsideClick);

        function openModal(){
        	modal.style.display = 'block';
		}

        function closeModal(){
            modal.style.display = 'none';
        }

        function outsideClick(e){
            if(e.target == modal){
                modal.style.display = 'none';
            }

        }