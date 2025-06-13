package com.demo.ficticia.controller;

import com.demo.ficticia.model.Persona;
import com.demo.ficticia.service.PersonaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personas")
public class PersonaController {

    private final PersonaService personaService;

    public PersonaController(PersonaService personaService) {
        this.personaService = personaService;
    }

    @GetMapping
    @ResponseBody
    public List<Persona> obtenerTodas() {
        return personaService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Persona> obtenerPorId(@PathVariable Long id) {
        return personaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Persona> crear(@Valid @RequestBody Persona persona) {
        return ResponseEntity.ok(personaService.crear(persona));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Persona> actualizar(@PathVariable Long id, @Valid @RequestBody Persona persona) {
        Persona actualizada = personaService.actualizar(id, persona);
        if (actualizada != null) {
            return ResponseEntity.ok(actualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        personaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
