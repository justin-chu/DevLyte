import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants"
import { Post } from "./entities/Post"
import path from "path"
import { __password__ } from "../config"
import { User } from "./entities/User"

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post, User],
    dbName: 'develify',
    type: 'postgresql',
    password: __password__,
    debug: !__prod__,
    // user: '',
    // password: ''
} as Parameters<typeof MikroORM.init>[0];