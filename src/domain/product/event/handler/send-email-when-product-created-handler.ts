import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import EventInterface from "../../../@shared/events/event.interface";

export default class SendEmailWhenProductIsCreatedhandler
  implements EventHandlerInterface
{
  handler(event: EventInterface): void {
    console.log("Event Data:", event.eventData);
    console.log("Data Time Occurred:", event.dataTimeOccurred);
  }
}
