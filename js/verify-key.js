/**
 * @file
 * Sets up the dynamic verification on key upload pages.
 */
(function ($) {

	$(document).ready(function(){
		$('input#verify').click( function(event) {
			event.preventDefault();
			rawKey = $('textarea#public-key').val();
			actKey = window.openpgp.key.readArmored(rawKey).keys[0];
			fp = actKey.primaryKey.fingerprint.match(new RegExp('.{1,4}', 'g')).join(" ");
			$('input#key-print').val(fp.toUpperCase());
			$('input#key-algo').val(actKey.primaryKey.algorithm.toUpperCase());
			$('input#key-user').val(actKey.getPrimaryUser().user.userId.userid);
			$('table#dynamic-key-info').fadeIn();
			$('input#submit').fadeIn();
		});
		$('input#verify').show();
		$('input#submit').hide();
		$('table#dynamic-key-info').hide();
	});
})(jQuery);
