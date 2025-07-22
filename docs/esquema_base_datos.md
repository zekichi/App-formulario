# 📐 Esquema Base de Datos - Aplicación de Formularios

## 🧬Modelo: Formulario

| Campo         | Tipo de dato | Descripción                        |
|---------------|--------------|------------------------------------|
| `id`          | Integer       | Clave primaria autoincremental     |
| `nombre`      | String        | Nombre ingresado por el usuario    |
| `email`       | String        | Email ingresado                    |
| `fecha_envio` | DateTime      | Fecha automática de envío          |


## 🔁 Relaciones previstas

(No aplica por ahora - modelo independiente)

## 📌 Observaciones

- La base se gestionará con PostrgeSQL y SQLAlchemy.
- El modelo se alojará en '/backend/models.py' o '/backend/database.py'.
- Se usará migración con Flask-Migrate o comandos manuales.