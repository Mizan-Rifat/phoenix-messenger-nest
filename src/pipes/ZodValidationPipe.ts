import {
  PipeTransform,
  BadRequestException,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';
import { ZodDto, validate } from 'nestjs-zod';
import { ZodSchema } from 'zod';

export function isZodDto(metatype: any): metatype is ZodDto<unknown> {
  return metatype?.isZodDto;
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schemaOrDto?: ZodSchema | ZodDto) {}

  public transform(value: unknown, metadata: ArgumentMetadata) {
    if (this.schemaOrDto) {
      return validate(value, this.schemaOrDto);
    }

    const { metatype } = metadata;

    if (!isZodDto(metatype)) {
      return value;
    }

    return validate(value, metatype.schema);
  }
}
