import {MigrationInterface, QueryRunner} from "typeorm";

export class PostComment1610684378294 implements MigrationInterface {
    name = 'PostComment1610684378294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_7b79aec4c8b4b2b936306016964"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_c8e6fa847cbcca402f8bac3c9d9" PRIMARY KEY ("userId", "postId", "id")`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`COMMENT ON COLUMN "comment"."text" IS NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_c8e6fa847cbcca402f8bac3c9d9"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_a19f35bd48397a5d3c80c562838" PRIMARY KEY ("userId", "postId", "id", "text")`);
        await queryRunner.query(`COMMENT ON COLUMN "comment"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_a19f35bd48397a5d3c80c562838"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_b2ec1d5ab0387dc77e8a3a343fe" PRIMARY KEY ("text", "postId", "id")`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_b2ec1d5ab0387dc77e8a3a343fe"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_a19f35bd48397a5d3c80c562838" PRIMARY KEY ("text", "userId", "postId", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "comment"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_a19f35bd48397a5d3c80c562838"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_c8e6fa847cbcca402f8bac3c9d9" PRIMARY KEY ("userId", "postId", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "comment"."text" IS NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_c8e6fa847cbcca402f8bac3c9d9"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_7b79aec4c8b4b2b936306016964" PRIMARY KEY ("userId", "postId")`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "id"`);
    }

}
