// Force ionic to display ios styles in the editor.
const html = document.querySelector('html');
html.setAttribute( 'mode', 'ios');

/**
 * filter ACF color picker defaults to match ionic defaults.
 */
acf.add_filter('color_picker_args', function( args, field ){

    // do something to args
    args.palettes = [
        '#3880ff', 
        '#5260ff', 
        '#6149dd', 
        '#2dd36f', 
        '#ffc409', 
        '#eb445a',
        '#141414',
        '#92949c',
        '#f4f5f8'
    ];

    const field_name = field[0].getAttribute('data-name');

    if ( 'toolbar_color' === field_name ) {
        if(window.appp_data !== undefined && window.appp_data !== null) {
            const palette = JSON.parse(appp_data.color_palettes);
            const array = Object.values(palette);
            args.palettes = array;
        }
    }

    // return
    return args;

});


/**
 * Add theem colors to HTML head on gutenberg load.
 */
acf.add_action('load', (e)=> {

    window.jQuery('a.acf-icon.-duplicate').remove();

    // Load root theme styles
    if(window.appp_data !== undefined && window.appp_data !== null) {
        const palettes = JSON.parse(appp_data.color_palettes);
        const globals = JSON.parse(appp_data.theme_globals);
        for (const key in palettes ) {
            for (const color in palettes[key] ) {
                document.documentElement.style.setProperty(color, palettes[key][color]);

            }
            appp_create_style_from_properties(key);
        }

        for (const global in globals ) {
            document.documentElement.style.setProperty(global, globals[global]);
        }
    }
});

/**
 * Sets head style for each theme color.
 * @param {*} prop 
 */
function appp_create_style_from_properties(prop) {

   const css = `.ion-color-${prop} {
        --ion-color-base: var(--ion-color-${prop});
        --ion-color-base-rgb: var(--ion-color-${prop}-rgb);
        --ion-color-contrast: var(--ion-color-${prop}-contrast);
        --ion-color-contrast-rgb: var(--ion-color-${prop}-contrast-rgb);
        --ion-color-shade: var(--ion-color-${prop}-shade);
        --ion-color-tint: var(--ion-color-${prop}-tint);
    }`

    var style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
}

/**
 * ACF gutenberg loaded hook.
 */
acf.addAction('load', ()=> {

    if (wp.data) {

        let data = wp.data.select( 'core/block-editor' );

        // Get the currently selected block.
        //const selected = data.getSelectedBlock();
    
        // Get a list of all blocks with their ID, content and attributes.
        const blocks = data.getBlocks();
        wp.data.dispatch("core/block-editor").selectBlock(blocks[0].clientId);

        // Add custom title to block view navigation list on load
        setListViewTitle(blocks);  ;

         // Add custom title to block view navigation list on view toggle.
        jQuery('.edit-post-header-toolbar__list-view-toggle').bind('click', ()=> {

            setTimeout(() => {
                setListViewTitle(blocks);
            }, 300);
          
          });

    }

});

/**
 * Add custom title to block view navigation list on view.
 * @param {*} blocks 
 */
