import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';
import {NotImplementedException} from '@nestjs/common';

export class Migration0100000000004 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'category_product_junction',
            columns: [
                {
                    name: 'category_id',
                    type: 'uuid'
                },
                {
                    name: 'product_id',
                    type: 'uuid'
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

        await queryRunner.createIndex('category_product_junction', new TableIndex({
            columnNames: ['category_id']
        }));

        await queryRunner.createIndex('category_product_junction', new TableIndex({
            columnNames: ['product_id']
        }));

        await queryRunner.createIndex('category_product_junction', new TableIndex({
            columnNames: ['category_id', 'product_id']
        }));

        await queryRunner.createForeignKey('category_product_junction', new TableForeignKey({
            columnNames: ['category_id'],
            referencedTableName: 'category',
            referencedColumnNames: ['id']
        }));

        await queryRunner.createForeignKey('category_product_junction', new TableForeignKey({
            columnNames: ['product_id'],
            referencedTableName: 'product',
            referencedColumnNames: ['id']
        }));
    }

    async down(): Promise<void> {
        throw new NotImplementedException('Migrating down is not implemented');
    }
}
