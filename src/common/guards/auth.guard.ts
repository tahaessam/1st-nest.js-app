import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable() // Allows NestJS to create and inject this class
export class AuthGuard implements CanActivate {
  // Inject required services
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector, // Used to read custom metadata
  ) {}

  // This method is executed before the request reaches the controller
  canActivate(context: ExecutionContext): boolean {
    // Get the current HTTP request from the execution context
    const request = context.switchToHttp().getRequest();

    // Check if the current route or controller is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Read the Authorization header
    // Example:
    // Authorization: Bearer eyJhbGciOiJIUzI1Ni...
    const authHeader = request.headers.authorization;

    // Reject the request if no Authorization header is provided
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    // Extract the JWT from the header
    // "Bearer abc123" -> ["Bearer", "abc123"]
    // We only need the second element (the token)
    const token = authHeader.split(' ')[1];

    try {
      // Validate the JWT
      // verify() checks:
      // 1. The token signature
      // 2. The secret key
      // 3. The expiration date
      // If valid, it returns the decoded payload
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('jwt.accessSecret'),
      });

      // Attach the decoded payload to the request object
      // This allows access to the authenticated user
      // in controllers and other parts of the application
      // Example:
      // req.user.sub
      // req.user.role
      request.user = payload;

      // Allow the request to continue
      return true;
    } catch {
      // Reject the request if the token is invalid or expired
      throw new UnauthorizedException('Invalid token');
    }
  }
}
