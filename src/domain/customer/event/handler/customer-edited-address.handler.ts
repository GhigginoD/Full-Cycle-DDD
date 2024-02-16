import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import CustomerEditedAddressEvent from "../customer-edited-address-event";

export default class CustomerEditedAddressHandler
  implements EventHandlerInterface<CustomerEditedAddressEvent>
{
  handler(event: CustomerEditedAddressEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`
    );
  }
}
