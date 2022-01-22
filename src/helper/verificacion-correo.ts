import { InjectModel } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from '../core/schemas/usuario.schema';
import { Injectable } from '@nestjs/common';


@ValidatorConstraint({ async: true })
@Injectable()
export class UserAlreadyExistsContraint implements ValidatorConstraintInterface {
  constructor(@InjectModel(Usuario.name) private user: Model<UsuarioDocument>) {}
  validate(email: string, args: ValidationArguments) {
    console.log(args)
    return this.user.findOne({email}).then(user => {
      if (user) return false;
      return true;
    });
  }
}
  
export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserAlreadyExistsContraint,
    });
  };
}