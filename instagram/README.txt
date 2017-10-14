jQuery Instagram Browser Plugin
========================

Description
-----------
This is a plugin designed to allow you to easily pull photos from your instagram account and render them on your website. Simply pass in your username and the rest is take care of for you! 

Furthermore, you can change the way images appear on the page with css. Also there are several options to help you customize your interface to fit your vision.

Usage
-----
Include a copy of JQuery which can be downloaded at "http://www.jquery.com".
Include a copy of "instagramBrowser.js".

Next, write a JavaScript function that calls the method. Make sure you call the method on the element you wish to center to.
See example below:
	$(document).ready(function(){
	    $('.demo').instagramBrowser();
	});

The code above will activate the plugin. The default settings will automatically pull in the popular photo feed. You can customize your experience using the options below...

Next in your markup provide a the class on an element that you would like all of the photos to appear in. This will be used as the container of the photos. For example:

HTML:
	<div class="demo"></div>


Settings
---------

**** mode
This sets the mode to either "user" or "popular". Either pull from the popular feed or your user feed. Default is set to popular. Example:

            $(document).ready(function(){
	        $('.demo').instagramBrowser({
		    mode : 'popular'
		});
	    });

**** accessToken
This a mandatory setting that allows you to specify a user token. Default is 3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f. Example:

            $(document).ready(function(){
	        $('.demo').instagramBrowser({
		    accessToken : '3794301.f59def8.e08bcd8b10614074882b2d1b787e2b6f'
		});
	    });

**** userID
This is a setting that you have to use if your using "user" mode. Default is "For stunning photography Ð Kevin Burg".. Example:

            $(document).ready(function(){
	        $('.demo').instagramBrowser({
		    userID : '1138644'
		});
	    });

**** speed
Sets the speed of the images fade in effect, default is 700. Example:

            $(document).ready(function(){
	        $('.demo').instagramBrowser({
		    speed : 700
		});
	    });

**** delayInterval
Sets the interval of the delay between photos appearing, default is 80. Example:

            $(document).ready(function(){
	        $('.demo').instagramBrowser({
		    delayInterval : 80
		});
	    });

**** searchBox
Specify the class of the element that will be used for searching, default is ".searchContainer .searchBox". Example:

            $(document).ready(function(){
	        $('.demo').instagramBrowser({
		    searchBox : ".searchContainer .searchBox"
		});
	    });



Version history
---------------

Version 1.0 
+++++++++++
Full Release 


Contact Information
-------------------------------
Author: Chris Rivers
URL: http://chrisriversdesign.com