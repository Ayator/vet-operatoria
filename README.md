# Patología y Clínica Porcina - Visualizador PDF

Este proyecto ha sido separado en múltiples archivos para una mejor organización y mantenimiento.

## Estructura de Archivos

### 📄 `index.html`
- Archivo principal HTML
- Contiene la estructura completa de la interfaz
- Referencias a los archivos CSS y JavaScript externos

### 🎨 `styles.css`
- Todos los estilos CSS de la aplicación
- Incluye diseño responsivo y animaciones
- Estilos para la interfaz de usuario del visualizador PDF

### ⚡ `script.js`
- Toda la funcionalidad JavaScript
- Gestión de archivos PDF por unidad
- Sistema de notas y glosario
- Funcionalidad de guardado en localStorage

## Características de la Aplicación

- **Visualizador de PDFs**: Organizado por unidades de estudio
- **Sistema de Notas**: Resumen, glosario y notas personales
- **Persistencia**: Datos guardados automáticamente en localStorage
- **Interfaz Responsiva**: Adaptable a diferentes tamaños de pantalla
- **Navegación Intuitiva**: Selección por unidades y archivos

## Cómo usar

1. Abre `index.html` en tu navegador web
2. Asegúrate de que todos los archivos estén en la misma carpeta
3. Los archivos PDF deben estar organizados en subcarpetas (unidad13/, unidad14/, etc.)

## Estructura de Carpetas Esperada

```
Patologia y Clinica Porcina/
├── index.html
├── README.md
├── script.js
├── styles.css
├── unidad13/
│   ├── Enfermedad de Glasser o Poliserositis.pdf
│   └── Rinitis atrofica.pdf
├── unidad14/
│   ├── Erisipelosis en el ganado porcino.pdf
│   └── Leptospirosis en el ganado porcino.pdf
├── unidad15/
│   ├── Cistitis y pielonefritis.pdf
│   └── Meningitis estreptocococica.pdf
├── unidad16/
│   ├── 12da CVS Enteritis proliferativa porcina.pdf
│   └── 12da Síndrome de Estrés Porcino.pdf
├── unidad17/
│   ├── Coccidiosis en lechones.pdf
│   └── Strongiloidosis en lechones.pdf
├── unidad18/
│   └── Ascariosis, Sarna y Piojo.pdf
├── unidad19/
│   ├── Enfermedades ocasionadas por micotoxinas.pdf
│   ├── Micotoxicosis ppt.pdf
│   ├── MICOTOXICOSIS.pdf
│   └── Secuestro Biotransformación y Bioproteccion.pdf
├── unidad20/
│   └── Enfermedades Nutricionales del ganado porcino.pdf
├── unidad21/
│   └── Enfermedades hereditarias.pdf
├── unidad22/
│   ├── Síndrome de M.M.A..pdf
│   └── Ulcera gástrica Texto.pdf
├── unidad23/
│   └── Cuidados sanitarios de la cerda y lechones recien nacidos.pdf
├── unidad24/
│   ├── Parvovirosis porcina.pdf
│   └── Prolapsos Texto.pdf
└── unidad25/
    ├── Aujezsky.pdf
    └── Circovirus porcino.pdf
```

## Navegadores Compatibles

- Chrome/Chromium
- Firefox
- Safari
- Edge
