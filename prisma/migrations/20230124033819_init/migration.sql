-- CreateTable
CREATE TABLE `subtask` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_id` INTEGER NOT NULL,
    `subtask_id` INTEGER NOT NULL,

    INDEX `subtask_id_idx`(`subtask_id`),
    INDEX `task_id_idx`(`task_id`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `task_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(164) NOT NULL,
    `description` VARCHAR(256) NULL,
    `creator_id` INTEGER NOT NULL,
    `responsible_id` INTEGER NULL,
    `date_of_creation` DATETIME(0) NOT NULL,

    INDEX `creator_id`(`creator_id`),
    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NULL,
    `password` VARCHAR(36) NOT NULL,
    `date_of_creation` DATETIME(0) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subtask` ADD CONSTRAINT `subtask_id` FOREIGN KEY (`subtask_id`) REFERENCES `task`(`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subtask` ADD CONSTRAINT `task_id` FOREIGN KEY (`task_id`) REFERENCES `task`(`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
