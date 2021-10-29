import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateReserveAndHistory1635473078418 implements MigrationInterface {
    name = 'CreateReserveAndHistory1635473078418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "spot_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "update_At" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "spotId" uuid, CONSTRAINT "PK_291a1f3de8676973e703916abc6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spot_reserve" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "update_At" TIMESTAMP NOT NULL DEFAULT now(), "spotId" uuid, "placeId" uuid, CONSTRAINT "PK_fff29f43fab627e422cdeb95336" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "spot_history" ADD CONSTRAINT "FK_8f46d6cdde34e3d53927d6c5516" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "spot_history" ADD CONSTRAINT "FK_da484afba4773334b0fc928533f" FOREIGN KEY ("spotId") REFERENCES "spot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "spot_reserve" ADD CONSTRAINT "FK_19e2bf762ed0a1326b74f34ecfe" FOREIGN KEY ("spotId") REFERENCES "spot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "spot_reserve" ADD CONSTRAINT "FK_da81b82ea27039a9f1bb89c8bb4" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spot_reserve" DROP CONSTRAINT "FK_da81b82ea27039a9f1bb89c8bb4"`);
        await queryRunner.query(`ALTER TABLE "spot_reserve" DROP CONSTRAINT "FK_19e2bf762ed0a1326b74f34ecfe"`);
        await queryRunner.query(`ALTER TABLE "spot_history" DROP CONSTRAINT "FK_da484afba4773334b0fc928533f"`);
        await queryRunner.query(`ALTER TABLE "spot_history" DROP CONSTRAINT "FK_8f46d6cdde34e3d53927d6c5516"`);
        await queryRunner.query(`DROP TABLE "spot_reserve"`);
        await queryRunner.query(`DROP TABLE "spot_history"`);
    }

}
