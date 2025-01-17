package com.example.vet.controllers;


import com.example.vet.model.Dueno;
import com.example.vet.services.DuenoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/duenos")
public class DuenoController {

    @Autowired
    private DuenoService duenoService;

    @GetMapping
    public ResponseEntity<List<Dueno>> obtenerTodosLosDuenos() {
        List<Dueno> duenos = duenoService.obtenerTodosLosDuenos();
        return new ResponseEntity<>(duenos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dueno> obtenerDuenoPorId(@PathVariable Long id) {
        Optional<Dueno> dueno = duenoService.obtenerDuenoPorId(id);
        if (dueno.isPresent()) {
            return new ResponseEntity<>(dueno.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dueno> actualizarDueno(@PathVariable Long id, @RequestBody Dueno dueno) {
        Optional<Dueno> duenoExistente = duenoService.obtenerDuenoPorId(id);
        if (duenoExistente.isPresent()) {
            dueno.setId(id);
            Dueno duenoActualizado = duenoService.actualizarDueno(dueno);
            return ResponseEntity.ok(duenoActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Dueno> guardarDueno(@RequestBody Dueno dueno) {
        Dueno nuevoDueno = duenoService.guardarDueno(dueno);
        return new ResponseEntity<>(nuevoDueno, HttpStatus.CREATED);
    }

    // Eliminar dueño
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDueno(@PathVariable Long id) {
        duenoService.eliminarDueno(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
