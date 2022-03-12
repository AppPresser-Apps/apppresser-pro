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
    onChange: function(e, $el){
        e.preventDefault();
        const block = wp.data.select('core/block-editor').getSelectedBlock(); 
        const parent = wp.data.select("core/block-editor").getBlockRootClientId(block.clientId);
        const parentblock = wp.data.select('core/block-editor').getBlock(parent); 

        var $fields = acf.findFields({
            name: 'per_page'
        });


        if( parentblock && parentblock.name === 'acf/repeater' ) {
            console.log($fields);
            appp_update_repeater(parentblock.attributes.id, parentblock.attributes.data.per_page);
        }

        if( block && block.name === 'acf/repeater' ) {
            console.log($fields);
            appp_update_repeater(block.attributes.id, block.attributes.data.per_page);
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

function appp_update_repeater(id, per_page) {

	setTimeout(() => {

        const amount = (per_page - 1);


        const repeater = document.querySelector('#repeater-' + id);

        const items = document.querySelector('.items-repeat');
      
        while (items.lastChild) {
            items.removeChild(items.lastChild);
        }
    
        const preview = repeater.querySelector('.acf-block-preview');
    
    
        var i;
    
        for (i = 0; i < amount; i++) {
            const clonedTarget = preview.cloneNode(true);
            clonedTarget.classList.remove( 'acf-block-preview' );
            clonedTarget.firstChild.removeAttribute( 'id' );
            console.log('clone');
            items.appendChild(clonedTarget);
        }

	}, 500);


}