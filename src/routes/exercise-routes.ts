import { Router } from "express";
import { ExerciseController } from "../controllers/exercise-controller";

const router = Router();

router.get(
    "/exercise/all",
    ExerciseController.getListOfExercises
);

router.get(
    "/exercise/:id",
    ExerciseController.getExercise
);

module.exports = router;