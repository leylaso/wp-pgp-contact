<?php

/**
 * Provide integration with Contact Forms 7
 *
 * @package	PGP Contact
 * @version	1.1
 * @since	1.0
 */

/**
 * Tag generator
 *
 * @since 1.1
 */
function pgp_contact_wpcf7_add_tag()
{
	wpcf7_add_tag_generator( 'encrypt', __( 'Encrypt button', 'contact-form-7' ), 'pgp-contact-wpcf7-tag-pane', 'pgp_contact_wpcf7_tag_pane', array('nameless'=>1));
}
add_action('admin_init', 'pgp_contact_wpcf7_add_tag', 55);

/**
 * Add wpcf7 shortcode
 *
 * @since 1.1
 */
function pgp_contact_wpcf7_add_shortcode() 
{
	wpcf7_add_shortcode( 'encrypt', 'pgp_contact_wpcf7_shortcode_handler' );
}
add_action( 'wpcf7_init', 'pgp_contact_wpcf7_add_shortcode' );

/**
 * Shortcode handler
 *
 * @since 1.1
 */
function pgp_contact_wpcf7_shortcode_handler( $tag ) 
{
	$tag = new WPCF7_Shortcode( $tag );
	$key = get_user_meta(get_the_author_meta('ID'), 'pgp-public-key', TRUE);

	$class = wpcf7_form_controls_class( $tag->type );

	$atts = array();

	$atts['data-public-key'] = $key;
	$atts['class'] = $tag->get_class_option( $class );
	$atts['id'] = 'pgp-contact-encrypt';
	$atts['tabindex'] = $tag->get_option( 'tabindex', 'int', true );
	$atts['type'] = 'submit';
	$atts['style'] = 'display:none';
	$atts['disabled'] = 'disabled';
	$atts['value'] = isset($tag->values[0]) ? $tag->values[0] : __('Encrypt and send', 'pgp-contact');

	$atts = wpcf7_format_atts( $atts );

	$html = sprintf( '<input %1$s />', $atts );

	return $html;
}

/**
 * Include javascript when the shortcode is present
 *
 * @since 1.1
 */
function pgp_contact_wpcf7_include_js($wpcf)
{
	$form = $wpcf->get_properties();
	$form = $form['form'];
	if (stripos($form, '[encrypt'))
		PGP_Contact::get_instance()->public_js();
}
add_action('wpcf7_contact_form', 'pgp_contact_wpcf7_include_js');

/**
 * Admin form pane
 *
 * @since 1.1
 */
function pgp_contact_wpcf7_tag_pane( $contact_form ) 
{
?>
<div id="pgp-contact-wpcf7-tag-pane" class="hidden">
<form action="">
<table>
<tr>
<td><?php echo esc_html( __( 'Label', 'contact-form-7' ) ); ?> (<?php echo esc_html( __( 'optional', 'contact-form-7' ) ); ?>)<br />
<input type="text" name="values" class="oneline" /></td>

<td><code>class</code> (<?php echo esc_html( __( 'optional', 'contact-form-7' ) ); ?>)<br />
<input type="text" name="class" class="classvalue oneline option" /></td>
</tr>

</table>

<div class="tg-tag"><?php echo esc_html( __( "Copy this code and paste it into the form left.", 'contact-form-7' ) ); ?><br /><input type="text" name="encrypt" class="tag wp-ui-text-highlight code" readonly="readonly" onfocus="this.select()" /></div>
</form>
</div>
<?php
}


?>