function setListViewTitle(blocks) {

    blocks.map( block => {
   
        let title = '';

        switch (block.name) {
            case 'acf/view':
                title = block.attributes.data.view_route + block.attributes.data.path;
                break;
            case 'acf/modal':
                title = block.attributes.data.modal_name;
                break;
            case 'acf/popover':
                title = block.attributes.data.name;
                break;
            case 'acf/action-sheet':
                title = block.attributes.data.name;
                break;
        
            default:
                break;
        }

        let icon = '';

        if ( 'unauthenticated' === block.attributes.data.visibility) {
            icon = '<span class="tooltip-icon" data-tooltip="This view available when app is unauthenticated" style="float:right; z-index: 999;"><span class="dashicons dashicons-unlock unauthenticated"></span></span>';
            //jQuery('#list-view-block-' + block.clientId).find('.block-editor-list-view-block-contents').addClass('no-auth');
        }

        if ( 'authenticated' === block.attributes.data.visibility) {
            icon = '<span class="tooltip-icon" data-tooltip="This view available when app is authenticated" style="float:right;"><span class="dashicons dashicons-lock authenticated"></span></span>';
            //jQuery('#list-view-block-' + block.clientId).find('.block-editor-list-view-block-contents').addClass('no-auth');
        }

        jQuery('#list-view-block-' + block.clientId).find('.block-editor-list-view-block-select-button__title span').append(' - ' + title + icon );

        setTimeout(() => {
            jQuery("span.tooltip-icon").on({
                mouseenter: function (e) {
                    //stuff to do on mouse enter
             
                    jQuery('body').append('<div class="tooltip"></div>');

                    jQuery(".tooltip").css("left", e.pageX - 80);
                    jQuery(".tooltip").css("top", e.pageY + 10);
                    jQuery(".tooltip").html(jQuery(this).attr("data-tooltip"));
                    jQuery(".tooltop").show();
                },
                mouseleave: function (e) {
                    //stuff to do on mouse leave
                    jQuery(".tooltip").remove();
                }
            });
        }, 500);

   
    });

}

/**
 * Flatten js object to dot notaion path.
 * @param {*} o obj. 
 * @returns 
 */
function flattenObject(o, prefix = '', result = {}, keepNull = true) {
    if (lodash.isString(o) || lodash.isNumber(o) || lodash.isBoolean(o) || (keepNull && lodash.isNull(o))) {
        result[prefix] = o;
        return result;
    }
    
    if (lodash.isArray(o) || lodash.isPlainObject(o)) {
        for (let i in o) {
        let pref = prefix;
        if (lodash.isArray(o)) {
            pref = pref + `[]`;
            //pref = pref + `[${i}]`;
        } else {
            if (lodash.isEmpty(prefix)) {
            pref = i;
            } else {
            pref = prefix + '.' + i;
            }
        }
        flattenObject(o[i], pref, result, keepNull);
        }
        return result;
    }
    return result;
}

/**
 * Get data_source url and create data tokens html from object.
 * @param {*} field 
 */
async function displayTokens(data) {

    const field = jQuery('[data-name="data_source"]');

    let html = '<div id="data-tokens-wrap" style="padding: 16px;">';

    if (data) {

        html += '<h2 class="block-editor-block-card__title" style="margin-top: 10px;">Data Tokens</h2>';

        const obj = lodash.isArray(data) ? data.shift() : data;
 
        const result = flattenObject(obj);

        Object.keys(result).map(item => {
            
            html += `<span style="background:#efefef; padding: 4px 8px; border-radius: 4px; margin: 5px; display: inline-block;">{{${item}}}</span>`;
        });

        html += '</div>';

        field.append(html);

    }

}


acf.addAction('ready_field/name=light_mode', function(field){

    const fields = acf.findFields({parent:field.$el});

    [...fields].forEach( item => {
        const color = acf.getField(item.getAttribute('data-key'));
        //appp_api_colors(item.getAttribute('data-name'), color.val());

        jQuery(`[data-key=${color.data.key}] .acf-color-picker`).on( 'change', (event) => {
            appp_api_colors(color.data.name, event.target.value);
        });
    });
   
});

/**
 * Loads up a test button for API data for each base_url endpoint field.
 */
acf.addAction('ready_field/name=data_response', function(field){

    var d = document.createElement("div");
    d.addEventListener('click', async (e)=> { 

    
        const url_value = jQuery("[data-name=rest_url]").find('input').val();
        let url = new URL(url_value);
        const parameters = jQuery("[data-name=parameters]").find('.acf-table').find('.acf-row:not(.acf-clone)').find('.acf-fields');

        [...parameters].forEach( item => {

            const key = jQuery(item).find('[data-name=key]').find('input').val();
            const value = jQuery(item).find('[data-name=value]').find('input').val();

            url.searchParams.append(key, value);

        });

        
        let data = {};

        try {

            const response = await fetch( url, {
                headers: {
                    //'content-type': 'application/json'
                  },
                method: 'GET'
            });

            data = await response.json();

        } catch (error) {
            data = {error: error};
        }
 
        document.querySelector('.CodeMirror').CodeMirror.setValue(js_beautify(JSON.stringify(data), {brace_style: 'expand'}))


    }, false);

    d.innerHTML = "Fetch";
    d.className = 'button button-primary';
    d.style.height = '20px';
    d.style.lineHeight = '27px';
    d.style.position = 'absolute';
    d.style.right = '0px';
    d.style.top = '-9px';

    jQuery("[data-name=data_response]").find('.acf-label').append(d);
    
});


