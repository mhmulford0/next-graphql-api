import { createServer } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */`
  type Query {
    users: [User!]!
    others: [Other!]!
  }
  type User {
    name: String
  }
  type Other {
    data: String
  }

  type Mutation {
    others: String
  }
`;

const resolvers = {
  Query: {
    users() {
      return [{ name: "Nextjs" }];
    },
    async others() {
      const links = await prisma.link.findMany();
      console.log(links);
      return [{ data: "more stuff" }];
    },
  },
  Mutation: {
    async others() {
      await prisma.link.create({
        data: {
          long_link: "https://google.com",
          short_link: "https://google.com1",
        },
      });
    },
  },
};

export default createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: "/api/graphql",
});
