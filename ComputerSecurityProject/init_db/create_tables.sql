CREATE TABLE IF NOT EXISTS `db`.`Users` (
        `id` INT unsigned NOT NULL AUTO_INCREMENT,
        `email` VARCHAR(320) NOT NULL,
        `username` VARCHAR(256) NOT NULL,
        `password` VARCHAR(255) NOT NULL CHECK (LENGTH(`password`) >= 16),
        PRIMARY KEY (`id`),
);

CREATE TABLE IF NOT EXISTS `db`.`Clients` (
        `id` INT unsigned NOT NULL AUTO_INCREMENT,
        `firstName` VARCHAR(32) NOT NULL,
        `lastName` VARCHAR(256) NOT NULL,
        `phone` VARCHAR(16) NOT NULL,
        `email` VARCHAR(256) NOT NULL,
        `city` VARCHAR(50) NOT NULL,
        `address` VARCHAR(95) NOT NULL,
        PRIMARY KEY (`id`,`phone`,`email`)
);