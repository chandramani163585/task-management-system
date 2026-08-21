import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1787306679699 implements MigrationInterface {
    name = 'InitialSchema1787306679699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`workspace_members\` (\`id\` varchar(36) NOT NULL, \`workspace_id\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`role\` enum ('owner', 'member') NOT NULL DEFAULT 'member', \`joined_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` varchar(36) NOT NULL, \`workspace_id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`created_by\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subtasks\` (\`id\` varchar(36) NOT NULL, \`task_id\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`is_completed\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` varchar(36) NOT NULL, \`task_id\` varchar(255) NOT NULL, \`author_id\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task_resources\` (\`id\` varchar(36) NOT NULL, \`task_id\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`title\` varchar(255) NULL, \`added_by\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`labels\` (\`id\` varchar(36) NOT NULL, \`workspace_id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` varchar(36) NOT NULL, \`workspace_id\` varchar(255) NOT NULL, \`project_id\` varchar(255) NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`status\` enum ('todo', 'doing', 'completed') NOT NULL DEFAULT 'todo', \`priority\` enum ('urgent', 'high', 'medium', 'low') NOT NULL DEFAULT 'medium', \`due_date\` date NULL, \`created_by\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspaces\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`owner_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`title\` varchar(255) NULL, \`bio\` text NULL, \`avatar_url\` varchar(255) NULL, \`google_id\` varchar(255) NULL, \`password_hash\` varchar(255) NULL, \`theme\` enum ('light', 'dark') NOT NULL DEFAULT 'light', \`color_mode\` enum ('amber', 'blue', 'pink', 'rose', 'emerald', 'black') NOT NULL DEFAULT 'blue', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task_labels\` (\`task_id\` varchar(36) NOT NULL, \`label_id\` varchar(36) NOT NULL, INDEX \`IDX_844df22351eb86c33c3e8c132f\` (\`task_id\`), INDEX \`IDX_09dd3f6f9d04063726c498155f\` (\`label_id\`), PRIMARY KEY (\`task_id\`, \`label_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task_members\` (\`task_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_e3a526efa083bf2d93f28597a8\` (\`task_id\`), INDEX \`IDX_9479a7828448cd818eda779197\` (\`user_id\`), PRIMARY KEY (\`task_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`workspace_members\` ADD CONSTRAINT \`FK_4a7c584ddfe855379598b5e20fd\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspaces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_members\` ADD CONSTRAINT \`FK_4e83431119fa585fc7aa8b817db\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_af78b8fc6857fe0a10d1bb1699e\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspaces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_8a7ccdb94bcc8635f933c8f8080\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subtasks\` ADD CONSTRAINT \`FK_4f5962cd050efba5fcc6a5d86d6\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_18c2493067c11f44efb35ca0e03\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_e6d38899c31997c45d128a8973b\` FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_resources\` ADD CONSTRAINT \`FK_8936c20f7a16bce0113538e3b6b\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_resources\` ADD CONSTRAINT \`FK_8ca40eaf78bc1c882d73e77def5\` FOREIGN KEY (\`added_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`labels\` ADD CONSTRAINT \`FK_abde089be1cb8f9ebc85211e8b7\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspaces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_5cb6ca4667dfa947871694da959\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspaces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_9eecdb5b1ed8c7c2a1b392c28d4\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_9fc727aef9e222ebd09dc8dac08\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspaces\` ADD CONSTRAINT \`FK_3bc45ecdd8fdc2108bb92516dde\` FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_labels\` ADD CONSTRAINT \`FK_844df22351eb86c33c3e8c132f4\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`task_labels\` ADD CONSTRAINT \`FK_09dd3f6f9d04063726c498155f2\` FOREIGN KEY (\`label_id\`) REFERENCES \`labels\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_members\` ADD CONSTRAINT \`FK_e3a526efa083bf2d93f28597a85\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`task_members\` ADD CONSTRAINT \`FK_9479a7828448cd818eda7791972\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task_members\` DROP FOREIGN KEY \`FK_9479a7828448cd818eda7791972\``);
        await queryRunner.query(`ALTER TABLE \`task_members\` DROP FOREIGN KEY \`FK_e3a526efa083bf2d93f28597a85\``);
        await queryRunner.query(`ALTER TABLE \`task_labels\` DROP FOREIGN KEY \`FK_09dd3f6f9d04063726c498155f2\``);
        await queryRunner.query(`ALTER TABLE \`task_labels\` DROP FOREIGN KEY \`FK_844df22351eb86c33c3e8c132f4\``);
        await queryRunner.query(`ALTER TABLE \`workspaces\` DROP FOREIGN KEY \`FK_3bc45ecdd8fdc2108bb92516dde\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_9fc727aef9e222ebd09dc8dac08\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_9eecdb5b1ed8c7c2a1b392c28d4\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_5cb6ca4667dfa947871694da959\``);
        await queryRunner.query(`ALTER TABLE \`labels\` DROP FOREIGN KEY \`FK_abde089be1cb8f9ebc85211e8b7\``);
        await queryRunner.query(`ALTER TABLE \`task_resources\` DROP FOREIGN KEY \`FK_8ca40eaf78bc1c882d73e77def5\``);
        await queryRunner.query(`ALTER TABLE \`task_resources\` DROP FOREIGN KEY \`FK_8936c20f7a16bce0113538e3b6b\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_e6d38899c31997c45d128a8973b\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_18c2493067c11f44efb35ca0e03\``);
        await queryRunner.query(`ALTER TABLE \`subtasks\` DROP FOREIGN KEY \`FK_4f5962cd050efba5fcc6a5d86d6\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_8a7ccdb94bcc8635f933c8f8080\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_af78b8fc6857fe0a10d1bb1699e\``);
        await queryRunner.query(`ALTER TABLE \`workspace_members\` DROP FOREIGN KEY \`FK_4e83431119fa585fc7aa8b817db\``);
        await queryRunner.query(`ALTER TABLE \`workspace_members\` DROP FOREIGN KEY \`FK_4a7c584ddfe855379598b5e20fd\``);
        await queryRunner.query(`DROP INDEX \`IDX_9479a7828448cd818eda779197\` ON \`task_members\``);
        await queryRunner.query(`DROP INDEX \`IDX_e3a526efa083bf2d93f28597a8\` ON \`task_members\``);
        await queryRunner.query(`DROP TABLE \`task_members\``);
        await queryRunner.query(`DROP INDEX \`IDX_09dd3f6f9d04063726c498155f\` ON \`task_labels\``);
        await queryRunner.query(`DROP INDEX \`IDX_844df22351eb86c33c3e8c132f\` ON \`task_labels\``);
        await queryRunner.query(`DROP TABLE \`task_labels\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`workspaces\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
        await queryRunner.query(`DROP TABLE \`labels\``);
        await queryRunner.query(`DROP TABLE \`task_resources\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`subtasks\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP TABLE \`workspace_members\``);
    }

}
