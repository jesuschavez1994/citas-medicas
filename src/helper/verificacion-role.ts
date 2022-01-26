import { InjectModel } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Role, RolesDocument } from 'src/core/schemas/roles.schema';



@ValidatorConstraint({ async: true })
@Injectable()
export class RoleAlreadyExistsContraint implements ValidatorConstraintInterface {
  constructor(@InjectModel(Role.name) private Role: Model<RolesDocument>) {}
  validate(role: string, args: ValidationArguments) {
      console.log(args);
    return this.Role.findOne({role}).then(role => {
      if (role) return true;
      return false;
    });
  }
}
  
export function VerifyRoleExistInDB(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: RoleAlreadyExistsContraint,
    });
  };
}