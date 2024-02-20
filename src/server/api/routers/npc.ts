import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { npcInput } from "~/types";

export const npcRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const npcs = await ctx.db.nPC.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return npcs;
  }),
  create: protectedProcedure
    .input(npcInput)
    .mutation(async ({ ctx, input }) => {
      // throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      return ctx.db.nPC.create({
        data: {
          description: input.description,
          title: input.title,
          image:
            input.image ??
            "https://i0.wp.com/jogaod20.com/wp-content/uploads/2020/06/fichas-de-npcs-para-dd-5c2aa-edic3a7c3a3o.jpeg?fit=816%2C816&ssl=1",
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.nPC.delete({
      where: {
        id: input,
      },
    });
  }),
  update: protectedProcedure.input(npcInput).mutation(({ ctx, input }) => {
    return ctx.db.nPC.update({
      where: {
        id: input.id,
      },
      data: {
        description: input.description,
        title: input.title,
      },
    });
  }),
});
