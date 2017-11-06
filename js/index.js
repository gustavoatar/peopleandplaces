var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('ytplayer', {
		events: {
			'onReady': onPlayerReady
		}
	});
}

function onPlayerReady() {
	player.playVideo();
	// Mute!
	player.mute();
}

var final_transcript = '';
var recognizing = false;

if ('webkitSpeechRecognition' in window) {

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    jQuery(); 
    jQuery('.interim').removeClass('hide').addClass('fadeIn');    
  };

  recognition.onerror = function(event) {
    console.log(event.error);
  };

  recognition.onend = function() {
  jQuery('.wave-form').addClass('fadeOut').removeClass('fadeIn').addClass('hide');
  jQuery('.reward-sound')[0].stop(); 
  jQuery('.seachInstagramLoadMore').addClass('fadeOut').removeClass('fadeIn').removeClass('hide'); 
  jQuery('#start_button').text('Retry');  
    recognizing = false;
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {              
        final_transcript += event.results[i][0].transcript;
      } else {    
        interim_transcript += event.results[i][0].transcript;       
      }     
    }           
    final_transcript = linebreak(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);   
  };
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function capitalize(s) {
  return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}

function startDictation(event) {
  jQuery('.wave-form').removeClass('hide').addClass('fadeIn');
  jQuery('.reward-sound')[0].play(); 
  jQuery('.seachInstagramLoadMore').addClass('fadeIn').removeClass('hide'); 
  jQuery('#start_button').text('listening...');
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'en-US';
  recognition.start();
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
}

