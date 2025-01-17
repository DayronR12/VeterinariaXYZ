package com.example.vet.controllers;

import com.example.vet.model.Credenciales;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/login")
public class Login {

    @PostMapping("/credenciales")
    public ResponseEntity<Map<String, String>> IniciarSesion(@RequestBody Credenciales credenciales) {
        String usuario = credenciales.getUsuario();
        String contra = credenciales.getContra();
        if (Objects.equals(usuario, "Dayron") && Objects.equals(contra, "hola123")) {
            Map<String, String> response = new HashMap<>();
            response.put("token", "nvuioreqbvurieow2");
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .body(response);  // Devolver el mapa como respuesta JSON
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Acceso denegado: No tiene permiso."));
        }
    }


}
