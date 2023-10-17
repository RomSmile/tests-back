import { IExerciseDTO } from "../types/dto/IExerciseDTO";
import { IExerciseService } from "../types/services/exercise-service";

export class ExerciseService implements IExerciseService {
  async GetListOfExercises(): Promise<IExerciseDTO[]> {
    return [{
      exerciseId: '',
      questions: [
        {
          questionId: '',
          answers: [{
            id: '',
            text: 'asdf',
            questionId: '',
            isCorrect: true,
          }],
        }
      ]
    }];
  }

  async getExercise(id: string): Promise<IExerciseDTO> {
    return {
      exerciseId: '',
      questions: [
        {
          questionId: '',
          answers: [{
            id: '',
            text: 'asdf',
            questionId: '',
            isCorrect: true,
          }],
        }
      ]
    };
  }
}