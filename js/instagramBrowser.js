// Instagram feed
// Global
var ibObj;
var instagramBrowserNextMax;
var customSettings;

/* Instagram Popular Fetch
------------------------------*/
function instagramFetch(settings){	
	var access_token = settings.accessToken;
    var param = {access_token:access_token};
    fetchCMD(param, settings);
}

function fetchCMD(param, settings){
   
	var cmdURL = "";

	if( settings.mode == 'user' ){
		// User Mode
		cmdURL = 'https://api.instagram.com/v1/users/' + settings.userID + '/media/recent/?callback=?';
	} 
		if( settings.mode == 'popular' ){
		cmdURL = 'https://api.instagram.com/v1/tags/' + settings.searchQuery + '/media/recent?callback=?';

	} else {
		// Popular Mode
    	cmdURL = 'https://api.instagram.com/v1/media/popular?callback=?';
	}

   	jQuery.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
	
}

/* Instagram Tag Search
------------------------------*/
function instagramSearch(settings){
	var access_token = settings.accessToken;
    var param = {access_token:access_token};

	var searchQuery = jQuery(".searchBox").val().replace(/ /g,'');
	jQuery(".maps-search-box").val(searchQuery);
	jQuery('#searchBtn').focus().click();
    searchCMD(param, settings, searchQuery);
}

function coverFlowIt() {
    const coverflowContainer = document.querySelector(".coverflow");
    const coverflowImages = [...document.querySelectorAll(".coverflow__image")];
    const prevArrow = document.querySelector(".prev-arrow");
    const nextArrow = document.querySelector(".next-arrow");
    
    //set indicies and initial position
    coverflowImages.forEach(function(coverflowImage, i) {
        coverflowImage.dataset.coverflowIndex = i + 1;       
    });
    let coverflowPosition = Math.floor(coverflowImages.length / 2) - 8;
    coverflowContainer.dataset.coverflowPosition = coverflowPosition;

    //navigation functions
   viewPrevImage = function () {
        coverflowPosition = Math.max(1, coverflowPosition - 1);
        coverflowContainer.dataset.coverflowPosition = coverflowPosition;
    }

    viewNextImage = function () {
        coverflowPosition = Math.min(coverflowImages.length, coverflowPosition + 1);
        coverflowContainer.dataset.coverflowPosition = coverflowPosition;
    }
    // fix this shit
    slideshow = function(targetImage) {
		coverflowPositionString = "" + coverflowPosition + "";
        coverflowPosition = Math.min(coverflowImages.length, coverflowPosition + 1);
        coverflowContainer.dataset.coverflowPosition = coverflowPosition;    
		if( coverflowPosition == 20 ){
		debugger;
			clearTimeout(slideshow);
			jQuery();
			jQuery('.seachInstagramLoadMore').trigger('click');
			
		} 	
    } 
    

    function jumpToImage(targetImage) {
    	var targetImagePosition = targetImage.dataset.coverflowIndex;
		const closeImage = document.querySelector(".coverflow-close");
		const targetImageMargin = targetImage.clientWidth;
		coverflowPositionString = "" + coverflowPosition + "";

		if( targetImagePosition	 == coverflowPositionString ){
			targetImage.classList.add("expand");
			targetImage.parentNode.parentNode.classList.add("expand");
			targetImage.style.marginLeft = -targetImageMargin+"px";
			closeImage.classList.add("expand");
		}    
        coverflowPosition = Math.min(
            coverflowImages.length,
            Math.max(1, targetImage.dataset.coverflowIndex)
        );
        coverflowContainer.dataset.coverflowPosition = coverflowPosition;
    }

    //add event handlers
    prevArrow.addEventListener("click", viewPrevImage);
    nextArrow.addEventListener("click", viewNextImage);
    coverflowImages.forEach(function(image) {
        image.addEventListener("click", evt => jumpToImage(evt.target));
    });
    window.addEventListener("keyup", evt => {
        if (evt.which === 37) {
            //left arrow
            viewPrevImage();
        } else if (evt.which === 39) {
            //right arrow
            viewNextImage();
        } else if (evt.which == 27) {
				jQuery('.coverflow-close').removeClass('expand');
				jQuery('.coverflow').removeClass('expand');
				jQuery('.coverflow__image').removeClass('expand');
				jQuery('.coverflow__image').css('margin','0');
		}
    });
}


