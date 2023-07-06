import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

export interface IValidationError {
  field: string;
  message: string;
}

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return;
    }

    const dto = plainToClass(metadata.metatype, value);
    const errors = await validate(dto);

    if (errors.length) {
      const errorsArr: IValidationError[] = errors.map((e) => {
        return {
          field: e.property,
          message: getConstrainsFromErrorObject(e),
        };
      });

      throw new HttpException(errorsArr, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}

const getConstrainsFromErrorObject = (error: ValidationError): string => {
  const errorConstraints = [];
  let errorConstraintsStr = '';

  const tail = (errorChild: ValidationError) => {
    if (errorChild.constraints) {
      errorConstraints.push(errorChild.constraints);
      return;
    }

    errorChild.children?.forEach((child) => tail(child));
  };

  tail(error);

  errorConstraints.forEach((error, i) => {
    if (i > 0) {
      errorConstraintsStr += ', ';
    }

    errorConstraintsStr += Object.values(error).join(', ');
  });

  return errorConstraintsStr;
};
