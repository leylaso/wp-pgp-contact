=== PGP Contact ===
Contributors: sfyn
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=HKTUUSYZF9FMG&lc=CA&item_name=PGP%20Contact%20Plugin&currency_code=CAD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted
Tags: pgp, openpgp.js, secure contact, encryption, javascript
Requires at least: 4.0
Tested up to: 4.0
Stable tag: 1.1
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

Upload a PGP public keys and use it to provide end-to-end encryption of contact forms.

== Description ==

The goal of this project is to encrypt form submissions before they are submitted. This avoids sending plaintext messages over the network, thus providing end-to-end encrypted communication, which is not the case with solutions that encrypt messages after submission, server-side, using tools such as gnupg.

This plugin attempts to make this process as secure as possible, but for better security, I recommend using SSL on deployments.

== Installation ==

1. Unzip the plugin archive to the `/wp-content/plugins/` directory.
2. Activate the plugin through the "Plugins" menu in WordPress.
3. Upload a public key.
4. Put an encrypt button into one of your contact forms.

== Frequently Asked Questions ==

= How do I upload my key? =

Via the "Your PGP Key" menu item in the Users admin section.

= How do use this module with Contact Forms 7? =

The encryption button is provided in the same list of tags as the submit button and other contact form elements. You just need to add it. Alternatively, you can directly paste the shortcode `[encrypt]` into the form itself.

== Changelog ==

= 1.1 =
* Namespace changes to the wpcf7 integration code
* Syntax error introduced during svn initial commits fixed

== Upgrade Notice ==

= 1.1 =
The 1.0 release is not functional, so you must upgrade!
