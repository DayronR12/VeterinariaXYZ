package com.example.vet.model;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "paciente")

public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID único, clave primaria

    @Column(name = "nombre_paciente", nullable = false, length = 100)
    private String nombrePaciente;

    @Column(name = "especie", nullable = false, length = 50)
    private String especie;

    @Column(name = "raza", nullable = false, length = 50)
    private String raza;

    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @Column(name = "fecha_registro", nullable = false)
    private LocalDate fechaRegistro;

    @Column(name = "id_dueno", nullable = false) // Definimos la columna que será la clave foránea en la tabla paciente
    private long dueno;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombrePaciente() {
        return nombrePaciente;
    }

    public void setNombrePaciente(String nombrePaciente) {
        this.nombrePaciente = nombrePaciente;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public LocalDate getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDate fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public long getDueno() {
        return dueno;
    }

    public void setDueno(long dueno) {
        this.dueno = dueno;
    }
}