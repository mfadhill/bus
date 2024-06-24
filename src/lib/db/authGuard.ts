import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Logger,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs'

// @Injectable()
// export class AuthGuard implements CanActivate {
//     canActivate(
//         context: ExecutionContext
//     ): boolean | Promise<boolean> | Observable<boolean> {
//         const request = context.switchToHttp().getRequest()
//         // console.log(request.headers)

//         return this.extractTokenFromHeader(request)
//     }

//     extractTokenFromHeader(request: any) {
//         const [type, token] = request.headers.authorization?.split(' ') ?? []
//         return !!token
//     }
// }

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Tambahan logika custom di sini
        return super.canActivate(context);
    }
}