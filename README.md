# Miguelflix

Miguelflix es una plataforma de streaming desarrollada con Next.js 15, React y TypeScript. Permite a los usuarios explorar un catálogo de contenido, gestionar su lista personal, registrarse, iniciar sesión y enviar mensajes de contacto. Los datos del catálogo se obtienen desde Contentful y los correos de contacto se envían usando Resend.

## Tecnologías

Next.js 15, React 19, TypeScript, Tailwind CSS, Contentful (CMS), Resend (envío de emails), LocalStorage (usuarios y lista personal)

## Funcionalidades

Registro y login de usuarios, búsqueda de contenido, lista personal de favoritos, portafolio y catálogo de contenido, gestión de sesión y persistencia con LocalStorage, envío de mensajes de contacto con validación, diseño responsivo para móvil y escritorio.

## Estructura de carpetas

app/ - Rutas principales de Next.js  
components/ - Componentes React reutilizables  
context/ - Contextos para Auth, Modal y MyList  
lib/ - Funciones de integración con Contentful y Resend  
utils/ - Funciones auxiliares para manejo de usuarios  
types/ - Tipos de TypeScript  
public/ - Imágenes y recursos estáticos  

## Instalación

1. Clonar el repositorio: git clone https://github.com/tuusuario/miguelflix.git cd miguelflix  
2. Instalar dependencias: npm install  
3. Configurar variables de entorno en .env.local: NEXT_PUBLIC_CONTENTFUL_SPACE_ID=tu_space_id NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=tu_access_token RESEND_API_KEY=tu_resend_api_key CONTACT_RECEIVER_EMAIL=miguelrojasy3@gmail.com  
4. Ejecutar en desarrollo: npm run dev  
5. Construir para producción: npm run build && npm start  

## Uso

Al abrir la aplicación, se puede explorar el catálogo o registrarse/iniciar sesión. Los usuarios registrados pueden agregar contenido a su lista personal. El buscador permite filtrar contenido por título. El formulario de contacto envía correos a la dirección configurada.

## Contextos principales

AuthContext: Maneja la sesión de usuario (login, logout, user)  
ModalContext: Controla la apertura de modales de registro e inicio de sesión  
MyListContext: Gestiona la lista personal de favoritos con persistencia en LocalStorage  

## Integración con Contentful

Se utiliza el cliente de Contentful para obtener el catálogo de contenido. Los assets y relaciones se mapean para generar objetos CatalogItem.

## Envío de emails

Validación de formulario con Zod (contactSchema). Uso de Resend para enviar mensajes de contacto.

## Manejo de usuarios

Usuarios registrados se guardan en LocalStorage. Validación de duplicados y autenticación manual.

## Licencia

Este proyecto es de uso personal y educativo.