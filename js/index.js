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
    jQuery('.final').removeClass('hide').addClass('fadeIn');    
  };

  recognition.onerror = function(event) {
    console.log(event.error);
  };

  recognition.onend = function() {
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

	jQuery('.search-open').on('click',function(){
		jQuery('.searchContainer').toggleClass('fadeIn').toggleClass('hide')
		jQuery(".searchBox").focus();
	});
	
	jQuery('.video-background,.video-selection').on('click',function(){
		jQuery('.video-background').toggleClass('focus');
		
		if ((player.isMuted() == true)){
			player.unMute();		
		} else {
			player.mute();		
		}

	});
	
	jQuery('.nav-link.next').on('click',function(){
			debugger;
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
			jQuery('.final').empty();
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
			
	});
});



