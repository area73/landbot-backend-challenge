import { Router } from "express";
import { notify } from "../controllers/apiController";
import { notifyPayload } from "../middleware/notifyPayloadMiddleware";

export const apiRoutes = {
  notify: "/notify",
};

const router = Router();

router.post(apiRoutes.notify, notifyPayload, notify);

export const apiRouter = router;
