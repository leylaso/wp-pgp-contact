/**
 * @file
 * Sets up the dynamic verification on key upload pages.
 *
 * @package PGP Contact
 * @version 1.1
 * @since   1.0
 */
(function ($) {

	$(document).ready(function(){

		if (getKey() != null) 
			showKeyInfo(0);
		else 
			init();

		$('input#verify').click( function(event) {
			event.preventDefault();
			showKeyInfo();
		});

		$('textarea#public-key').change( function() {
			init();
		});

	});

	function init() {
		$('input#key-print').val('');
		$('input#key-algo').val('');
		$('input#key-user').val('');
		$('input#submit').hide();
		$('table#dynamic-key-info').hide();
		$('input#verify').show();
	}

	function getKey() {
		keyData =  openpgp.key.readArmored($('textarea#public-key').val());;
		if (typeof keyData.err == 'undefined')
			return keyData.keys[0];
		else
			return null;
	}

	function showKeyInfo(fTime) {
		keyZero = getKey();
		if (keyZero==null) {
			alert('This key is invalid!');	// TODO localize this string
		}
		else {
			fTime = typeof fTime !== 'undefined' ? fTime : 400;
			fp = keyZero.primaryKey.fingerprint.match(new RegExp('.{1,4}', 'g')).join(" ");
			$('input#key-print').val(fp.toUpperCase());
			$('input#key-algo').val(keyZero.primaryKey.algorithm.toUpperCase());
			$('input#key-user').val(keyZero.getPrimaryUser().user.userId.userid);
			if ($('table#dynamic-key-info').is(':hidden'))
				$('table#dynamic-key-info').fadeIn(fTime);
			if ($('input#submit').is(':hidden'))
				$('input#submit').fadeIn(fTime);
		}
		
	}

})(jQuery);
