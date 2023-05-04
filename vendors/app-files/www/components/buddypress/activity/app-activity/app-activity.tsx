import { Component, Host, h, ComponentInterface, Prop, State, Listen, Method, Element } from '@stencil/core';
import { modalController } from '@ionic/core';
import { BuddyPressService } from '../../services/buddypress.service';
import { processTokens, split_rule } from "../../../../helpers/tokens";
import { state } from '../../../../services/store';

export interface Filter {
  type?: any;
  user_id?: number | string | null;
  group_id?: number | string | null;
  scope?: string;
  component?: string;
  page?: number;
  per_page?: number;
  include?: [number];
}

@Component({
  tag: 'app-activity',
  styleUrl: 'app-activity.css',
})
export class AppActivity implements ComponentInterface {

  @Element() el : HTMLElement;

  @Prop() data;
  @Prop() props;
  @Prop() filter?: Filter;
  @State() items;
  @State() spinner: boolean = true;

  loadMoreDisabled: boolean = true;

  private service;

  defaults: Filter = {
    type: ['activity_update'],
    page: 1,
    per_page: 20
  };

  args: Filter;

  constructor() {

    // Process block options to filter BuddyPress Activity stream.
    let filter = {};
    
    if ( this.data.attrs.data.group_id !== '' ) {
      const g_id = processTokens( this.data.attrs.data.group_id, state.api);
      filter = {group_id: g_id};
    }

    if ( this.data.attrs.data.user_id !== ''  ) {
       // Process route prop for single activity id.
       const rules = split_rule(this.data.attrs.data.user_id);

       if ( 'prop' === rules[0] ) {
         filter = {user_id: this.props[rules[1]]};
       } else {
       }
    }

    // filter for user id includes.
    if ( this.data.attrs.data.include !== ''  ) {

      // Process route prop for single activity id.
      const rules = split_rule(this.data.attrs.data.include);

      if ( 'prop' === rules[0] ) {
        filter = {include: [parseInt(this.props[rules[1]])]};
      } else {
        // const a_ids = processTokens( this.data.attrs.data.include, state.api);
      // filter = {include: [a_ids]};
      }

    }

    if ( 'activity_types' in this.data.attrs.data && this.data.attrs.data.activity_types !== ''  ) {  
      const array = this.data.attrs.data.activity_types.split(',').map(item => item.trim());
      filter['type'] = array;
    }

    this.filter = {...filter};
    this.args = { ...this.defaults, ...this.filter };
  }

  componentWillLoad() {
    this.service = new BuddyPressService({url: this.data.attrs.data.url})
    this.getActivity();
  }

  async getActivity() {
    
    const activity = await this.service.getActivity(this.args);

    console.log(activity);
    
    if ( 'data' in activity && activity.data.status >= 400 ) {
      console.log(activity.data.status);
      this.debugAlert(JSON.stringify(activity));
      this.items = [...[]];
    } else {
      this.items = [...activity];
    }
    this.spinner = false;
    this.loadMoreDisabled = false;
  }

  async loadMore(event) {

    this.args.page = this.args.page + 1;

    const activity = await this.service.getActivity(this.args);

    if ( activity ) {
      this.items = [...this.items, ...activity];
    }

    event.target.complete();
  }

  async debugAlert(message) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Debug';
    alert.message = message;
    alert.buttons = ['close'];
    alert.backdropDismiss = false;

    document.body.appendChild(alert);
    await alert.present();
  }

  //item deleted.
  @Listen("deleteActivityEvent", { target: "window" })
  async deleteActivity(e) {
    const items = this.items.filter( item => { return item.id !== e.detail });  
    this.items = [...items];
  }

  @Listen("activityReload", { target: "window" })
  async reload() {
    this.getActivity();
  }

  @Method()
  async postModal(args?, data?) {

    const modal = await modalController.create({
      component: 'app-post-form',
      cssClass: 'post-modal-class',
      componentProps:  {item: {api: this.data.attrs.data.url}, args:args, data:data},
      backdropDismiss: false
    });

    await modal.present();
  }

  render() {
    return (
      <Host>
        { this.spinner ? <ion-spinner></ion-spinner> : null }

        { (!this.spinner && this.items && this.items.length <= 0 && ! this.loadMoreDisabled ) ? <ion-item><ion-label>No recent activity.</ion-label></ion-item> : null }
        { this.items && this.items.map( item =>  <activity-item key={item.id} item={item} options={this.data}></activity-item> )}
        <ion-infinite-scroll
          disabled={this.loadMoreDisabled}
          threshold="200px"
          id="infinite-scroll"
          onIonInfinite={(e) => this.loadMore(e)}
        >
          <ion-infinite-scroll-content loadingSpinner="crescent"></ion-infinite-scroll-content>
      </ion-infinite-scroll>
      </Host>
    );
  }

}
