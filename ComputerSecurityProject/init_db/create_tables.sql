CREATE TABLE
    IF NOT EXISTS `db`.`Users` (
        `id` INT unsigned NOT NULL AUTO_INCREMENT,
        `email` VARCHAR(320) NOT NULL DEFAULT NULL,
        `username` VARCHAR(256) NOT NULL DEFAULT NULL,
        `password` VARCHAR(255) NOT NULL DEFAULT NULL CHECK (LENGTH(`password`) >= 16),
        PRIMARY KEY (`id`,`email`,`username`)
);

CREATE TABLE
    IF NOT EXISTS `db`.`Clients` (
        `id` INT unsigned NOT NULL AUTO_INCREMENT,
        `firstName` VARCHAR(32) NOT NULL DEFAULT NULL,
        `lastName` VARCHAR(256) NOT NULL DEFAULT NULL,
        `phone` VARCHAR(16) NOT NULL DEFAULT NULL,
        `email` VARCHAR(256) NOT NULL DEFAULT NULL,
        `city` VARCHAR(50) NOT NULL DEFAULT NULL,
        `address` VARCHAR(95) NOT NULL DEFAULT NULL,
        PRIMARY KEY (`id`,`phone`,`email`)
);

