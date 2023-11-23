import { Router } from "express";
import { ExerciseController } from "../controllers/exercise-controller";

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
)

export default router;
