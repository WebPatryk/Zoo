import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schema/event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private readonly employeeModel: Model<EventDocument>,
  ) {}

  async create(createEmployeeDto: CreateEventDto): Promise<EventDocument> {
    const employee = new this.employeeModel(createEmployeeDto);
    return employee.save();
  }

  async findAll(): Promise<EventDocument[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string) {
    return this.employeeModel.findById(id);
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEventDto,
  ): Promise<EventDocument> {
    return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto);
  }

  async remove(id: string) {
    return this.employeeModel.findByIdAndRemove(id);
  }

  // create(createEventDto: CreateEventDto) {
  //   return 'This action adds a new event';
  // }
  //
  // findAll() {
  //   return `This action returns all events!`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} event`;
  // }
  //
  // update(id: number, updateEventDto: UpdateEventDto) {
  //   return `This action updates a #${id} event`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} event`;
  // }
}
