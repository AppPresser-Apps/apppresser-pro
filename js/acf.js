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

const editor = wp.data.select("core/block-editor");

var instance = new acf.Model({
    events: {
        'change': 'onChange',
    },
    onChange: async function(e, $el){
        e.preventDefault();

   

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

    console.log('load repeater');

    const block = editor.getSelectedBlock(); 

    if (!block || !block.clientId) {
        return;
    }

    let tokens = [];

    var children = wp.data.select('core/block-editor').getBlocksByClientId(block.clientId)[0].innerBlocks;
    console.log(children);

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

;
    let repeaterData = {...block.attributes.data};

    if(window[block.attributes.id] !== undefined && window[block.attributes.id] !== null) {
        console.log(window[block.attributes.id]);

        const response = await fetch( window[block.attributes.id].data_source, {
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

function appp_update_repeater(id, data, tokens) {

    console.log(tokens);

    const repeater = document.querySelector('#repeater-' + id);
    const items = document.querySelector('.items-repeat-' + id);

    items.innerHTML = '';

	setTimeout(() => {

        //console.log(data)

        
      
        // while (items.lastChild) {
        //     items.removeChild(items.lastChild);
        // }
    
        //const preview = repeater.querySelector('.acf-block-preview');
    
        var i;

        data.forEach(function(post){
            const clonedTarget = repeater.cloneNode(true);
            const preview = clonedTarget.querySelector('.acf-block-preview');

            tokens.forEach(function(token){

                let value = lodash.get(post, token);

                if ( !value ) {
                    value = '{{' + token + '}}';
                }

                 //console.log(value);

                const html = preview.innerHTML.replace("{{" + token + "}}", value);
                preview.innerHTML = html;
            })

            items.appendChild(preview);
        });

        jQuery.event.trigger({
			type: "stopSpinner",
			message: 'ffff',
			time: new Date()
		});

	}, 500);


}
