import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  starts_at: Date;
  @Prop()
  image: string;
  @Prop()
  localization: string;
}
export const EventSchema = SchemaFactory.createForClass(Event);
