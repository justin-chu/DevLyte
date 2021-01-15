"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostComment1610684378294 = void 0;
class PostComment1610684378294 {
    constructor() {
        this.name = 'PostComment1610684378294';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "comment" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_7b79aec4c8b4b2b936306016964"`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_c8e6fa847cbcca402f8bac3c9d9" PRIMARY KEY ("userId", "postId", "id")`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
            yield queryRunner.query(`COMMENT ON COLUMN "comment"."text" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_c8e6fa847cbcca402f8bac3c9d9"`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_a19f35bd48397a5d3c80c562838" PRIMARY KEY ("userId", "postId", "id", "text")`);
            yield queryRunner.query(`COMMENT ON COLUMN "comment"."userId" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_a19f35bd48397a5d3c80c562838"`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_b2ec1d5ab0387dc77e8a3a343fe" PRIMARY KEY ("text", "postId", "id")`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_b2ec1d5ab0387dc77e8a3a343fe"`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_a19f35bd48397a5d3c80c562838" PRIMARY KEY ("text", "userId", "postId", "id")`);
            yield queryRunner.query(`COMMENT ON COLUMN "comment"."userId" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_a19f35bd48397a5d3c80c562838"`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_c8e6fa847cbcca402f8bac3c9d9" PRIMARY KEY ("userId", "postId", "id")`);
            yield queryRunner.query(`COMMENT ON COLUMN "comment"."text" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_c8e6fa847cbcca402f8bac3c9d9"`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_7b79aec4c8b4b2b936306016964" PRIMARY KEY ("userId", "postId")`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "id"`);
        });
    }
}
exports.PostComment1610684378294 = PostComment1610684378294;
//# sourceMappingURL=1610684378294-PostComment.js.map