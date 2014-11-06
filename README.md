PGP Contact for WordPress
=========================

This plugin uses the openpgp.js libraries to provide users with the ability to upload PGP public keys and later use them for encryption of contact forms.

Description
-----------

The goal of this project is to encrypt form submissions before they are submitted. This avoids sending plaintext messages over the network, thus providing end-to-end encrypted communication, which is not the case with solutions that encrypt messages after submission, server-side, using tools such as gnupg.

This plugin attempts to make this process as secure as possible, but for better security, I recommend using SSL on deployments.

Installation
------------

 1. Unzip the plugin archive to the `/wp-content/plugins/` directory.
 2. Activate the plugin through the "Plugins" menu in WordPress.
 3. Upload a public key.
 4. Put an encrypt button into one of your contact forms.

Frequently Asked Questions
--------------------------

### How do I upload my key?

Via the "Your PGP Key" menu item in the Users admin section.

### How do use this module with Contact Forms 7?

The encryption button is provided in the same list of tags as the submit button and other contact form elements. You just need to add it. Alternatively, you can directly paste the shortcode `[encrypt]` into the form itself.
