import { createServer, Model, Response } from 'miragejs';

export default function makeServer({ environment = 'development' }) {
  console.log('Server instance mirage');

  const server = createServer({
    environment,
    models: {
      user: Model,
    },
    seeds(server) {
      server.create('user', {
        name: 'Obinna Anosike',
        email: 'user@example.com',
      });
    },
    routes() {
      this.namespace = 'api';
      this.get('user', (schema) => {
        return schema.all('user');
      });

      this.post('login', (schema, request) => {
        const attributes = JSON.parse(request.requestBody);
        if (
          attributes.email === 'user@example.com' &&
          attributes.password === 'password'
        ) {
          return new Response(
            200,
            {},
            {
              token: 'fake-jwt-token-123',
              user: { name: 'Obinna Anosike', email: 'user@example.com' },
            },
          );
        }

        return new Response(401, {}, { errors: ['Invalid credentials'] });
      });
    },
  });
  return server;
}
