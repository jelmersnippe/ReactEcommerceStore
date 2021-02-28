import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';
import {NotImplementedException} from '@nestjs/common';

export class Migration0100000000002 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'category',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'parent_category_id',
                    type: 'uuid',
                    isNullable: true
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

        await queryRunner.createIndex('category', new TableIndex({
            columnNames: ['parent_category_id']
        }));

        await queryRunner.createIndex('category', new TableIndex({
            columnNames: ['active']
        }));

        await queryRunner.createForeignKey('category', new TableForeignKey({
            columnNames: ['parent_category_id'],
            referencedTableName: 'category',
            referencedColumnNames: ['id']
        }));
    }

    async down(): Promise<void> {
        throw new NotImplementedException('Migrating down is not implemented');
    }
}
