import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  Response,
  RestSerializer,
} from 'miragejs';

export default function makeServer() {
  console.log('Server instance mirage');
  createServer({
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
        console.log(schema.all('user'));
        return schema.all('user');
      });

      this.post('login', (schema, request) => {
        const attributes = JSON.parse(request.requestBody);
        console.log(attributes);
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

        console.log('Mirage', 401);
        return new Response(401, {}, { errors: ['Invalid credentials'] });
      });
    },
  });
}
