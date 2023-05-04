import { h } from '@stencil/core';
import { runAction } from './actions';
import { processTokens, processImage, processRule } from './tokens';
import { formatText } from '../helpers/utils';
import { state } from '../services/store';

export function renderComponent(block, api?, props?) {
  if (visibility(block.attrs.data, api)) {
    switch (block.blockName) {
      case 'acf/form':
        return <acf-form data={block}></acf-form>;
      case 'acf/iframe':
        return <app-iframe data={block.attrs.data}></app-iframe>;
      case 'acf/date-time':
        return <acf-date-time data={block}></acf-date-time>;
      case 'acf/action':
        return renderAction(block, api);
      case 'acf/wysiwyg':
        return renderWYSIWYG(block, api);
      case 'acf/button':
        return renderButton(block);
      case 'acf/container':
        return renderContainer(block, api);
      case 'acf/text':
        return <acf-text api={api} data={block}></acf-text>;
      case 'acf/ion-image':
        return renderImage(block, api);
      case 'acf/ion-avatar':
        return renderAvatar(block, api);
      case 'acf/ion-thumbnail':
        return renderThumbnail(block, api);
      case 'acf/ion-chip':
        return renderChip(block, api);
      case 'acf/breadcrumbs':
        return renderBreadcrumb(block);
      case 'acf/ion-icon':
        return renderIcon(block);
      case 'core/spacer':
        return renderSpacer(block);
      case 'acf/list-header':
        return renderListHeader(block);
      case 'acf/accordion':
        return renderAccordion(block, api);
      case 'acf/ion-item':
        return renderItem(block, api);
      case 'acf/columns':
        return renderColumns(block, api);
      case 'acf/segment':
        return renderSegment(block);
      case 'acf/ion-menu-toggle':
        return renderMenutoggle(block);
      case 'acf/card':
        return <acf-card api={api} data={block}></acf-card>;
      case 'acf/repeater':
        return <acf-repeater data={block} api={api}></acf-repeater>;
      case 'acf/subrepeater':
        return <acf-subrepeater data={block} api={api}></acf-subrepeater>;
      case 'acf/bp-profile-fields':
        return <appp-edit-profile data={block}></appp-edit-profile>;
      case 'acf/bp-activity':
        return <app-activity data={block} props={props}></app-activity>;
      case 'acf/bp-groups':
        return <app-groups data={block}></app-groups>;
      case 'acf/bp-members':
        return <app-members data={block}></app-members>;
      case 'acf/bp-profile':
        return <app-profile data={block} props={props}></app-profile>;
      default:
        break;
    }
  }
}

function renderWYSIWYG(block, api) {
  return <div innerHTML={processTokens(block.attrs.data.editor, api)}></div>;
}

function renderAccordion(data, api) {
  const attr = data.attrs.data;

  return (
    <ion-accordion-group expand={attr.style} multiple={false}>
      {attr.accordions &&
        attr.accordions.map((item, index) => (
          <ion-accordion value={'accordion-' + index + ''}>
            <ion-item slot="header" color="light">
              <ion-label class="ion-text-wrap">{processTokens(item.title, api)}</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content" innerHTML={processTokens(item.content, api)}></div>
          </ion-accordion>
        ))}
    </ion-accordion-group>
  );
}

function renderMenutoggle(data) {
  //const attr = data.attrs.data;

  return [<ion-menu-toggle autoHide={false}>{data.innerBlocks.map(block => [renderComponent(block, {})])}</ion-menu-toggle>];
}

function renderSegment(data) {
  const attr = data.attrs.data;

  const style = {
    margin: '16px',
  };

  let selected = attr.segments[0].label;

  const toggle = value => {
    selected = value;

    const el = document.querySelector('[data-segment="' + data.attrs.id + '"]');
    el.setAttribute('selected', value);
  };

  return [
    <div style={style}>
      <ion-segment value={selected} onIonChange={ev => toggle(ev.detail.value)}>
        {attr.segments &&
          attr.segments.map(item => (
            <ion-segment-button value={item.label}>
              <ion-label>{item.label}</ion-label>
            </ion-segment-button>
          ))}
      </ion-segment>
    </div>,
    <inner-segments data-segment={data.attrs.id} data={data} selected={selected}></inner-segments>,
  ];
}

