import { Module } from '@nestjs/common';
import { GraphqlModule as GraphModules } from './modules/graphql.module';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: {
        endpoint: '/',
        subscriptionEndpoint: '/',
      },
      context: ({ req, res }) => ({ req, res }),
      formatError: (error: GraphQLError) => {
        return {
          message:
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            Array.isArray(error?.extensions?.response?.message)
              ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                error?.extensions?.response?.message[0]
              : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                error?.extensions?.response?.message || error?.message,
          code: error?.extensions.code,
        };
      },
    }),
    GraphModules,
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