acf.addAction('append_field/name=data_source', async (field)=> {


    const post_id = field.val();
    const selected = wp.data.select( 'core/block-editor' ).getSelectedBlock();

    const data = await appp_get_endpoints_select(post_id);

    let json;
  
    if ( 'none' !== post_id ) {

        if( 'external' === data['type'] ) {
            const rsp = await fetch(data['url']);
            json = await rsp.json();
        }

        if( 'local' === data['type'] ) {
            json = data['items'];
        }
        displayTokens( json );
    }

    jQuery('[data-name=data_source]').find('select').on( 'change', async (e) => {

        jQuery('#data-tokens-wrap').remove();
        if ( 'none' !== e.target.value ) {

            const data = await appp_get_endpoints_select(e.target.value);

            if( 'external' === data['type'] ) {
                const rsp = await fetch(data['url']);
                json = await rsp.json();
            }
       
            if( 'local' === data['type'] ) {
                json = data['items'];
            }


            displayTokens( json );
        }
        
    });
});

async function appp_set_endpoints_select(data, selected) {

    const $el = jQuery('[data-name=rest_api_endpoints]').find('select');
  
    $el.empty(); // remove old options

    $el.append(jQuery('<option></option>').attr('value', 'none').text('None'));

    jQuery.each(data, function(key, value) {
        const $option = jQuery('<option></option>');

        $option.attr('value', value.endpoint_path).text(value.endpoint_name);
        if ( selected == value.endpoint_path ) {
            $option.attr('selected', 'selected')
        }

        $el.append($option);
    });

}

async function appp_get_endpoints_select(post_id) {
    const data = await wp.apiFetch( { path: `/apppresser/v1/fields/datatable?post_id=${post_id}` });
    return data;
}

function appp_api_colors(name, hex) {

    wp.apiFetch({
        path: 'apppresser/v1/colors/?name=' + name + '&hex=' + encodeURIComponent(hex),
        method: 'GET',
    }).then(data => {
        for (const key in data) {
            document.documentElement.style.setProperty(key, data[key]);
        }
    });
}

async function appp_load_repeater() {

    const editor = wp.data.select("core/block-editor");

    const block = editor.getSelectedBlock(); 

    if (!block || !block.clientId) {
        return;
    }

    let tokens = [];

    var children = wp.data.select('core/block-editor').getBlocksByClientId(block.clientId)[0].innerBlocks;
 
    if(!children) {
        return;
    }

    children.forEach(function(child){

        let data = {...child.attributes.data};

        Object.keys(data).forEach(element => {

            const f = data[element].slice(0,1);
            const l = data[element].slice(-1);

            if ( '{' === f && '}' === l ) {
                const token = data[element].slice(1, -1);
                tokens.push(token);
            }
            
        });

    });

    let repeaterData = {...block.attributes.data};

    if(window[block.attributes.id] !== undefined && window[block.attributes.id] !== null) {
    
        const response = await fetch( window[block.attributes.id].data_source, {
            headers: {
                //'content-type': 'application/json'
              },
            method: window[block.attributes.id].request_method 
        })
        .then(
            returned => {
                if (returned.ok) return returned;
                throw new Error('Network response was not ok.');
            }
        );

        const data = await response.json();

        if(window[block.attributes.id] !== undefined && window[block.attributes.id] !== null) {
            appp_update_repeater(block.attributes.id, data, tokens);
        }


    }


}

