import DataLoader from "dataloader";
import { Comment } from "../entities/Comment";

export const createCommentLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Comment>(async (keys) => {
    const comments = await Comment.findByIds(keys as any);
    const commentIdsToComment: Record<number, Comment> = {};
    comments.forEach((comment) => {
      commentIdsToComment[
        parseInt(`${comment.userId}|${comment.postId}`)
      ] = comment;
    });

    return keys.map(
      (key) => commentIdsToComment[parseInt(`${key.userId}|${key.postId}`)]
    );
  });
