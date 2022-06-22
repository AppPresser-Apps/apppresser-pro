/**
 * These are to customize Gutenberg to better suit an app builder.
 */
wp.data.dispatch("core/edit-post").removeEditorPanel("taxonomy-panel-category"); // category
wp.data.dispatch("core/edit-post").removeEditorPanel("taxonomy-panel-TAXONOMY-NAME"); // custom taxonomy
wp.data.dispatch("core/edit-post").removeEditorPanel("taxonomy-panel-post_tag"); // tags
wp.data.dispatch("core/edit-post").removeEditorPanel("featured-image"); // featured image
wp.data.dispatch("core/edit-post").removeEditorPanel("post-link"); // permalink
wp.data.dispatch("core/edit-post").removeEditorPanel("page-attributes"); // page attributes
wp.data.dispatch("core/edit-post").removeEditorPanel("post-excerpt"); // Excerpt
wp.data.dispatch("core/edit-post").removeEditorPanel("discussion-panel"); // Discussion
wp.data.dispatch("core/edit-post").removeEditorPanel("template"); // Template
wp.data.dispatch("core/edit-post").removeEditorPanel("post-status"); // Status

const isfixedToolbar = wp.data.select("core/edit-post").isFeatureActive("fixedToolbar");
if (!isfixedToolbar) {
  wp.data.dispatch("core/edit-post").toggleFeature("fixedToolbar");
}

const isEditorSidebarOpened = wp.data.select("core/edit-post").isEditorSidebarOpened();
if (!isEditorSidebarOpened) {
  console.log("open sidebar", isEditorSidebarOpened);
  wp.data.dispatch("core/edit-post").openGeneralSidebar("edit-post/document");
  wp.data.dispatch("core/edit-post").openGeneralSidebar("edit-post/block");
}

const isListViewOpened = wp.data.select("core/edit-post").isListViewOpened();
if (!isListViewOpened) {
  console.log("open list view", wp.data.dispatch("core/edit-post"));
  wp.data.dispatch("core/edit-post").setIsListViewOpened(true);
}

 /**
  * Add custom link to right toolbar to preview app
  */
( function ( wp ) {

  // check if gutenberg's editor root element is present.
  var editorEl = document.getElementById( 'editor' );
  if( !editorEl ){ // do nothing if there's no gutenberg root element on page.
      return;
  }

  var unsubscribe = wp.data.subscribe( function () {

      const post = wp.data.select( 'core/editor' ).getCurrentPost();

      if ( Object.entries(post).length === 0 ) {
        return;
      }

      var link_id = 'app-preview-link';

      // prepare our custom link's html.
      var link_html = '<a id="' + link_id + '" class="components-button" href="' + post.link + '" target="_blank">Preview App</a>';

      setTimeout( function () {
          if ( !document.getElementById( link_id ) ) {
              var toolbalEl = editorEl.querySelector( '.edit-post-header__toolbar' );
              if( toolbalEl instanceof HTMLElement ){
                  toolbalEl.insertAdjacentHTML( 'beforeend', link_html );
              }
          }
      }, 1 )
  } );
} )( window.wp );


/**
 * Filtering the block data.
 * Assigning blocks to specific parents.
 * We need this because some blocks can only be used within another block.
 */
function apppFilterBlockRegister(settings, name) {
  switch (name) {
    case "acf/view":
      settings.parent = [];
      break;
    case "acf/modal":
      settings.parent = [];
      break;
    case "acf/onboard":
      settings.parent = [];
      break;
    case "core/spacer":
      settings.category = "appp_layout";
      settings.parent = ["acf/view", "acf/modal", "acf/repeater"];
      break;
    case "acf/button":
      settings.parent = ["acf/view", "acf/modal", "acf/onboard", "acf/repeater"];
      break;
    case "acf/text":
      settings.parent = ["acf/view", "acf/modal", "acf/onboard", "acf/repeater"];
      break;
    case "acf/card":
      settings.parent = ["acf/view", "acf/modal", "acf/repeater"];
      break;
    case "acf/ion-image":
      settings.parent = ["acf/view", "acf/modal", "acf/onboard"];
      break;
    case "acf/ion-thumbnail":
      settings.parent = ["acf/view", "acf/modal", "acf/onboard"];
      break;
    case "acf/ion-avatar":
      settings.parent = ["acf/view", "acf/modal", "acf/onboard"];
      break;
    case "acf/ion-chip":
      settings.parent = ["acf/view", "acf/modal", "acf/onboard"];
      break;
    case "acf/ion-icon":
      settings.parent = ["acf/view", "acf/modal", "acf/onboard"];
      break;
    case "acf/repeater":
      settings.parent = ["acf/view", "acf/modal"];
      break;
    case "acf/breadcrumbs":
      settings.parent = ["acf/view", "acf/modal"];
      break;
    case "acf/segment":
      settings.parent = ["acf/view", "acf/modal"];
      break;
      case "acf/list-header":
        settings.parent = ["acf/view", "acf/modal"];
        break;
  }

  return settings;
}

wp.hooks.addFilter(
  "blocks.registerBlockType",
  "apppresser/blocks-filter",
  apppFilterBlockRegister
);

/**
 * DEPRECATED DO NOT DELETE: Removed class from buttons.
 * We are using css for this now.
 * @param {*} block_id
 */
function appp_remove_button_class(block_id) {
  // We need this because ion-button has a class
  // .button and WordPress editor styles is screwing up the design
  setTimeout(() => {
    const view = document.querySelector(block_id);

    var menubtns = view.querySelectorAll("ion-menu-button"),
      i;

    for (i = 0; i < menubtns.length; ++i) {
      menubtns[i].classList.remove("button");
      menubtns[i].setAttribute("auto-hide", false);
      menubtns[i].classList.remove("menu-button-hidden");
    }

    var btns = view.querySelectorAll("ion-button"),
      i;

    for (i = 0; i < btns.length; ++i) {
      btns[i].classList.remove("button");
    }
  }, 500);
}