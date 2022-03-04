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
        
        const palette = JSON.parse(appp_data.color_palettes);
        const array = Object.values(palette);
        args.palettes = array;
    }

    // return
    return args;

});


acf.add_action('ready append', function(e){
    window.jQuery('a.acf-icon.-duplicate').remove();
});