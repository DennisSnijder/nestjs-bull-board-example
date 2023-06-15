
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="Restricted"');
      res.end('Unauthorized');
      return;
    }

    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];

    // Replace this with your own authentication logic
    const isValid = username === 'admin' && password === 'password';
    if (!isValid) {
      res.statusCode = 401;
      res.end('Unauthorized');
      return;
    }

    next();
  }
}