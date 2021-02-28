import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';
import {NotImplementedException} from '@nestjs/common';

export class Migration0100000000005 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cart_item',
            columns: [
                {
                    name: 'user_id',
                    type: 'uuid'
                },
                {
                    name: 'product_id',
                    type: 'uuid'
                },
                {
                    name: 'qty',
                    type: 'integer'
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

        await queryRunner.createIndex('cart_item', new TableIndex({
            columnNames: ['user_id']
        }));

        await queryRunner.createIndex('cart_item', new TableIndex({
            columnNames: ['product_id']
        }));

        await queryRunner.createIndex('cart_item', new TableIndex({
            columnNames: ['user_id', 'product_id'],
            isUnique: true
        }));

        await queryRunner.createIndex('cart_item', new TableIndex({
            columnNames: ['active']
        }));

        await queryRunner.createForeignKey('cart_item', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id']
        }));

        await queryRunner.createForeignKey('cart_item', new TableForeignKey({
            columnNames: ['product_id'],
            referencedTableName: 'product',
            referencedColumnNames: ['id']
        }));
    }

    async down(): Promise<void> {
        throw new NotImplementedException('Migrating down is not implemented');
    }
}
