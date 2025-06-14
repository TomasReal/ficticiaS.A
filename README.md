# Ficticia S.A 🧾

**Ficticia S.A** es una aplicación de gestión de personas (ABM) desarrollada con **Spring Boot** en el backend y **React** en el frontend. La autenticación se realiza mediante **JWT**, y permite operaciones seguras tras iniciar sesión.

---

## 🚀 Tecnologías

### Backend:
- Java 17
- Spring Boot
- Spring Security
- JWT (Json Web Token)
- Maven

### Frontend:
- React
- Fetch API
- CSS

---

## 🔐 Funcionalidades

- Login seguro con JWT
- Listado de personas
- Crear, editar y eliminar personas
- Autenticación protegida
- Logout

---

## 🔑 Usuario de prueba

> Ya existe un usuario admin precargado para autenticarse en el sistema:

- **Usuario:** `admin`  
- **Contraseña:** `admin123`

---

## 📦 Estructura del proyecto
ficticiaS.A/
├── ficticia-backend/     # Proyecto Spring Boot
│   ├── src/
│   └── pom.xml
│
├── ficticia-frontend/    # Proyecto React
│   ├── public/
│   ├── src/
│   └── package.json
│
└── README.md

## ⚙️ Inicialización del Proyecto

### 🔧 Backend (Spring Boot)

1. Ir a la carpeta del backend:
   ```bash
   cd ficticia-backend
2. Ejecutar la aplicación con maven:
   ```bash
   ./mvnw spring-boot:run

## 💻 Frontend (React)

1. Ir a la carpeta del frontend:
   ```bash
   cd ficticia-frontend
2. Instalar dependencias:
   ```bash
   npm install
   npm start
    
