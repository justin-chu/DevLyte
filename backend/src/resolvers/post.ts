import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import {
  Resolver,
  Query,
  InputType,
  Arg,
  Mutation,
  Field,
  Ctx,
  UseMiddleware,
  Int,
  FieldResolver,
  Root,
  ObjectType,
} from "type-graphql";
import { Post } from "../entities/Post";
import { Like } from "../entities/Like";
import { getConnection } from "typeorm";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 200);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req }: MyContext
  ) {
    const value = 1;
    const { userId } = req.session;
    const like = await Like.findOne({ where: { postId, userId } });

    // user has voted on this post before
    if (like) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Like)
        .where("userId = :userId", { userId })
        .execute();

      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update post
          set points = points - $1
          where id = $2
        `,
          [value, postId]
        );
      });
    } else if (!like) {
      // user has not voted
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          insert into "like" ("userId", "postId", voted)
          values ($1,$2,1)
        `,
          [userId, postId]
        );

        await tm.query(
          `
          update post
          set points = points + $1
          where id = $2
        `,
          [value, postId]
        );
      });
    }

    return true;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    // const replacements: any[] = [realLimitPlusOne, req.session.userId];
    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const posts = await getConnection().query(
      `
    select p.*, 
    json_build_object(
      'id', u.id,
      'username', u.username,
      'email', u.email,
      'createdAt', u."createdAt",
      'updatedAt', u."updatedAt"
      ) creator,
      ${
        req.session.userId
          ? `(select voted from "like" where "userId" = ${req.session.userId} and "postId" = p.id) "voteStatus"`
          : '0 as "voteStatus"'
      }
    from post p
    inner join public.user u on u.id = p."creatorId"
    ${cursor ? `where p."createdAt" < $2` : ""}
    order by p."createdAt" DESC
    limit $1
    `,
      replacements
    );
    console.log(posts);

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return Post.create({
      ...input,
      creatorId: parseInt(req.session.userId),
    }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOne({ id });
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    await Post.delete(id);
    return true;
  }
}
