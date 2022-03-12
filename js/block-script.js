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

const isfixedToolbar = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fixedToolbar' );

if ( !isfixedToolbar ) {
    wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fixedToolbar' );
}

function apppFilterBlockRegister( settings, name ) {
    //console.log(settings, name);

    switch (name) {
        // case 'core/paragraph':
        //     settings.category = 'appp_component';
        //     settings.parent = ['acf/view'];
        //     break;
        case 'core/image':
            settings.category = 'appp_component';
            settings.parent = ['acf/view', 'acf/onboard'];
            break;
        case 'core/spacer':
            settings.category = 'appp_component';
            settings.parent = ['acf/view'];
            break;
        case 'acf/button':
            settings.parent = ['acf/view', 'acf/onboard'];
            break;
        case 'acf/list':
            settings.parent = ['acf/view'];
            break;
        case 'acf/text':
            settings.parent = ['acf/view', 'acf/onboard'];
            break;
        case 'acf/card':
            settings.parent = ['acf/view', 'acf/repeater'];
            break;
        case 'acf/image':
            settings.parent = ['acf/view', 'acf/onboard'];
            break;
        case 'acf/repeater':
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

var el = wp.element.createElement;
 
var apppFilterBlockEdit = wp.compose.createHigherOrderComponent( function ( BlockListBlock ) {
    return function ( props ) {

       
        const parent = wp.data.select("core/block-editor").getBlockRootClientId(props.clientId);

        

        const parentAttributes = wp.data.select('core/block-editor').getBlocksByClientId(parent)[0];

        //console.log(parentAttributes);

        if( parentAttributes && parentAttributes.name === 'acf/repeater' ) {
            //console.log(parentAttributes);
            //wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes([parent], { content: 'content to update' });
            //appp_update_repeater(parentAttributes.attributes.id, parentAttributes.attributes.data.per_page);
        }
    

        return el( BlockListBlock, props );
    };
},
'apppFilterBlockEdit' );

wp.hooks.addFilter(
    'editor.BlockEdit',
    'apppresser/blocks-edit-filter',
    apppFilterBlockEdit
);
