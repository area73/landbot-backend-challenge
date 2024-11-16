import { Router } from "express";
import { notify } from "../controllers/apiController";

export const apiRoutes = {
  notify: "/notify",
};

const router = Router();

router.post(apiRoutes.notify, notify);

export const apiRouter = router;