function renderColumns(data, api) {
  const columns = data.innerBlocks;

  const style = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: data.attrs.data.padding_padding_bottom + 'px',
    paddingTop: data.attrs.data.padding_padding_top + 'px',
    paddingLeft: data.attrs.data.padding_padding_left + 'px',
    paddingRight: data.attrs.data.padding_padding_right + 'px',
    marginBottom: data.attrs.data.margin_margin_bottom + 'px',
    marginTop: data.attrs.data.margin_margin_top + 'px',
    marginLeft: data.attrs.data.margin_margin_left + 'px',
    marginRight: data.attrs.data.margin_margin_right + 'px',
  };

  return (
    <div style={style}>
      {columns.map(block => [
        <div
          style={{
            display: 'flex',
            flexGrow: block.attrs.data.flex_grow,
            flexDirection: 'column',
            justifyContent: block.attrs.data.alignment_vertical,
            alignItems: block.attrs.data.alignment,
            paddingBottom: block.attrs.data.padding_padding_bottom + 'px',
            paddingTop: block.attrs.data.padding_padding_top + 'px',
            paddingLeft: block.attrs.data.padding_padding_left + 'px',
            paddingRight: block.attrs.data.padding_padding_right + 'px',
          }}
        >
          {block.innerBlocks.map(block => [renderComponent(block, api)])}
        </div>,
      ])}
    </div>
  );
}

function renderItem(data, api) {
  const attr = data.attrs.data;

  const position = 'default' === attr.label_position ? '' : attr.label_position;
  const required_text = '' !== attr[`${attr.input_type}_required_text`] ? attr[`${attr.input_type}_required_text`] : '*';
  const required = '1' === attr[`${attr.input_type}_required`] ? required_text : '';

  const labelstyle = {
    'padding-top': attr.padding_top + 'px',
    'padding-bottom': attr.padding_bottom + 'px',
  };

  const itemstyle = {
    '--detail-icon-color': `var(--ion-color-${attr.detail_icon_color ?? 'default'})`,
    '--detail-icon-opacity': '1',
  };

  const thumbstyle = {
    'width': attr.thumbnail_size + 'px',
    'height': attr.thumbnail_size + 'px',
    '--border-radius': attr.thumbnail_radius + 'px',
  };

  const label = processTokens(attr.label, api);
  const value = processTokens(attr.description, api);
  const thumbnail = attr.token !== '' ? processImage(attr.token, api) : attr.thumbnail_url;

  const truncate = {
    'white-space': 'nowrap',
    'overflow': 'hidden',
    'text-overflow': 'ellipsis',
  };

  return (
    <ion-item
      style={itemstyle}
      color={'default' !== attr.background_color ? attr.background_color : ''}
      lines={attr.lines}
      detail={attr.icon_detail !== '0' ? true : false}
      detailIcon={attr.icon_detail}
    >
      {attr.item_icon_type === 'icon' && <ion-icon color={'default' !== attr.icon_color ? attr.icon_color : ''} slot="start" name={attr.icon}></ion-icon>}
      {attr.item_icon_type === 'thumbnail' && (
        <ion-thumbnail style={thumbstyle} slot="start">
          <ion-img alt={attr.thumbnail_alt} src={thumbnail}></ion-img>
        </ion-thumbnail>
      )}
      {attr.label !== '' && (
        <ion-label style={labelstyle} position={position} class={attr.wrap_text === '1' ? 'ion-text-wrap' : ''}>
          <h2>
            <ion-text color={'default' !== attr.label_color ? attr.label_color : ''}>
              {label} {required}
            </ion-text>
          </h2>
          <p style={attr.formatting === 'truncate' ? truncate : {}}>
            <ion-text color={'default' !== attr.description_color ? attr.description_color : ''} innerHTML={formatText(attr, value)}></ion-text>
          </p>
        </ion-label>
      )}
      <app-input data={data.attrs.data} api={api}></app-input>
      <ion-note slot="error"></ion-note>
    </ion-item>
  );
}

function renderListHeader(data) {
  const attr = data.attrs.data;

  const style = {};

  return (
    <ion-list-header style={style} lines={attr.label_border}>
      <ion-label color={attr.color_label}>{attr.label}</ion-label>
      <ion-button fill="clear" color={attr.color_button} onClick={e => runAction({ action: attr.action, data: attr, ev: e })}>
        {attr.button_label}
      </ion-button>
    </ion-list-header>
  );
}

function renderSpacer(data) {
  return <div style={data.attrs}></div>;
}

function renderIcon(data) {
  const attr = data.attrs.data;

  const style = {
    fontSize: attr.size + 'px',
  };

  return <ion-icon style={style} name={attr.icon} color={attr.color}></ion-icon>;
}

function renderBreadcrumb(data) {
  const attr = data.attrs.data;

  return (
    <ion-breadcrumbs color={attr.color}>
      {attr.breadcrumbs &&
        attr.breadcrumbs.map(item => (
          <ion-breadcrumb href={item.link}>
            {item.link !== 0 && <ion-icon slot="start" name={item.icon}></ion-icon>}
            {item.title}
            <ion-icon slot="separator" name={attr.separator}></ion-icon>
          </ion-breadcrumb>
        ))}
    </ion-breadcrumbs>
  );
}

