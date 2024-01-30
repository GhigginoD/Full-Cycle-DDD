import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {

  register(eventName: string, eventHandler: EventHandlerInterface): void;
  notify(event: EventInterface): void;
  unregister(eventName: string): void;
  unregisterAll(): void;
}