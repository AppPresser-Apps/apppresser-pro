import { Component, Host, h, ComponentInterface, Prop, State, Element, Event, EventEmitter, Listen } from '@stencil/core';
import { modalController } from '@ionic/core';
import { state } from '../../../../services/store';
import { BuddyPressService } from '../../services/buddypress.service';
 
@Component({
  tag: 'activity-item',
  styleUrl: 'activity-item.css',
})
export class ActivityItem implements ComponentInterface {

  @Element() el : HTMLElement;

  private bpService;

  @Prop() item: any = {};
  @Prop() options;
  @State() data;

  componentWillLoad() {
    this.data = this.item;
    this.bpService = new BuddyPressService({url: this.data.api});
  }

  componentDidLoad() {

    //this.blockClicksOnGamipressBadges();

    //this.checkLinks();

  }

  async postModal(item) {

    const modal = await modalController.create({
      component: 'app-post-form',
      cssClass: 'post-modal-class',
      componentProps:  { item: item, reply: true },
      backdropDismiss: false
    });

    await modal.present();
  }

  async viewProfile(e, data) {
    e.stopPropagation();
    const router = await document.querySelector("ion-router");
    (router as any).push("/members/" + data.user_id);
  }

  viewActivityItem_(_e, _data) {

  }

  presentPopover(e, activity_id) {
    e.stopPropagation();
    const popover = Object.assign(document.createElement("ion-popover"), {
      component: "pop-activity",
      componentProps: { item: this.data, activity: activity_id },
      cssClass: "activity-pop",
      event: e,
      translucent: true,
    });
    document.body.appendChild(popover);
    return popover.present();
  }

  async viewActivityItem(e, item) {
    e.stopPropagation();
      const router = await document.querySelector("ion-router");
      (router as any).push("/activity/" + item.id);
  }

  async goToRoute(e, link) {
    e.stopPropagation();
      const router = await document.querySelector("ion-router");
      (router as any).push(link);
  }

  processClick(e, type) {
    e.stopPropagation();
    if ("favorite" === type) {
    const is_fav = this.data.favorited ? false : true;
    this.updateFavoriteEvent(this.data.id, is_fav);
    }
    if ("reply" === type) {
      this.postModal(this.data);
    }
  }

  @Listen("favActivityEvent", { target: "window" })
  async favActivity(e) {
    if (this.data.id === e.detail.id) {
      console.log('fav event handler', e.detail);
      this.data.favorited = e.detail.value;
      this.data = {...this.data}
    }
  }

  @Event({ bubbles: true }) favActivityEvent: EventEmitter;
  async updateFavoriteEvent( id, value) {
    this.favActivityEvent.emit({id: id, value: value});
    await this.bpService.favActivity(id);
  }

  async checkLinks() {
    var links = this.el.querySelector('.activity-action').querySelectorAll('a');
    links.forEach(el => el.addEventListener('click', async event => {

      event.preventDefault();
      event.stopPropagation();

      if ( el.classList.contains('router-link') ) {
        const router = await document.querySelector("ion-router");
        (router as any).push(el.getAttribute("href"));
      }

    }));
  }

  render() {
    return (
      <Host>
      { this.data &&

        [<ion-item lines="full" onClick={(e) => this.viewActivityItem(e, this.data)}>
          <ion-avatar
            onClick={(e) => this.viewProfile(e, this.data)}
            slot="start"
            style={{
              width: "46px",
              height: "46px",
              alignSelf: "flex-start",
              marginTop: "16px",
            }}
          >
            <ion-img src={this.data.user_avatar.full} />
          </ion-avatar>
          <div style={{ width: "100%", padding: "10px 0" }}>
            <div class="activity-header">
              <span style={{ fontSize: "14px", fontWeight: "700" }} innerHTML={this.data.display_name}></span>
              {this.data.user_type === "artist" && (
                <span class="chip">ARTIST</span>
              )}
              { state.auth && (
                <ion-icon
                  style={{ float: "right" }}
                  slot="end"
                  name="chevron-down-outline"
                  onClick={(e) => this.presentPopover(e, this.data.id)}
                ></ion-icon>
              )}
            </div>
            <div class="activity-action" style={{ color: "#615e5e", fontSize: "12px" }}>
              <span style={{ fontSize: "13px" }} innerHTML={ this.data.activity_action ? this.data.activity_action.action + ' - ' : ''}></span> 
              <span style={{ fontSize: "14px" }}> @{this.data.username} - </span>
              <span>{this.data.time_since}</span>
            </div>

            <p id="activity-content"
              style={{ fontSize: "13px", fontWeight: "500" }}
              innerHTML={this.data.content.rendered}
            ></p>

            { this.data.html && <p id="activity-html"
              style={{ fontSize: "13px", fontWeight: "500" }}
              innerHTML={this.data.html}
            ></p> }

              { ( this.data.attachments && this.data.attachments.length > 0 ) && <attachments-scroller items={this.data.attachments}></attachments-scroller> }


            { this.data.type === 'joined_group' &&
                <p style={{ fontSize: "13px", fontWeight: "500" }}>{this.data.activity_action.action} <a onClick={(e)=> this.goToRoute(e, '/groups/' + this.data.activity_action.slug)}>{this.data.activity_action.name}</a></p>
            }

            { this.data.type === 'new_member' &&
              <p style={{ fontSize: "13px", fontWeight: "500" }}>{this.data.activity_action.action}</p>
            }

            { this.data.type === 'created_group' &&
              <p style={{ fontSize: "13px", fontWeight: "500" }}>{this.data.activity_action.action} <a onClick={(e)=> this.goToRoute(e, '/groups/' + this.data.activity_action.slug)}>{this.data.activity_action.name}</a></p>
            }

            <div class="activity-actions">
              { this.data.can_comment && this.options.attrs.data.icon !== '0' && <ion-icon
                name={this.options.attrs.data.icon}
                onClick={(e) => this.processClick(e, "reply")}
              ></ion-icon> }
              { this.options.attrs.data.favoriting !== '1' && this.data.can_favorite && <ion-icon
                name={this.data.favorited ? "heart" : "heart-outline"}
                onClick={(e) => this.processClick(e, "favorite")}
              ></ion-icon> }
            </div>
          </div>
        </ion-item>,

        <div>
        { this.options.attrs.data.icon !== '0' && <activity-replies parentid={this.data.id} data={this.options}></activity-replies> }
        </div>
        ]}

      </Host>
    );
  }

}
