import { Component, Host, h, ComponentInterface, Prop, State, Method, Element } from '@stencil/core';
import { renderComponent } from '../../helpers/content';
import { DataService } from '../../services/data.service';
//import { DatabaseService } from '../../services/db.service';
import { processTokens } from "../../helpers/tokens";
import { state } from '../../services/store';

@Component({
  tag: 'acf-repeater',
  styleUrl: 'acf-repeater.css',
})
export class AcfRepeater implements ComponentInterface {

  @Element() el : HTMLElement;

  private dataService = new DataService();

  @Prop() data;
  @Prop() api;
  @State() items;
  @State() innerBlocks;
  @State() spinner = false;

  queryFilter: string;
  
  //private db;

  componentWillLoad() {
    this.fetchData()
  }

  @Method()
  async filter(filter) {
    this.spinner = true;
    this.queryFilter = filter;

    this.fetchData();

    setTimeout(() => {
      this.spinner = false;
    }, 2000);
  }

  async resetFilter() {
    this.queryFilter = null;
    this.fetchData();
  }

  async fetchData() {

    this.items = null;
    this.spinner = true;

    // const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
    // await waitFor(3000);

    const attr = this.data.attrs.data;

    this.el.id = attr.id;

    if ( 'database' === attr.data_type ) {
 
      try {

        const db = state.database;
        console.log('repeater query', db);
        const rsp = await db.query(this.queryFilter ? this.queryFilter : attr.database_query);

        let blocks = [];
  
        rsp.map( item => {
          item['attr'] = attr;
          blocks.push(item);
          
        });
  
        this.items = [...blocks];
        
      } catch (error) {
        this.spinner = false;
      }
  
    }

    if ( 'simple' === attr.data_source.database_type ) {
      this.items = [...attr.local_data];
    }

    if ( 'api' === attr.data_type ) {

      let blocks = [];

      let params = {};

      if ( Array.isArray(attr.parameters) ) {
        attr.parameters.map( param => {
          params[param.key] = processTokens( param.value, this.api);
        });
      }

      let rsp = await this.dataService.getData( attr.api_url, params );

      if ( !Array.isArray(rsp) ) { rsp = [rsp]; }

      console.log(rsp);

      //const rsp = await fetch( attr.data_source.rest_url + '?_embed');
      //const arr = await rsp.json();

      rsp.map( async item => {
        item['attr'] = attr;
        blocks.push(item);
        
      });

      this.items = [...blocks];

    }

    this.spinner = false;

    return;

  }

  @Method()
  async reload() {
    this.queryFilter = null;
    await this.fetchData();
    return;
  }

  render() {
    return (
      <Host>
       <div>
        { this.spinner && <ion-spinner></ion-spinner> }
        { this.queryFilter && <p class="ion-text-center" onClick={()=> this.resetFilter()} innerHTML={this.data.attrs.data.reset_button_text}></p>}
        {this.items && this.items.length > 0 ? this.items.map( item => [
            this.data.innerBlocks.map( block => (
              renderComponent(block, item)
            ))
        ]) : <div innerHTML={ !this.queryFilter ? this.data.attrs.data.empty_dataset_code : this.data.attrs.data.empty_filter_code}></div> }
        </div>
      </Host>
    );
  }

}
