import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeEntities1635185493173 implements MigrationInterface {
    name = 'ChangeEntities1635185493173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "quantitySpots"`);
        await queryRunner.query(`ALTER TABLE "area" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area" ADD "placeId" uuid`);
        await queryRunner.query(`ALTER TABLE "sector" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "spot" ADD "plate" character varying`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "latitude" numeric`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "longitude" numeric`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "FK_b7b345594ee3c78bdd808fd3339" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "FK_b7b345594ee3c78bdd808fd3339"`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "longitude" integer`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "latitude" integer`);
        await queryRunner.query(`ALTER TABLE "spot" DROP COLUMN "plate"`);
        await queryRunner.query(`ALTER TABLE "sector" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "placeId"`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "quantitySpots" integer`);
        await queryRunner.query(`ALTER TABLE "place" ADD "amount" integer NOT NULL`);
    }

}
