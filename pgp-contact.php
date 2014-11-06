<?php
/**
 * PGP Contact Forms
 *
 * A WordPress plugin used to provide encrypted email contact forms on a per-
 * user basis.
 *
 * @author		Sofian Benaissa <me@sfyn.net>
 * @package		PGP Contact
 * @license		GPL-3.0+
 * @copyright 	2014 Sofian Benaissa
 * @version		1.1
 * @since		1.0
 *
 * @wordpress-plugin
 * Plugin Name: 	PGP Contact Forms
 * Plugin URI: 		https://wordpress.org/plugins/pgp-contact/
 * Description: 	Allows users to upload PGP public keys and receive encrypted email via contact forms.
 * Version: 		1.1
 * Author: 			Sofian Benaissa
 * Author URI: 		http://www.sfyn.net/
 * License: 		GPL-3.0+
 * License URI:		http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: 	pgp-contact
 * GitHub Plugin URI: https://github.com/sfyn/wp-pgp-contact
 * 
 */
/*
 * This file is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software 
 * Foundation, either version 3 of the License, or (at your option) any later 
 * version. 
 * 
 * This file is distributed in the hope that it will be useful, but WITHOUT 
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more 
 * details. You can consult the license at http://www.gnu.org/licenses/
 */

if (!defined('WPINC'))
	die;

require_once(plugin_dir_path(__FILE__) . 'pgp-contact.cls');
add_action('plugins_loaded', array('PGP_Contact', 'get_instance'));
?>