function appp_update_repeater(id, data, _tokens) {

    const repeater = document.querySelector('#repeater-' + id);
    const items = document.querySelector('.items-repeat-' + id);

    items.innerHTML = '';

	setTimeout(() => {

        if ( !Array.isArray(data) ) {
            data = [data];
        }

        data.forEach(function(post){

            const clonedTarget = repeater.cloneNode(true);

            const tokens = clonedTarget.innerHTML.match(/\{.*?\}/g);

            tokens.forEach(function(token){

                let value = lodash.get(post, token.slice(1,-1));

                if (typeof value === 'string' || value instanceof String) {
                   
                } else {
                    //value = value ? `{${token}=true}` : `{${token}=false}`;
                }

                clonedTarget.innerHTML = clonedTarget.innerHTML.replace(token, value);
                
            });

            const preview = clonedTarget.querySelector('.block-editor-inner-blocks');
            const children = preview.querySelectorAll('.acf-block-preview');

            children.forEach(node => {
                node.classList.remove('acf-block-preview');

                const src = node.querySelectorAll('[data-src]');
                if (src.length) {

                    [...src].forEach( el => {
                        const data_src = el.getAttribute('data-src');
                        el.setAttribute('src', data_src.trim() );
                    });
           
                }

                const href = node.querySelectorAll('[data-href]');
                if (href.length) {

                    [...href].forEach( el => {
                        const data_href = el.getAttribute('data-href');
                        el.setAttribute('src', data_href.trim() );
                    });
           
                }

                const image = node.querySelectorAll('[data-bg-image]');
                if (image.length) {

                    [...image].forEach( async el => {
                        const data_bg_image = el.getAttribute('data-bg-image');
                        //el.setAttribute('src', data_bg_image.trim() );

                        const url = isValidHttpUrl(data_bg_image);

                        if ( url ) {
                            el.style.backgroundImage = `url(${data_bg_image.trim()})`;
                        }
                    });
           
                }

                items.appendChild(node);
            });

        });

        jQuery.event.trigger({
			type: "stopSpinner",
			message: 'ffff',
			time: new Date()
		});

	}, 100);


}

function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }


const isImage = async (url) =>
  new Promise((resolve) => {
    const img = new Image();

    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });

/**
 * Open weather api icons data
 */
