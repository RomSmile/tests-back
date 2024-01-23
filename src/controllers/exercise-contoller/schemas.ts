import Joi from "joi";

export const exerciseCreateSchema = Joi.object({
  title: Joi.string().max(30).min(3).required(),
  questions: Joi.array().items({
    title: Joi.string().max(30).min(3).required(),
    answers: Joi.array().items({
      text: Joi.string().min(3).required(),
      isCorrectAnswer: Joi.boolean().required(),
    }).has(Joi.object({ text: Joi.string(), isCorrect: Joi.boolean().valid(true)})).min(3).required()
  }).min(2).required(),
})

export const answerCheckExerciseSchema = Joi.array().items({
  id: Joi.string().min(36).max(36).required(),
  isSelected: Joi.boolean().valid(true).required(),
  questionId: Joi.string().min(36).max(36).required(),
  exerciseId: Joi.string().min(36).max(36).required(),
})