function searchCMD(param, settings, searchQuery){
   
	var cmdURL = "";

	// Tag Search
	cmdURL = 'https://api.instagram.com/v1/tags/' + searchQuery + '/media/recent?callback=?';
	
   	jQuery.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
	
}

/* Instagram User Search
------------------------------*/
function instagramUserSearch(settings){
	var access_token = settings.accessToken;
	var searchQuery = jQuery(".searchBox").val().replace(/ /g,'');
	var param = {access_token:access_token,q:searchQuery};
		
    userSearchCMD(param, settings);
}

function userSearchCMD(param, settings){
	var cmdURL = 'https://api.instagram.com/v1/users/search?callback=?';
	
   	jQuery.getJSON(cmdURL, param, function(data){
		onUserLoaded(data, settings);
	});
}

function onUserLoaded(data, settings){
	if( data.meta.code == 200 ){
        var users = data.data;
		// console.log(data);
		
		if( users.length > 0 ){
            for( var key in users ){
				// Build UI
				var user = users[key];			
				var instagramUser = '';
							
				instagramUser = '<div class="instagram-user" id="p' + user.id + '" title="' + user.username + '" rel="' + user.id + '">';
				instagramUser += 	"<img src='" + user.profile_picture + "' />";
				instagramUser += 	"<span class='instagram-username'>" + user.username + "</span>";
				instagramUser += 	"<span class='instagram-fullname'>" + user.full_name + "</span>";
				instagramUser += '</div>';

	            jQuery(instagramUser).appendTo(ibObj);
				
			}
		}
		
	}
}

/* Instagram Tags Load More
---------------------------------*/
function instagramTagsLoadMore(settings){
	var access_token = settings.accessToken;
    var param = {access_token:access_token, max_tag_id: instagramBrowserNextMax};

	var searchQuery = jQuery(".searchBox").val().replace(/ /g,'');
		
    loadMoreCMD(settings,param,searchQuery);
}

function loadMoreCMD(settings, param, searchQuery){
		
	var cmdURL = "";
	cmdURL = "https://api.instagram.com/v1/tags/" + searchQuery + "/media/recent?callback=?";
	
   	jQuery.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
}

/* Instagram Users Load More
---------------------------------*/
function instagramUsersLoadMore(settings){
	var access_token = settings.accessToken;
    var param = {access_token:access_token, max_id: instagramBrowserNextMax};
		
    loadMoreUsersCMD(settings,param);
}

function loadMoreUsersCMD(settings, param){

	cmdURL = 'https://api.instagram.com/v1/users/' + settings.userID + '/media/recent/?callback=?';

   	jQuery.getJSON(cmdURL, param, function(data){
		onPhotoLoaded(data, settings);
	});
	
}


/* Photo Handler
------------------------------*/
function onPhotoLoaded(data, settings){
	
	// Store Next Page of Results... // next_url
	if( data.pagination ){
		if( data.pagination.next_max_id ){
			instagramBrowserNextMax = data.pagination.next_max_id;
		} else {
			instagramBrowserNextMax = "Empty";
		}	
	} else {
		instagramBrowserNextMax = "Empty";
	}
		
    if( data.meta.code == 200 ){
	
		// Testing
		// console.log(data);
		
		// Setting Up Variables
        var photos = data.data;

		if( ibObj.html() != "" ){
			var addingToList = true;
		} else {
			var addingToList = false;
		}

        if( photos.length > 0 ){
	
			// console.log(photos);

            for( var key in photos ){
               
				// Get Photo Data
				var photo = photos[key];
			
				// Build DOM
				var instagramPhoto = '';				
				var photoCaption = '';
			
				if( photo.caption ){
					photoCaption = photo.caption.text;
				} else {
					photoCaption = "Instagram Photo";
				}
									
				instagramPhoto +=    '<a href="#" class="caption caption-3"  data-description="' + photoCaption +'" data-title="'+ photo.user.full_name +'"><img src="' + photo.images.standard_resolution.url + '" class="coverflow__image" title="' + photoCaption + ' - ' + photo.user.full_name +'"></a>';
	            jQuery(instagramPhoto).appendTo(ibObj);
            }
			
			// Count photos
			var photoCount = key;
	            setTimeout(coverFlowIt,500)
			
			if( addingToList == false ){
				jQuery('.instagram-photo').hide();
			}
			
			
			jQuery('.instagram-photo').each(function(index){
				
				// Store Current Photo
				currentPhoto = jQuery(this);
	            			
				// Render Effect
				currentPhoto.delay( settings.delayInterval * index ).fadeIn(settings.speed);
				
				// Clear Any Existing Load More Buttons
				jQuery("#seachInstagramLoadMoreContainer").remove();
				
				// Load More Logic
				if( index == photoCount && instagramBrowserNextMax != "Empty" ){
					// Load More Button
					jQuery('<div id="seachInstagramLoadMoreContainer"><a class="seachInstagramLoadMore btn btn-inverse">Load More</a></div>').appendTo(ibObj);
				}
				
			});

        } else {
            alert('empty');
        }

    } else {
        alert(data.meta.error_message);
    }
}

