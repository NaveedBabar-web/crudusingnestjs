import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Jane Doe', description: 'Updated name of the user', required: false })
  name?: string;

  @ApiProperty({ example: 'jane@example.com', description: 'Updated email address', required: false })
  email?: string;
}
