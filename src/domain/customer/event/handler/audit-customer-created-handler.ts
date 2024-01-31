import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import EventInterface from "../../../@shared/events/event.interface";

export default class AuditCustomerCreatedHandler
  implements EventHandlerInterface
{
  handler(event: EventInterface): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
export class AuditCustomerCreatedHandler2 implements EventHandlerInterface {
  handler(event: EventInterface): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
