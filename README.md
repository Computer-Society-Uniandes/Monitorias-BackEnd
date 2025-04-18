# Monitorias - Web Platform

## Descripción del Proyecto

Monitorias es un proyecto desarrollado por estudiantes de la Universidad de los Andes, bajo la Computer Society, con el objetivo de crear una plataforma que conecte estudiantes que estén dispuestos a ofrecer tutorías informales sobre diversas asignaturas con aquellos que busquen apoyo académico. La idea es facilitar el acceso a tutorías de calidad y fomentar el intercambio de conocimiento entre estudiantes de la universidad.

## Objetivo

El objetivo principal de este proyecto es proporcionar un espacio en línea donde los estudiantes de la universidad puedan encontrar fácilmente monitores dispuestos a ayudarlos con sus estudios. La plataforma permitirá a los monitores ofrecer sus servicios en asignaturas específicas, y a los estudiantes solicitar tutorías según sus necesidades. Así, buscamos mejorar el rendimiento académico y el sentido de comunidad entre los estudiantes.

## Miembros del Equipo

- **Felipe Rueda Rivera**

  - Correo: [f.rueda4@uniandes.edu.co](mailto:m.loveral@uniandes.edu.co)
  - GitHub: [@Feru34](https://github.com/feru34)

- **Catherine Jaque (Cathe)**

  - Correo: [p.jimenezj@uniandes.edu.co](mailto:p.jimenezj@uniandes.edu.co)
  - GitHub: [@catherinejiq](https://github.com/catherinejiq)

- **Jorge Bustamante**

  - Correo: [j.bustamantep@uniandes.edu.co](mailto:j.bustamantep@uniandes.edu.co)
  - GitHub: [@JorgeB-py](https://github.com/JorgeB-py)

- **Manuela Lovera**

  - Correo: [m.loveral@uniandes.edu.co](mailto:m.loveral@uniandes.edu.co)
  - GitHub: [@mloveral](https://github.com/mloveral)

- **Juan David Anzola**

  - Correo: [j.anzolaq@uniandes.edu.co](mailto:j.anzolaq@uniandes.edu.co)
  - GitHub: [@JuanDa-dev](https://github.com/JuanDa-dev)

- **Ashlee Yin**

  - Correo: [a.yin@uniandes.edu.co](mailto:a.yin@uniandes.edu.co)
  - GitHub: [@awangran](https://github.com/awangran)

- **Lizeth Bejarano**

  - Correo: [l.bejarano1@uniandes.edu.co](mailto:l.bejarano1@uniandes.edu.co)
  - GitHub: [@lizzz94](https://github.com/lizzz94)

- **Camila Martínez**

  - Correo: [mc.martinezm12@uniandes.edu.co](mailto:mc.martinezm12@uniandes.edu.co)
  - GitHub: [@CamilaMartinez-MISO](https://github.com/CamilaMartinez-MISO)

- **Tomás Pardo**

  - Correo: [t.pardo@uniandes.edu.co](mailto:t.pardo@uniandes.edu.co)
  - GitHub: [@Tpardo12](https://github.com/Tpardo12)

- **Santiago Gómez**
  - Correo: [ds.gomezm1@uniandes.edu.co](mailto:ds.gomezm1@uniandes.edu.co)
  - GitHub: [@Santigogo](https://github.com/Santigogo)
- **Alejandro Ortiz**
  - Correo: [a.ortiz1@uniandes.edu.co](mailto:a.ortiz1@uniandes.edu.co)
  - GitHub: [@Alortiztique](https://github.com/Alortiztique)

## Tecnologías Utilizadas

- HTML/CSS
- JavaScript
- React.js
- Node.js

## Instalación

### 1. Clonar el repositorio

Para comenzar, clona este repositorio en tu máquina local usando el siguiente comando:

```bash
git clone https://github.com/Computer-Society-Uniandes/Monitorias.git
```

### 2. Verificar instalación de Node.js y npm

Asegúrate de tener instalados **Node.js** y **npm**. Puedes verificarlo ejecutando los siguientes comandos en la terminal:

```bash
node -v
npm -v
```

Si no tienes Node.js instalado, descárgalo desde [https://nodejs.org/](https://nodejs.org/).

### 3. Instalar dependencias

Una vez clonado el repositorio, navega a la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias que se encuentran en el archivo `package.json`.

### 4. Iniciar el servidor de desarrollo

Después de instalar las dependencias, inicia el servidor de desarrollo con el siguiente comando:

```bash
npm start
```

El proyecto se abrirá automáticamente en tu navegador en la dirección `http://localhost:3000`. Cualquier cambio que realices en el código se reflejará automáticamente.

### 5. Agregar nuevas dependencias

Si necesitas agregar nuevas dependencias al proyecto, puedes hacerlo con:

```bash
npm install nombre-paquete
```

Por ejemplo, para instalar **React Router**:

```bash
npm install react-router-dom
```

### 6. Finalizar el servidor

Para detener el servidor de desarrollo, usa el siguiente comando en la terminal:

```bash
Ctrl + C
```


# 📘 Documentación API Endpoints

## 📅 Availability (Disponibilidad)

### ➕ Crear una disponibilidad
**POST** `/availability`  
**Body:** `CreateAvailabilityDto`  
Campos:  
- `start_hour`  
- `end_hour`  
- `blackout_date`  
- `recurrence`  
- `weekday`  
- `tutor_id`  
- `schedule_id`

---

### 📥 Obtener todas las disponibilidades  
**GET** `/availability`

---

### 🔍 Obtener una disponibilidad por ID  
**GET** `/availability/:id`  
**Parámetros:**  
- `id`: ID de la disponibilidad

---

### ✏️ Actualizar una disponibilidad  
**PATCH** `/availability/:id`  
**Parámetros:**  
- `id`: ID de la disponibilidad  
**Body:** `UpdateAvailabilityDto` (campos opcionales)

---

### ❌ Eliminar una disponibilidad  
**DELETE** `/availability/:id`  
**Parámetros:**  
- `id`: ID de la disponibilidad

---

## 👥 Group Tutoring Session (Sesión de Tutoría Grupal)

### ➕ Crear una sesión grupal  
**POST** `/group_tutoring_session`  
**Body:** `CreateGroupTutoringSessionDto`  
Campos:  
- `start_hour`  
- `end_hour`  
- `notes`  
- `status`  
- `price`  
- `course_id`  
- `student_ids[]`  
- `tutor_ids[]`

---

### 📥 Obtener todas las sesiones grupales  
**GET** `/group_tutoring_session`

---

### 🔍 Obtener una sesión por ID  
**GET** `/group_tutoring_session/:id`  
**Parámetros:**  
- `id`: ID de la sesión

---

### ✏️ Actualizar una sesión  
**PATCH** `/group_tutoring_session/:id`  
**Parámetros:**  
- `id`: ID de la sesión  
**Body:** `UpdateGroupTutoringSessionDto` (campos opcionales)

---

### ❌ Eliminar una sesión  
**DELETE** `/group_tutoring_session/:id`  
**Parámetros:**  
- `id`: ID de la sesión

---

## 📚 Course (Curso)

### ➕ Crear un curso  
**POST** `/course`  
**Body:** `CreateCourseDto`  
Campos:  
- `name`  
- `complexity`  
- `base_price`  
- `code`  
- `tutor_ids[]`

---

### 📥 Obtener todos los cursos  
**GET** `/course`

---

### 🔍 Obtener un curso por ID  
**GET** `/course/:id`  
**Parámetros:**  
- `id`: ID del curso

---

### ✏️ Actualizar un curso  
**PATCH** `/course/:id`  
**Parámetros:**  
- `id`: ID del curso  
**Body:** `UpdateCourseDto` (campos opcionales)

---

### ❌ Eliminar un curso  
**DELETE** `/course/:id`  
**Parámetros:**  
- `id`: ID del curso

---

## 🎓 Major (Carrera)

### ➕ Crear una carrera  
**POST** `/major`  
**Body:** `CreateMajorDto`  
Campos:  
- `name`  
- `description`  
- `courses[]`

---

### 📥 Obtener todas las carreras  
**GET** `/major`

---

### 🔍 Obtener una carrera por ID  
**GET** `/major/:id`  
**Parámetros:**  
- `id`: ID de la carrera

---

### ✏️ Actualizar una carrera  
**PATCH** `/major/:id`  
**Parámetros:**  
- `id`: ID de la carrera  
**Body:** `UpdateMajorDto` (campos opcionales)

---

### ❌ Eliminar una carrera  
**DELETE** `/major/:id`  
**Parámetros:**  
- `id`: ID de la carrera

---

## ⭐ Review (Reseña)

### ➕ Crear una reseña  
**POST** `/review`  
**Body:** `CreateReviewDto`  
Campos:  
- `date`  
- `comment`  
- `suggestions`  
- `score`  
- `tutor_id`  
- `tutoring_session_id`

---

### 📥 Obtener todas las reseñas  
**GET** `/review`

---

### 🔍 Obtener una reseña por ID  
**GET** `/review/:id`  
**Parámetros:**  
- `id`: ID de la reseña

---

### ✏️ Actualizar una reseña  
**PATCH** `/review/:id`  
**Parámetros:**  
- `id`: ID de la reseña  
**Body:** `UpdateReviewDto` (campos opcionales)

---

### ❌ Eliminar una reseña  
**DELETE** `/review/:id`  
**Parámetros:**  
- `id`: ID de la reseña

---

## 📅 Schedule (Horario)

### ➕ Crear un horario  
**POST** `/schedule`  
**Body:** `CreateScheduleDto`  
Campos:  
- `tutor_id`  
- `min_booking_notice`  
- `max_sessions_per_day`  
- `buffer_time`

---

### 📥 Obtener todos los horarios  
**GET** `/schedule`

---

### 🔍 Obtener el horario de un tutor específico  
**GET** `/schedule/tutor/:tutor_id`  
**Parámetros:**  
- `tutor_id`: ID del tutor

---

### 🔍 Buscar slots disponibles  
**GET** `/schedule/availability`  
**Query Params:**  
- `tutor_id` (requerido)  
- `startDate` (requerido)  
- `endDate` (requerido)

---

### 🔍 Obtener un horario por ID  
**GET** `/schedule/:id`  
**Parámetros:**  
- `id`: ID del horario

---

### ✏️ Actualizar un horario  
**PATCH** `/schedule/:id`  
**Parámetros:**  
- `id`: ID del horario  
**Body:** `UpdateScheduleDto` (campos opcionales)

---

### ❌ Eliminar un horario  
**DELETE** `/schedule/:id`  
**Parámetros:**  
- `id`: ID del horario

---

## 🎓 Student (Estudiante)

### ➕ Crear un estudiante  
**POST** `/student`  
**Body:** `CreateStudentDto`  
Campos:  
- `first_name`  
- `last_name`  
- `email`  
- `major`  
- etc.

---

### 📥 Obtener todos los estudiantes  
**GET** `/student`

---

### 🔍 Filtrar estudiantes por carrera  
**GET** `/student/by-major/:major`  
**Parámetros:**  
- `major`: nombre de la carrera

---

### 📘 Obtener sesiones de tutoría de un estudiante  
**GET** `/student/:id/tutoring-sessions`  
**Parámetros:**  
- `id`: ID del estudiante

---

### 👥 Obtener sesiones grupales de un estudiante  
**GET** `/student/:id/group-sessions`  
**Parámetros:**  
- `id`: ID del estudiante

---

### 🔍 Obtener un estudiante por ID  
**GET** `/student/:id`  
**Parámetros:**  
- `id`: ID del estudiante

---

### ✏️ Actualizar un estudiante  
**PATCH** `/student/:id`  
**Parámetros:**  
- `id`: ID del estudiante  
**Body:** `UpdateStudentDto` (campos opcionales)

---

### ❌ Eliminar un estudiante  
**DELETE** `/student/:id`  
**Parámetros:**  
- `id`: ID del estudiante

---

## 📚 Topic (Tema)

### ➕ Crear un tema  
**POST** `/topic`  
**Body:** `CreateTopicDto`  
Campos:  
- `name`  
- `description`  
- `course_id`

---

### 📥 Obtener todos los temas  
**GET** `/topic`  
**Query Params:**  
- `course_id` (opcional)

---

### 🔍 Buscar temas por nombre o descripción  
**GET** `/topic/search`  
**Query Params:**  
- `query`: texto de búsqueda

---

### 📘 Obtener sesiones relacionadas a un tema  
**GET** `/topic/:id/sessions`  
**Parámetros:**  
- `id`: ID del tema

---

### 🔍 Obtener un tema por ID  
**GET** `/topic/:id`  
**Parámetros:**  
- `id`: ID del tema

---

### ✏️ Actualizar un tema  
**PATCH** `/topic/:id`  
**Parámetros:**  
- `id`: ID del tema  
**Body:** `UpdateTopicDto` (campos opcionales)

---

### ❌ Eliminar un tema  
**DELETE** `/topic/:id`  
**Parámetros:**  
- `id`: ID del tema

---

## 👨‍🏫 Tutor (Tutor)

### ➕ Crear un tutor  
**POST** `/tutor`  
**Body:** `CreateTutorDto`  
Campos:  
- `first_name`  
- `last_name`  
- `school_email`  
- `course_ids`  
- etc.

---

### 📥 Obtener todos los tutores  
**GET** `/tutor`  
**Query Params:**  
- `course_id` (opcional)

---

### 🔍 Buscar tutor por email  
**GET** `/tutor/email/:email`  
**Parámetros:**  
- `email`: email del tutor

---

### 🔍 Obtener un tutor por ID  
**GET** `/tutor/:id`  
**Parámetros:**  
- `id`: ID del tutor

---

### ✏️ Actualizar un tutor  
**PATCH** `/tutor/:id`  
**Parámetros:**  
- `id`: ID del tutor  
**Body:** `UpdateTutorDto` (campos opcionales)

---

### ⭐ Actualizar rating de un tutor  
**PATCH** `/tutor/:id/rating`  
**Parámetros:**  
- `id`: ID del tutor  
**Body:**  
- `rating`: nuevo rating

---

### ❌ Eliminar un tutor  
**DELETE** `/tutor/:id`  
**Parámetros:**  
- `id`: ID del tutor

---

## 💻 Tutoring Platform (Plataforma de Tutoría)

### ➕ Crear una plataforma  
**POST** `/tutoring_platform`  
**Body:** `CreateTutoringPlatformDto`  
Campos:  
- `name`  
- `url`  
- `description`  
- `is_active`

---

### 📥 Obtener todas las plataformas  
**GET** `/tutoring_platform`  
**Query Params:**  
- `active=true` (opcional)

---

### 🔍 Buscar plataforma por nombre  
**GET** `/tutoring_platform/name/:name`  
**Parámetros:**  
- `name`: nombre de la plataforma

---

### 🔍 Obtener una plataforma por ID  
**GET** `/tutoring_platform/:id`  
**Parámetros:**  
- `id`: ID de la plataforma

---

### ✏️ Actualizar una plataforma  
**PATCH** `/tutoring_platform/:id`  
**Parámetros:**  
- `id`: ID de la plataforma  
**Body:** `UpdateTutoringPlatformDto` (campos opcionales)

---

### 🔄 Alternar estado activo/inactivo  
**PATCH** `/tutoring_platform/:id/toggle-active`  
**Parámetros:**  
- `id`: ID de la plataforma

---

### ❌ Eliminar una plataforma  
**DELETE** `/tutoring_platform/:id`  
**Parámetros:**  
- `id`: ID de la plataforma

---


## 🎓 Tutoring Session (Sesión de Tutoría)

### ➕ Crear una sesión de tutoría  
**POST** `/tutoring_session`  
**Body:** `CreateTutoringSessionDto`  
Campos:  
- `tutor_id`  
- `student_id`  
- `start_time`  
- `end_time`  
- `topicid`  
- `platformid`

---

### 📥 Obtener todas las sesiones  
**GET** `/tutoring_session`  
**Query Params (opcionales):**  
- `tutor_id`: Filtrar por tutor  
- `student_id`: Filtrar por estudiante  
- `startDate` y `endDate`: Filtrar por rango de fechas

---

### 🔍 Obtener una sesión específica  
**GET** `/tutoring_session/:id`  
**Parámetros:**  
- `id`: ID de la sesión

---

### ✏️ Actualizar una sesión  
**PATCH** `/tutoring_session/:id`  
**Parámetros:**  
- `id`: ID de la sesión  
**Body:** `UpdateTutoringSessionDto` (campos opcionales)

---

### 🔄 Cambiar estado de la sesión  
**PATCH** `/tutoring_session/:id/status`  
**Parámetros:**  
- `id`: ID de la sesión  
**Body:**  
- `status`: Nuevo estado (`pending`, `confirmed`, `cancelled`, `completed`)  
- `cancellation_reason`: (opcional, si el estado es `cancelled`)

---

### ❌ Eliminar una sesión  
**DELETE** `/tutoring_session/:id`  
**Parámetros:**  
- `id`: ID de la sesión

---

## 👤 User (Usuario)

### ➕ Crear un usuario  
**POST** `/user`  
**Body:** `CreateUserDto`  
Campos:  
- `name`  
- `phone_number`  
- `major`  
- `bio`

---

### 📥 Obtener todos los usuarios  
**GET** `/user`

---

### 🔍 Obtener un usuario por ID  
**GET** `/user/:id`  
**Parámetros:**  
- `id`: ID del usuario

---

### ✏️ Actualizar un usuario  
**PATCH** `/user/:id`  
**Parámetros:**  
- `id`: ID del usuario  
**Body:** `UpdateUserDto` (campos opcionales)

---

### ❌ Eliminar un usuario  
**DELETE** `/user/:id`  
**Parámetros:**  
- `id`: ID del usuario

---
