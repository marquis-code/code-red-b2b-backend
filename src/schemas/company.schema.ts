import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ required: true })
  uuid: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  hospitalName: string;

  @Prop()
  contactInformation: string;

  @Prop()
  address: string;

  @Prop()
  website: string;

  @Prop()
  operatingHours: string;

  @Prop()
  facilityType: string;

  @Prop()
  availableSpecialties: string;

  @Prop()
  emergencyServices: string;

  @Prop()
  capacity: string;

  @Prop()
  emergencyEquipment: string;

  @Prop()
  emergencyContactNumber: string;

  @Prop()
  emergencyDepartment: string;

  @Prop()
  doctorOnDutyContact: string;

  @Prop()
  acceptedInsuranceProviders: string;

  @Prop()
  emergencyPaymentPolicies: string;

  @Prop()
  expectedResponseTime: string;

  @Prop()
  dedicatedPointOfContact: string;

  @Prop()
  communicationProtocols: string;

  @Prop()
  airAmbulance: string;

  @Prop()
  telemedicineServices: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
