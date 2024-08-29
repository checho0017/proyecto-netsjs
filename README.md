# Plantilla para Backend For Frontend Clean - (nes-bff-clean-v2.1.3)
Esta plantilla permite la implementación de contenedores C4 de tipo Backend For Frontend (BFF). Un BFF es un contenedor backend que cumple la función de un Gateway de APIs. No obstante el objetivo principal del patrón BFF es utilizar este contenedor como proveedor dedicado de datos a cada una de las diferentes interfaces UI empresariales de un mismo contexto.

## Descripción técnica de la plantilla

| Metadato                 | Valor |
|--------------------------|-------|
| Identificador            | nes-bff-clean |
| Tipo de contenedor C4    | Backend For Frontend |
| Versión de plantilla     | 2.1.3 |
| Tecnología               | NodeJS |
| Framework                | NestJS |
| Versión del framework    | 10.3.7|
| Lenguaje                 | TypeScript |
| Versión del lenguaje     | 5.4.3 |
| Diseñadores de plantilla | Wilmer Fabian Ponce Guerrero |
| Desarrolladores          | Wilmer Fabian Ponce Guerrero |
| Fecha de creación        | 2023-03-14T012:45:00-05:00 |
| Responsable actual       | Claudia Alexandra Bojacá Torres - Jhan Castro |
| Correo del responsable   | clbojaca@sistecredito.com - jhcastro.ceibaext@sistecredito.com |

## Documentación
Para acceder a la documentación completa de la plantilla Backend For Frontend, visite https://docs.sistecredito.com/ingenieria-de-software/plantillas-de-desarrollo-de-software/lineamiento-nes-bff-clean.html (esta documentación corresponde al último release de la plantilla)

## Instalación
Las instrucciones para la ejecución de la plantilla se encuentran en la sección [Ejecución de la plantilla con el código de ejemplo](https://docs.sistecredito.com/ingenieria-de-software/plantillas-de-desarrollo-de-software/lineamiento-nes-bff-clean.html) de la documentación.

```
# En terminal, ejecutar:
  cd /ruta/absoluta/a/la/raíz/del/proyecto # Ubicarse en ruta raíz del proyecto en local
  cd /dev                                  # Ubicarse en la ruta del script simulador
  node /bms-notes-simulator.js             # Ejecutar script simulador
  # En terminal diferente, ejecutar:
  cd ../
  npm run start:dev                        # Ejecutar de la plantilla con código de ejemplo
```

## Eliminar el código de ejemplo
Las instrucciones para eliminar el código de ejemplo de la plantilla se encuentran en la sección [Eliminación del código de ejemplo][https://docs.sistecredito.com/ingenieria-de-software/plantillas-de-desarrollo-de-software/lineamiento-nes-bff-clean.html] de la documentación.

Eliminación del código de ejemplo
Para empezar a codificar sobre la plantilla se requiere eliminar el código de ejemplo distribuido en las diferentes capas:

En api, eliminar:

📂src/1-api/controllers/**
Referencia de controladores en api.module.ts.
En infrastructure, eliminar:

📂src/2-infrastructure/services/**
Referencia de módulos relacionados a servicios en infrastructure.module.ts.
En application, eliminar:

📂src/3-application/abstractions/infrastructure/**
📂src/3-application/abstractions/use-cases/**
📂src/3-application/dtos/**
📂src/3-application/enumerations/**
📂src/3-application/services/**

En caso de NO REQUERIR configuración de KeyVault, se DEBE eliminar las siguientes líneas de código en en el archivo src/main.ts:

```
// Código a remover 
await KeyVaultProvider.getSecrets().catch(err => new CustomLoggerService().error(InitializationError.name, err.message, err.stack, null));
 ```

El contenido del directorio 📂src/libs/config/**, no debería ser modificado salvo en los archivos mencionados en el proceso de configuración. Se puede modificar el contenido del resto de archivos de la plantilla, pero el detalle de estos se evalúa en secciones posteriores de esta documentación.

## Soporte
En caso de requerir asistencia en el uso de la plantilla, reportar fallos o inconsistencias, dar sugerencias, aportes para la construcción y evolución de la plantilla, comunicarse con el equipo de Ingeniería de Software.
