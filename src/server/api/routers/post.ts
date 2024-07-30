import { Task } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  delete: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.delete({
        where: { id: input.taskId },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
        isCompleted: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.update({
        where: { id: input.taskId },
        data: {
          isCompleted: input.isCompleted,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({ userName: z.string().min(1), content: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      const user =
        (await ctx.db.user.findUnique({
          where: { name: input.userName },
        })) ??
        (await ctx.db.user.create({
          data: { name: input.userName },
        }));

      return await ctx.db.task.create({
        data: {
          content: input.content,
          userId: user.id,
          isCompleted: false,
        },
      });
    }),

  getTasks: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { name: input.name },
        include: { tasks: true },
      });

      return user ? user.tasks : ([] as Task[]);
    }),
  register: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({ data: { name: input.name } });

      return user;
    }),
});
