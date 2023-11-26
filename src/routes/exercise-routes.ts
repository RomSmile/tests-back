import { Router } from "express";
import { ExerciseController } from "../controllers/exercise-contoller";

const router = Router();

router.get(
    "/exercises",
    ExerciseController.getListOfExercises
);

router.get(
    "/exercise/:id",
    ExerciseController.getExercise
);

router.post(
  "/exercise/create",
  ExerciseController.createExercise
);

router.post(
  "exercise/check",
  ExerciseController.checkExercise
)

export default router;
