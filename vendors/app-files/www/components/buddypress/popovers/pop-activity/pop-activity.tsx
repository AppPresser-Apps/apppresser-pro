import { Component, ComponentInterface, Host, h, Prop, Event, EventEmitter } from "@stencil/core";
import { BuddyPressService } from "../../services/buddypress.service";

@Component({
  tag: "pop-activity",
  styleUrl: "pop-activity.css",
})
export class PopActivity implements ComponentInterface {

  private bpService;;

  @Prop() activity: any;
  @Prop() item: any;

  componentWillLoad() {
    this.bpService = new BuddyPressService({url: this.item.api});
  }

  async flagActivity() {
    await this.bpService.flagContent({
      item: this.activity,
      action: "activity_flag",
    });
 
    this.dismissPopover();
  }


  @Event({ bubbles: true }) deleteActivityEvent: EventEmitter;
  @Event({ bubbles: true }) deleteReplyEvent: EventEmitter;
  async deleteActivity() {

    const delete_item = await this.bpService.deleteActivity(this.activity, {id: this.activity, context: 'edit'});

    if (delete_item.hasOwnProperty('deleted')) {
      console.log('deleted event', this.item);

      if ( 'activity_comment' === this.item.type ) {
        this.deleteReplyEvent.emit(this.activity);
      } else {
        this.deleteActivityEvent.emit(this.activity);
      }

      this.dismissPopover();
    }

  }

  async dismissPopover() {
    const modal = await document.querySelector("ion-popover");

    modal.dismiss({
      dismissed: true,
    });
  }

  render() {
    return (
      <Host>
        <ion-list>
          <ion-item>
            <ion-icon size="small" slot="start" name="flag-outline"></ion-icon>
            <ion-label onClick={() => this.flagActivity()}>
              Report Content
            </ion-label>
          </ion-item>

          { this.item.can_delete && (
            <ion-item lines="none">
              <ion-icon
                size="small"
                slot="start"
                name="close-circle-outline"
              ></ion-icon>
              <ion-label onClick={() => this.deleteActivity()}>
                Delete
              </ion-label>
            </ion-item>
          )}
        </ion-list>
      </Host>
    );
  }
}
