import { Component, Host, h, ComponentInterface, Prop } from '@stencil/core';
import { renderComponent } from '../../helpers/content';

@Component({
  tag: 'inner-segments',
  styleUrl: 'inner-segments.css',
})
export class InnerSegments implements ComponentInterface {

  @Prop() data: any;
  @Prop() selected: string;

  componentWillLoad() {
  
  }

  render() {
    return (
      <Host>
       <div>
        { this.data.innerBlocks.map( item => (
            item.attrs.data.segment == this.selected &&
            <div>
                { item.innerBlocks.map( block => (
                    renderComponent(block)
                ))}
            </div> 
        ))}
        </div>
      </Host>
    );
  }

}
