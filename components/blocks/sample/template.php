<?php
/**
 * Block args
 */
$blockArgs = $customArgs ?? (object)[
        'text_field' => get_field('text_field'),
    ];
global $post;
?>

<div class="sample">
    <p><?= $blockArgs->text_field ?></p>
</div>
