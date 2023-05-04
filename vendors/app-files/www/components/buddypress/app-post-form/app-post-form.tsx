import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';
import { loadingController } from '@ionic/core';
import { BuddyPressService } from '../services/buddypress.service';
import { state } from '../../../services/store';
import { AttachmentStore } from '../attachments/attachment/services/state';

@Component({
  tag: 'app-post-form',
  styleUrl: 'app-post-form.css',
})
export class AppPostForm implements ComponentInterface {

  private bpService;

  posting: boolean = false;
  content: string;
  @Prop({mutable: true}) placeholder: string = 'Post a status update...';
  @Prop() reply: boolean = false;
  @Prop() item: any;
  @Prop() args: any;
  @Prop() data: any;

  componentWillLoad() {
    console.log(this.item, this.data)
    this.placeholder = this.reply ? 'Post a reply...' : this.placeholder;
    this.bpService =  new BuddyPressService({url: this.item.api});
  }

  @Event({bubbles:true}) activityReply: EventEmitter;
  @Event({bubbles:true}) activityPost: EventEmitter;
  async activityPostEvent(item) {
    console.log(this.reply);
    if (!this.reply) {
      this.activityPost.emit(item);
    }
    if (this.reply) {
      this.activityReply.emit({item: item, parent: this.item.id });
    }

  }

  async dismissLoader() {

    const loader = await document.querySelector('ion-loading');
    loader.dismiss();

  }

  async dismissModal() {

    const modal = await document.querySelector('ion-modal');
    modal.dismiss({
      'dismissed': true
    });
  }

  @Event({bubbles:true}) activityReload: EventEmitter;
  async addActivity() {

    if ( '' !== this.content && !this.posting ) {

      const loading = await loadingController.create({ message: '', cssClass: 'ion-loading-spinner' });

      setTimeout(()=> {
        loading.present();
      }, 50 );

      this.posting = true;

      // 'id'                => $r['id'],
      // 2680	                'content'           => $comment_content,
      // 2681	                'component'         => buddypress()->activity->id,
      // 2682	                'type'              => 'activity_comment',
      // 2683	                'primary_link'      => $r['primary_link'],
      // 2684	                'user_id'           => $r['user_id'],
      // 2685	                'item_id'           => $activity_id,
      // 2686	                'secondary_item_id' => $r['parent_id'],
      // 2687	                'hide_sitewide'     => $is_hidden,
      // 2688	                'error_type'        => $r['error_type']

      const args = Object.assign({ content: this.content }, this.args ?? { component: 'activity', context: 'edit', type: 'activity_update' });

      //console.log(this.args, args);

      if ( this.reply ) {
        args['type'] = 'activity_comment';
        args['primary_item_id'] = this.item.id;
      }

      let activity;

      if ( AttachmentStore.attachments.length > 0 ) {
        args['attachments'] = AttachmentStore.attachments;
        if ( !this.content ) {
          args['content'] = '<span></span>';
        }
        activity = await this.bpService.uploadAttachmentActivity(args);
      } else {
        activity = await this.bpService.addActivity(args);
      }

      console.log('reply', this.reply, activity);

      if (activity && ! activity.hasOwnProperty('error') ) {

        const items = [activity[0], ...state.activity];

        if (!this.reply) {
          state.activity = [...items];

          this.activityPostEvent(activity);

          state.activity_item = [];
  
          this.activityReload.emit();
  
          const router = document.querySelector('ion-router');
          router.push('/activity/' + ( this.reply ? activity[0].primary_item_id : activity[0].id ) );
        } else {
          console.log('reply');
          this.activityReply.emit({item: activity[0], parent: this.item.id });
        }

      } 

      AttachmentStore.attachments = [];

      this.posting = false;

      this.dismissLoader();
      this.dismissModal();

    }

  }

  updateContent(e) {
    this.content = e.target.value;
  }

  get postingToGroup(): boolean {
    return this.args?.component === 'groups';
  }

  get groupName(): string {
    return  this.data?.api.name;
  }


  render() {
    return [
      <ion-header>
        <ion-toolbar>
        <ion-buttons slot="start">
            <ion-button onClick={()=> this.dismissModal()}>
              <ion-icon slot="icon-only" name="close"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title></ion-title>
          <ion-buttons slot="end">
            <ion-button style={{width: '80px'}} fill="clear" color="primary" onClick={()=> this.addActivity()}>
              Post
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
       <div class="post-form"><ion-textarea style={{fontSize: '14px'}} rows={4} cols={10} placeholder={this.placeholder} onIonChange={(e)=> this.updateContent(e)}></ion-textarea></div>
       { this.postingToGroup && <div class="ion-padding-top ion-padding-start" style={{fontSize: '12px'}}><ion-icon name="return-down-back-outline"></ion-icon> posting to {this.groupName}</div>}
       { this.reply && <div class="ion-padding-top ion-padding-start" style={{fontSize: '12px'}}><ion-icon name="return-down-back-outline"></ion-icon> replying to {this.item.display_name}</div> }
       <attachments-grid></attachments-grid>
      </ion-content>,
      <ion-footer>
        <ion-toolbar>
          <ion-buttons slot="start">
            <attachment-button></attachment-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    ];
  }

}
