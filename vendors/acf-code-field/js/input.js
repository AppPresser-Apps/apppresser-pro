(function( $ ) {

    function initialize_code_field( $el ) {

        if ( $el.parents( ".acf-clone" ).length > 0 ) {
            return;
        }

        var $textarea = $el.find( '.acf-input>textarea' );

        var editor = window.CodeMirror.fromTextArea( $textarea[ 0 ], {
            lineNumbers: true,
            fixedGutter: false,
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            mode: $textarea.attr( "mode" ),
            theme: $textarea.attr( "theme" ),
            extraKeys: { "Ctrl-Space": "autocomplete" },
            matchBrackets: true,
            styleSelectedText: true,
            autoRefresh: true,
            value: document.documentElement.innerHTML,
            viewportMargin: Infinity
        } );

        editor.on('change', function(){
            editor.save();
        });

        window['codemirror'] = editor;

        var $expand = $el.find( '.expand' );

        

        $expand.on('click', ()=> {

            var wrapper = editor.getWrapperElement();

            // detach the new element from wherever it is and append it below parent, and show it
            $(wrapper).detach().appendTo('.wp-block-post-content').show();

            console.log(wrapper);
        })

    }

    if ( typeof acf.add_action !== 'undefined' ) {
        acf.add_action('ready_field/type=acf_code_field', initialize_code_field);
        acf.add_action('append_field/type=acf_code_field', initialize_code_field);
    } else {
        $( document ).on( 'acf/setup_fields', function( e, postbox ) {

            // find all relevant fields
            $( postbox ).find( '.field[data-field_type="acf_code_field"]' ).each( function() {

                // initialize
                initialize_code_field( $( this ) );

            } );
        } );

    }

})( jQuery );
