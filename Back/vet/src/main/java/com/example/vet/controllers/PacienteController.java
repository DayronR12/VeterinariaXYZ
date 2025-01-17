package com.example.vet.controllers;

import com.example.vet.model.Paciente;
import com.example.vet.services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    // Crear un paciente
    @PostMapping
    public ResponseEntity<Paciente> crearPaciente(@RequestBody Paciente paciente) {
        Paciente nuevoPaciente = pacienteService.crearPaciente(paciente);
        return new ResponseEntity<>(nuevoPaciente, HttpStatus.CREATED);
    }



    // Obtener todos los pacientes
    @GetMapping
    public List<Paciente> obtenerPacientes() {
        return pacienteService.obtenerPacientes();
    }



    // Obtener un paciente por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> obtenerPaciente(@PathVariable Long id) {
        Optional<Paciente> paciente = pacienteService.obtenerPacientePorId(id);
        return paciente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar un paciente
    @PutMapping("/{id}")
    public ResponseEntity<Paciente> actualizarPaciente(@PathVariable Long id, @RequestBody Paciente paciente) {
        Paciente pacienteActualizado = pacienteService.actualizarPaciente(id, paciente);
        return pacienteActualizado != null ? ResponseEntity.ok(pacienteActualizado) : ResponseEntity.notFound().build();
    }

    // Eliminar un paciente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPaciente(@PathVariable Long id) {
        return pacienteService.eliminarPaciente(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
