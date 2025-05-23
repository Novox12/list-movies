# List Movies

Este proyecto está desarrollado con [React.js](https://reactjs.org/), utilizando Vite como bundler para un entorno de desarrollo rápido y moderno.

## 🛠 Requisitos previos

* Node.js (v16 o superior recomendado)
* npm

---

## 🚀 Instalación

1. Clona este repositorio:

   ```bash
   git clone git@github.com:Novox12/list-movies.git
   cd list-movies
   ```

2. Instala TypeScript y ts-node de manera global o dentro del proyecto:

   ```bash
   npm install typescript ts-node -D
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

---

## ⚙️ Modo desarrollo

Para ejecutar el proyecto en modo desarrollo (ideal para programar y hacer pruebas):

```bash
npm run dev
```

Esto abrirá automáticamente la aplicación en tu navegador en `http://localhost:5173` (o el puerto disponible).

---

## 🏗 Ejecutar el proyecto desde el build de producción

1. Genera el build optimizado:

   ```bash
   npm run build
   ```

   Esto creará una carpeta `/dist` con los archivos listos para producción.

2. Previsualiza localmente el build:

   ```bash
   npm run preview
   ```

   Esto ejecutará un servidor local en `http://localhost:4173` para ver cómo se comporta la aplicación en producción.

---

## 📂 Estructura básica del proyecto

```bash
.
├── public/             # Archivos públicos
├── src/                # Código fuente principal
│   ├── components/     # Componentes reutilizables
│   ├── utils/          # Funciones y herramientas compartidas
│   ├── App.tsx         # Componente principal de la aplicación
│   ├── interfaces.ts   # Definiciones de interfaces TypeScript
│   ├── index.module.css# Estilos globales o compartidos
│   └── main.tsx        # Punto de entrada de React
├── index.html          # HTML principal
├── vite.config.ts      # Configuración de Vite
└── package.json        # Dependencias y scripts
```

---

## 📦 Scripts disponibles

| Comando           | Descripción                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Inicia la app en modo desarrollo            |
| `npm run build`   | Crea una versión optimizada para producción |
| `npm run preview` | Visualiza el build de producción            |

---

## 💡 Decisiones técnicas clave

* Se optó por una estructura simple de carpetas y componentes, adecuada para un proyecto pequeño. Cada componente tiene su propio archivo de estilos (`module.css`) y `App.tsx` centraliza la lógica general de la aplicación.
* Para el almacenamiento de datos se utilizó `localStorage`, guardando título, fecha e imagen en base64. Esto permite tener datos precargados al presionar el botón "Reset" sin depender de fuentes externas.
* Las interfaces TypeScript se centralizaron en un solo archivo (`interfaces.ts`) para mantener el código más ordenado y fácil de mantener.
* Se implementó un sistema para recortar imágenes con una relación de aspecto 2:3, lo que permite mantener una presentación visual consistente tanto en el banner como en las tarjetas de películas.

---

## ⏳ Qué mejoraría con más tiempo

* Integrar `React Router DOM` para permitir vistas detalladas de cada película.
* Sustituir `localStorage` por una API REST que permita gestionar los datos de forma más robusta y profesional.
* Mejorar la interfaz de usuario con animaciones más elaboradas y una distribución visual más intuitiva.
* Refactorizar los componentes actuales, dividiendo las responsabilidades y mejorando la organización general del proyecto.
