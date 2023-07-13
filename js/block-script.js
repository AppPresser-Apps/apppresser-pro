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
  * Add custom links to right toolbar to preview / build app.
  */
( function ( wp ) {

  // check if gutenberg's editor root element is present.
  var editorEl = document.getElementById( 'editor' );
  if( !editorEl ){ // do nothing if there's no gutenberg root element on page.
      return;
  }

  wp.data.subscribe( function () {
      const user = wp.data.select("core").getCurrentUser();
      const post = wp.data.select( 'core/editor' ).getCurrentPost();
      const meta = post.meta;

      const siteURL = window.custom_data.siteURL;

      if ( Object.entries(post).length === 0 ) {
        return;
      }

      var download_id = 'app-download-link';
      var build_id = 'app-build-link';
      var link_id = 'app-preview-link';

      var link_html = '';

      // prepare our app link's html.

      if ( 'repo_slug' in meta && '' !== meta.repo_slug ) {
        link_html += '<a id="' + build_id + '" class="components-button">Build App</a>';
      }

      link_html += '<a id="' + download_id + '" class="components-button">Download App</a>';
      link_html += '<a id="' + link_id + '" class="components-button" href="' + post.link + '" target="_blank">Preview App</a>';

      if ( 2 === user.id ) {
        link_html += '<a id="' + link_id + '" class="components-button" href="https://localhost:3333/?url=' + siteURL + '/wp-json/apppresser/v1/app/' + post.id + '" target="_blank">Preview Dev</a>';
      }


      setTimeout( function () {
          if ( !document.getElementById( link_id ) ) {
              var toolbalEl = editorEl.querySelector( '.edit-post-header__toolbar' );
              if( toolbalEl instanceof HTMLElement ){
                  toolbalEl.insertAdjacentHTML( 'beforeend', link_html );
              }

              document.getElementById( download_id ).addEventListener( 'click', ()=> {
           
                wp.apiFetch( { path: '/apppresser/v1/app-assets/' + post.id } ).then( ( rsp ) => {
                
                    var link = document.createElement("a");
                    link.download = post.slug;
                    link.href = rsp;
                    link.click();

                } );

              })

              document.getElementById( build_id ).addEventListener( 'click', ()=> {

                if (! confirm('Are you sure you want to start a build?')) {
                  return;
                } 

                const buildDate = wp.data.select('core/editor').getEditedPostAttribute('meta').build_date;
                const buildDateTimestamp = new Date(buildDate).getTime();
                const currentTimestamp = Date.now();
                const differenceInMinutes = Math.floor((currentTimestamp - buildDateTimestamp) / (1000 * 60));
                console.log(differenceInMinutes);

                if (differenceInMinutes < 5) {
                  alert('You must wait 5 minutes between builds.');
                  return;
                }

                const options = {
                  method: 'POST',
                  headers: {
                    Accept: 'application/vnd.github+json',
                    'Content-Type': 'application/json',
                    'X-GitHub-Api-Version': '2022-11-28',
                    Authorization: 'Bearer ' + meta.gh_token
                  },
                  body: '{"ref":"' + meta.build_type +'","inputs":{"message":"https://my.apppresser.com/apppresser/wp-json/apppresser/v1/app-assets/' + post.id +'"}}'
                };
     
                fetch('https://api.github.com/repos/AppPresser-Apps/' + meta.repo_slug + '/actions/workflows/copy.yml/dispatches', options)
                  .then(response => {
                    console.log(response)
                    wp.data.dispatch('core/editor').editPost({ meta: { build_date: Date.now() } });
                    alert('Build started.')
                  })
                  .catch(err => {
                    console.error(err)
                    alert('Build failed.')
                  });

              })

          }
      }, 10 )

  } );
} )( window.wp );

/**
 * Filtering the block data.
 * Assigning blocks to specific parents.
 * We need this because some blocks can only be used within another block.
 * TODO: remove the allowed blocks from php files and place here. 
 */
