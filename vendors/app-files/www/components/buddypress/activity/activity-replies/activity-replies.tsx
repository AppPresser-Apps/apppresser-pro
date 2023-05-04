import { Component, ComponentInterface, h, Prop, State, Listen } from '@stencil/core';
import { BuddyPressService } from '../../services/buddypress.service';

@Component({
  tag: 'activity-replies',
  styleUrl: 'activity-replies.css',
})
export class ActivityReplies implements ComponentInterface {

  private bpService;

  @Prop() data;
  @Prop() parentid: number = 0;
  @State() replies: any = [];
  @State() spinner: boolean = false;

  componentWillLoad() {
    this.bpService = new BuddyPressService({url: this.data.attrs.data.url});
    this.getReplies();
  }

  @Listen('activityReply', { target: 'window' })
  activityReplyHandler(event: CustomEvent) {
    console.log('reply event handler', event.detail);

    if ( event.detail.parent === this.parentid ) {
      const replies = [...this.replies];
      this.replies = []
      setTimeout(()=> {
        this.replies = [...[event.detail.item], ...replies];
      }, 0);
    }
  }

   //reply deleted.
   @Listen("deleteReplyEvent", { target: "window" })
   async deleteReply(e) {
     console.log('delete event handler', e.detail);

     const rplys = this.replies.filter( item => { return e.detail !== item.id });

     this.replies = [...rplys];
   }

  async getReplies() {

    this.spinner = true;

    const args = {
      include: [this.parentid],
      display_comments: 'threaded'
    }

    const rsp = await this.bpService.getActivity(args);
    const item = (rsp as any);

    this.spinner = false;

    if ( item.length > 0 && 'comments' in item[0] ) {

      const comments = item[0].comments.reverse();

      this.replies = [...comments];

    }


  }

  render() {
    return [
      <div class="activity-replies-wrap bottom-border">
        { this.spinner && <div class="ion-spinner"><ion-spinner name="crescent"></ion-spinner></div>}
        <div class="activity-replies">
        <ion-list lines="full">
          { this.replies && this.replies.map( item => (
            <reply-item key={item.id} item={item}></reply-item>
          ))}
        </ion-list>
        </div>
      </div>
    ];
  }

}
