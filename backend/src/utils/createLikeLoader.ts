import DataLoader from "dataloader";
import { Like } from "../entities/Like";

export const createLikeLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Like>(async (keys) => {
    const likes = await Like.findByIds(keys as any);
    const likesIdsToLike: Record<number, Like> = {};
    likes.forEach((like) => {
      likesIdsToLike[parseInt(`${like.userId}|${like.postId}`)] = like;
    });

    return keys.map(
      (key) => likesIdsToLike[parseInt(`${key.userId}|${key.postId}`)]
    );
  });
