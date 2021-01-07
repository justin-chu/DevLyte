import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createLikeLoader } from "./utils/createLikeLoader";
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
  req: Request & { session: { userId: string } };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  likeLoader: ReturnType<typeof createLikeLoader>;
};
