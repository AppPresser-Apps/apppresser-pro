import { Component, Host, h, ComponentInterface, Prop, State } from '@stencil/core';
import { BuddyPressService } from '../../services/buddypress.service';
import { state } from '../../../../services/store';

export interface Filter {
  user_id?: number | string | null;
  group_id?: number | string | null;
  scope?: string;
  component?: string;
  page?: number;
  per_page?: number;
  include?: [number];
}

@Component({
  tag: 'app-members',
  styleUrl: 'app-members.css',
})
export class AppMembers implements ComponentInterface {

  @Prop() data;
  @Prop() filter?: Filter;
  @State() items;
  @State() spinner: boolean = true;

  loadMoreDisabled: boolean = true;

  private service;

  defaults: Filter = {
    page: 1,
    per_page: 20
  };

  args: Filter;

  constructor() {

    // Process block options to filter BuddyPress Activity stream.
    let filter = {};
    
    if ( this.data.attrs.data.type !== '' ) {
      filter = {type: this.data.attrs.data.type};
    }

    this.filter = {...filter};
    this.args = { ...this.defaults, ...this.filter };
  }

  componentWillLoad() {
    this.service = new BuddyPressService({url: this.data.attrs.data.url})
    this.getMembers();
  }

  async getMembers() {
    const members = await this.service.getMembers(this.args);
    this.items = [...members];
    this.spinner = false;
    this.loadMoreDisabled = false;
  }

  async viewItem(_e, item) {
    console.log(item);
    state.api = item;
    await customElements.whenDefined('ion-router');
    const router = document.querySelector('ion-router');
    router.push(`/members/${item.id}`)
  }

  async loadMore(event) {
    console.log("Begin load more");

    this.args.page = this.args.page + 1;

    const members = await this.service.getMembers(this.args);

    if ( members ) {
      this.items = [...this.items, ...members];
    }

    event.target.complete();
  }

  render() {
    return (
      <Host>
        { this.spinner ? <ion-spinner></ion-spinner> : null }

        { (!this.spinner && this.items.length < 0 && ! this.loadMoreDisabled ) ? <ion-item><ion-label>No recent activity.</ion-label></ion-item> : null }
        <ion-list>
        {this.items && this.items.map((item) => (
          <ion-item key={item.id} detail={true} onClick={(e) => this.viewItem(e, item)}>
            <ion-avatar
              slot="start"
              style={{
                width: "46px",
                height: "46px",
                alignSelf: "flex-start",
                marginTop: "16px",
              }}
            >
              <ion-img src={item.avatar_urls.full} />
            </ion-avatar>
            <div style={{ width: "100%", padding: "10px 0" }}>
              <div class="activity-header">
                <span style={{ fontSize: "13px", fontWeight: "700" }} innerHTML={item.name}></span>
                {item.member_types[0] === "artist" && (
                  <span class="chip">ARTIST</span>
                )}
              </div>
              <span style={{ fontSize: "13px" }}> @{item.mention_name}</span>
            </div>
          </ion-item>
        ))}
        </ion-list>
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
