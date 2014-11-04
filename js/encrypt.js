/**
 * @file
 * Client side encryption of user contact forms
 */
(function ($) {
	$(document).ready( function() {
		// Enable the encrypt button
		$('input#pgp-contact-encrypt').removeAttr("disabled");
		// Bind the encryption behaviour to the Encrypt button
		$('input#pgp-contact-encrypt').click( function(event) {
	
			// Initialize a form variable we'll use a couple of times
			var cryptForm = $(this).parents('form');
 
			// First thing is disable the form elements while we process this
			cryptForm.find('input').attr('disabled', 'disabled');
			cryptForm.find('textarea').attr('disabled', 'disabled');

			// Don't submit the form yet
			event.preventDefault();

			// Fetch the public key
			var pgpKey = $(this).data().publicKey;

			// Once we have the key, perform the encryption
			pgpKey = jQuery.parseJSON(pgpKey.responseText);
			pgpKey = openpgp.key.readArmored(pgpKey.publicKey);


			keyType = -1;
			if (pgpKey.keys[0].primaryKey.algorithm == "rsa") keyType = 0;
			if (pgpKey.keys[0].primaryKey.algorithm == "dsa") keyType = 1;
			if (keyType == -1) throw('Invalid key type: ' + pgpKey.type);
			var cryptedText = openpgp.encryptMessage(pgpKey.keys, $('textarea#edit-message').val());

			// Replace the text in the textarea with the encrypted text
			cryptForm.find('textarea').removeAttr('disabled').val(cryptedText);

			// Submit the form
			cryptForm.submit();

		});
	});
})(jQuery);
