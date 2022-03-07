import { prisma } from "../helpers/utils.js";

export const create = async (req, reply) => {
  const { name } = req.body;

  try {
    const brand = await prisma.brand.create({
      data: {
        name,
      },
    });
    return reply.status(201).send(brand);
  } catch (error) {
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};

export const del =
  (`/brand`,
  async (req, reply) => {
    const { id } = req.query;
    try {
      const brand = await prisma.brand.delete({
        where: {
          id: Number(id),
        },
      });
      reply.status(200).send("Brand deletada com sucesso");
    } catch (error) {
      reply.status(500).send({ error: "Deu problema mermão" });
    }
  });

export const get =
  ("/brand",
  async (req, reply) => {
    const { id } = req.query;

    try {
      if (Number(id)) {
        const brands = await prisma.brand.findMany({
          where: {
            id: Number(id),
          },
          include: { cars: true },
        });
        return brands;
      } else {
        const brands = await prisma.brand.findMany({
          include: { cars: true },
        });
        return brands;
      }
      reply.send(brands);
    } catch (error) {
      reply.status(500).send({ error: "Deu problema mermão" });
    }
  });

export const put = async (req, reply) => {
  const { name } = req.body;
  const { id } = req.query;

  try {
    const brand = await prisma.brand.update({
      where: { id: Number(id) },
      data: { name },
    });

    return reply.status(201).send(brand);
  } catch (error) {
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};
