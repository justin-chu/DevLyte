import { User } from "../entities/User"
import { MyContext } from "src/types"
import { Resolver, Query, Mutation, Arg, InputType, Field, Ctx, ObjectType } from "type-graphql"
import argon2 from "argon2"

declare module "express-session" {
    interface Session {
        userId: number;
    }
}

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string;
    @Field()
    password: string;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em } : MyContext
    ): Promise<UserResponse> {
        if(options.username.length === 0) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "Username cannot be empty!"
                    }
                ]
            }
        }

        if(options.password.length <= 8) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Password length must be greater than 8!"
                    }
                ]
            }
        }

        const hashedPassword = await argon2.hash(options.password);
        const user = em.create(User, {
            username: options.username.toLowerCase(),
            password: hashedPassword
        });
        
        try {
            await em.persistAndFlush(user);
        } catch(err) {
            if(err.code === "23505") {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "This username is already in use!"
                        }
                    ]
                }
            }
        }

        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em, req } : MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User, { username: options.username.toLowerCase() });
        if(!user) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "That username doesn't exist!"
                    }
                ]
            }
        }
        const valid = await argon2.verify(user.password, options.password);
        if(!valid) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "Password is incorrect!"
                    }
                ]
            }
        }

        req.session.userId = user.id;

        return { user };
    }
}