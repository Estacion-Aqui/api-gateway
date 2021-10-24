import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateModels1635044422125 implements MigrationInterface {
    name = 'CreateModels1635044422125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "area" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "update_At" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sector" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "update_At" TIMESTAMP NOT NULL DEFAULT now(), "areaId" uuid, CONSTRAINT "PK_668b2ea8a2f534425407732f3ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user" character varying NOT NULL, "password" character varying NOT NULL, "car" character varying, "plate" character varying, "email" character varying NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "update_At" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a" UNIQUE ("user"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spot_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "update_At" TIMESTAMP NOT NULL DEFAULT now(), "spotId" uuid, "userId" uuid, CONSTRAINT "PK_9771993580f18e453321fdb898d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "status" boolean, "sensor_id" character varying NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "update_At" TIMESTAMP NOT NULL DEFAULT now(), "placeId" uuid, "sectorId" uuid, CONSTRAINT "PK_f2a0a47e5ae78713daf83a5f7b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "place" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying, "title" character varying NOT NULL, "amount" integer NOT NULL, "quantitySpots" integer, "latitude" integer, "longitude" integer, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "update_At" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying, "email" character varying NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "update_At" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3ce33bc763478fe5e0fb410106d" UNIQUE ("user"), CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin_places_place" ("adminId" uuid NOT NULL, "placeId" uuid NOT NULL, CONSTRAINT "PK_7cbe599d37f5cd7e549cd7af7e6" PRIMARY KEY ("adminId", "placeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_91669509612fe45abc9cb2fe5f" ON "admin_places_place" ("adminId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a57ef8374f855b3ce2ddeb8d48" ON "admin_places_place" ("placeId") `);
        await queryRunner.query(`ALTER TABLE "sector" ADD CONSTRAINT "FK_95863fe29b30c9a8fc0ea344e1e" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "spot_request" ADD CONSTRAINT "FK_6cb2875e12678b9c2bc91b281f6" FOREIGN KEY ("spotId") REFERENCES "spot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "spot_request" ADD CONSTRAINT "FK_60a544ac1e8e4e46333d96924a8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "spot" ADD CONSTRAINT "FK_97a641a820df7110c64764410cf" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "spot" ADD CONSTRAINT "FK_2545b7683637733a919363aa38a" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin_places_place" ADD CONSTRAINT "FK_91669509612fe45abc9cb2fe5f2" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "admin_places_place" ADD CONSTRAINT "FK_a57ef8374f855b3ce2ddeb8d488" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_places_place" DROP CONSTRAINT "FK_a57ef8374f855b3ce2ddeb8d488"`);
        await queryRunner.query(`ALTER TABLE "admin_places_place" DROP CONSTRAINT "FK_91669509612fe45abc9cb2fe5f2"`);
        await queryRunner.query(`ALTER TABLE "spot" DROP CONSTRAINT "FK_2545b7683637733a919363aa38a"`);
        await queryRunner.query(`ALTER TABLE "spot" DROP CONSTRAINT "FK_97a641a820df7110c64764410cf"`);
        await queryRunner.query(`ALTER TABLE "spot_request" DROP CONSTRAINT "FK_60a544ac1e8e4e46333d96924a8"`);
        await queryRunner.query(`ALTER TABLE "spot_request" DROP CONSTRAINT "FK_6cb2875e12678b9c2bc91b281f6"`);
        await queryRunner.query(`ALTER TABLE "sector" DROP CONSTRAINT "FK_95863fe29b30c9a8fc0ea344e1e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a57ef8374f855b3ce2ddeb8d48"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91669509612fe45abc9cb2fe5f"`);
        await queryRunner.query(`DROP TABLE "admin_places_place"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "place"`);
        await queryRunner.query(`DROP TABLE "spot"`);
        await queryRunner.query(`DROP TABLE "spot_request"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "sector"`);
        await queryRunner.query(`DROP TABLE "area"`);
    }

}
