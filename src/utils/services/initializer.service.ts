import { Injectable, OnModuleInit, Inject, forwardRef } from '@nestjs/common';

import { UserService } from '../../modules/user/service/user.service';
import { UserDto } from '../../modules/user/dto/user.dto';
import { Role } from '../enum/role.enum';

@Injectable()
export class Initializer implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.initialConfig();
  }

  async initialConfig() {
    const users = await this.userService.findAll();

    if (users.length === 0) {
      // await this.levelService.firstBulkCreate();
      // const level = await this.levelService.findOneByFilter({ where: [{ level: 0 }] });

      const firstAdmin: UserDto = {
        username: 'admin',
        firstName: 'super',
        lastName: 'admin',
        email: 'admin@test.com',
        password: 'Admin2121!',
        role: Role.ADMIN,
        enabled: true,
        // level,
        stripeCustomerId: '',
      };

      await this.userService.create(firstAdmin);
    }
  }
}
