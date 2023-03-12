import { Prisma } from '@prisma/client';
import { Context } from './context';

export const resolvers = {
  Query: {
    // HACKER QUERIES
    getAllHackers: async (_parent: any, _args: any, ctx: Context) => {
      const response = await ctx.prisma.hacker.findMany();

      return response;
    },
    getHacker: async (
      _parent: any,
      { email }: Prisma.HackerWhereUniqueInput,
      ctx: Context
    ) => {
      const response = await ctx.prisma.hacker.findUnique({
        where: { email }
      });
      return response;
    },
    // PARTNER QUERIES
    getAllPartners: async (_parent: any, _args: any, ctx: Context) => {
      const response = await ctx.prisma.partner.findMany();

      return response;
    },
    getPartner: async (
      _parent: any,
      { email }: Prisma.PartnerWhereUniqueInput,
      ctx: Context
    ) => {
      const response = await ctx.prisma.partner.findUnique({
        where: { email }
      });
      return response;
    },
    // MENTOR QUERIES
    getAllMentors: async (_parent: any, _args: any, ctx: Context) => {
      const response = await ctx.prisma.mentor.findMany();

      return response;
    },
    getMentor: async (
      _parent: any,
      { email }: Prisma.MentorWhereUniqueInput,
      ctx: Context
    ) => {
      const response = await ctx.prisma.mentor.findUnique({
        where: { email }
      });
      return response;
    }
  },
  Mutation: {
    // HACKER MUTATIONS
    addHacker: async (
      _parent: any,
      args: Prisma.HackerCreateInput,
      ctx: Context
    ) => {
      const response = await ctx.prisma.hacker.create({
        data: {
          ...args
        }
      });

      return response;
    },
    updateHacker: async (
      _parent: any,
      args: Prisma.HackerCreateInput,
      ctx: Context
    ) => {
      const { email } = args;

      const response = await ctx.prisma.hacker.update({
        where: {
          email
        },
        data: {
          ...args
        }
      });

      return response;
    },
    // PARTNER MUTATIONS
    addPartner: async (
      _parent: any,
      args: Prisma.PartnerCreateInput,
      ctx: Context
    ) => {
      const response = await ctx.prisma.partner.create({
        data: {
          ...args
        }
      });

      return response;
    },
    updatePartner: async (
      _parent: any,
      args: Prisma.PartnerCreateInput,
      ctx: Context
    ) => {
      const { email } = args;

      const response = await ctx.prisma.partner.update({
        where: {
          email
        },
        data: {
          ...args
        }
      });

      return response;
    },
    // MENTOR MUTATIONS
    addMentor: async (
      _parent: any,
      args: Prisma.MentorCreateInput,
      ctx: Context
    ) => {
      const response = await ctx.prisma.mentor.create({
        data: {
          ...args
        }
      });

      return response;
    },
    updateMentor: async (
      _parent: any,
      args: Prisma.MentorCreateInput,
      ctx: Context
    ) => {
      const { email } = args;

      const response = await ctx.prisma.mentor.update({
        where: {
          email
        },
        data: {
          ...args
        }
      });

      return response;
    }
  }
};
