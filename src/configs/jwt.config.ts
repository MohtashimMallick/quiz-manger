import { JwtModuleOptions, JwtModuleAsyncOptions } from '@nestjs/jwt';
import appConfig from './app.config';

export const jwtConfig: JwtModuleOptions = {
  secret: appConfig().appSecret,
  signOptions: { expiresIn: '1d' },
};

export const jwtAsyncConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().appSecret,
      signOptions: { expiresIn: '1d' },
    };
  },
};
