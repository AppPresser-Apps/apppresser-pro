import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-6c5afe2f.js';
export { s as setNonce } from './index-6c5afe2f.js';
import { g as globalScripts } from './app-globals-bcc9d5c5.js';
import './ionic-global-74a19eaa.js';
import './index-7c8dd725.js';
import './utils-31c050e6.js';
import './animation-6410f855.js';
import './helpers-6885e51a.js';
import './index-5aa6aa3e.js';
import './ios.transition-f8c322b0.js';
import './index-0fa2abb2.js';
import './md.transition-131fa152.js';
import './cubic-bezier-1ddfda32.js';
import './index-20a27e5b.js';
import './config-af47d636.js';
import './index-ed30b664.js';
import './hardware-back-button-fa04d6e9.js';
import './overlays-ef00d22b.js';
import './framework-delegate-c3343c4d.js';
import './index-2ee22356.js';

/*
 Stencil Client Patch Browser v2.22.3 | MIT Licensed | https://stenciljs.com
 */
/**
 * Helper method for querying a `meta` tag that contains a nonce value
 * out of a DOM's head.
 *
 * @param doc The DOM containing the `head` to query against
 * @returns The content of the meta tag representing the nonce value, or `undefined` if no tag
 * exists or the tag has no content.
 */
function queryNonceMetaTagContent(doc) {
    var _a, _b, _c;
    return (_c = (_b = (_a = doc.head) === null || _a === void 0 ? void 0 : _a.querySelector('meta[name="csp-nonce"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('content')) !== null && _c !== void 0 ? _c : undefined;
}
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-64053c71.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            var _a;
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                // Apply CSP nonce to the script tag if it exists
                const nonce = (_a = plt.$nonce$) !== null && _a !== void 0 ? _a : queryNonceMetaTagContent(doc);
                if (nonce != null) {
                    script.setAttribute('nonce', nonce);
                }
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy(JSON.parse("[[\"app-input\",[[0,\"app-input\",{\"data\":[8],\"api\":[8],\"state\":[32],\"updateInput\":[64],\"reloadInput\":[64]}]]],[\"app-root\",[[0,\"app-root\",{\"data\":[32],\"openDatabase\":[64],\"setTransient\":[64],\"getTransient\":[64],\"setApi\":[64],\"getApi\":[64],\"emitActionEvent\":[64],\"back\":[64]},[[8,\"ionRouteWillChange\",\"dismissPopover\"]]]]],[\"acf-view\",[[0,\"acf-view\",{\"data\":[8],\"api\":[32],\"props\":[32],\"attrs\":[32],\"loaded\":[32]}]]],[\"acf-modal\",[[0,\"acf-modal\",{\"data\":[8],\"api\":[8]}]]],[\"acf-popover\",[[0,\"acf-popover\",{\"data\":[8]},[[8,\"ionRouteDidChange\",\"dismissPopover\"]]]]],[\"app-post-form\",[[0,\"app-post-form\",{\"placeholder\":[1025],\"reply\":[4],\"item\":[8],\"args\":[8],\"data\":[8]}]]],[\"appp-avatar-modal\",[[0,\"appp-avatar-modal\",{\"avatarUrl\":[8,\"avatar-url\"],\"range\":[32]}]]],[\"attachment-modal\",[[0,\"attachment-modal\",{\"item\":[8]}]]],[\"pop-activity\",[[0,\"pop-activity\",{\"activity\":[8],\"item\":[8]}]]],[\"pop-user\",[[0,\"pop-user\"]]],[\"ion-fab-button\",[[33,\"ion-fab-button\",{\"color\":[513],\"activated\":[4],\"disabled\":[4],\"download\":[1],\"href\":[1],\"rel\":[1],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16],\"target\":[1],\"show\":[4],\"translucent\":[4],\"type\":[1],\"size\":[1],\"closeIcon\":[1,\"close-icon\"]}]]],[\"ion-loading\",[[34,\"ion-loading\",{\"overlayIndex\":[2,\"overlay-index\"],\"delegate\":[16],\"hasController\":[4,\"has-controller\"],\"keyboardClose\":[4,\"keyboard-close\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"message\":[1],\"cssClass\":[1,\"css-class\"],\"duration\":[2],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"showBackdrop\":[4,\"show-backdrop\"],\"spinner\":[1025],\"translucent\":[4],\"animated\":[4],\"htmlAttributes\":[16],\"isOpen\":[4,\"is-open\"],\"trigger\":[1],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64]}]]],[\"ion-picker\",[[34,\"ion-picker\",{\"overlayIndex\":[2,\"overlay-index\"],\"delegate\":[16],\"hasController\":[4,\"has-controller\"],\"keyboardClose\":[4,\"keyboard-close\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"buttons\":[16],\"columns\":[16],\"cssClass\":[1,\"css-class\"],\"duration\":[2],\"showBackdrop\":[4,\"show-backdrop\"],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"animated\":[4],\"htmlAttributes\":[16],\"isOpen\":[4,\"is-open\"],\"trigger\":[1],\"presented\":[32],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64],\"getColumn\":[64]}]]],[\"ion-refresher-content\",[[0,\"ion-refresher-content\",{\"pullingIcon\":[1025,\"pulling-icon\"],\"pullingText\":[1,\"pulling-text\"],\"refreshingSpinner\":[1025,\"refreshing-spinner\"],\"refreshingText\":[1,\"refreshing-text\"]}]]],[\"ion-toast\",[[33,\"ion-toast\",{\"overlayIndex\":[2,\"overlay-index\"],\"delegate\":[16],\"hasController\":[4,\"has-controller\"],\"color\":[513],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"cssClass\":[1,\"css-class\"],\"duration\":[2],\"header\":[1],\"layout\":[1],\"message\":[1],\"keyboardClose\":[4,\"keyboard-close\"],\"position\":[1],\"buttons\":[16],\"translucent\":[4],\"animated\":[4],\"icon\":[1],\"htmlAttributes\":[16],\"isOpen\":[4,\"is-open\"],\"trigger\":[1],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64]}]]],[\"appp-avatar\",[[0,\"appp-avatar\",{\"height\":[1],\"width\":[1],\"avatarUrl\":[32],\"displayName\":[32]}]]],[\"ion-item-option\",[[33,\"ion-item-option\",{\"color\":[513],\"disabled\":[4],\"download\":[1],\"expandable\":[4],\"href\":[1],\"rel\":[1],\"target\":[1],\"type\":[1]}]]],[\"ion-reorder\",[[33,\"ion-reorder\",null,[[2,\"click\",\"onClick\"]]]]],[\"ion-searchbar\",[[34,\"ion-searchbar\",{\"color\":[513],\"animated\":[4],\"autocomplete\":[1],\"autocorrect\":[1],\"cancelButtonIcon\":[1,\"cancel-button-icon\"],\"cancelButtonText\":[1,\"cancel-button-text\"],\"clearIcon\":[1,\"clear-icon\"],\"debounce\":[2],\"disabled\":[4],\"inputmode\":[1],\"enterkeyhint\":[1],\"placeholder\":[1],\"searchIcon\":[1,\"search-icon\"],\"showCancelButton\":[1,\"show-cancel-button\"],\"showClearButton\":[1,\"show-clear-button\"],\"spellcheck\":[4],\"type\":[1],\"value\":[1025],\"focused\":[32],\"noAnimate\":[32],\"setFocus\":[64],\"getInputElement\":[64]}]]],[\"appp-attachment\",[[4,\"appp-attachment\"]]],[\"appp-avatar-button\",[[4,\"appp-avatar-button\"]]],[\"ion-badge\",[[33,\"ion-badge\",{\"color\":[513]}]]],[\"ion-col\",[[1,\"ion-col\",{\"offset\":[1],\"offsetXs\":[1,\"offset-xs\"],\"offsetSm\":[1,\"offset-sm\"],\"offsetMd\":[1,\"offset-md\"],\"offsetLg\":[1,\"offset-lg\"],\"offsetXl\":[1,\"offset-xl\"],\"pull\":[1],\"pullXs\":[1,\"pull-xs\"],\"pullSm\":[1,\"pull-sm\"],\"pullMd\":[1,\"pull-md\"],\"pullLg\":[1,\"pull-lg\"],\"pullXl\":[1,\"pull-xl\"],\"push\":[1],\"pushXs\":[1,\"push-xs\"],\"pushSm\":[1,\"push-sm\"],\"pushMd\":[1,\"push-md\"],\"pushLg\":[1,\"push-lg\"],\"pushXl\":[1,\"push-xl\"],\"size\":[1],\"sizeXs\":[1,\"size-xs\"],\"sizeSm\":[1,\"size-sm\"],\"sizeMd\":[1,\"size-md\"],\"sizeLg\":[1,\"size-lg\"],\"sizeXl\":[1,\"size-xl\"]},[[9,\"resize\",\"onResize\"]]]]],[\"ion-fab\",[[1,\"ion-fab\",{\"horizontal\":[1],\"vertical\":[1],\"edge\":[4],\"activated\":[1028],\"close\":[64],\"toggle\":[64]}]]],[\"ion-fab-list\",[[1,\"ion-fab-list\",{\"activated\":[4],\"side\":[1]}]]],[\"ion-grid\",[[1,\"ion-grid\",{\"fixed\":[4]}]]],[\"ion-item-divider\",[[33,\"ion-item-divider\",{\"color\":[513],\"sticky\":[4]}]]],[\"ion-item-group\",[[32,\"ion-item-group\"]]],[\"ion-item-options\",[[32,\"ion-item-options\",{\"side\":[1],\"fireSwipeEvent\":[64]}]]],[\"ion-item-sliding\",[[0,\"ion-item-sliding\",{\"disabled\":[4],\"state\":[32],\"getOpenAmount\":[64],\"getSlidingRatio\":[64],\"open\":[64],\"close\":[64],\"closeOpened\":[64]}]]],[\"ion-nav-link\",[[0,\"ion-nav-link\",{\"component\":[1],\"componentProps\":[16],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16]}]]],[\"ion-progress-bar\",[[33,\"ion-progress-bar\",{\"type\":[1],\"reversed\":[4],\"value\":[2],\"buffer\":[2],\"color\":[513]}]]],[\"ion-refresher\",[[32,\"ion-refresher\",{\"pullMin\":[2,\"pull-min\"],\"pullMax\":[2,\"pull-max\"],\"closeDuration\":[1,\"close-duration\"],\"snapbackDuration\":[1,\"snapback-duration\"],\"pullFactor\":[2,\"pull-factor\"],\"disabled\":[4],\"nativeRefresher\":[32],\"state\":[32],\"complete\":[64],\"cancel\":[64],\"getProgress\":[64]}]]],[\"ion-reorder-group\",[[0,\"ion-reorder-group\",{\"disabled\":[4],\"state\":[32],\"complete\":[64]}]]],[\"ion-router-link\",[[1,\"ion-router-link\",{\"color\":[513],\"href\":[1],\"rel\":[1],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16],\"target\":[1]}]]],[\"ion-router-outlet\",[[1,\"ion-router-outlet\",{\"mode\":[1025],\"delegate\":[16],\"animated\":[4],\"animation\":[16],\"swipeHandler\":[16],\"commit\":[64],\"setRouteId\":[64],\"getRouteId\":[64]}]]],[\"ion-row\",[[1,\"ion-row\"]]],[\"ion-skeleton-text\",[[1,\"ion-skeleton-text\",{\"animated\":[4]}]]],[\"ion-tab\",[[1,\"ion-tab\",{\"active\":[1028],\"delegate\":[16],\"tab\":[1],\"component\":[1],\"setActive\":[64]}]]],[\"ion-tabs\",[[1,\"ion-tabs\",{\"useRouter\":[1028,\"use-router\"],\"selectedTab\":[32],\"select\":[64],\"getTab\":[64],\"getSelected\":[64],\"setRouteId\":[64],\"getRouteId\":[64]}]]],[\"jeep-sqlite\",[[1,\"jeep-sqlite\",{\"autoSave\":[516,\"autosave\"],\"wasmPath\":[513,\"wasmpath\"],\"innerAutoSave\":[32],\"innerWasmPath\":[32],\"echo\":[64],\"createConnection\":[64],\"isConnection\":[64],\"closeConnection\":[64],\"open\":[64],\"close\":[64],\"getVersion\":[64],\"execute\":[64],\"executeSet\":[64],\"run\":[64],\"query\":[64],\"getTableList\":[64],\"isDBExists\":[64],\"isDBOpen\":[64],\"deleteDatabase\":[64],\"isStoreOpen\":[64],\"copyFromAssets\":[64],\"isTableExists\":[64],\"createSyncTable\":[64],\"getSyncDate\":[64],\"setSyncDate\":[64],\"isJsonValid\":[64],\"importFromJson\":[64],\"exportToJson\":[64],\"deleteExportedRows\":[64],\"addUpgradeStatement\":[64],\"isDatabase\":[64],\"getDatabaseList\":[64],\"checkConnectionsConsistency\":[64],\"saveToStore\":[64],\"getFromHTTPRequest\":[64]}]]],[\"modal-pop\",[[4,\"modal-pop\",{\"modal\":[8],\"direction\":[1]}]]],[\"attachment-button\",[[0,\"attachment-button\"]]],[\"attachments-grid\",[[0,\"attachments-grid\"]]],[\"ion-menu\",[[33,\"ion-menu\",{\"contentId\":[513,\"content-id\"],\"menuId\":[513,\"menu-id\"],\"type\":[1025],\"disabled\":[1028],\"side\":[513],\"swipeGesture\":[4,\"swipe-gesture\"],\"maxEdgeStart\":[2,\"max-edge-start\"],\"isPaneVisible\":[32],\"isEndSide\":[32],\"isOpen\":[64],\"isActive\":[64],\"open\":[64],\"close\":[64],\"toggle\":[64],\"setOpen\":[64]},[[16,\"ionSplitPaneVisible\",\"onSplitPaneChanged\"],[2,\"click\",\"onBackdropClick\"],[0,\"keydown\",\"onKeydown\"]]]]],[\"ion-tab-button\",[[33,\"ion-tab-button\",{\"disabled\":[4],\"download\":[1],\"href\":[1],\"rel\":[1],\"layout\":[1025],\"selected\":[1028],\"tab\":[1],\"target\":[1]},[[8,\"ionTabBarChanged\",\"onTabBarChanged\"]]]]],[\"ion-app\",[[0,\"ion-app\",{\"setFocus\":[64]}]]],[\"ion-nav\",[[1,\"ion-nav\",{\"delegate\":[16],\"swipeGesture\":[1028,\"swipe-gesture\"],\"animated\":[4],\"animation\":[16],\"rootParams\":[16],\"root\":[1],\"push\":[64],\"insert\":[64],\"insertPages\":[64],\"pop\":[64],\"popTo\":[64],\"popToRoot\":[64],\"removeIndex\":[64],\"setRoot\":[64],\"setPages\":[64],\"setRouteId\":[64],\"getRouteId\":[64],\"getActive\":[64],\"getByIndex\":[64],\"canGoBack\":[64],\"getPrevious\":[64]}]]],[\"ion-picker-column\",[[32,\"ion-picker-column\",{\"col\":[16]}]]],[\"ion-route\",[[0,\"ion-route\",{\"url\":[1],\"component\":[1],\"componentProps\":[16],\"beforeLeave\":[16],\"beforeEnter\":[16]}]]],[\"ion-route-redirect\",[[0,\"ion-route-redirect\",{\"from\":[1],\"to\":[1]}]]],[\"ion-router\",[[0,\"ion-router\",{\"root\":[1],\"useHash\":[4,\"use-hash\"],\"canTransition\":[64],\"push\":[64],\"back\":[64],\"printDebug\":[64],\"navChanged\":[64]},[[8,\"popstate\",\"onPopState\"],[4,\"ionBackButton\",\"onBackButton\"]]]]],[\"ion-split-pane\",[[33,\"ion-split-pane\",{\"contentId\":[513,\"content-id\"],\"disabled\":[4],\"when\":[8],\"visible\":[32]}]]],[\"ion-tab-bar\",[[33,\"ion-tab-bar\",{\"color\":[513],\"selectedTab\":[1,\"selected-tab\"],\"translucent\":[4],\"keyboardVisible\":[32]}]]],[\"ion-footer\",[[36,\"ion-footer\",{\"collapse\":[1],\"translucent\":[4],\"keyboardVisible\":[32]}]]],[\"ion-back-button\",[[33,\"ion-back-button\",{\"color\":[513],\"defaultHref\":[1025,\"default-href\"],\"disabled\":[516],\"icon\":[1],\"text\":[1],\"type\":[1],\"routerAnimation\":[16]}]]],[\"ion-menu-button\",[[33,\"ion-menu-button\",{\"color\":[513],\"disabled\":[4],\"menu\":[1],\"autoHide\":[4,\"auto-hide\"],\"type\":[1],\"visible\":[32]},[[16,\"ionMenuChange\",\"visibilityChanged\"],[16,\"ionSplitPaneVisible\",\"visibilityChanged\"]]]]],[\"ion-title\",[[33,\"ion-title\",{\"color\":[513],\"size\":[1]}]]],[\"ion-header\",[[36,\"ion-header\",{\"collapse\":[1],\"translucent\":[4]}]]],[\"ion-toolbar\",[[33,\"ion-toolbar\",{\"color\":[513]},[[0,\"ionStyle\",\"childrenStyle\"]]]]],[\"ion-content\",[[1,\"ion-content\",{\"color\":[513],\"fullscreen\":[4],\"forceOverscroll\":[1028,\"force-overscroll\"],\"scrollX\":[4,\"scroll-x\"],\"scrollY\":[4,\"scroll-y\"],\"scrollEvents\":[4,\"scroll-events\"],\"getScrollElement\":[64],\"getBackgroundElement\":[64],\"scrollToTop\":[64],\"scrollToBottom\":[64],\"scrollByPoint\":[64],\"scrollToPoint\":[64]},[[8,\"appload\",\"onAppLoad\"],[9,\"resize\",\"onResize\"]]]]],[\"appp-edit-profile\",[[0,\"appp-edit-profile\",{\"data\":[8],\"fields\":[32],\"info\":[32]}]]],[\"app-activity\",[[0,\"app-activity\",{\"data\":[8],\"props\":[8],\"filter\":[16],\"items\":[32],\"spinner\":[32],\"postModal\":[64]},[[8,\"deleteActivityEvent\",\"deleteActivity\"],[8,\"activityReload\",\"reload\"]]]]],[\"acf-date-time\",[[0,\"acf-date-time\",{\"data\":[8],\"dateStrings\":[32]}]]],[\"app-groups\",[[0,\"app-groups\",{\"data\":[8],\"groupid\":[8],\"filter\":[16],\"items\":[32],\"spinner\":[32]}]]],[\"app-members\",[[0,\"app-members\",{\"data\":[8],\"filter\":[16],\"items\":[32],\"spinner\":[32]}]]],[\"acf-card\",[[0,\"acf-card\",{\"data\":[8],\"api\":[8]}]]],[\"app-iframe\",[[0,\"app-iframe\",{\"data\":[8],\"loading\":[32],\"url\":[32]}]]],[\"ion-accordion\",[[49,\"ion-accordion\",{\"value\":[1],\"disabled\":[4],\"readonly\":[4],\"toggleIcon\":[1,\"toggle-icon\"],\"toggleIconSlot\":[1,\"toggle-icon-slot\"],\"state\":[32],\"isNext\":[32],\"isPrevious\":[32]}]]],[\"ion-breadcrumb\",[[33,\"ion-breadcrumb\",{\"collapsed\":[4],\"last\":[4],\"showCollapsedIndicator\":[4,\"show-collapsed-indicator\"],\"color\":[1],\"active\":[4],\"disabled\":[4],\"download\":[1],\"href\":[1],\"rel\":[1],\"separator\":[4],\"target\":[1],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16]}]]],[\"ion-chip\",[[1,\"ion-chip\",{\"color\":[513],\"outline\":[4],\"disabled\":[4]}]]],[\"ion-segment-button\",[[33,\"ion-segment-button\",{\"disabled\":[4],\"layout\":[1],\"type\":[1],\"value\":[1],\"checked\":[32],\"setFocus\":[64]}]]],[\"acf-text\",[[0,\"acf-text\",{\"data\":[8],\"api\":[8]}]]],[\"ion-accordion-group\",[[33,\"ion-accordion-group\",{\"animated\":[4],\"multiple\":[4],\"value\":[1025],\"disabled\":[4],\"readonly\":[4],\"expand\":[1],\"requestAccordionToggle\":[64],\"getAccordions\":[64]},[[0,\"keydown\",\"onKeydown\"]]]]],[\"ion-breadcrumbs\",[[33,\"ion-breadcrumbs\",{\"color\":[513],\"maxItems\":[2,\"max-items\"],\"itemsBeforeCollapse\":[2,\"items-before-collapse\"],\"itemsAfterCollapse\":[2,\"items-after-collapse\"],\"collapsed\":[32],\"activeChanged\":[32]},[[0,\"collapsedClick\",\"onCollapsedClick\"]]]]],[\"ion-menu-toggle\",[[1,\"ion-menu-toggle\",{\"menu\":[1],\"autoHide\":[4,\"auto-hide\"],\"visible\":[32]},[[16,\"ionMenuChange\",\"visibilityChanged\"],[16,\"ionSplitPaneVisible\",\"visibilityChanged\"]]]]],[\"ion-segment\",[[33,\"ion-segment\",{\"color\":[513],\"disabled\":[4],\"scrollable\":[4],\"swipeGesture\":[4,\"swipe-gesture\"],\"value\":[1025],\"selectOnFocus\":[4,\"select-on-focus\"],\"activated\":[32]},[[0,\"keydown\",\"onKeyDown\"]]]]],[\"ion-text\",[[1,\"ion-text\",{\"color\":[513]}]]],[\"ion-thumbnail\",[[1,\"ion-thumbnail\"]]],[\"activity-item\",[[0,\"activity-item\",{\"item\":[8],\"options\":[8],\"data\":[32]},[[8,\"favActivityEvent\",\"favActivity\"]]]]],[\"ion-card\",[[33,\"ion-card\",{\"color\":[513],\"button\":[4],\"type\":[1],\"disabled\":[4],\"download\":[1],\"href\":[1],\"rel\":[1],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16],\"target\":[1]}]]],[\"ion-datetime-button\",[[33,\"ion-datetime-button\",{\"color\":[513],\"disabled\":[516],\"datetime\":[1],\"datetimePresentation\":[32],\"dateText\":[32],\"timeText\":[32],\"datetimeActive\":[32],\"selectedButton\":[32]}]]],[\"ion-toggle\",[[33,\"ion-toggle\",{\"color\":[513],\"name\":[1],\"checked\":[1028],\"disabled\":[4],\"value\":[1],\"enableOnOffLabels\":[4,\"enable-on-off-labels\"],\"labelPlacement\":[1,\"label-placement\"],\"legacy\":[4],\"justify\":[1],\"activated\":[32]}]]],[\"ion-card-content\",[[32,\"ion-card-content\"]]],[\"ion-card-header\",[[33,\"ion-card-header\",{\"color\":[513],\"translucent\":[4]}]]],[\"ion-card-subtitle\",[[33,\"ion-card-subtitle\",{\"color\":[513]}]]],[\"ion-card-title\",[[33,\"ion-card-title\",{\"color\":[513]}]]],[\"ion-list\",[[32,\"ion-list\",{\"lines\":[1],\"inset\":[4],\"closeSlidingItems\":[64]}]]],[\"ion-item\",[[49,\"ion-item\",{\"color\":[513],\"button\":[4],\"detail\":[4],\"detailIcon\":[1,\"detail-icon\"],\"disabled\":[4],\"download\":[1],\"fill\":[1],\"shape\":[1],\"href\":[1],\"rel\":[1],\"lines\":[1],\"counter\":[4],\"routerAnimation\":[16],\"routerDirection\":[1,\"router-direction\"],\"target\":[1],\"type\":[1],\"counterFormatter\":[16],\"multipleInputs\":[32],\"focusable\":[32],\"counterString\":[32]},[[0,\"ionInput\",\"handleIonInput\"],[0,\"ionColor\",\"labelColorChanged\"],[0,\"ionStyle\",\"itemStyle\"]]]]],[\"ion-backdrop\",[[33,\"ion-backdrop\",{\"visible\":[4],\"tappable\":[4],\"stopPropagation\":[4,\"stop-propagation\"]},[[2,\"click\",\"onMouseDown\"]]]]],[\"ion-select\",[[33,\"ion-select\",{\"cancelText\":[1,\"cancel-text\"],\"color\":[513],\"compareWith\":[1,\"compare-with\"],\"disabled\":[4],\"fill\":[1],\"interface\":[1],\"interfaceOptions\":[8,\"interface-options\"],\"justify\":[1],\"label\":[1],\"labelPlacement\":[1,\"label-placement\"],\"legacy\":[4],\"multiple\":[4],\"name\":[1],\"okText\":[1,\"ok-text\"],\"placeholder\":[1],\"selectedText\":[1,\"selected-text\"],\"shape\":[1],\"value\":[1032],\"isExpanded\":[32],\"open\":[64]}]]],[\"ion-avatar\",[[33,\"ion-avatar\"]]],[\"ion-popover\",[[33,\"ion-popover\",{\"hasController\":[4,\"has-controller\"],\"delegate\":[16],\"overlayIndex\":[2,\"overlay-index\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"component\":[1],\"componentProps\":[16],\"keyboardClose\":[4,\"keyboard-close\"],\"cssClass\":[1,\"css-class\"],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"event\":[8],\"showBackdrop\":[4,\"show-backdrop\"],\"translucent\":[4],\"animated\":[4],\"htmlAttributes\":[16],\"triggerAction\":[1,\"trigger-action\"],\"trigger\":[1],\"size\":[1],\"dismissOnSelect\":[4,\"dismiss-on-select\"],\"reference\":[1],\"side\":[1],\"alignment\":[1025],\"arrow\":[4],\"isOpen\":[4,\"is-open\"],\"keyboardEvents\":[4,\"keyboard-events\"],\"keepContentsMounted\":[4,\"keep-contents-mounted\"],\"presented\":[32],\"presentFromTrigger\":[64],\"present\":[64],\"dismiss\":[64],\"getParentPopover\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64]}]]],[\"ion-ripple-effect\",[[1,\"ion-ripple-effect\",{\"type\":[1],\"addRipple\":[64]}]]],[\"activity-replies\",[[0,\"activity-replies\",{\"data\":[8],\"parentid\":[2],\"replies\":[32],\"spinner\":[32]},[[8,\"activityReply\",\"activityReplyHandler\"],[8,\"deleteReplyEvent\",\"deleteReply\"]]]]],[\"ion-datetime\",[[33,\"ion-datetime\",{\"color\":[1],\"name\":[1],\"disabled\":[4],\"readonly\":[4],\"isDateEnabled\":[16],\"min\":[1025],\"max\":[1025],\"presentation\":[1],\"cancelText\":[1,\"cancel-text\"],\"doneText\":[1,\"done-text\"],\"clearText\":[1,\"clear-text\"],\"yearValues\":[8,\"year-values\"],\"monthValues\":[8,\"month-values\"],\"dayValues\":[8,\"day-values\"],\"hourValues\":[8,\"hour-values\"],\"minuteValues\":[8,\"minute-values\"],\"locale\":[1],\"firstDayOfWeek\":[2,\"first-day-of-week\"],\"titleSelectedDatesFormatter\":[16],\"multiple\":[4],\"highlightedDates\":[16],\"value\":[1025],\"showDefaultTitle\":[4,\"show-default-title\"],\"showDefaultButtons\":[4,\"show-default-buttons\"],\"showClearButton\":[4,\"show-clear-button\"],\"showDefaultTimeLabel\":[4,\"show-default-time-label\"],\"hourCycle\":[1,\"hour-cycle\"],\"size\":[1],\"preferWheel\":[4,\"prefer-wheel\"],\"showMonthAndYear\":[32],\"activeParts\":[32],\"workingParts\":[32],\"isPresented\":[32],\"isTimePopoverOpen\":[32],\"confirm\":[64],\"reset\":[64],\"cancel\":[64]}]]],[\"ion-input\",[[34,\"ion-input\",{\"color\":[513],\"accept\":[1],\"autocapitalize\":[1],\"autocomplete\":[1],\"autocorrect\":[1],\"autofocus\":[4],\"clearInput\":[4,\"clear-input\"],\"clearOnEdit\":[4,\"clear-on-edit\"],\"counter\":[4],\"counterFormatter\":[16],\"debounce\":[2],\"disabled\":[4],\"enterkeyhint\":[1],\"errorText\":[1,\"error-text\"],\"fill\":[1],\"inputmode\":[1],\"helperText\":[1,\"helper-text\"],\"label\":[1],\"labelPlacement\":[1,\"label-placement\"],\"legacy\":[4],\"max\":[8],\"maxlength\":[2],\"min\":[8],\"minlength\":[2],\"multiple\":[4],\"name\":[1],\"pattern\":[1],\"placeholder\":[1],\"readonly\":[4],\"required\":[4],\"shape\":[1],\"spellcheck\":[4],\"step\":[1],\"size\":[2],\"type\":[1],\"value\":[1032],\"hasFocus\":[32],\"setFocus\":[64],\"getInputElement\":[64]}]]],[\"ion-range\",[[33,\"ion-range\",{\"color\":[513],\"debounce\":[2],\"name\":[1],\"dualKnobs\":[4,\"dual-knobs\"],\"min\":[2],\"max\":[2],\"pin\":[4],\"pinFormatter\":[16],\"snaps\":[4],\"step\":[2],\"ticks\":[4],\"activeBarStart\":[1026,\"active-bar-start\"],\"disabled\":[4],\"value\":[1026],\"labelPlacement\":[1,\"label-placement\"],\"legacy\":[4],\"ratioA\":[32],\"ratioB\":[32],\"pressedKnob\":[32]}]]],[\"ion-select-option\",[[1,\"ion-select-option\",{\"disabled\":[4],\"value\":[8]}]]],[\"ion-select-popover\",[[34,\"ion-select-popover\",{\"header\":[1],\"subHeader\":[1,\"sub-header\"],\"message\":[1],\"multiple\":[4],\"options\":[16]}]]],[\"attachments-scroller\",[[0,\"attachments-scroller\",{\"items\":[8]}]]],[\"reply-item\",[[0,\"reply-item\",{\"item\":[8],\"data\":[32]}]]],[\"ion-action-sheet\",[[34,\"ion-action-sheet\",{\"overlayIndex\":[2,\"overlay-index\"],\"delegate\":[16],\"hasController\":[4,\"has-controller\"],\"keyboardClose\":[4,\"keyboard-close\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"buttons\":[16],\"cssClass\":[1,\"css-class\"],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"header\":[1],\"subHeader\":[1,\"sub-header\"],\"translucent\":[4],\"animated\":[4],\"htmlAttributes\":[16],\"isOpen\":[4,\"is-open\"],\"trigger\":[1],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64]}]]],[\"ion-infinite-scroll-content\",[[32,\"ion-infinite-scroll-content\",{\"loadingSpinner\":[1025,\"loading-spinner\"],\"loadingText\":[1,\"loading-text\"]}]]],[\"ion-infinite-scroll\",[[0,\"ion-infinite-scroll\",{\"threshold\":[1],\"disabled\":[4],\"position\":[1],\"isLoading\":[32],\"complete\":[64]}]]],[\"ion-picker-column-internal\",[[33,\"ion-picker-column-internal\",{\"items\":[16],\"value\":[1032],\"color\":[513],\"numericInput\":[4,\"numeric-input\"],\"isActive\":[32],\"scrollActiveItemIntoView\":[64],\"setValue\":[64]}]]],[\"ion-picker-internal\",[[33,\"ion-picker-internal\",{\"exitInputMode\":[64]},[[1,\"touchstart\",\"preventTouchStartPropagation\"]]]]],[\"ion-textarea\",[[34,\"ion-textarea\",{\"color\":[513],\"autocapitalize\":[1],\"autofocus\":[4],\"clearOnEdit\":[4,\"clear-on-edit\"],\"debounce\":[2],\"disabled\":[4],\"fill\":[1],\"inputmode\":[1],\"enterkeyhint\":[1],\"maxlength\":[2],\"minlength\":[2],\"name\":[1],\"placeholder\":[1],\"readonly\":[4],\"required\":[4],\"spellcheck\":[4],\"cols\":[2],\"rows\":[2],\"wrap\":[1],\"autoGrow\":[516,\"auto-grow\"],\"value\":[1025],\"counter\":[4],\"counterFormatter\":[16],\"errorText\":[1,\"error-text\"],\"helperText\":[1,\"helper-text\"],\"label\":[1],\"labelPlacement\":[1,\"label-placement\"],\"legacy\":[4],\"shape\":[1],\"hasFocus\":[32],\"setFocus\":[64],\"getInputElement\":[64]}]]],[\"ion-alert\",[[34,\"ion-alert\",{\"overlayIndex\":[2,\"overlay-index\"],\"delegate\":[16],\"hasController\":[4,\"has-controller\"],\"keyboardClose\":[4,\"keyboard-close\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"cssClass\":[1,\"css-class\"],\"header\":[1],\"subHeader\":[1,\"sub-header\"],\"message\":[1],\"buttons\":[16],\"inputs\":[1040],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"translucent\":[4],\"animated\":[4],\"htmlAttributes\":[16],\"isOpen\":[4,\"is-open\"],\"trigger\":[1],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64]},[[4,\"keydown\",\"onKeydown\"]]]]],[\"ion-checkbox\",[[33,\"ion-checkbox\",{\"color\":[513],\"name\":[1],\"checked\":[1028],\"indeterminate\":[1028],\"disabled\":[4],\"value\":[8],\"labelPlacement\":[1,\"label-placement\"],\"justify\":[1],\"legacy\":[4]}]]],[\"ion-list-header\",[[33,\"ion-list-header\",{\"color\":[513],\"lines\":[1]}]]],[\"ion-radio\",[[33,\"ion-radio\",{\"color\":[513],\"name\":[1],\"disabled\":[4],\"value\":[8],\"labelPlacement\":[1,\"label-placement\"],\"legacy\":[4],\"justify\":[1],\"checked\":[32],\"buttonTabindex\":[32],\"setFocus\":[64],\"setButtonTabindex\":[64]}]]],[\"ion-radio-group\",[[0,\"ion-radio-group\",{\"allowEmptySelection\":[4,\"allow-empty-selection\"],\"name\":[1],\"value\":[1032]},[[4,\"keydown\",\"onKeydown\"]]]]],[\"ion-modal\",[[33,\"ion-modal\",{\"hasController\":[4,\"has-controller\"],\"overlayIndex\":[2,\"overlay-index\"],\"delegate\":[16],\"keyboardClose\":[4,\"keyboard-close\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"breakpoints\":[16],\"initialBreakpoint\":[2,\"initial-breakpoint\"],\"backdropBreakpoint\":[2,\"backdrop-breakpoint\"],\"handle\":[4],\"handleBehavior\":[1,\"handle-behavior\"],\"component\":[1],\"componentProps\":[16],\"cssClass\":[1,\"css-class\"],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"showBackdrop\":[4,\"show-backdrop\"],\"animated\":[4],\"presentingElement\":[16],\"htmlAttributes\":[16],\"isOpen\":[4,\"is-open\"],\"trigger\":[1],\"keepContentsMounted\":[4,\"keep-contents-mounted\"],\"canDismiss\":[4,\"can-dismiss\"],\"presented\":[32],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64],\"setCurrentBreakpoint\":[64],\"getCurrentBreakpoint\":[64]}]]],[\"ion-buttons\",[[34,\"ion-buttons\",{\"collapse\":[4]}]]],[\"ion-img\",[[1,\"ion-img\",{\"alt\":[1],\"src\":[1],\"loadSrc\":[32],\"loadError\":[32]}]]],[\"ion-button\",[[33,\"ion-button\",{\"color\":[513],\"buttonType\":[1025,\"button-type\"],\"disabled\":[516],\"expand\":[513],\"fill\":[1537],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16],\"download\":[1],\"href\":[1],\"rel\":[1],\"shape\":[513],\"size\":[513],\"strong\":[4],\"target\":[1],\"type\":[1],\"form\":[1]}]]],[\"ion-spinner\",[[1,\"ion-spinner\",{\"color\":[513],\"duration\":[2],\"name\":[1],\"paused\":[4]}]]],[\"ion-label\",[[34,\"ion-label\",{\"color\":[513],\"position\":[1],\"noAnimate\":[32]}]]],[\"ion-note\",[[33,\"ion-note\",{\"color\":[513]}]]],[\"ion-icon\",[[1,\"ion-icon\",{\"mode\":[1025],\"color\":[1],\"ios\":[1],\"md\":[1],\"flipRtl\":[4,\"flip-rtl\"],\"name\":[513],\"src\":[1],\"icon\":[8],\"size\":[1],\"lazy\":[4],\"sanitize\":[4],\"svgContent\":[32],\"isVisible\":[32]}]]],[\"acf-form\",[[0,\"acf-form\",{\"data\":[8],\"innerBlocks\":[32]}]]],[\"acf-repeater\",[[0,\"acf-repeater\",{\"data\":[8],\"api\":[8],\"items\":[32],\"innerBlocks\":[32],\"spinner\":[32],\"filter\":[64],\"reload\":[64]}]]],[\"acf-subrepeater\",[[0,\"acf-subrepeater\",{\"data\":[8],\"api\":[8],\"items\":[32]}]]],[\"app-profile\",[[0,\"app-profile\",{\"data\":[8],\"props\":[8],\"api\":[32],\"reload\":[64]}]]],[\"inner-segments\",[[0,\"inner-segments\",{\"data\":[8],\"selected\":[1]}]]]]"), options);
});
