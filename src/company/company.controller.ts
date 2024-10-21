import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '../schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public } from 'src/auth/auth.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Get()
  async getAllCompanies(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Public()
  @Post('create')
  async createCompany(
    @Body()
    company: CreateCompanyDto,
  ): Promise<Company> {
    return this.companyService.create(company);
  }

  @Get(':id')
  async getCompany(
    @Param('id')
    id: string,
  ): Promise<Company> {
    return this.companyService.findById(id);
  }

  @Get('?search=')
  async searchCompany(
    @Query('search')
    search: string,
  ): Promise<Company[]> {
    return this.companyService.searchByName(search);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
