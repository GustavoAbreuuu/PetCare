INSERT INTO roles (name) VALUES
('admin'),
('veterinarian'),
('receptionist');

INSERT INTO users (name, email, phone, cpf, password) VALUES
('Gustavo Abreu', 'gustavo@email.com', '48999990001', '111.111.111-11', 'hash_admin'),
('Dra. Ana Souza', 'ana@vet.com', '48999990002', '222.222.222-22', 'hash_vet'),
('Carlos Silva', 'carlos@email.com', '48999990003', '333.333.333-33', 'hash_client'),
('Mariana Lima', 'mariana@email.com', '48999990004', '444.444.444-44', 'hash_reception');

INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1), -- admin
(2, 2), -- veterinarian
(3, 3), -- client (pode ajustar futuramente)
(4, 3); -- receptionist

INSERT INTO veterinarians (user_id, crmv, specialty) VALUES
(2, 'CRMV-SC-1234', 'Clínico Geral');

INSERT INTO pets (user_id, name, species, breed, gender, date_birth) VALUES
(3, 'Rex', 'Dog', 'Labrador', 'M', '2020-05-10'),
(3, 'Mimi', 'Cat', 'Siamese', 'F', '2022-03-15');

INSERT INTO appointments (pet_id, veterinarian_id, scheduled_at, reason, status) VALUES
(1, 1, '2026-05-10 10:00:00', 'Consulta de rotina', 'scheduled'),
(2, 1, '2026-05-11 14:00:00', 'Vacinação', 'confirmed');

INSERT INTO consultation_status (name) VALUES
('scheduled'),
('completed'),
('canceled');

INSERT INTO consultations (pet_id, veterinarian_id, appointment_id, status_id, date, motive, observations) VALUES
(1, 1, 1, 2, '2026-05-10 10:30:00', 'Check-up', 'Animal saudável'),
(2, 1, 2, 1, '2026-05-11 14:30:00', 'Vacina', 'Aguardando aplicação');

INSERT INTO vaccines (pet_id, name, application_date, next_dose) VALUES
(1, 'Antirrábica', '2025-05-10', '2026-05-10'),
(2, 'V4', '2026-01-10', '2027-01-10');

INSERT INTO medications (name) VALUES
('Antibiótico'),
('Vermífugo');

INSERT INTO pet_medications (pet_id, medication_id, dose, frequency, time_period) VALUES
(1, 1, '500mg', '2x ao dia', '7 dias'),
(2, 2, '1 dose', 'dose única', '1 dia');

INSERT INTO weight_history (pet_id, weight, registry_date) VALUES
(1, 30.50, '2026-01-01'),
(1, 31.20, '2026-04-01'),
(2, 4.10, '2026-02-01');

