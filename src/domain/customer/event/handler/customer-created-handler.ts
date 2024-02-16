import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import CustomerCreatedEvent from "../customer-created-event";

export default class CustomerCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  handler(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
export class CustomerCreatedHandler2 implements EventHandlerInterface<CustomerCreatedEvent> {
  handler(event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
