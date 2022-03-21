const html = document.querySelector('html');
html.setAttribute( 'mode', 'ios');


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



var instance = new acf.Model({
    events: {
        'change': 'onChange',
    },
    onChange: async function(e, $el){
        e.preventDefault();

        const editor = wp.data.select("core/block-editor");

        const block = editor.getSelectedBlock(); 

        if (!block || !block.clientId) {
            return;
        }

        const parent = editor.getBlockRootClientId(block.clientId);
        const parentblock = editor.getBlock(parent);

        // let sync = {}
        // sync[parentblock.attributes.attributes.id] = { per_page: parentblock.attributes.data.per_page }

        // wp.data.dispatch('core/editor').editPost({meta: {acf_sync: JSON.stringify(sync)}});

        // const meta = wp.data.select('core/editor').getEditedPostAttribute('meta').acf_sync;

        // //wp.data.dispatch('core/editor').savePost();

        // console.log(JSON.parse(meta));

        var children = wp.data.select('core/block-editor').getBlocksByClientId(block.clientId)[0].innerBlocks;
        //console.log(children);

        let tokens = [];

        children.forEach(function(child){

            let data = {...child.attributes.data}

            Object.keys(data).forEach(element => {
        
                const f = data[element].slice(0,2);
                const l = data[element].slice(-2);

                if ( '{{' === f && '}}' === l ) {
                    const token = data[element].slice(2, -2);
                    tokens.push(token);
                }
                
            });

            //data.title = 'hhhh';
            //console.log(data);
            //wp.data.dispatch('core/block-editor').updateBlockAttributes(child.clientId, {data: data});

        });

         console.log(tokens);

        if( parentblock && parentblock.name === 'acf/repeater' ) {
            //console.log(parentblock.attributes.data);
            if(window[parentblock.attributes.id] !== undefined && window[parentblock.attributes.id] !== null) {
                //console.log(window[parentblock.attributes.id].per_page);
                //appp_update_repeater(parentblock.attributes.id, window[parentblock.attributes.id].per_page);
            }
        }

        if( block && block.name === 'acf/repeater' ) {

            let repeaterData = {...block.attributes.data}

            if ( '' !== repeaterData.data_source) {
                //console.log(repeaterData.data_source);

                const response = await fetch( repeaterData.data_source, {
                    headers: {
                        'content-type': 'application/json'
                      },
                    method: 'GET'
                })
                .then(
                    returned => {
                        if (returned.ok) return returned;
                        throw new Error('Network response was not ok.');
                    }
                );

                const data = await response.json();

                //console.log(block.attributes.data);
                if(window[block.attributes.id] !== undefined && window[block.attributes.id] !== null) {
                    //console.log(window[block.attributes.id].per_page);
                    appp_update_repeater(block.attributes.id, data, tokens);
                }

                //console.log(data);

            }


 

       
        }

    }
});



acf.add_action('ready append', function(e){

    window.jQuery('a.acf-icon.-duplicate').remove();

    // Load root theme styles
    if(window.appp_data !== undefined && window.appp_data !== null) {
        const data = JSON.parse(appp_data.color_palettes);
        for (const key in data ) {
            for (const color in data[key] ) {
                document.documentElement.style.setProperty(color, data[key][color]);
            }
        }
    }

});

acf.addAction('remount', function ($el) {
    console.log($el);
});


acf.add_action('ready_field/type=color_picker', function(field){

    const name = field[0].getAttribute('data-name');
    const key = field[0].getAttribute('data-key');

    jQuery('.acf-color-picker').on( 'change', (event) => {
        if ( `acf[${key}]` === event.target.name ) {
            appp_api_colors(name, event.target.value);
        }        
    });

});

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

    console.log('load repeater');

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
    
            const f = data[element].slice(0,2);
            const l = data[element].slice(-2);

            if ( '{{' === f && '}}' === l ) {
                const token = data[element].slice(2, -2);
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
            method: 'GET'
        })
        .then(
            returned => {
                if (returned.ok) return returned;
                throw new Error('Network response was not ok.');
            }
        );

        const data = await response.json();

        //console.log(block.attributes.data);
        if(window[block.attributes.id] !== undefined && window[block.attributes.id] !== null) {
            //console.log(window[block.attributes.id].per_page);
            appp_update_repeater(block.attributes.id, data, tokens);
        }

        //console.log(data);

    }


}

function appp_update_repeater(id, data, tokens) {

    console.log('update repeater');

    const repeater = document.querySelector('#repeater-' + id);
    const items = document.querySelector('.items-repeat-' + id);

    items.innerHTML = '';

	setTimeout(() => {

        if ( !Array.isArray(data) ) {
            data = [data];
        }

        data.forEach(function(post){
            const clonedTarget = repeater.cloneNode(true);

            tokens.forEach(function(token){

                let value = lodash.get(post, token);

                if ( ! value ) {
                    value = '{{' + token + '}}';
                }

                clonedTarget.innerHTML = clonedTarget.innerHTML.replace("{{" + token + "}}", value);
                
            });

            const preview = clonedTarget.querySelector('.block-editor-inner-blocks');
            const children = preview.querySelectorAll('.acf-block-preview');

            children.forEach(node => {
                node.classList.remove('acf-block-preview');
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
