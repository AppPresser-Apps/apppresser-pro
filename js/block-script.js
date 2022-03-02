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


function apppFilterBlockRegister( settings, name ) {
    //console.log(settings, name);

    switch (name) {
        case 'core/paragraph':
            settings.category = 'appp_component';
            settings.parent = ['acf/view'];
            break;
        case 'core/image':
            settings.category = 'appp_component';
            settings.parent = ['acf/view'];
            break;
        case 'core/spacer':
            settings.category = 'appp_component';
            settings.parent = ['acf/view'];
            break;
        case 'acf/button':
            settings.parent = ['acf/view'];
            break;
        case 'acf/list':
            settings.parent = ['acf/view'];
            break;
    }

    return settings;
 
}
 
wp.hooks.addFilter(
    'blocks.registerBlockType',
    'apppresser/blocks-filter',
    apppFilterBlockRegister
);