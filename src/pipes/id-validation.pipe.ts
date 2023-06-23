import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ID_IS_INVALID } from 'src/constants';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!Types.ObjectId.isValid(value)) {
      throw new HttpException(ID_IS_INVALID, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
