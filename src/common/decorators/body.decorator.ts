/*import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Body = createParamDecorator(
  (data: string, context: ExecutionContext): any => {
    const request: any = context.switchToHttp().getRequest();
    return request.body;
  },
);

class User {
  fn(@Body() x: { userName: string }): void {
    x.userName;
  }
}
*/