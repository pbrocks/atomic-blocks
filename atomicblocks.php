<?php
/**
 * Plugin Name: Atomic Blocks
 * Plugin URI: https://atomicblocks.com
 * Description: A beautiful collection of WordPress editor blocks to help you effortlessly build the website you've always wanted.
 * Author: atomicblocks
 * Author URI: http://arraythemes.com
 * Version: 1.0.3
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package ATOMIC BLOCKS
 */


/**
 * Exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Initialize the blocks
 */
function atomic_blocks_loader() {
	/**
	 * Load the blocks functionality
	 */
	require_once plugin_dir_path( __FILE__ ) . 'dist/init.php';

	/**
	 * Load Getting Started page
	 */
	require_once plugin_dir_path( __FILE__ ) . 'dist/getting-started/getting-started.php';
}
add_action( 'plugins_loaded', 'atomic_blocks_loader' );


/**
 * Load the plugin textdomain
 */
function atomic_blocks_init() {
	load_plugin_textdomain( 'atomic-blocks', false, basename( dirname( __FILE__ ) ) . '/languages' ); 
}
add_action( 'init', 'atomic_blocks_init' );


/**
 * Add a check for our plugin before redirecting
 */
function atomic_blocks_activate() {
    add_option( 'atomic_blocks_do_activation_redirect', true );
}
register_activation_hook( __FILE__, 'atomic_blocks_activate' );


/**
 * Redirect to the Atomic Blocks Getting Started page on single plugin activation
 */
function atomic_blocks_redirect() {
    if ( get_option( 'atomic_blocks_do_activation_redirect', false ) ) {
        delete_option( 'atomic_blocks_do_activation_redirect' );
        if( !isset( $_GET['activate-multi'] ) ) {
            wp_redirect( "admin.php?page=atomic-blocks" );
        }
    }
}
add_action( 'admin_init', 'atomic_blocks_redirect' );
