ALTER TABLE paciente
ADD CONSTRAINT fk_paciente_dueno
FOREIGN KEY (id_dueno)
REFERENCES dueno(id);