function renderChip(data, api?) {
  const attr = data.attrs.data;

  return <ion-chip color={attr.color}>{processImage(attr.text, api)}</ion-chip>;
}

function renderThumbnail(data, api) {
  const attr = data.attrs.data;

  const style = {
    width: attr.image_size + 'px',
    height: attr.image_size + 'px',
    borderRadius: attr.border_radius + 'px',
    overflow: 'hidden',
  };

  return (
    <ion-thumbnail style={style}>
      <ion-img alt={attr.alt_text} src={attr.token ? processImage(attr.token, api) : attr.image_file}></ion-img>
    </ion-thumbnail>
  );
}

function renderAvatar(data, api?) {
  const attr = data.attrs.data;

  const style = {
    width: attr.image_size + 'px',
    height: attr.image_size + 'px',
    border: `${attr.border_width}px solid ${attr.border_color}`,
  };

  return (
    <ion-avatar style={style}>
      <ion-img alt={attr.alt_text} src={attr.token ? processImage(attr.token, api) : attr.image_file}></ion-img>
    </ion-avatar>
  );
}

function renderImage(data, api) {
  const attr = data.attrs.data;

  const style = {
    marginBottom: attr.margin_margin_bottom + 'px',
    marginTop: attr.margin_margin_top + 'px',
    marginLeft: attr.margin_margin_left + 'px',
    marginRight: attr.margin_margin_right + 'px',
    borderRadius: attr.border_radius + 'px',
    overflow: 'hidden',
  };

  if ('auto' !== attr.width) {
    const pxperc = 'pixels' === attr.width ? 'px' : '%';
    style['width'] = attr.width_amount + pxperc;
  }

  return <ion-img alt={attr.alt_text} style={style} src={attr.token ? processImage(attr.token, api) : attr.image_file}></ion-img>;
}

function renderAction(data, api) {
  const attr = data.attrs.data;

  return (
    <div onClick={e => runAction({ action: attr.action, data: attr, ev: e, api: api })}>{data.innerBlocks && data.innerBlocks.map(block => [renderComponent(block, api)])}</div>
  );
}

function renderButton(data) {
  const attr = data.attrs.data;

  const style = {
    marginBottom: attr.margin_margin_bottom + 'px',
    marginTop: attr.margin_margin_top + 'px',
    marginLeft: attr.margin_margin_left + 'px',
    marginRight: attr.margin_margin_right + 'px',
  };

  if (attr.expand === 'inline') {
    style['display'] = 'flex';
    style['justify-content'] = attr.alignment;
  }

  return (
    <div style={style}>
      <ion-button
        // onClick={(e)=> runAction({action: attr.action, data: attr, ev: e}) }
        color={attr.color}
        fill={attr.fill}
        size={attr.size}
        expand={attr.expand}
      >
        {attr.title}
      </ion-button>
    </div>
  );
}

