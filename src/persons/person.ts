import { db } from "../database/database";

export const getPerson = async (personId: number) => {
  return await db.persons.getOne().where("personId").equals(personId).run();
};
