import {MigrationInterface, QueryRunner, Table, TableIndex} from 'typeorm';
import {NotImplementedException} from '@nestjs/common';

export class Migration0100000000001 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'first_name',
                    type: 'varchar'
                },
                {
                    name: 'last_name',
                    type: 'varchar'
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'active',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'created',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
            ]
        }))

        await queryRunner.createIndex('user', new TableIndex({
            columnNames: ['id']
        }))
    }

    async down(): Promise<void> {
        throw new NotImplementedException('Migrating down is not implemented');
    }
}
