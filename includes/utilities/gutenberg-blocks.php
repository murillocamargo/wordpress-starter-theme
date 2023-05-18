<?php

function gutenberg_custom_theme_category($categories, $post)
{
    if ($post->post_type !== 'post' && $post->post_type !== 'page') {
        return $categories;
    }
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'custom-theme',
                'title' => __('Custom Theme'),
                'icon' => 'dashicons-awards',
            ),
        )
    );
}

add_filter('block_categories', 'gutenberg_custom_theme_category', 10, 2);

function objectFilterDefault($data, $default)
{
    $newData = $default;
    foreach ($data as $k => $value) {
        if (!empty($value) && !is_null($value)) {
            $newData->{$k} = $value;
        }
    }

    return $newData;
}

function includeBlock($blockName, $customArgs = [], $block = [])
{
    include(locate_template("components/blocks/{$blockName}/template.php", false, false));
}

/**
 * Include every block setup inside /template-partgs/blocks/
 */
foreach (glob(get_template_directory() . '/components/blocks/*/setup.php') as $filename) {
    include $filename;
}
