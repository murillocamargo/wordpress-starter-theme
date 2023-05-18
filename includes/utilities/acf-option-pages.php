<?php
/**
 * Option Pages and Settings
 **/

// add acf option pages
if (function_exists('acf_add_options_page')) {

    acf_add_options_page(array(
        'page_title' => 'Example',
        'menu_title' => 'Example',
        'menu_slug' => 'edit-home',
        'capability' => 'edit_posts',
        'redirect' => false,
        'position' => '2',
        'icon_url' => 'dashicons-admin-home'
    ));
}
