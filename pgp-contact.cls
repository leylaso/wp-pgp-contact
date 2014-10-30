<?php

/**
 * This plugin provides the key upload form and contact forms for users.
 *
 * @package	PGP Contact
 * @version	1.0
 * @since	1.0
 */
class PGP_Contact
{

	/**
	 * Plugin version
	 *
	 * @since	1.0
	 * @var		string
	 */
	const VERSION = '1.0';

	/**
	 * Unique identifier
	 *
	 * @since	1.0
	 * @var 	string
	 */
	protected $slug;

	/**
	 * The base directory of the plugin
	 *
	 * @since 	1.0
	 * @var 	string
	 */
	protected $dir;

	/**
	 * Reference to an instance of the class
	 *
	 * @since 1.0
	 * @var		PGP_Contact
	 */
	private static $instance;

	/**
	 * Plugin constructor
	 */
	public function __construct()
	{
		$this->slug = 'pgp-contact';
		$this->dir = plugin_dir_path(__FILE__);

		add_action('admin_menu', array(&$this, 'admin_menu'));
	}

	/**
	 * Return our plugin instance
	 *
	 * @return 	PGP_Contact 	A reference to an instance of this class.
	 * @since	1.0
	 */
	public static function get_instance()
	{
		if (self::$instance==null)
			self::$instance = new PGP_Contact();

		return self::$instance;
	}

	/**
	 * Administration menu items
	 *
	 * @since 1.0
	 */
	 public function admin_menu()
	 {
		add_users_page('PGP Public Key', 'PGP Key', 'read', 'pgpkey', array(&$this, 'public_key_form'));
	 }

	 /**
	  * Public key upload form
	  *
	  * @since 1.0
	  */
	 public function public_key_form()
	 {
		if (!current_user_can('read'))
		 	wp_die(__('You do not have sufficient permissions to access this page.'));

		echo 'Things will happen here';
	 }
}

?>
