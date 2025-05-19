import { Request, Response } from "express";
import z from "zod";
import { knex } from "../database/knex";

class CoursesController {
  /**
   * index - GET para listar vários registros
   * show - GET para exibir um registro específico
   * create - POST para criar um registro
   * update - PUT para atualizar um registro
   * remove - DELETE para deletar um registro
   *  * **/

  async index(request: Request, response: Response) {
    const courses = await knex("courses").select().orderBy("name");
    response.json(courses);
  }
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string({ required_error: "Name is required" }),
    });
    const { name } = bodySchema.parse(request.body);
    await knex("courses").insert({ name });
    response.status(201).json({ name });
  }
}

export { CoursesController };
