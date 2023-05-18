<?php

define('THEME_WEB_ROOT', get_template_directory_uri());
define('THEME_DOCUMENT_ROOT', get_template_directory());

define('STYLE_WEB_ROOT', get_stylesheet_directory_uri());
define('STYLE_DOCUMENT_ROOT', get_stylesheet_directory());

/**
 * Get cache busting hashed filename from manifest.
 *
 * @param string $filename Original name of the file.
 * @return string Current cache busting hashed name of the file.
 */
function custom_theme_get_asset_path(string $filename): string
{
    static $manifest = null;

    if (null === $manifest) {
        $manifest_path = get_stylesheet_directory() . "/dist/manifest.json";
        $manifest = file_exists($manifest_path)
            ? json_decode(file_get_contents($manifest_path), true)
            : [];
    }

    if (array_key_exists($filename, $manifest)) {
        return $manifest[$filename];
    }

    return $filename;
}

/*********************
 * ENQUEUE FILES CSS/JS
 *********************/

// Enqueue theme styles and scripts.
function custom_theme_enqueue_assets()
{
    if (is_admin() === false) {
        wp_enqueue_style(
            "custom-theme-dist-main",
            STYLE_WEB_ROOT . "/dist/" . custom_theme_get_asset_path("main.css"),
            [],
            false,
            "print",
        );

        wp_enqueue_script(
            "custom-theme-dist-main",
            STYLE_WEB_ROOT . "/dist/" . custom_theme_get_asset_path("main.js"),
            [],
            false,
            true
        );
    }
}

add_action('wp_enqueue_scripts', 'custom_theme_enqueue_assets');

// Load styles async.
add_filter("style_loader_tag", function ($tag) {
    if (preg_match("/custom-theme-dist-main/", $tag) !== 1) {
        return $tag;
    }

    return preg_replace("/ \/>$/", " onload=\"this.media='all'\" />", $tag);
});

// Defer Javscript loading.
add_filter("script_loader_tag", function ($tag) {
    if (preg_match("/custom-theme-dist-main/", $tag) !== 1) {
        return $tag;
    }

    return preg_replace("/^\<script /", "<script defer ", $tag);
});

/*********************
 * THEME SUPPORT
 *********************/

add_action("after_setup_theme", "custom_theme_support");
function custom_theme_support()
{
    // thumbnails
    add_theme_support('post-thumbnails');

    // wp menus
    add_theme_support("menus");

    // registering wp3+ menus
    register_nav_menus([
        "main-nav" => __("The Main Menu", "custom-theme"),
    ]);
}

/*********************
 * IMAGE SIZES
 *********************/

//reserved words: ‘thumb’, ‘thumbnail’, ‘medium’, ‘large’, ‘post-thumbnail’

set_post_thumbnail_size(300, 200, true);

//add_image_size('main-headline', 640, 350, true);

/*********************
 * UTILITIES
 *********************/

require_once get_template_directory() . '/includes/utilities/acf-settings.php';
require_once get_template_directory() . '/includes/utilities/acf-option-pages.php';
require_once get_template_directory() . '/includes/utilities/gutenberg-blocks.php';

// remove junk from head
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'parent_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
