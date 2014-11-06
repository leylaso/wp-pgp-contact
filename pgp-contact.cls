<?php

/**
 * This plugin provides the key upload form and contact forms for users.
 *
 * @package	PGP Contact
 * @version	1.1
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
		add_action('admin_enqueue_scripts', array(&$this, 'admin_js'));
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
		add_users_page('PGP Public Key', 'Your PGP Key', 'read', 'pgpkey', array(&$this, 'public_key_form'));
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
	// TODO use $post global instead of php variable	
		if (!empty($_POST) && $this->verify('upload-public-key', $_POST, TRUE))
			$msg = $this->save_key($_POST['public-key']);

		include($this->dir . 'inc/public-key-form.inc');
	}

	/**
	 * Save a users key
	 *
	 * @since 1.0
	 */
	public function save_key($key)
	{
		update_user_meta(get_current_user_id(), 'pgp-public-key', $key);
		return __('PGP public key saved', $this->slug);
	}

	/**
	 * Generic verification function for forms
	 *
	 * @since 1.0
	 */
	public function verify($action, $request, $check_user = FALSE)
	{
		if (!wp_verify_nonce($request['_wpnonce'], $action))
			return FALSE;
		else if ($check_user && $request['checkuser_id']!=get_current_user_id())
			return FALSE;
		else if (add_query_arg(array()) != $request['_wp_http_referer'])
			return FALSE;
		else
			return TRUE;
	}

	/**
	 * Include the OpenPGP.js library
	 *
	 * @since 1.0
	 */
	public function include_openpgp() 
	{
    	//wp_register_script('openpgp.worker', plugins_url('pgp-contact/js/openpgp.worker.min.js'), FALSE, '0.8.2');
    	wp_register_script('openpgp', plugins_url('pgp-contact/js/openpgp.min.js'), FALSE, '0.7.2');
    }

    /**
     * Include js for the upload form
     *
     * @since 1.0
     */
    public function admin_js() 
    {
    	$this->include_openpgp();
    	if (home_url(add_query_arg(array())) == menu_page_url('pgpkey', FALSE))
    		wp_enqueue_script('verify-key', plugins_url('pgp-contact/js/verify-key.js'), array('jquery', 'openpgp'));
	}

    /**
     * Include js for the encrypt form
     *
     * @since 1.0
     */
    public function public_js() 
    {
    	$this->include_openpgp();
		wp_enqueue_script('encrypt', plugins_url('pgp-contact/js/encrypt.js'), array('jquery', 'openpgp'));
	}


}

// Include contact form 7 integration
require_once (plugin_dir_path(__FILE__) . 'inc/wpcf7-button.inc');

?>
