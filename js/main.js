$(function() {
	function generateShareURL () {
		var shareURL = 'https://twitter.com/intent/tweet?';
		var formValues = {};

		// Gets values from each input and creates an object using the input name
		$('[data-form]').children('input').each(function (){
			if ($(this).val()) {
				formValues[$(this).attr('name')]=$(this).val();
			}
		});

		// Prepares the submitted data
		if (formValues.via) {
			formValues.via = formValues.via.replace('@', '');
		}

		if (formValues.url) {
			formValues.url = formValues.url.toLowerCase();
			if (!(formValues.url.indexOf('http://') > -1)) {
				formValues.url= 'http://'+formValues.url;
			}
		}

		if (formValues.hashtags) {
			formValues.hashtags = formValues.hashtags.replace(/\#/g, '');
		}

		// Builds share URL
		var size=0;
		for (var key in formValues) {
			if (formValues.hasOwnProperty(key)) {
				size++;
				if (size > 1) {
					shareURL += '&' + key + '=' + formValues[key];
				} else {
					shareURL += key + '=' + formValues[key];
				}
			}
		}
		return shareURL;
	}

	function randomColor() {
	    var color = '#';
	    var letters = '0123456789ABCDEF'.split('');

	    for (var i = 0; i < 6; i++) {
	        color += letters[Math.round(Math.random() * 15)];
	    }

	    $('[data-button]').css({'background': color});
	}

	// Interface
	var colorInterval;
	$('[data-button]').hover(function(){
		colorInterval = setInterval(function(){ randomColor(); }, 100);
	},function(){
		clearInterval(colorInterval);
		$('[data-button]').css({'background': '#303030'});
	});

	$('[data-button]').click(function () {
		var shareURL = generateShareURL();
		$('[data-link]').html('<a href="'+shareURL+'" target="_blank">'+shareURL+'</a>');
		$('[data-overlay]').removeClass('hidden');
		$('[data-link]').removeClass('hidden');
	});

	$('[data-what-button]').click(function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('[data-overlay]').addClass('hidden');
			$('[data-what]').addClass('hidden');

		} else {
			$(this).addClass('active');
			$('[data-overlay]').removeClass('hidden');
			$('[data-what]').removeClass('hidden');
			$('[data-link]').addClass('hidden');
		}
	});

	$('input').inputfit();
});