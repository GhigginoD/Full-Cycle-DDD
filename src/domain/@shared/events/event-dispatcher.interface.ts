import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
  addEvent(eventName: string, eventHandler: EventHandlerInterface): void;
  removeEvent(eventName: string, eventHandler: EventHandlerInterface): void;
  notify(event: EventInterface): void;
  unregisterAll(): void;
}
