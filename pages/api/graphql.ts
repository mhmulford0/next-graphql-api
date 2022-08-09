import { createServer } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "node:fs";

const prisma = new PrismaClient();

const typeDefs = readFileSync("./schema.graphql", "utf8");

const resolvers = {
  Query: {
    async getLinks() {
      const links = await prisma.link.findMany();
      console.log(links);
      return [...links];
    },
  },
  Mutation: {
    async addLink() {
      const link = await prisma.link.create({
        data: {
          long_link: "https://google.com",
          short_link: "https://google.com1" + Math.random(),
        },
      });
      return link;
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
