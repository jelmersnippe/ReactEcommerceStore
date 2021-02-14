import {MigrationInterface, QueryRunner, Table, TableIndex} from 'typeorm';
import {NotImplementedException} from '@nestjs/common';

export class Migration0100000000003 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'sku',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'image',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'price',
                    type: 'integer'
                },
                {
                    name: 'stock',
                    type: 'integer',
                    default: 0
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
                }
            ]
        }));

        await queryRunner.createIndex('product', new TableIndex({
            columnNames: ['sku']
        }));

        await queryRunner.createIndex('product', new TableIndex({
            columnNames: ['active']
        }));
    }

    async down(): Promise<void> {
        throw new NotImplementedException('Migrating down is not implemented');
    }
}
