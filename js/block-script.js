wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-category' ) ; // category
wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-TAXONOMY-NAME' ) ; // custom taxonomy
wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-post_tag' ); // tags
wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'featured-image' ); // featured image
wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'post-link' ); // permalink
wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'page-attributes' ); // page attributes
wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'post-excerpt' ); // Excerpt
wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'discussion-panel' ); // Discussion
wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'template' ); // Template
wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'post-status' ); // Status


function addListBlockClassName( settings, name ) {
    //console.log(settings, name);

    switch (name) {
        case 'core/paragraph':
            settings.parent = ['acf/view'];
            break;
        case 'core/image':
            settings.parent = ['acf/view'];
            break;
        case 'core/spacer':
            settings.parent = ['acf/view'];
            break;
    }

    

    return settings;
 
}
 
wp.hooks.addFilter(
    'blocks.registerBlockType',
    'apppresser/core-blocks',
    addListBlockClassName
);

function addActionBlockEdit( BlockEdit ) {
    console.log('dddddddddddd')
}

wp.hooks.addAction(
    'all',
    'apppresser/edit-blocks',
    addActionBlockEdit
);