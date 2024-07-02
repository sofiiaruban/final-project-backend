/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, id: number) {
    const isExist = await this.companyRepository.findBy({
      user: { id },
      name: createCompanyDto.name,
    });

    if (isExist.length)
      throw new BadRequestException('This company already exists');

    const newCompany = {
      name: createCompanyDto.name,
      employeeNumber: createCompanyDto.employeeNumber,
      service: createCompanyDto.service,
      address: createCompanyDto.address,
      description: createCompanyDto.description,
      companyType: createCompanyDto.companyType,
      user: {
        id,
      },
    };

    return await this.companyRepository.save(newCompany);
  }

  async findAll(id: number) {
    return await this.companyRepository.find({
      where: {
        user: { id },
      },
    });
  }

  async findOne(id: number) {
    console.log('Fetching company with ID:', id);
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }
    console.log('Found company:', company);
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOne({
      where: { id },
    });

    if (!company) throw new NotFoundException('Company not found');

    return await this.companyRepository.update(id, updateCompanyDto);
  }

  async remove(id: number) {
    const company = await this.companyRepository.findOne({
      where: { id },
    });

    if (!company) throw new NotFoundException('Company not found');

    return await this.companyRepository.delete(id);
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    return await this.companyRepository.find({
      where: {
        user: { id },
      },
      relations: ['user'],
      select: {
        user: {
          id: true,
          email: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
