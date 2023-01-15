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
        var wrapper = editor.getWrapperElement();

        $expand.on('click', ()=> {

            var modal = document.createElement('div');

            modal.setAttribute( 'id', 'code-modal-wrapper');

            modal.setAttribute('style', `
            z-index: 9999; 
            position: absolute; 
            top: 0; left: 0; 
            right: 0; 
            bottom: 0; 
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            `);

            modal.innerHTML = `<div id="code-modal" style="background: #ffffff; padding: 6px; width: 100%; max-width: 900px;">
            <div class="modal-close" style="padding-bottom: 8px;"><span class="dashicons dashicons-fullscreen-exit-alt"></span></div>
            <div id="code-inner" style="height: calc( 100vh - 250px); max-height: 500px; overflow: scroll; background: #0C1021;"></div>
            </div>
            `;

            $(modal).appendTo('body');

            // detach the new element from wherever it is and append it below parent, and show it
            $(wrapper).detach().appendTo('#code-inner').show();

            console.log(wrapper);

            $('.modal-close').on('click', ()=> {

                $(wrapper).detach().insertBefore($expand).show();

                window['codemirror'].refresh();

                $('#code-modal-wrapper').remove();
            });

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
