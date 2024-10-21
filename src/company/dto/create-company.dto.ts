export class CreateCompanyDto {
  readonly uuid: string;
  readonly username: string;
  readonly password: string;
  readonly hospitalName: string;
  readonly contactInformation: string;
  readonly address: string;
  readonly website: string;
  readonly operatingHours: string;
  readonly facilityType: string;
  readonly availableSpecialties: string;
  readonly emergencyServices: string;
  readonly capacity: string;
  readonly emergencyEquipment: string;
  readonly emergencyContactNumber: string;
  readonly emergencyDepartment: string;
  readonly doctorOnDutyContact: string;
  readonly acceptedInsuranceProviders: string;
  readonly emergencyPaymentPolicies: string;
  readonly expectedResponseTime: string;
  readonly dedicatedPointOfContact: string;
  readonly communicationProtocols: string;
  readonly airAmbulance: string;
  readonly telemedicineServices: string;
}
