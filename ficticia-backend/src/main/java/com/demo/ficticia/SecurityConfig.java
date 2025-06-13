package com.demo.ficticia;

import com.demo.ficticia.jwt.JwtAuthenticationFilter;
import com.demo.ficticia.service.JwtService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

        @Bean
        public JwtAuthenticationFilter jwtAuthenticationFilter(UserDetailsService userDetailsService,
                        JwtService jwtService) {
                return new JwtAuthenticationFilter(jwtService, userDetailsService);
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthFilter)
                        throws Exception {

                http
                                .csrf(csrf -> csrf.disable())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/auth/login", "/public/**", "/error").permitAll()
                                                .anyRequest().authenticated())
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                                .cors();

                return http.build();
        }

        @Bean
        public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
                UserDetails user = User.withUsername("user")
                                .password(passwordEncoder.encode("password"))
                                .roles("USER")
                                .build();

                UserDetails admin = User.withUsername("admin")
                                .password(passwordEncoder.encode("admin123"))
                                .roles("ADMIN")
                                .build();

                return new InMemoryUserDetailsManager(user, admin);
        }

        @Bean
        public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService) {
                DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
                provider.setUserDetailsService(userDetailsService);
                provider.setPasswordEncoder(passwordEncoder());
                return provider;
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
                return config.getAuthenticationManager();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public WebMvcConfigurer corsConfigurer() {
                return new WebMvcConfigurer() {
                        @Override
                        public void addCorsMappings(CorsRegistry registry) {
                                registry.addMapping("/**")
                                                .allowedOrigins("http://localhost:3000")
                                                .allowedMethods("GET", "POST", "PUT", "DELETE")
                                                .allowedHeaders("*")
                                                .allowCredentials(true);
                        }
                };
        }
}
