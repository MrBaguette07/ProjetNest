import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers['authorization']) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }
    const token = request.headers['authorization'].replace('Bearer ', '');
    
    try {
        const res = await fetch(`http://localhost:3003/introspection?token=${token}`); 
        const data = await res.json();
        if (data.error || !data.success) {
            throw new ForbiddenException('You are not allowed to access this resource');
        }
    } catch (error) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }

    return true;
  }
}