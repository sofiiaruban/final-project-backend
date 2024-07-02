import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly companiesService: CompaniesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const entity = await this.companiesService.findOne(id);
    const user = request.user;
    if (entity && user && entity.user.id === user.id) {
      return true;
    }

    throw new BadRequestException('Something went wrong...');
  }
}
