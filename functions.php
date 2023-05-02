<?php

define('THEME_WEB_ROOT', get_template_directory_uri());
define('THEME_DOCUMENT_ROOT', get_template_directory());

define('STYLE_WEB_ROOT', get_stylesheet_directory_uri());
define('STYLE_DOCUMENT_ROOT', get_stylesheet_directory());

add_theme_support('post-thumbnails');

function my_init()
{
    add_theme_support('post-thumbnails');

    if (!is_admin()) {

        wp_deregister_script('jquery');
        wp_deregister_script('jquery-migrate');

        wp_register_script('main-js', get_template_directory_uri() . '/assets/scripts/frontend.min.js', false, '1.0.0', true);
        wp_register_style('main-css', get_template_directory_uri() . '/assets/css/frontend.min.css');

        wp_enqueue_style('material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', false);

        wp_enqueue_script('main-js');
        wp_enqueue_style('main-css');
    }
}

function register_my_menu()
{
    register_nav_menu('main-menu', __('Main Menu'));
}

add_action('wp_enqueue_scripts', 'my_init');
add_action('init', 'register_my_menu');

//reserved words: ‘thumb’, ‘thumbnail’, ‘medium’, ‘large’, ‘post-thumbnail’
set_post_thumbnail_size(300, 200, true);
//add_image_size('main-headline', 640, 350, true);

// remove junk from head
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'parent_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
