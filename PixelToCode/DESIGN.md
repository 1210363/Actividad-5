# Documento de Diseño - PixelToCode

## 1. Misión del Proyecto
PixelToCode es un toolkit web interactivo para diseñadores y desarrolladores. Permite traducir especificaciones de diseño a código CSS listo para producción.

## 2. Sistema de Diseño (Design System)
- **Paleta de Colores**:
  - Primario: Violeta Stitch (`#7C3AED`)
  - Acento: Verde Menta (`#10B981`)
  - Fondo Claro: `#F9FAFB`
  - Fondo Sección: `#F3E8FF` (Violeta suave)
  - Texto Principal: `#1F2937`
- **Tipografía**:
  - Fuente Base: System Stack (sans-serif, BlinkMacSystemFont, Segoe UI)
  - Escala: 12px, 14px, 16px, 20px, 24px, 32px
- **Librería CSS**: Bulma CSS v1.0.4 (vía CDN)
- **Iconografía**: Font Awesome v6.4.0 (vía CDN)

## 3. Arquitectura de Módulos (SPA - Single Page Application / Tabbed UI)
La interfaz cuenta con un Selector de Módulos principal. Al hacer clic en cualquiera de las 6 tarjetas de la cuadrícula o en las pestañas de navegación superior, la vista cambia dinámicamente mostrando **únicamente el módulo activo seleccionado**, manteniendo una experiencia limpia, fluida y sin saturación.

### Módulos Incluidos:
1. **Conversor de Unidades CSS**: Conversión bi-direccional en tiempo real entre `px`, `rem`, `em` y `%`.
2. **Verificador WCAG**: Calculador de contraste de color con vista previa en vivo y certificación AA/AAA.
3. **Visualizador Box Model**: Control sliders para ajustar `margin`, `border`, `padding` y `content` con código CSS generado automáticamente.
4. **Playground Flexbox / Grid**: Alternador entre Flexbox y CSS Grid con controles dinámicos de alineación y código resultante.
5. **Escala Tipográfica**: Generador de jerarquía tipográfica proporcional basado en escalas armónicas.
6. **Biblioteca de Snippets**: Colección de componentes de UI comunes con copiar al portapapeles.
