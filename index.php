<?php

/**
 * Plugin Name: WP Code Tabs
 * Version:     1.0.0
 * Author:      Casey Yates
 * Description: Display related code segments with a tabbed interface
 */

define('CYCT_DIR', plugin_dir_path(__FILE__));
define('CYCT_URL', plugin_dir_url(__FILE__));

function cyct_register_dev_blocks()
{

  $editor_reqs = include_once('build/editor.asset.php');

  $ui_reqs = include_once('build/index.asset.php');
  $ui_reqs['dependencies'][] = 'cyct-syntax-hightlighter-php';

  wp_register_script(
    'cyct-syntax-hightlighter',
    'https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/scripts/shCore.min.js',
    [],
    ''
  );

  wp_register_script(
    'cyct-syntax-hightlighter-php',
    'https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/scripts/shBrushPhp.min.js',
    ['cyct-syntax-hightlighter'],
    ''
  );

  wp_register_script(
    'cyct-syntax-hightlighter-js',
    'https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/scripts/shBrushJScript.min.js',
    [],
    ''
  );

  // Register JavasScript File build/index.js
  wp_register_script(
    'cyct-blocks-editor-scripts',
    plugins_url('build/editor.js', __FILE__),
    $editor_reqs['dependencies'],
    filemtime(CYCT_DIR . 'build/editor.js')
  );

  wp_register_script(
    'cyct-blocks-frontend-scripts',
    plugins_url('build/index.js', __FILE__),
    $ui_reqs['dependencies'],
    filemtime(CYCT_DIR . 'build/index.js'),
  );

  // Register editor style src/editor.css
  wp_register_style(
    'cyct-blocks-editor-style',
    plugins_url('build/editor.css', __FILE__),
    array('wp-edit-blocks'),
    filemtime(CYCT_DIR . 'build/editor.css')
  );

  wp_register_style(
    'cyct-syntaxhighlighter-theme-style',
    'https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/styles/shCoreDefault.min.css',
    array(),
    ''
  );

  wp_register_style(
    'cyct-syntaxhighlighter-style',
    'https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/styles/shCore.min.css',
    array('cyct-syntaxhighlighter-theme-style'),
    ''
  );

  // Register front end block style src/index.css
  wp_register_style(
    'cyct-blocks-frontend-style',
    plugins_url('build/index.css', __FILE__),
    array('cyct-syntaxhighlighter-style'),
    filemtime(CYCT_DIR . 'build/index.css')
  );

  // Register your block
  register_block_type('cyct/code-tabs', array(
    'editor_script' => 'cyct-blocks-editor-scripts',
    'editor_style' => 'cyct-blocks-editor-style',
    'script' => 'cyct-blocks-frontend-scripts',
    'style' => 'cyct-blocks-frontend-style',
  ));
}

add_action('init', 'cyct_register_dev_blocks');
