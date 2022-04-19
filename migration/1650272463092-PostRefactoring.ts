import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1650272463092 implements MigrationInterface {
    name = 'PostRefactoring1650272463092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "author" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "genre"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "genre" character varying(100) NOT NULL DEFAULT 'anonymous'`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "price" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "price" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "genre"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "genre" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "author" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "name" character varying NOT NULL`);
    }

}
