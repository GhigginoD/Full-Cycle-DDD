import EventInterface from "../../@shared/events/event.interface";
import Customer from "../entity/customer";

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.eventData = eventData;
    this.dataTimeOccurred = new Date();
  }
}
