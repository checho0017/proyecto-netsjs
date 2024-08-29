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

# Definición de Recurso y Operaciones de API
Los recursos y las operaciones de API se conocen como los sustantivos y los verbos de las API respectivamente.  Los recursos representan un concepto de negocio.  Ej. Empleados, Libros, etc. y las operaciones de API describen las funcionalidades expuestas por el sistema. Estas se corresponden a los casos de uso definidos en el documento _system-use-cases_.

Las operaciones se exponen a través de endpoints que no necesariamente implementan un único caso de uso, es decir, habrán operaciones de API que permitan la ejecución de varios casos de uso.


## Recursos
En este apartado se listan los recursos del sistema.

- Notes
- NoteLists
- Users
- BugReports
- Canvas

## Rutas de operaciones
En la siguiente tabla se especifican detalles de cada una de las operaciones para los diferentes recursos:

| Recurso | Id de caso de uso | Id de operación | Http Method | Ruta |
|-|-|-|-|-|
| Notes         | CreateNote                  | PostNotes                   | POST     | /notes                                 |
| Notes         | GetNotes                    | GetNotes                    | GET      | /notes                                 |
| Notes         | GetNote                     | GetNotes                    | GET      | /notes/:id                             |
| Notes         | UpdateNote                  | PatchNotes                  | PATCH    | /note/:id                              |
| Notes         | DeleteNote                  | DeleteNotes                 | DELETE   | /notes/:id                             |
| Notes         | DeleteCheckedNotes          | DeleteCheckedNotes          | DELETE   | /notes/checked                         |
| Notes         | ChangeStateNote             | PostStateNote               | POST     | /notes/:id/states                      |
| Notes         | GetIsolatedNotes            | GetIsolatedNotes            | GET      | /notes/isolated                        |
| NoteLists     | CreateNoteList              | PostNoteLists               | POST     | /note-lists                            |
| NoteLists     | GetNoteLists                | GetNoteLists                | GET      | /note-lists                            |
| NoteLists     | GetNoteList                 | GetNoteList                 | GET      | /note-lists/:id                        |
| NoteLists     | DeleteNoteList              | DeleteNoteList              | DELETE   | /note-lists/:id                        |
| NoteLists     | DeleteCheckedNoteLists      | DeleteCheckedNoteLists      | DELETE   | /note-lists/checked                    |
| NoteLists     | UpdateNoteList              | PatchNoteList               | PATCH    | /note-lists/:id                        |
| NoteLists     | RemoveNoteFromList          | DeleteNoteFromList          | DELETE   | /note-lists/:listId/notes/:noteId      |
| NoteLists     | AddNoteToList               | PostNoteToList              | POST     | /note-lists/:id/notes                  |
| NoteLists     | getListsWithNotes           | GetListsWithNotes           | POST     | /note-lists/has-notes                  |
| Users         | GetUserData                 | GetUsers                    | GET      | /users/current-user                    |
| BugReports    | AddBugReport                | PostBugReports              | POST     | /bug-reports                           | 
| BugReports    | GetBugReportInstructions    | GetBugReports               | GET      | /bug-reports/submission-instructions   |
| Canvas        | DeleteCompleteNotesAndLists | DeleteCompleteNotesAndLists | DELETE   | /canvas/main/completed-items-deletions |
| Canvas        | DeleteNotesAndListes        | DeleteCompleteNotesAndLists | DELETE   | /canvas/main/completed-items-deletions |
| Canvas        | InitializeCanvasWithList    | DeleteCompleteNotesAndLists | DELETE   | /canvas/main/completed-items-deletions |

