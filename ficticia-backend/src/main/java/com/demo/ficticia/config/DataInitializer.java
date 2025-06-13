package com.demo.ficticia.config;

import com.demo.ficticia.model.Admin;
import com.demo.ficticia.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initAdmin(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String defaultUsername = "admin";
            String defaultPassword = "admin123";

            if (adminRepository.findByUsername(defaultUsername).isEmpty()) {
                Admin admin = new Admin();
                admin.setUsername(defaultUsername);
                admin.setPassword(passwordEncoder.encode(defaultPassword));
                adminRepository.save(admin);
                System.out.println("✅ Admin creado por defecto: " + defaultUsername);
            } else {
                System.out.println("ℹ️ Admin por defecto ya existe");
            }
        };
    }
}
