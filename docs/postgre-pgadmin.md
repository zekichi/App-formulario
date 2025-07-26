# Configuración inicial de PostgreSQL y pgAdmin4

## 🔧 Instalación

- PostgreSQL 17 instalado
- pgAdmin4 configurado como cliente administrativo

## 🖥️ Registro del servidor en pgAdmin

- Acceder a: Register -> Server ...
- Configurar:
    - Host: 'localhost'
    - Port: '5432'
    - User: 'postgres'
    - Password: ******

## 🗄️ Creación de base de datos

- Ir a: Datasbases -> create -> Database ...
- Nombre: 'formularios_db'
- Owner: 'postgres'

## 🌐 Conexión desde Flask

```env
DATABASE_URL=postgresql://postgres:TU_CONTRASEÑA@localhost:5432/formularios_db

## 🧱 Creación de tablas

### Tabla: formulario_test

- id: serial, PK
- nombre: varchar(100) (character varying)
- email: varchar(100) (character varying)
- mensaje: text
