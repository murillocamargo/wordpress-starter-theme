<?php

if (function_exists('acf_register_block_type')) {
    add_action('acf/init', function () {
        acf_register_block_type(array(
            'name' => 'sample_block',
            'title' => __('Sample Block'),
            'description' => __('Sample Block'),
            'render_template' => dirname(__FILE__) . '/template.php',
            'category' => 'custom-theme',
            'icon' => 'wordpress',
            'keywords' => array('sample_block'),
        ));
    });
}
