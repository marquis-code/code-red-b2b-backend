import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Company } from '../schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  // async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
  //   const createdCompany = new this.companyModel(createCompanyDto);

  //   // Use an object to filter by contactInformation
  //   const user = await this.companyModel.findOne({
  //     contactInformation: createCompanyDto.contactInformation,
  //   });

  //   if(user) {
  //     throw new Error('User already has an account.');
  //   }

  //   return await createdCompany.save();
  // }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { password, hospitalName, address } = createCompanyDto;

    // Check if a company with the same contact information already exists
    const existingUser = await this.companyModel.findOne({
      contactInformation: createCompanyDto.contactInformation,
    });

    if (existingUser) {
      throw new Error('User already has an account.');
    }

    // Generate a username based on the hospital name and address
    const username = this.generateUsername(hospitalName, address);

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new company object with the hashed password and generated username
    const createdCompany = new this.companyModel({
      ...createCompanyDto,
      password: hashedPassword, // Save the hashed password
      username, // Save the generated username
    });

    // Save the new company to the database
    return await createdCompany.save();
  }

  // Helper function to generate a username
  private generateUsername(
    hospitalName: string,
    hospitalAddress: string,
  ): string {
    // Example of generating a simple username
    const namePart = hospitalName.split(' ')[0]; // Use first word of the hospital name
    const addressPart = hospitalAddress.split(' ')[0]; // Use first word of the hospital address

    // Combine the parts and ensure the username is lowercase
    const username = `${namePart}${addressPart}`.toLowerCase();

    // You may want to add logic here to ensure the username is unique, but this is a basic approach
    return username;
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.companyModel.find();
    return companies;
  }

  async findById(id: string): Promise<Company> {
    const company = await this.companyModel.findById(id);
    if (!company) {
      throw new Error('Company not found.');
    }
    return company;
  }

  async searchByName(search: string): Promise<Company[]> {
    const companies = await this.companyModel.find({
      name: new RegExp(search, 'i'),
    });
    return companies;
  }

  async update(uuid: string, updateCompanyDto: UpdateCompanyDto): Promise<any> {
    const company = await this.companyModel.updateOne(
      { uuid },
      updateCompanyDto,
    );
    return company;
  }

  async remove(uuid: string): Promise<any> {
    const company = await this.companyModel.deleteOne({ uuid });
    return company;
  }
}
