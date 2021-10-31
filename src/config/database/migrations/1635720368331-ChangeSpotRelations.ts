import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeSpotRelations1635720368331 implements MigrationInterface {
    name = 'ChangeSpotRelations1635720368331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spot" DROP CONSTRAINT "FK_97a641a820df7110c64764410cf"`);
        await queryRunner.query(`ALTER TABLE "spot" DROP COLUMN "placeId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spot" ADD "placeId" uuid`);
        await queryRunner.query(`ALTER TABLE "spot" ADD CONSTRAINT "FK_97a641a820df7110c64764410cf" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
