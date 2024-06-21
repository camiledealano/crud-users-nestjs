import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = new this.userModel({...createUserDto, password: hashedPassword});
    return user.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      id, 
      updateUserDto,  
      { new: true }
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({
      _id: id
    }).exec();
  }
}
