import { Component, ComponentInterface, h, Prop, State } from '@stencil/core';
//import { Event, EventEmitter, Listen } from '@stencil/core';
import { state } from '../../../../services/store';
import { BuddyPressService } from '../../services/buddypress.service';

@Component({
  tag: 'reply-item',
  styleUrl: 'reply-item.css',
})
export class ReplyItem implements ComponentInterface {

  private bpService;

  @Prop() item: any;
  @State() data: any;

  componentWillLoad() {
    this.bpService = new BuddyPressService({url: this.item.api});
    this.data = this.item;
  }

  presentModal() {
    const modalElement = document.createElement('ion-modal');
    modalElement.component = 'app-login';

    modalElement.backdropDismiss = false;

    // present the modal.
    document.body.appendChild(modalElement);
    return modalElement.present();
  }

  processClick(e, type) {
    e.stopPropagation();
    if (!state.auth) {
      this.presentModal();
    } else {
      if ('favorite' === type) {
        const is_fav = this.data.favorited ? false : true;
        this.updateFavoriteEvent( this.item.id, 'favorited', is_fav);
      }
    }
  }

  updateFavoriteHandler(event) {
    console.log(event);
    if( this.item.id === event[0] ) {
      this.data.favorited = event[2];
      this.data = {...this.data};
    }
  }

  async updateFavoriteEvent( id, key, value) {

    //const action = value ? 'activity_favorite' : 'activity_remove_favorite';

    this.updateFavoriteHandler([id, key, value]);

    await this.bpService.favActivity(id);

  }

  presentPopover(e, activity_id) {
    e.stopPropagation();
    const popover = Object.assign(document.createElement('ion-popover'), {
      component: 'pop-activity',
      componentProps: {item: this.data, activity: activity_id },
      cssClass: 'activity-pop',
      event: e,
      translucent: true
    });
    document.body.appendChild(popover);
    return popover.present();
  }

  render() {
    return (
      this.data && <ion-item>
        <div slot="start" style={{'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'align-self': 'flex-start'}}>
        <ion-avatar style={{width: '28px', height: '28px', alignSelf: 'flex-start', marginTop: '16px'}}><ion-img src={this.data.user_avatar.full}/></ion-avatar>
        </div>

        <div style={{width: '100%', padding: '10px 0'}}>
          <div class="activity-header">
          <span style={{fontSize: '13px', fontWeight: '700'}}>{this.data.display_name}</span>
          <span style={{fontSize: '13px'}}> @{this.data.username}</span>
        { state.auth && <ion-icon style={{float: 'right'}} slot="end" name="chevron-down-outline" onClick={(e)=> this.presentPopover(e,this.data.id)}></ion-icon> }
          </div>
          { ( this.data.attachments && this.data.attachments.length > 0 ) && <attachments-scroller items={this.data.attachments}></attachments-scroller> }
          <div class="activity-reply-content" innerHTML={this.data.content.rendered}></div>
          <div class="activity-actions">
            {/* <ion-icon name="chatbubble-outline" onClick={(e)=> this.processClick(e, 'reply')}></ion-icon> */}
            <ion-icon name={ this.data.favorited ? 'heart' : 'heart-outline'} onClick={(e)=> this.processClick(e, 'favorite')}></ion-icon>
          </div>
        </div>
      </ion-item>
      );
  }

}
