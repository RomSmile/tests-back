import db from '../../db/database';
import {ICreateDataBaseService} from "./types";
export class CreateTableService implements ICreateDataBaseService{
  async createDataBase() {
    //await db.query(`CREATE SCHEMA published;`)
    await db.query(`
      create table published."Exercises"
      (
          title text,
          id char(36) default gen_random_uuid() not null primary key
      );
      
      alter table published."Exercises"
      owner to ${process.env.DATABASE_USER};
    `)

    await db.query(`
      create table published."Questions"
      (
          id char(36) default gen_random_uuid() not null primary key,
          title text,
          exerciseId char(36)
          references "Exercises"
      );
      
      alter table published."Questions"
          owner to ${process.env.DATABASE_USER};
    `)

    await db.query(`
      create table published."Answers"
      (
          id char(36) default gen_random_uuid() not null primary key,
          text text,
          "questionId" char(36) constraint "Answers_questionid_fkey"
          references "Questions",
          "isCorrect"  boolean  default false not null,
          "exerciseId" char(36) not null
          references "Exercises"
      );
      
      alter table published."Answers"
          owner to ${process.env.DATABASE_USER};
    `)
  }
}