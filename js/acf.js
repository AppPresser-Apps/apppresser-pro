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
        if(appp_data !== undefined && appp_data !== null) {
            const palette = JSON.parse(appp_data.color_palettes);
            const array = Object.values(palette);
            args.palettes = array;
        }
    }

    // return
    return args;

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