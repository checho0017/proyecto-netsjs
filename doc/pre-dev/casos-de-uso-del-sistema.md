NOTA:  Este documento será facilitado por producto.

<table  width="100%"  max-width="100%" style="margin: 0; padding: 0; width: 100%"  >
    <tr>
      <td width="25%">Logo</td>
      <td width="50%" style="text-align: center">CASOS DE USO DEL SISTEMA</td>
      <td width="25%">
        <table>
          <tr>
            <td>CÓDIGO:</td>
            <td></td>          
          </tr>
          <tr>
            <td>VERSIÓN:</td>
            <td></td>
          </tr>
          <tr>
            <td>TLP:</td>
            <td></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

# Casos de uso del sistema
## Definición de [IBM](https://www.ibm.com/docs/es/elms/elm/6.0.3?topic=requirements-defining-use-cases)
Un caso de uso __de sistema__ es una secuencia de acciones que un sistema lleva a cabo que da lugar a un resultado de valor observable para un actor particular (alguien o algo fuera del sistema que interactúa con el sistema).

Un diagrama de caso de uso puede incluir varios casos de uso y las relaciones entre casos de uso y las personas, los grupos o los sistemas que interactúan para llevar a cabo el caso de uso.

# Definición de Recurso y Operaciones de API
Los recursos y las operaciones de API se conocen como los sustantivos y los verbos de las API respectivamente.  Los recursos representan un concepto de negocio.  Ej. Empleados, Libros, etc. y las operaciones de API describen las funcionalidades expuestas por el sistema. Estas se corresponden a los casos de uso definidos en el documento _system-use-cases_.

Las operaciones se exponen a través de endpoints que no necesariamente implementan un único caso de uso, es decir, habrán operaciones de API que permitan la ejecución de varios casos de uso.


---


# NotesUseCases
Estos casos de uso permiten la administración del recurso Notes.

| Caso de uso | Identificador |
|-|-|
| Crear nota | CreateNote |
| Obtener notas | GetNotes |
| Obtener nota | GetNote |
| Modificar nota | UpdateNote |
| Eliminar nota | DeleteNote |
| Eliminar notas checkeadas | DeleteCheckedNotes |
| Cambiar estado nota | ChangeStateNote |
| Obtener notas aisladas | GetIsolatedNotes |

# NoteListsUseCases

| Caso de uso | Identificador |
|-|-|
| Crear lista de notas               | CreateNoteList         |
| Obtener listas de notas            | GetNoteLists           |
| Obtener lista de notas             | GetNoteList            |
| Eliminar lista de notas            | DeleteNoteList         |
| Eliminar lista de notas checkeadas | DeleteCheckedNoteLists |
| Modificar lista de notas           | UpdateNoteList         |
| Remover nota de lista              | RemoveNoteFromList     |
| Agregar nota a lista               | AddNoteToList          |
| Obtener listas con notas           | getListsWithNotes      |

# UsersUseCases
Estos casos de uso permiten la administración del recurso Users.

| Caso de uso | Identificador |
|-|-|
| Obtener usuario actual | GetUserData |

# BugReportsUseCases
Estos casos de uso permiten la administración del recurso Bug reports.

| Caso de uso | Identificador |
|-|-|
| Crear reporte de bug | AddBugReport |
| Obtener instrucciones de envío de reportes | getBugReportInstructions |


# CanvasUseCases
Estos casos de uso permiten la administración del recurso Canvas.

| Caso de uso | Identificador |
|-|-|
| Eliminar notas y listas completadas | DeleteCompleteNotesAndLists |
| Eliminar notas y listas | DeleteNotesAndListes |
| Inicializar canvas con lista | InitializeCanvasWithList |