jQuery.fn.instagramBrowser = function ( options ) {
	
	/* Setting Up Variables
	------------------------------*/
	var settings = {
		mode : 'user', // This sets the mode to either "user" or "popular". Either pull from the popular feed or your user feed. Default is set to popular
		accessToken : '2513948.e029fea.1e7c505d3cca4f6a9738b37dee4bc47a', // This a mandatory setting that allows you to specify a user token. Default is 3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f
		userID : '2513948', // This is a setting that you have to use if your using "user" mode. Default is "For stunning photography – Kevin Burg".
		speed: 700, // Sets the speed of the images fade in effect, default is 700.
		delayInterval : 80, // Sets the interval of the delay between photos appearing, default is 80.
		searchBox : '.searchContainer .searchBox',
		searchQuery: 'sunset'
		
	};
	
	ibObj = jQuery(this);
	
	// Combine your options with our settings...
	jQuery.extend(settings, options);
	
	/* Plugin Logic
	------------------------------*/
	return this.each(function() {

		// Powers Activate...
		jQuery(document).ready(function(){
			instagramFetch(settings);
		});
		
		// Events
		jQuery(".searchInstagram").click(function(){
			// Clear UI
			jQuery('.coverflow').empty();			
			ibObj.html("");
			
			// Detect if the input has user rel or tag rel and use different methods for each... 
			if( jQuery(settings.searchBox).attr("rel") == "user" ){
				instagramUserSearch(settings);
			} else {
				instagramSearch(settings);
			}
			jQuery('.searchContainer').addClass('hide')
				
		});
		
		
		
		jQuery(document).on("click", ".seachInstagramLoadMore", function(){
			if( jQuery(settings.searchBox).attr("rel") == "user" ){
				instagramUsersLoadMore(customSettings);
			} else {
				instagramTagsLoadMore(settings);
			}
		});
		
		jQuery(document).on("click", ".instagram-user", function(){
			// Clear UI
			ibObj.html("");
			
			customSettings = settings;
			customSettings.mode = 'user';
			customSettings.userID = jQuery(this).attr("rel");
			// console.log(customSettings);
			
			instagramFetch(settings);
		});
		
		jQuery('.searchBox').keypress(function (e) {
			if (e.which == 13) {
				jQuery(this).blur();
				jQuery('.searchInstagram').focus().click();
			}
		});
		
		//hide additional details for hover
		// jQuery(document).on({
// 			mouseenter: function() {
// 				var thisPhoto = jQuery(this); 
// 				var obHeight = thisPhoto.height();
// 				var obWidth = thisPhoto.width();
// 				
// 				// Date Conversion
// 				var obDate = parseInt(thisPhoto.attr("data-created"));
// 				obDate = new Date( obDate * 1000 );
// 				obDate = dateFormat(obDate, "dddd, mmmm dS, yyyy, h:MM:ss TT");
// 											
// 				var photoDesc = '<div class="instagram-hover-cover">';
// 				photoDesc +=        '<h3>' + thisPhoto.attr("rel") + '</h3>';
// 				photoDesc +=        '<em>' + obDate + '</em>';				
// 				photoDesc +=        '<p>' + thisPhoto.attr("title").substring(0,196) + '</p>';
// 				photoDesc +=    '</div>';
// 				
// 				// Add Hover UI
// 				thisPhoto.append(photoDesc);
// 								
// 				// Size Hover UI
// 				jQuery('.instagram-hover-cover').hide().css({
// 					"height" : "114px", // obHeight, 
// 					"width" : obWidth 
// 				}).slideDown("fast");
// 			},
// 			mouseleave: function(){
// 				var thisPhoto = jQuery(this);
// 				
// 				thisPhoto.find(".instagram-hover-cover").delay(500).slideUp("fast", function(){
// 					jQuery(this).remove();
// 				});				
// 			}			
// 		},".instagram-photo");
		jQuery(window).load(function(){
			coverFlowIt();
		});
	});
}


