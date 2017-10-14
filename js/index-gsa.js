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
	jQuery('.final').bind("DOMSubtreeModified", function() {
		var voiceInput = interim_span.innerHTML;
			jQuery('.year-entry,.gsc-input').val(voiceInput.replace(/[_\W]+/g, "-") + 'travel');
		if (voiceInput.indexOf('Philippines') !== -1) {
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('.or-search').addClass('fadeOut').addClass('hide');
			jQuery('.year-entry').addClass('fadeOut').addClass('hide');
			jQuery('body').toggleClass('phillipines');
			jQuery('.searchInstagram,.gsc-search-button').click();
			
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/gfl4ZJFbxkE?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			coverFlowIt();
		
		}
		if (voiceInput.indexOf('China') !== -1) {
			jQuery('#start_button').text('Getting Faces and Images');
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('china');
			jQuery('.searchInstagram').click();
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/6G7rUuh74bM?controls=0&start=20&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			
		}
		if (voiceInput.indexOf('joy') !== -1) {
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('joy');
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/IFuFm0m2wj0?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
			
		}		
		if (voiceInput.indexOf('great') !== -1 ){
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('great');
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/bDV88ryJsfs?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
		} 
		if (voiceInput.indexOf('happy') !== -1 ){
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('happy');
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/oWgTqLCLE8k?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
		} 		 
		if (voiceInput.indexOf('sad') !== -1) {
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('sad');
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/la0-5QFLr14?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
		} 	
		if (voiceInput.indexOf('f***') !== -1 || voiceInput.indexOf('s***') !== -1 || voiceInput.indexOf('crap') !== -1 ){
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('pink');
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/6hpVlKMNHpA?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1');
		} 		 			
			
	});
});



