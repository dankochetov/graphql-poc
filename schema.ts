import { createSchema } from 'graphql-yoga'
import { db } from './drizzle/db'

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      listUsers(options: ListUsersOptions): [User!]!
    }

    input ListUsersOptions {
      limit: Int
      offset: Int
      where: UsersWhere
      orderBy: [UsersOrderBy!]
    }

    input UsersWhere {
      id: Int
      name: String
    }

    input UsersOrderBy {
      id: OrderBy
      name: OrderBy
    }

    enum OrderBy {
      asc
      desc
    }

    type User {
      id: Int!
      name: String!
    }
  `,
  resolvers: {
    Query: {
      listUsers: async (parent, args, context, info) => {
        return db.query.users.findMany({
          limit: args.options?.limit,
          offset: args.options?.offset,
        });
      }
    }
  }
});
