<?php
/**
 * Key Upload Form
 *
 * @package PGP Contact
 * @version 1.1
 * @since   1.0
 */
?>
<div id="public-key-upload-form" class="wrap">
<?php if (isset($debug)): ?>
	<pre>
		<?php print_r($debug); ?>
	</pre>
<?php endif; ?>
<h2><?php _e('Your PGP public key'); ?></h2>
<?php if (isset($msg)): ?>
	<div id="message" class="updated below-h2">
		<p><?php print $msg; ?></p>
	</div>
<?php endif; ?>
<form novalidate="novalidate" method="post" action="<?php print add_query_arg(array()); ?>" id="public-key-upload">
	<input type="hidden" value="<?php print wp_create_nonce('upload-public-key'); ?>" name="_wpnonce" id="_wpnonce">
	<input type="hidden" value="<?php print add_query_arg(array()); ?>" name="_wp_http_referer">
	<p>
		<input type="hidden" value="<?php print get_current_user_id(); ?>" name="checkuser_id">
	</p>

	<table class="form-table"><tbody>
		<tr>
			<th><label for="public-key">Public Key</label></th>
        	<td><textarea cols="80" rows="20" id="public-key" name="public-key"><?php echo get_user_meta(get_current_user_id(), 'pgp-public-key', TRUE); ?></textarea><br>
        	<span class="description"><?php _e('Paste your public key here.'); ?></span></td>
		</tr>
	</tbody></table>
	<p class="submit"><input type="submit" value="<?php _e('Verify your key'); ?>" class="button" style="display:none" id="verify" name="verify"></p>
	<table class="form-table" id="dynamic-key-info"><tbody>
		<tr>
			<th><label for="key-user">Account</label></th>
			<td><input type="text" class="regular-text" disabled="disabled" value="" id="key-user" name="key-user"><br /><span class="description">Account name attached to this key.</span></td>
		</tr>
		<tr>
			<th><label for="key-algo">Algorithm</label></th>
			<td><input type="text" class="regular-text" disabled="disabled" value="" id="key-algo" name="key-algo"><br /><span class="description">Encryption algorithm used to create this key.</span></td>
		</tr>
		<tr>
			<th><label for="key-print">Fingerprint</label></th>
			<td><input type="text" class="regular-text" disabled="disabled" value="" id="key-print" name="key-print"><br /><span class="description">Fingerprint of the key.</span></td>
		</tr>
	</tbody></table>
	<p class="submit"><input type="submit" value="<?php _e('Submit your key'); ?>" class="button button-primary" id="submit" name="submit"></p>

</form>
</div>
