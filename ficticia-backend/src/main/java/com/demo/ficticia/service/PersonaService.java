package com.demo.ficticia.service;

import com.demo.ficticia.model.Persona;
import com.demo.ficticia.repository.PersonaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonaService {

    private final PersonaRepository personaRepository;

    public PersonaService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    public List<Persona> obtenerTodas() {
        return personaRepository.findAll();
    }

    public Optional<Persona> obtenerPorId(Long id) {
        return personaRepository.findById(id);
    }

    public Persona crear(Persona persona) {
        return personaRepository.save(persona);
    }

    public Persona actualizar(Long id, Persona personaActualizada) {
        return personaRepository.findById(id).map(persona -> {
            persona.setNombreCompleto(personaActualizada.getNombreCompleto());
            persona.setIdentificacion(personaActualizada.getIdentificacion());
            persona.setFechaNacimiento(personaActualizada.getFechaNacimiento());
            persona.setGenero(personaActualizada.getGenero());
            persona.setActivo(personaActualizada.isActivo());
            persona.setManeja(personaActualizada.isManeja());
            persona.setUsaLentes(personaActualizada.isUsaLentes());
            persona.setDiabetico(personaActualizada.isDiabetico());
            persona.setOtraEnfermedad(personaActualizada.getOtraEnfermedad());
            return personaRepository.save(persona);
        }).orElse(null);
    }

    public void eliminar(Long id) {
        personaRepository.deleteById(id);
    }
}