function apppFilterBlockRegister(settings, name) {
  switch (name) {
    case "acf/view":
      settings.parent = ['core/post-content'];
      break;
    case "acf/modal":
      settings.parent = ['core/post-content'];
      break;
    case "acf/popover":
      settings.parent = ['core/post-content'];
      break;
    case "acf/onboard":
      settings.parent = ['core/post-content'];
      break;
    case "acf/action-sheet":
      settings.parent = ['core/post-content'];
      break;
    case "acf/ion-tabs":
      settings.parent = ['core/post-content'];
      break;
    case "acf/side-menu":
      settings.parent = ['core/post-content'];
      settings.supports['multiple'] = false;
      // settings.edit = (props) => {

      //   const innerBlockCount = wp.data.select( 'core/block-editor' ).getBlock( props.clientId ).innerBlocks;
      //   const InnerBlocks = wp.editor.InnerBlocks;
      //   const el = wp.element.createElement;
  
      //   const appenderToUse = () => {
      //     if ( innerBlockCount.length <= 0 ) {
      //       return InnerBlocks.DefaultBlockAppender;
      //     } else {
      //       return false;
      //     }
      //   }

      //   return (
      //     //el(BlockControls, { key: 'controls' }, //Need to remove or change this
      //         el('div', { className: props.className },
      //           el( 'div', { style: {minHeight: '10px'}} ),
      //           el( InnerBlocks, { renderAppender: appenderToUse() } )
      //         )
      //     //),
      //   );

    
      // }
      break;
    case "acf/fetch":
      settings.parent = ["acf/view"];
      break;
    case "acf/form":
      settings.parent = ["acf/view", 'acf/modal', 'acf/conditional'];
      break;
    case "core/spacer":
      settings.category = "appp_layout";
      settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/repeater", "acf/popover", 'acf/subrepeater'];
      break;
    case "acf/button":
      settings.parent = ["acf/view", "acf/modal", "acf/onboard", "acf/side-menu", "acf/repeater", "acf/popover", 'acf/subrepeater'];
      break;
    case "acf/text":
      settings.parent = ["acf/view", "acf/modal", "acf/onboard", "acf/form", "acf/side-menu", "acf/repeater", "acf/popover", 'acf/subrepeater'];
      break;
    case "acf/card":
      settings.parent = ["acf/view", "acf/modal", "acf/repeater", 'acf/subrepeater'];
      break;
    case "acf/ion-image":
      settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/onboard", "acf/popover", 'acf/subrepeater'];
      break;
    case "acf/ion-thumbnail":
      settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/onboard", "acf/popover", 'acf/subrepeater'];
      break;
    case "acf/ion-avatar":
      settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/onboard", "acf/popover", 'acf/subrepeater'];
      break;
    case "acf/ion-chip":
      settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/onboard", "acf/popover", 'acf/subrepeater'];
      break;
    case "acf/ion-icon":
      settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/onboard", "acf/popover", 'acf/subrepeater'];
      break;
    case "acf/repeater":
      settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/popover"];
      break;
    case "acf/subrepeater":
      settings.parent = ["acf/repeater", "acf/subrepeater"];
      break;
    case "acf/breadcrumbs":
      settings.parent = ["acf/view", "acf/modal"];
      break;
    case "acf/segment":
      settings.parent = ["acf/view", "acf/modal"];
      break;
      case "acf/list-header":
        settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/popover", 'acf/subrepeater'];
        break;
      case "acf/ion-item":
        settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/ion-menu-toggle", "acf/popover", 'acf/repeater', 'acf/subrepeater'];
        break;
      case "acf/inner-segment":
        settings.parent = ["acf/segment", "acf/popover"];
        break;
      case "acf/date-time":
        settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/popover", 'acf/subrepeater'];
        break;
      case "acf/wysiwyg":
        settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/popover", 'acf/repeater', 'acf/subrepeater'];
        break;
      case "acf/action":
        settings.parent = ["acf/view", "acf/modal", "acf/side-menu", "acf/ion-menu-toggle", "acf/popover", 'acf/repeater', 'acf/subrepeater', 'acf/form'];
        break;
      case "acf/iframe":
        settings.parent = ["acf/view", "acf/modal", 'acf/action'];
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
 * DO NOT DELETE: Removed class from buttons.
 * @param {*} block_id
 */
function appp_remove_button_class(block_id) {
  //console.log(block_id);
  // We need this because ion-button has a class
  // .button and WordPress editor styles is screwing up the design
  // setTimeout(() => {
  //   const view = document.querySelector(block_id);
  //   const content = view.querySelector("ion-content");

  //   var btns = content.querySelectorAll("ion-button"),
  //     i;

  //   for (i = 0; i < btns.length; ++i) {
  //     btns[i].classList.remove("button");
  //   }
  // }, 500);
}


  // wp.data.subscribe( function () {
  //   const data = wp.data.select( 'core/block-editor' );
  //   const selected = data.getSelectedBlock();

  //   if ( selected && 'acf/ion-menu-toggle' === selected.name ) {
  //     console.log(selected);
  //   }
    
  // });

  //block.js
// (function( editor, element ) {
//   const registerBlockType = wp.blocks.registerBlockType;
//   const el = element.createElement;
//   const InnerBlocks = editor.InnerBlocks;

//   //const BlockControls = editor.BlockControls; //Remove or change this
//   const allowedBlocks = [ 'acf/text' ];
//   //const icon = el('svg', { width: 24, height: 24 }, el('path', {d: "M 0.71578,2 C 0.32064,2 0,2.3157307 0,2.7060291 V 21.294175 C 0,21.683751 0.32064,22 0.71578,22 H 23.28422 C 23.67936,21.999999 24,21.68375 24,21.294174 V 5.9812162 2.7060291 C 24,2.3157307 23.67936,2 23.28422,2 Z M 1.43136,3.411854 H 22.56864 V 5.9812162 H 1.43136 Z m 15.96822,0.4609128 c -0.46106,0 -0.83495,0.3687886 -0.83495,0.8235651 0,0.4549561 0.37389,0.8237674 0.83495,0.8237674 0.46124,0 0.83494,-0.3688113 0.83494,-0.8237674 0,-0.4547765 -0.3737,-0.8235651 -0.83494,-0.8235651 z m 2.78339,0 c -0.46124,0 -0.83515,0.3687886 -0.83515,0.8235651 0,0.4549561 0.37391,0.8237674 0.83515,0.8237674 0.46106,0 0.83494,-0.3688113 0.83494,-0.8237674 0,-0.4547765 -0.37388,-0.8235651 -0.83494,-0.8235651 z M 3.65005,3.990507 c -0.39514,0 -0.71557,0.316068 -0.71557,0.7058249 0,0.3899364 0.32043,0.7060281 0.71557,0.7060281 h 8.92617 c 0.39533,0 0.71579,-0.3160917 0.71579,-0.7060281 0,-0.3897569 -0.32046,-0.7058249 -0.71579,-0.7058249 z M 1.43136,7.3930022 H 22.56864 V 20.588214 H 1.43136 Z m 7.89453,1.5110662 c -0.16452,0 -0.32898,0.05577 -0.46246,0.1672098 -0.53833,0.4497184 -4.5418,3.7936988 -5.09862,4.2587688 -0.30157,0.251951 -0.33909,0.697517 -0.0837,0.994982 0.25543,0.297464 0.70697,0.33447 1.00873,0.08252 l 0.0299,-0.02491 v 3.282584 H 3.93296 c -0.39533,0 -0.71579,0.316024 -0.71579,0.705961 0,0.389937 0.32046,0.706028 0.71579,0.706028 h 16.13408 c 0.39533,0 0.71579,-0.316091 0.71579,-0.706028 0,-0.389937 -0.32046,-0.705961 -0.71579,-0.705961 h -1.57797 v -1.656765 h 1.04279 c 0.4801,0 0.82469,-0.458384 0.68462,-0.911716 L 18.45791,9.4042733 c -0.20526,-0.6650049 -1.16379,-0.6650049 -1.36924,0 l -1.75836,5.6924727 c -0.14007,0.453151 0.20415,0.911716 0.68462,0.911716 h 1.04278 v 1.656764 h -3.1256 v -3.282584 l 0.0299,0.02491 c 0.30176,0.251951 0.7533,0.214945 1.00873,-0.08252 0.25543,-0.297465 0.21792,-0.743031 -0.0837,-0.994982 C 14.37068,12.898749 10.59208,9.7426047 9.78843,9.0712782 9.65494,8.9598418 9.49041,8.9040684 9.32589,8.9040684 Z m 0,1.6310446 3.17472,2.651678 v 4.478436 h -0.99242 v -3.38553 c 0,-0.389937 -0.32043,-0.706028 -0.71558,-0.706028 H 7.85924 c -0.39533,0 -0.71572,0.316091 -0.71572,0.706028 v 3.38553 H 6.15103 v -4.478436 h 2.1e-4 z m 8.4474,1.497088 0.79229,2.564476 h -1.58437 z m -9.19848,2.953457 h 1.50202 v 2.679569 H 8.57481 Z"}) );
//   registerBlockType( 'custom/section', {
//       title: 'Custom Section',
//       description: 'Custom Section',
//       icon: 'controls-repeat',
//       category: 'layout',
//       parent: 'acf/view',
//       keywords: ['custom Section'],
//       //Edit
//       edit: function( props ) {

//         console.log('props', props);

//         const innerBlockCount = wp.data.select( 'core/block-editor' ).getBlock( props.clientId ).innerBlocks;
  
//           const appenderToUse = () => {
//             if ( innerBlockCount.length <= 0 ) {
//               return InnerBlocks.DefaultBlockAppender;
//             } else {
//               return false;
//             }
//           }

//           return (
//               //el(BlockControls, { key: 'controls' }, //Need to remove or change this
//                   el('div', { className: props.className },
//                     el( 'div', { style: {minHeight: '10px'}} ),
//                     el( InnerBlocks, { allowedBlocks: allowedBlocks, renderAppender: appenderToUse() } )
//                   )
//               //),
//           );
//       },
//       //Save
//       save: function( props ) {
//           return (
//               el('div', { className: props.className }, //Need add props.className to render saved content
//                   el('div', { className: 'custom-sec-inner' },
//                       el( InnerBlocks.Content, null )
//                   )
//               )
//           );
//       }
//   });
//   })(
//       window.wp.blockEditor,
//       window.wp.element
//   );