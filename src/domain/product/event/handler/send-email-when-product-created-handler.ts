import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedhandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handler(event: ProductCreatedEvent): void {
    console.log("Event Data:", event.eventData);
    console.log("Data Time Occurred:", event.dataTimeOccurred);
  }
}
