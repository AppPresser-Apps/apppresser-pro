import lodash from 'lodash-es';
import { state } from '../services/store';
//import { Database } from '../services/db';
//import { DatabaseService } from '../services/db.service';

export function processValue(source?, value?, _data?, api?) {

    //data.input_input_value

    switch (source) {
        case 'hard':
            if ( value ) {
                return processTokens(value, api);
            }
            break;
        case 'preferences':
            if ( value ) {
                const values = value.split(' : ');

                if ( values && values.length >= 2 ) {
                    const preference = state.preferences[values[0]];
                    if ( preference ) {
                        return preference[values[1]];
                    } else {
                        return value;
                    }
                } else {
                    return value;
                }
              
            }
            break;
        case 'transient':

            if ( value ) {

                console.log(value);

                const transient = state.transients[value];
                if ( transient ) {
                    return transient;
                } else {
                    return value;
                }
            }
            
            break;
            
        default:
            break;
    }

    return value;

}

export function processImage(data?, api?) {

    if (data && api) {
        let value = '';

        data.replace(/\{{(.*?)}}/g, function(_a, b) {
            value = lodash.get(api, b);    
        });
        return value;
    } else {
        return data;
    }

}

export function processTokens(data?, api = []) {

    if ( data ) {

        api['preferences'] = state.preferences;

    let tokens = [];

    data = data + '';

    data.replace(/\{{(.*?)}}/g, function(_a, b) {
        tokens.push(b);
    });

    if (tokens.length > 0 ) {

        let mapObj = {};

        tokens.map( token => {

            const regx = '{{'+ token +'}}';
            const value = lodash.get(api, token) ?? '';

            if ( null !== value && typeof value !== 'undefined' ) {
                mapObj[regx.trim()] = value;
            }
            
        });

      
        if ( Object.keys(mapObj).length > 0 ) {

            Object.keys(mapObj).map( obj => {

                data = data.replace( obj, function(matched) {
                    return mapObj[matched]
                });  

            })
            
        }
    
    }

    }

    var regex = /^-?[0-9]+$/;
    return regex.test(data) ? parseInt(data) : data;
}

export async function processOptions(_data, attrs) {

    const attr = attrs;
    const columns = attr.select_database_options.split(' : ');

    let options = [];

    switch (attr.select_option_source) {

        case 'external':
            break;
        case 'database':

            const rsp = await state.database.query(attr.select_database_query);

            if (rsp) {
                rsp.map( item => {
                    options.push({value: item[columns[0]], label: item[columns[1]] })
                })
            }

            break;
        case 'local':
            break;
    }
    return options;
}

export function processRule(api, rule) {
    const value = lodash.get(api, rule);
    return value;
}

export function processHidden(rule, _inputs) {

    const rules = rule.split(' - ');

  

    if ( rules.length ) {

        switch (rules[0]) {

            case 'preferences':
                
                if ( rules[1] ) {
                    const preference = state.preferences[rules[1]];
                 
                    return preference[rules[2]];
                }   
                break;
        
            default:
                break;
        }

        // if (rules.length &&  'form' === rules[0]) {
        //     const inputEl = [...inputs].filter( item => rules[1] === item.name );
        //     if ( inputEl ) {
        //         return inputEl[0].value;
        //     }
        // }

    }

    
    return rule;
}

export function split_rule(data) {
    return  data.split('-').map(item => item.trim());
}