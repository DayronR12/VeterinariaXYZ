package com.example.vet;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:4200"); // Permite solicitudes desde el puerto 4202
        config.addAllowedMethod("*"); // Permite todos los métodos (GET, POST, PUT, DELETE, etc.)
        config.addAllowedHeader("*"); // Permite todos los encabezados
        config.setAllowCredentials(true); // Permite enviar cookies o credenciales

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Aplica esta configuración a todas las rutas
        return new CorsFilter(source);

    }
}