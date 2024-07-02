/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/types/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) throw new BadRequestException('This email already exists!');

    const role = createUserDto.role || Role.User;

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      phoneNumber: createUserDto.phoneNumber,
      lastName: createUserDto.lastName,
      firstName: createUserDto.firstName,
      nickname: createUserDto.nickname,
      description: createUserDto.description,
      position: createUserDto.position,
      role: role,
    });

    const token = this.jwtService.sign({
      email: createUserDto.email,
      role: role,
    });

    return { user, token };
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const company = await this.userRepository.findOne({
      where: { id },
    });

    if (!company) throw new NotFoundException('User not found');

    return await this.userRepository.delete(id);
  }
}
