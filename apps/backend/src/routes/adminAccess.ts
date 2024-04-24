import express, { Router, Request, Response } from "express";
import { checkRequiredPermissions } from "./auth0Perms.ts";

const router: Router = express.Router();

// Returns successful 200 status if user is an admin, otherwise unauthorized
router.get(
  "/",
  checkRequiredPermissions(["read:admin-pages"]),
  async function (req: Request, res: Response) {
    res.sendStatus(200);
    return;
  },
);

export default router;
