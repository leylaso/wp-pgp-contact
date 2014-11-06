/**
 * @file
 * Client side encryption of user contact forms
 *
 * @package	PGP Contact
 * @version	1.1
 * @since	1.0
 */
(function ($) {
	$(document).ready( function() {
		// Enable the encrypt button
		$('input#pgp-contact-encrypt').removeAttr("disabled");
		// Bind the encryption behaviour to the Encrypt button
		$('input#pgp-contact-encrypt').click( function(event) {
			// Don't submit the form yet
			event.preventDefault();
	
			// Initialize a form variable we'll use a couple of times
			var cryptForm = $(this).parents('form');
 
			// First thing is disable the form elements while we process this
			cryptForm.find('input').attr('disabled', 'disabled');
			cryptForm.find('textarea').attr('disabled', 'disabled');

			// Fetch the public key
			var pgpKey = $(this).data().publicKey;

			// Once we have the key, perform the encryption
			pgpKey = openpgp.key.readArmored(pgpKey);

			keyType = -1;
			if (pgpKey.keys[0].primaryKey.algorithm.substr(0,3) == "rsa") keyType = 0;
			if (pgpKey.keys[0].primaryKey.algorithm.substr(0,3) == "dsa") keyType = 1;
			if (keyType == -1) throw('Invalid key type: ' + pgpKey.keys[0].primaryKey.algorithm);

			plain = cryptForm.find('textarea').val();

			var cryptedText = openpgp.encryptMessage(pgpKey.keys, plain);

			// Replace the text in the textarea with the encrypted text
			cryptForm.find('textarea').removeAttr('disabled').val(cryptedText).attr('disabled', 'disabled');

			// Submit the form
			cryptForm.find('input').removeAttr('disabled');
			cryptForm.find('textarea').removeAttr('disabled');
			cryptForm.submit();

		});
		$('input#pgp-contact-encrypt').show();
	});
})(jQuery);