var wiToOWM = { "200": "thunderstorm", "201": "thunderstorm", "202": "thunderstorm", "210": "lightning", "211": "lightning", "212": "lightning", "221": "lightning", "230": "thunderstorm", "231": "thunderstorm", "232": "thunderstorm", "300": "sprinkle", "301": "sprinkle", "302": "rain", "310": "rain-mix", "311": "rain", "312": "rain", "313": "showers", "314": "rain", "321": "sprinkle", "500": "sprinkle", "501": "rain", "502": "rain", "503": "rain", "504": "rain", "511": "rain-mix", "520": "showers", "521": "showers", "522": "showers", "531": "storm-showers", "600": "snow", "601": "snow", "602": "sleet", "611": "rain-mix", "612": "rain-mix", "615": "rain-mix", "616": "rain-mix", "620": "rain-mix", "621": "snow", "622": "snow", "701": "showers", "711": "smoke", "721": "day-haze", "731": "dust", "741": "fog", "761": "dust", "762": "dust", "771": "cloudy-gusts", "781": "tornado", "800": "day-sunny", "801": "cloudy-gusts", "802": "cloudy-gusts", "803": "cloudy-gusts", "804": "cloudy", "900": "tornado", "901": "storm-showers", "902": "hurricane", "903": "snowflake-cold", "904": "hot", "905": "windy", "906": "hail", "957": "strong-wind", "day-200": "day-thunderstorm", "day-201": "day-thunderstorm", "day-202": "day-thunderstorm", "day-210": "day-lightning", "day-211": "day-lightning", "day-212": "day-lightning", "day-221": "day-lightning", "day-230": "day-thunderstorm", "day-231": "day-thunderstorm", "day-232": "day-thunderstorm", "day-300": "day-sprinkle", "day-301": "day-sprinkle", "day-302": "day-rain", "day-310": "day-rain", "day-311": "day-rain", "day-312": "day-rain", "day-313": "day-rain", "day-314": "day-rain", "day-321": "day-sprinkle", "day-500": "day-sprinkle", "day-501": "day-rain", "day-502": "day-rain", "day-503": "day-rain", "day-504": "day-rain", "day-511": "day-rain-mix", "day-520": "day-showers", "day-521": "day-showers", "day-522": "day-showers", "day-531": "day-storm-showers", "day-600": "day-snow", "day-601": "day-sleet", "day-602": "day-snow", "day-611": "day-rain-mix", "day-612": "day-rain-mix", "day-615": "day-rain-mix", "day-616": "day-rain-mix", "day-620": "day-rain-mix", "day-621": "day-snow", "day-622": "day-snow", "day-701": "day-showers", "day-711": "smoke", "day-721": "day-haze", "day-731": "dust", "day-741": "day-fog", "day-761": "dust", "day-762": "dust", "day-781": "tornado", "day-800": "day-sunny", "day-801": "day-cloudy-gusts", "day-802": "day-cloudy-gusts", "day-803": "day-cloudy-gusts", "day-804": "day-sunny-overcast", "day-900": "tornado", "day-902": "hurricane", "day-903": "snowflake-cold", "day-904": "hot", "day-906": "day-hail", "day-957": "strong-wind", "night-200": "night-alt-thunderstorm", "night-201": "night-alt-thunderstorm", "night-202": "night-alt-thunderstorm", "night-210": "night-alt-lightning", "night-211": "night-alt-lightning", "night-212": "night-alt-lightning", "night-221": "night-alt-lightning", "night-230": "night-alt-thunderstorm", "night-231": "night-alt-thunderstorm", "night-232": "night-alt-thunderstorm", "night-300": "night-alt-sprinkle", "night-301": "night-alt-sprinkle", "night-302": "night-alt-rain", "night-310": "night-alt-rain", "night-311": "night-alt-rain", "night-312": "night-alt-rain", "night-313": "night-alt-rain", "night-314": "night-alt-rain", "night-321": "night-alt-sprinkle", "night-500": "night-alt-sprinkle", "night-501": "night-alt-rain", "night-502": "night-alt-rain", "night-503": "night-alt-rain", "night-504": "night-alt-rain", "night-511": "night-alt-rain-mix", "night-520": "night-alt-showers", "night-521": "night-alt-showers", "night-522": "night-alt-showers", "night-531": "night-alt-storm-showers", "night-600": "night-alt-snow", "night-601": "night-alt-sleet", "night-602": "night-alt-snow", "night-611": "night-alt-rain-mix", "night-612": "night-alt-rain-mix", "night-615": "night-alt-rain-mix", "night-616": "night-alt-rain-mix", "night-620": "night-alt-rain-mix", "night-621": "night-alt-snow", "night-622": "night-alt-snow", "night-701": "night-alt-showers", "night-711": "smoke", "night-721": "day-haze", "night-731": "dust", "night-741": "night-fog", "night-761": "dust", "night-762": "dust", "night-781": "tornado", "night-800": "night-clear", "night-801": "night-alt-cloudy-gusts", "night-802": "night-alt-cloudy-gusts", "night-803": "night-alt-cloudy-gusts", "night-804": "night-alt-cloudy", "night-900": "tornado", "night-902": "hurricane", "night-903": "snowflake-cold", "night-904": "hot", "night-906": "night-alt-hail", "night-957": "strong-wind" };

const getDayNight = (sunrise, sunset) => {
    const now = Date.now();
    if (now> sunrise && now< sunset) {
      return "day-";
    } else {
      return "night-";
    }
  };

const formatTime = (timestamp) => {
    var dt = new Date( timestamp * 1000 );
    var h =  dt.getHours(), m = dt.getMinutes();
    var _time = (h > 12) ? (h-12 +'PM') : (h + 'AM');

    return _time;
}

const formatTimezone = (tinmezone) => {

    const parts = tinmezone.split('/');

    return {
        country: parts[0],
        city: parts[1].replace( '_', ' ' )
    }

}

function getLongAndLat() {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
}