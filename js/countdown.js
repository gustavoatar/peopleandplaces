var deadline = 'Jan 26 2017 19:00:00 GMT-0400';
function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function run_clock(id,endtime){
	var clock = document.getElementById(id);
	var timeinterval = setInterval(function(){
		var t = time_remaining(endtime);
		clock.innerHTML = +t.hours+':'+t.minutes +':'+t.seconds+'<div>'+'seconds'+'</div>';
		if(t.total<=0){ clearInterval(timeinterval); }
	},1000);
}
run_clock('clockdiv',deadline);


var deadlinetwo = 'Jan 27 2017 18:30:00 GMT-0400';
function time_remainingtwo(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function run_clocktwo(id,endtime){
	var clock = document.getElementById(id);
	var timeinterval = setInterval(function(){
		var t = time_remainingtwo(endtime);
		clock.innerHTML = '<span class="time">'+t.days+'<span class="labelsmall">days</span></span>'+'<span class="time">'+('0' + t.hours).slice(-2)+'<span class="labelsmall">hr</span></span>'+'<span class="time">'+('0' + t.minutes).slice(-2)+'<span class="labelsmall">min</span></span>'+'<span class="time">'+('0' + t.seconds).slice(-2)+'<span class="labelsmall lastone">sec</span></span>';
		if(t.total<=0){ clearInterval(timeinterval); }
	},1000);
}
run_clocktwo('clockdivtwo',deadlinetwo);


var deadlinethree = 'Nov 10 2016 18:30:00 GMT-0400';
function time_remainingthree(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function run_clockthree(id,endtime){
	var clock = document.getElementById(id);
	var timeinterval = setInterval(function(){
		var t = time_remainingthree(endtime);
		clock.innerHTML = +t.days+' day '+'<div>'+t.hours+':'+t.minutes +':'+t.seconds+'</div>';
		if(t.total<=0){ clearInterval(timeinterval); }
	},1000);
}
run_clockthree('clockdivthree',deadlinethree);