function renderContainer(data, api) {
  const attr = data.attrs.data;

  const style = {
    paddingTop: attr.padding_padding_top + 'px',
    paddingBottom: attr.padding_padding_bottom + 'px',
    paddingLeft: attr.padding_padding_left + 'px',
    paddingRight: attr.padding_padding_right + 'px',
    marginTop: attr.margin_margin_top + 'px',
    marginBottom: attr.margin_margin_bottom + 'px',
    marginLeft: attr.margin_margin_left + 'px',
    marginRight: attr.margin_margin_right + 'px',
    borderRadius: attr.border_radius,
    borderTop: attr.border_top,
    borderBottom: attr.border_bottom,
    borderLeft: attr.border_left,
    borderRight: attr.border_right,
    display: 'flex',
    flexDirection: attr.flex_flex_direction,
    flexWrap: attr.flex_flex_wrap,
    justifyContent: attr.flex_justify_content,
    alignItems: attr.flex_align_items,
  };

  if ('pixels' === attr.height) {
    style['height'] = attr.height_amount + 'px';
  }

  if ('percentage' === attr.height) {
    style['height'] = attr.height_amount + '%';
  }

  if ('pixels' === attr.width) {
    style['width'] = attr.width_amount + 'px';
  }

  if ('percentage' === attr.width) {
    style['width'] = attr.width_amount + '%';
  }

  if ('default' !== attr.color) {
    style['backgroundColor'] = `var(--ion-color-${attr.color})`;
  }

  if ('' !== attr.background_image_url) {
    style['backgroundImage'] = `url(${attr.image_file})`;
    style['backgroundSize'] = `${attr.background_size}`;
    style['backgroundRepeat'] = `${attr.background_repeat}`;
    if ('custom' === attr.background_position) {
      style['backgroundPosition'] = `${attr.custom_position}`;
    } else {
      style['backgroundPosition'] = `${attr.background_position}`;
    }
  }

  if ('none' !== attr.background_gradient_type) {
    let colors = [];

    attr.background_gradient_colors.map(color => {
      colors.push('var(--ion-color-' + color + ')');
    });

    const gradientSize = parseInt(attr.background_gradient_size);

    switch (attr.background_gradient_type) {
      case 'linear':
        style['backgroundImage'] = `linear-gradient( ${attr.background_gradient_angle}deg, ${colors.join(', ')})`;
        break;
      case 'radial':
        style['backgroundImage'] = `radial-gradient( circle at ${attr.background_gradient_position}, ${colors.join(', ')})`;
        break;
      case 'conic':
        style['backgroundImage'] = `conic-gradient( from ${attr.background_gradient_angle}deg, ${colors.join(', ')})`;
        break;
      case 'repeating-linear':
        style['backgroundImage'] = `repeating-linear-gradient( ${attr.background_gradient_angle}deg, ${colors[0]}, ${colors[0]} ${gradientSize / 2}px, ${colors[1]} ${
          gradientSize / 2
        }px, ${colors[1]} ${gradientSize}px`;
        break;
      case 'repeating-radial':
        style['backgroundImage'] = `repeating-radial-gradient( circle at ${attr.background_gradient_position}, ${colors[0]}, ${colors[0]} ${gradientSize / 2}px, ${colors[1]} ${
          gradientSize / 2
        }px, ${colors[1]} ${gradientSize}px`;
        break;

      default:
        break;
    }
  }

  // style['marginTop'] = `${attr.margin_margin_top}px`;
  // style['marginBottom'] = `${attr.margin_margin_bottom}px`;
  // style['marginLeft'] = `${attr.margin_margin_left}px`;
  // style['marginRight'] = `${attr.margin_margin_right}px`;

  // style['paddingTop'] = `${attr.padding_padding_top}px`;
  // style['paddingBottom'] = `${attr.padding_padding_bottom}px`;
  // style['paddingLeft'] = `${attr.padding_padding_left}px`;
  // style['paddingRight'] = `${attr.padding_padding_right}px`;

  return [
    <div id={attr.id} style={style}>
      {data.innerBlocks.map(block => [renderComponent(block, api)])}
    </div>,
  ];
}

// let ConvertStringToHTML = function (str) {
//    let parser = new DOMParser();
//    let doc = parser.parseFromString(str, 'text/html');
//    return doc.body;
// };

export function visibility(block, api?) {
  const attr = block;

  let is_visible = true;

  // If visibilty is set to hidden hide this element.
  if (attr && 'visibility' in attr && 'hidden' === attr.visibility) {
    is_visible = false;
  }

  if (attr && 'visibility_rules' in attr && attr.visibility_rules.length > 0 && Array.isArray(attr.visibility_rules)) {
    attr.visibility_rules.map(data => {
      const rule = split_rule(data);

      switch (rule.type) {
        case 'api':
          const rsp = processRule(api, rule.rule);

          if (rule.condition === 'empty' && rsp !== '') {
            is_visible = false;
          }

          if (rule.condition === '!empty' && rsp === '') {
            is_visible = false;
          }

          if (rule.condition === 'true' && rsp === false) {
            is_visible = false;
          }

          if (rule.condition === 'false' && rsp === true) {
            is_visible = false;
          }

          if (rule.condition === 'length' && Array.isArray(rsp) && rsp.length <= 0) {
            is_visible = false;
          }

          if (rule.condition === 'includes' && Array.isArray(rsp) && !rsp.includes(rule.value)) {
            is_visible = false;
          }

          if (rule.condition === 'null' && rsp === null) {
            is_visible = false;
          }

          break;

        default:
          break;
      }
    });
  }

  // If visibilty is set to authenticated and state has authorization show this element.
  if (attr && 'visibility' in attr && 'authenticated' === attr.visibility) {
    is_visible = state.auth ? true : false;
  }

  // If visibilty is set to unauthenticated and state has no authorization show this element.
  if (attr && 'visibility' in attr && 'unauthenticated' === attr.visibility) {
    is_visible = state.auth ? false : true;
  }

  return is_visible;
}

export function split_rule(data) {
  return {
    type: data.rule.split('-')[0] ? data.rule.split('-')[0].trim() : '',
    rule: data.rule.split('-')[1] ? data.rule.split('-')[1].trim() : '',
    condition: data.rule.split('-')[2] ? data.rule.split('-')[2].trim() : '',
    value: data.rule.split('-')[3] ? data.rule.split('-')[3].trim() : '',
  };
}
