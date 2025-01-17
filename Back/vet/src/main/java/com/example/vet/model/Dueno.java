package com.example.vet.model;

import jakarta.persistence.*;

@Entity
@Table(name = "dueno")

public class Dueno {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID único, clave primaria

    @Column(name = "tipo_identificacion_dueno", nullable = false, length = 20)
    private String tipoIdentificacionDueno;

    @Column(name = "identificacion_dueno", nullable = false, length = 20)
    private String identificacionDueno;

    @Column(name = "nombre_dueno", nullable = false, length = 100)
    private String nombreDueno;

    @Column(name = "ciudad", nullable = false, length = 100)
    private String ciudad;

    @Column(name = "direccion", nullable = false, length = 150)
    private String direccion;

    @Column(name = "telefono", nullable = false, length = 15)
    private String telefono;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoIdentificacionDueno() {
        return tipoIdentificacionDueno;
    }

    public void setTipoIdentificacionDueno(String tipoIdentificacionDueno) {
        this.tipoIdentificacionDueno = tipoIdentificacionDueno;
    }

    public String getIdentificacionDueno() {
        return identificacionDueno;
    }

    public void setIdentificacionDueno(String identificacionDueno) {
        this.identificacionDueno = identificacionDueno;
    }

    public String getNombreDueno() {
        return nombreDueno;
    }

    public void setNombreDueno(String nombreDueno) {
        this.nombreDueno = nombreDueno;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
}
