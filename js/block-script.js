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
 * Filtering the block data.
 * Assigning blocks to specific parents.
 * We need this because some blocks can only be used within another block.
 */
function apppFilterBlockRegister(settings, name) {
  switch (name) {
    case "core/image":
      settings.category = "appp_component";
      settings.parent = ["acf/view", "acf/onboard"];
      break;
    case "core/spacer":
      settings.category = "appp_layout";
      settings.parent = ["acf/view", "acf/repeater"];
      break;
    case "acf/button":
      settings.parent = ["acf/view", "acf/onboard", "acf/repeater"];
      break;
    case "acf/list":
      settings.parent = ["acf/view"];
      break;
    case "acf/text":
      settings.parent = ["acf/view", "acf/onboard", "acf/repeater"];
      break;
    case "acf/card":
      settings.parent = ["acf/view", "acf/repeater"];
      break;
    case "acf/image":
      settings.parent = ["acf/view", "acf/onboard"];
      break;
    case "acf/repeater":
      settings.parent = ["acf/view"];
      break;
    case "acf/breadcrumbs":
      settings.parent = ["acf/view"];
      break;
    case "acf/segment":
      settings.parent = ["acf/view"];
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
 * DEPRECATED: Removed class from buttons.
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