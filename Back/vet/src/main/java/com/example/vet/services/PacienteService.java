package com.example.vet.services;
import com.example.vet.model.Paciente;
import com.example.vet.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    // Crear un nuevo paciente
    public Paciente crearPaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    // Obtener todos los pacientes
    public List<Paciente> obtenerPacientes() {
        return pacienteRepository.findAll();
    }

    // Obtener un paciente por su ID
    public Optional<Paciente> obtenerPacientePorId(Long id) {
        return pacienteRepository.findById(id);
    }

    // Actualizar un paciente
    public Paciente actualizarPaciente(Long id, Paciente paciente) {
        if (pacienteRepository.existsById(id)) {
            paciente.setId(id);
            return pacienteRepository.save(paciente);
        } else {
            return null;
        }
    }

    // Eliminar un paciente
    public boolean eliminarPaciente(Long id) {
        if (pacienteRepository.existsById(id)) {
            pacienteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}