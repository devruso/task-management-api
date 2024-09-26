import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // Exporta o UsersService para que ele possa ser injetado em outros módulos
  exports: [UsersService],
})
export class UsersModule {}
