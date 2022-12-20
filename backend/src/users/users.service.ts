import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from '../events/schema/event.schema';
import { Model } from 'mongoose';

export interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'change',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user: User) => user.username === username);
  }
  // async update(username: any, data): Promise<User | undefined> {
  //   const filteredUser = this.users.find(
  //     (user: User) => user.username === username,
  //   );
  //   return (
  //     UsersModule.findOneAnd,
  //     data,
  //     {
  //       new: true,
  //       upsert: true, // Make this update into an upsert
  //     }
  //   );
  // }
}
