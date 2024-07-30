import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
        isCompleted: z.boolean().optional(),
        isImportant: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.update({
        where: { id: input.taskId },
        data: {
          ...(input.isCompleted !== undefined && { isCompleted: input.isCompleted }),
          ...(input.isImportant !== undefined && { isImportant: input.isImportant }),
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({ userName: z.string().min(1), content: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { name: input.userName },
      }) ?? await ctx.db.user.create({
        data: { name: input.userName },
      });

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

      if (!user) {
        await ctx.db.user.create({ data: { name: input.name } });
        return [];
      }

      return user.tasks;
    }),
});
