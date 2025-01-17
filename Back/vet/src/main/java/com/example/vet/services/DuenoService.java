package com.example.vet.services;

import com.example.vet.model.Dueno;
import com.example.vet.repository.DuenoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DuenoService {

    @Autowired
    private DuenoRepository duenoRepository;

    // Obtener todos los dueños
    public List<Dueno> obtenerTodosLosDuenos() {
        return duenoRepository.findAll();
    }

    // Obtener dueño por ID
    public Optional<Dueno> obtenerDuenoPorId(Long id) {
        return duenoRepository.findById(id);
    }

    // Crear o actualizar un dueño
    public Dueno guardarDueno(Dueno dueno) {
        return duenoRepository.save(dueno);
    }

    public Dueno actualizarDueno(Dueno dueno) {
        return duenoRepository.save(dueno);
    }

    // Eliminar dueño por ID
    public void eliminarDueno(Long id) {
        duenoRepository.deleteById(id);
    }
}