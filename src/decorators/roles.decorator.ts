import { SetMetadata } from '@nestjs/common';
import { Role, ROLES_KEY } from 'src/types/types';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
