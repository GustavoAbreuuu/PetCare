CREATE DATABASE petshop;
USE petshop;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);


CREATE TABLE veterinarians (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    crmv VARCHAR(20) NOT NULL UNIQUE,
    specialty VARCHAR(100),

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50),
    breed VARCHAR(50),
    gender ENUM('M', 'F'),
    date_birth DATE,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    veterinarian_id INT NOT NULL,
    scheduled_at DATETIME NOT NULL,
    reason VARCHAR(255),
    status ENUM('scheduled', 'confirmed', 'canceled', 'completed') DEFAULT 'scheduled',

    FOREIGN KEY (pet_id) REFERENCES pets(id),
    FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id)
);

CREATE TABLE consultation_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE consultations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    veterinarian_id INT NOT NULL,
    appointment_id INT,
    status_id INT NOT NULL,
    date DATETIME NOT NULL,
    motive VARCHAR(255),
    observations TEXT,

    FOREIGN KEY (pet_id) REFERENCES pets(id),
    FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id),
    FOREIGN KEY (status_id) REFERENCES consultation_status(id)
);

CREATE TABLE vaccines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    application_date DATE,
    next_dose DATE,

    FOREIGN KEY (pet_id) REFERENCES pets(id)
);

CREATE TABLE medications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE pet_medications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    medication_id INT NOT NULL,
    dose VARCHAR(50),
    frequency VARCHAR(50),
    time_period VARCHAR(50),

    FOREIGN KEY (pet_id) REFERENCES pets(id),
    FOREIGN KEY (medication_id) REFERENCES medications(id)
);

CREATE TABLE weight_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    weight DECIMAL(5,2),
    registry_date DATE,

    FOREIGN KEY (pet_id) REFERENCES pets(id)
);
