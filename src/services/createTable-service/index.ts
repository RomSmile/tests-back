import db from '../../db/database';
import {ICreateDataBaseService} from "./types";
export class CreateTableService implements ICreateDataBaseService{
  async createDataBase() {
    await db.query(`CREATE SCHEMA public;`)
    await db.query(`
      create table public."Exercises"
      (
          title text,
          id char(36) default gen_random_uuid() not null primary key
      );
      
      alter table public."Exercises"
      owner to ${process.env.DATABASE_USER};
    `)

    await db.query(`
      create table public."Questions"
      (
          id char(36) default gen_random_uuid() not null primary key,
          title text,
          exerciseId char(36)
          references "Exercises"
      );
      
      alter table public."Questions"
          owner to ${process.env.DATABASE_USER};
    `)

    await db.query(`
      create table public."Answers"
      (
          id char(36) default gen_random_uuid() not null primary key,
          text text,
          "questionId" char(36) constraint "Answers_questionid_fkey"
          references "Questions",
          "isCorrect"  boolean  default false not null,
          "exerciseId" char(36) not null
          references "Exercises"
      );
      
      alter table public."Answers"
          owner to ${process.env.DATABASE_USER};
    `)
  }
}