package com.demo.ficticia.model;

import java.time.LocalDate;
import java.time.Period;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "The name is mandatory")
    private String nombreCompleto;

    @NotBlank(message = "The identification is mandatory")
    @Column(unique = true)
    private String identificacion;

    @NotNull(message = "The birth date is mandatory")
    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @NotBlank(message = "The gender is mandatory")
    private String genero;

    private boolean activo;
    private boolean maneja;
    private boolean usaLentes;
    private boolean diabetico;
    private String otraEnfermedad;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Transient
    public int getEdad() {
        if (this.fechaNacimiento == null)
            return 0;
        return Period.between(this.fechaNacimiento, LocalDate.now()).getYears();
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    public boolean isManeja() {
        return maneja;
    }

    public void setManeja(boolean maneja) {
        this.maneja = maneja;
    }

    public boolean isUsaLentes() {
        return usaLentes;
    }

    public void setUsaLentes(boolean usaLentes) {
        this.usaLentes = usaLentes;
    }

    public boolean isDiabetico() {
        return diabetico;
    }

    public void setDiabetico(boolean diabetico) {
        this.diabetico = diabetico;
    }

    public String getOtraEnfermedad() {
        return otraEnfermedad;
    }

    public void setOtraEnfermedad(String otraEnfermedad) {
        this.otraEnfermedad = otraEnfermedad;
    }
}