jQuery(document).ready(function($){
	jQuery('.demo').instagramBrowser({
		accessToken : '2513948.e029fea.1e7c505d3cca4f6a9738b37dee4bc47a',
		mode : 'popular'
	});
	var typed = new Typed('.typed-out', 
	{
		strings: ['Learn about the world in a visual way, ask or search...', 'Tap - Ask me and say a country name - to get started'],
		loop: true,
		loopCount: 3,
		typeSpeed: 55,
		backSpeed: 20,
		backDelay: 1200,
		showCursor: false
		
	}
	);


	jQuery('.maps-search-box').keypress(function (e) {
		if (e.which == 13) {
			jQuery(this).blur();
			jQuery('#searchBtn').focus().click();
		}
	});

	jQuery('.search-open').on('click',function(){
		jQuery('.searchContainer').toggleClass('fadeIn').toggleClass('hide')
		jQuery(".searchBox").focus();
	});
	
	jQuery('#weatherBoxes').on('click',function(){
		jQuery(this).toggleClass('grow');
	});	
	
	jQuery('.video-background,.video-selection').on('click',function(){
		jQuery('.video-background').toggleClass('focus');
		
		if ((player.isMuted() == true)){
			player.unMute();		
		} else {
			player.mute();		
		}

	});
	
	jQuery('.coverflow-close').on('click',function(){
		jQuery(this).removeClass('expand');
		jQuery('.coverflow').removeClass('expand');
		jQuery('.coverflow__image').removeClass('expand');
		jQuery('.coverflow__image').css('margin','0');

	});	

		
	
	jQuery('.final').bind("DOMSubtreeModified", function() {
		var voiceInput = interim_span.innerHTML;
		if (voiceInput.indexOf('Philippines') !== -1) {
			jQuery('.year-entry').val('Philippines' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('phillipines');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/gfl4ZJFbxkE?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('.lead').addClass('fadeOut').addClass('hide');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');

		}
		if (voiceInput.indexOf('China') !== -1) {
			jQuery('.year-entry').val('China' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('china');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/6G7rUuh74bM?controls=0&start=20&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');
			jQuery('.lead').addClass('fadeOut').addClass('hide');		
	
		}
		if (voiceInput.indexOf('Argentina') !== -1) {
			jQuery('.year-entry').val('Argentina' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('argentina');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/d90JYK916AU?controls=0&start=20&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');		
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}		
		if (voiceInput.indexOf('Israel') !== -1 ){
			jQuery('.year-entry').val('Israel' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('israel');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/8ukVw0iyB94?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		} 
		if (voiceInput.indexOf('Dubai') !== -1 ){
			jQuery('.year-entry').val('Dubai' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('dubai');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/SLaYPmhse30?controls=0&start=0&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}  		 
		if (voiceInput.indexOf('Peru') !== -1 ){
			jQuery('.year-entry').val('Peru' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('peru');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/0HT4fqyUaUw?controls=0&start=0&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}  	
		if (voiceInput.indexOf('Bulgaria') !== -1 ){
			jQuery('.year-entry').val('Bulgaria' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('bulgaria');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/JwjA9VpI7X0?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}
		
		if (voiceInput.indexOf('Canada') !== -1 ){
			jQuery('.year-entry').val('Canada' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('canada');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/StRSjgb8QK4?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}
		
		if (voiceInput.indexOf('Congo') !== -1 ){
			jQuery('.year-entry').val('Congo' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('congo');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/ydcfdogwW3Y?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}
		
		if (voiceInput.indexOf('Egypt') !== -1 ){
			jQuery('.year-entry').val('Egypt' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('egypt');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/Dtw2vfKihXA?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}	
		
		if (voiceInput.indexOf('India') !== -1 ){
			jQuery('.year-entry').val('India' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('india');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/19RQagzBY3M?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}								   		 			
		
		if (voiceInput.indexOf('Italy') !== -1 ){
			jQuery('.year-entry').val('Italy' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('italy');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/f-9ijiN31LI?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}				

		
		if (voiceInput.indexOf('Ivory Coast') !== -1 ){
			jQuery('.year-entry').val('Ivorycoast' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('ivory-coast');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/U8DwqFWHJik?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}

		if (voiceInput.indexOf('Mexico') !== -1 ){
			jQuery('.year-entry').val('Mexico' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('mexico');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/vu-Z8dckECU?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}

		if (voiceInput.indexOf('Mexico') !== -1 ){
			jQuery('.year-entry').val('Mexico' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('mexico');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/vu-Z8dckECU?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}

		if (voiceInput.indexOf('South Africa') !== -1 ){
			jQuery('.year-entry').val('southafrica' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('south-africa');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/sLK3D8lSsnU?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}


		if (voiceInput.indexOf('The Himalayas') !== -1 ){
			jQuery('.year-entry').val('thehimalayas' + 'travel');
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('the-himalayas');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/UD4yHnEMeM?controls=0&start=10&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			jQuery('#start_button').addClass('fadeOut').addClass('hide');					
			jQuery('.lead').addClass('fadeOut').addClass('hide');
		}
		if (voiceInput.indexOf('previous') !== -1 ){
			viewPrevImage();
		}   		 			
			
		if (voiceInput.indexOf('next') !== -1 ){
			viewNextImage();
		}   		 			

		if (voiceInput.indexOf('slideshow') !== -1 ){
			setTimeout(slideshow, 4000);    
		} 	

		if (voiceInput.indexOf('expand') !== -1 || voiceInput.indexOf('maximize') !== -1 ){
			expandImage();
		}  		
		
		if (voiceInput.indexOf('close') !== -1 || voiceInput.indexOf('unexpand') !== -1 ){
			closeImage();
		}  												
			
	});
});



$(window).scroll(function(){
	var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
	var scrolltrigger = 0.95;
	var percentageScrolled= (wintop/(docheight-winheight))*(100);

	console.log('wintop='+wintop);
	console.log('docheight='+docheight);
	console.log('winheight='+winheight);
	console.log(wintop+'=='+(docheight-winheight));
	console.log(wintop==(docheight-winheight));
	console.log(percentageScrolled);
	
	if (percentageScrolled >= 20) {
		$("header").addClass('fix-top');
		$(".video-background").addClass('blend');
		$("#map").removeClass('hide').addClass('showme');
	} else if(percentageScrolled < 20){
		$("#map").removeClass('showme');
		$("header").removeClass('fix-top');
		$(".video-background").removeClass('blend').removeClass('hide');
	}
});
