/*
 *
 * Copyright 2023 SisteCrédito.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// DataBase
var DB = {
  data: {
    notes: [
      {Id: 'c96f8bab-08e5-42f2-848c-379ae0793a5e', Title: 'Nota 1', State: 0, NoteListId: 'lista1111', Creator: 'FPonce', CreationDate: '1680400087', Updater: 'FPonce', LastUpdateDate: '1680400087'},
      {Id: 'asdf1234-08e5-42f2-848c-379ae0793a5e', Title: 'Nota 2', State: 1, NoteListId: '', Creator: 'FPonce', CreationDate: '1680400087', Updater: 'FPonce', LastUpdateDate: '1680400087'},
    ],
    lists: [
      {Id: 'lista1111', Name: 'List A', State: 0, Creator: 'FPonce', CreationDate: '1680400087', Updater: 'FPonce', LastUpdateDate: '1680400087'},
      {Id: 'lista2222', Name: 'List B', State: 0, Creator: 'FPonce', CreationDate: '1680400087', Updater: 'FPonce', LastUpdateDate: '1680400087'},
    ],
    users: [
      {id: '1111', roles: ['Administrator']},
      {id: '2222', roles: ['Operator']},
    ],
    bugs: [
      {id: 'c96f8bab-08e5-42f2-848c-379ae0793a5f', summary: 'Resumen de bug', description: 'Descripción de bug', recreation: '1. Paso 1\n2. Paso 2', creator: 'FPonce', creationDate: '2023-04-07T02:48:39-05:00', updater: 'FPonce', lastUpdateDate: '2023-04-07T02:48:39-05:00'},
    ],
    bugReportInstructions: [
      {id: '1111', order: 1, title: 'Resumen', description: 'Escribir una frase que resuma el contexto del bug.'},
      {id: '2222', order: 2, title: 'Detalles', description: 'Escribir un párrafo que detalle paso a paso la descripción de cómo experimentó el bug.'},
      {id: '3333', order: 3, title: 'Recreación', description: 'Si encontró un patrón de generación del bug, por favor redacte un paso a paso un ejemplo de cómo recrear el bug.'},
    ],
  },
  actions: {
    // BmsNotes
    addNote: (baseData) => { const id = createId(); DB.data.notes.push(createNote(id, baseData));return DB.actions.getNote(id); },
    getNotes: () => DB.data.notes,
    getSimplifiedNotes: () => DB.data.notes.map(note => { return {Id: note.Id, Title: note.Title, State: note.State, ListId: note.ListId} }),
    getNote: (id) => DB.data.notes.filter(note => note.Id == id)[0],
    deleteNote: (id) => DB.data.notes = DB.data.notes.filter(note => note.Id != id),
    deleteCheckedNotes: () => DB.data.notes = DB.data.notes.filter(note => note.State == 0), // FIX: FOR_WHAT?
    updateNote: (data) => { DB.data.notes = DB.data.notes.map(note => { if(note.Id == data.Id) {note.State = data.State; note.Title = data.Title;} return note; }); return DB.actions.getNote(data.Id); },
    changeNoteState: (data) => { DB.data.notes = DB.data.notes.map(note => { if(note.Id == data.Id) {note.State = data.State} return note; }); return DB.actions.getNote(data.Id); },
    addNoteList: (baseData) => { const id = createId(); DB.data.lists.push(createNoteList(id, baseData)); return DB.actions.getNoteList(id); },
    getNoteLists: () => DB.data.lists,
    getSimplifiedNoteLists: () => DB.data.lists.map(list => { return {Id: list.Id, Name: list.Name, State: list.State} }),
    getNoteList: (id) => DB.data.lists.filter(list => list.Id == id)[0],
    deleteNoteList: (id) => DB.data.lists = DB.data.lists.filter(list => list.Id != id),
    updateNoteList: (data) => { DB.data.lists = DB.data.lists.map(list => { if(list.Id == data.Id) {list.State = list.State; list.Name = data.Name;} return list; }); return DB.actions.getNoteList(data.Id); },
    addNoteToList: (data) => DB.data.notes = DB.data.notes.map(note => { if(note.Id == data.IdNote) {note.ListId = data.IdList} return note; }),
    removeNoteFromList: (data) => DB.data.notes = DB.data.notes.map(note => { if(note.Id == data.IdNote) {note.ListId = ''} return note; }),
    deleteCompletedNotesAndLists: () => { DB.data.notes = DB.data.notes.filter(note => note.State != 1); DB.data.lists = DB.data.lists.filter(list => list.State != 1); },
    deleteAllNotesAndLists: () => { DB.data.notes = []; DB.data.lists = []; },
    deleteAllNoteAndListsThenCreateLists: () => { DB.data.notes = []; DB.data.lists = []; DB.data.lists.push(createNoteList(createId(), {Name: 'Nueva lista'})) },
    // BmsBugReports
    addBugReport: (baseData) => { const id = createId(); const newBug = createBug(id, baseData); DB.data.notes.push(newBug); return newBug; },
    getBugReportInstructions: () => DB.data.bugReportInstructions,
  }
};

mainBmsNotes();
mainBmsBugReports();

function mainBmsNotes() {
  const grpc = require('@grpc/grpc-js');
  const protoLoader = require('@grpc/proto-loader');
  const path = require('path');
  const defaultPackageDefinitionOptions = {keepCase: true, longs: String, enums: String, defaults: true, oneofs: true};
  // const hwProtoPath = path.join(__dirname, '/..', '/src/2-infrastructure/services/sc-bms-notes/protos/hello-world.proto');
  const notesProtoPath = path.join(__dirname, '/..', '/src/2-infrastructure/services/sc-bms-notes/protos/notes.proto');
  const noteListsProtoPath = path.join(__dirname, '/..', '/src/2-infrastructure/services/sc-bms-notes/protos/note-lists.proto');
  const settingsProtoPath = path.join(__dirname, '/..', '/src/2-infrastructure/services/sc-bms-notes/protos/settings.proto');
  // const hwPackageDefinition = protoLoader.loadSync(hwProtoPath, defaultPackageDefinitionOptions);
  const notesProtoPackageDefinition = protoLoader.loadSync(notesProtoPath, defaultPackageDefinitionOptions);
  const noteListsProtoPackageDefinition = protoLoader.loadSync(noteListsProtoPath, defaultPackageDefinitionOptions);
  const settingsProtoPackageDefinition = protoLoader.loadSync(settingsProtoPath, defaultPackageDefinitionOptions);
  // const hwProtoPackage = grpc.loadPackageDefinition(hwPackageDefinition).HelloWorldMicroservice;
  const notesProtoPackage = grpc.loadPackageDefinition(notesProtoPackageDefinition).NotesMicroservice;
  const noteListsProtoPackage = grpc.loadPackageDefinition(noteListsProtoPackageDefinition).NotesMicroservice;
  const settingsProtoPackage = grpc.loadPackageDefinition(settingsProtoPackageDefinition).NotesMicroservice;
  const server = new grpc.Server();
  const port = 5000;

  // server.addService(
  //   hwProtoPackage.HelloWorldService.service,
  //   {
  //     Greeting:      (callData, callBackFn) => { console.info("BMS: HelloWorld, SERVICE: HelloWorldService, METHOD: Greeting");          return callBackFn(null, {Message: 'HELLO WOLRD!'}) },
  //   }
  // );
  server.addService(
    notesProtoPackage.NotesService.service,
    {
      Save:          (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NotesService, METHOD: Save"); return callBackFn(null, DB.actions.addNote(callData.request)) },
      GetAll:        (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NotesService, METHOD: GetAll");        return callBackFn(null, {SimplifiedNotes: DB.actions.getSimplifiedNotes()}) },
      GetOne:        (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NotesService, METHOD: GetOne");        return callBackFn(null, DB.actions.getNote(callData.request.Id)) },
      Delete:        (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NotesService, METHOD: Delete");        DB.actions.deleteNote(callData.request.Id); return callBackFn(null, null) },
      DeleteChecked: (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NotesService, METHOD: DeleteChecked"); DB.actions.deleteCheckedNotes(); return callBackFn(null, null) }, // FIX: VALIDATE USAGE
      ChangeState:   (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NotesService, METHOD: ChangeState");   return callBackFn(null, DB.actions.changeNoteState(callData.request)) },
      Update:        (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NotesService, METHOD: Update");        return callBackFn(null, DB.actions.updateNote(callData.request)) },
    }
  );
  server.addService(
    noteListsProtoPackage.NoteListsService.service,
    {
      Save:          (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NoteListsService, METHOD: Save");          return callBackFn(null, DB.actions.addNoteList(callData.request)) },
      GetAll:        (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NoteListsService, METHOD: GetAll");        return callBackFn(null, {SimplifiedNoteLists: DB.actions.getSimplifiedNoteLists()}) },
      GetOne:        (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NoteListsService, METHOD: GetOne");        return callBackFn(null, DB.actions.getNoteList(callData.request.Id)) },
      Delete:        (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NoteListsService, METHOD: Delete");        DB.actions.deleteNoteList(callData.request.Id); return callBackFn(null, null) },
      DeleteChecked: (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NoteListsService, METHOD: DeleteChecked"); }, // Not used
      Update:        (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NoteListsService, METHOD: Update");        return callBackFn(null, DB.actions.updateNoteList(callData.request)) },
      AddNote:       (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NoteListsService, METHOD: AddNote");       DB.actions.addNoteToList(callData.request); return callBackFn(null, null) },
      RemoveNote:    (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NoteListsService, METHOD: RemoveNote");    DB.actions.removeNoteFromList(callData.request); return callBackFn(null, null) },
      Check:         (callData, callBackFn) => { console.info("BMS: Notes, SERVICE: NoteListsService, METHOD: Check");       ; }, // Not used
    }
  );
  server.addService(
    settingsProtoPackage.SettingsService.service,
    {
      DeleteCompletedItems: (callData, callBackFn) => { console.info("SERVICE SettingsService, METHOD: DeleteCompletedItems"); DB.actions.deleteCompletedNotesAndLists(); return callBackFn(null, null) },
      DeleteAllItems:       (callData, callBackFn) => { console.info("SERVICE SettingsService, METHOD: DeleteAllItems");       DB.actions.deleteAllNotesAndLists(); return callBackFn(null, null) },
      PostCanvas:           (callData, callBackFn) => { console.info("SERVICE SettingsService, METHOD: PostCanvas");           DB.actions.deleteAllNoteAndListsThenCreateLists(); return callBackFn(null, null) },
    }
  );
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.info(`GRPC Server listening on port ${port}...`);
  });
}
function mainBmsBugReports() {
  const express = require('express');
  const app = express();
  const port = 6000;
  
  app.use(express.json())
  app.post('/bug-reports', (req, res) => { res.json(DB.actions.addBugReport(req.body)); });
  app.get('/bug-report-submission-instructions', (req, res) => { res.json(DB.actions.getBugReportInstructions()); });
  app.listen(port, () => console.info(`REST Server listening on port ${port}...`));
}
function createId() {
  const crypto = require('crypto');
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) );
}
function createNote(Id, baseData) {
  const Title = baseData.Title;
  const NoteListId = '';
  const State = 0;
  const Creator = 'FPonce';
  const CreationDate = '1680400087';
  const Updater = 'FPonce';
  const LastUpdateDate = '1680400087';
  return {Id, Title, State, NoteListId, Creator, CreationDate, Updater, LastUpdateDate};
}
function createNoteList(Id, baseData) {
  const Name = baseData.Name;
  const State = 0;
  const Creator = 'FPonce';
  const CreationDate = '1680400087';
  const Updater = 'FPonce';
  const LastUpdateDate = '1680400087';
  return {Id, Name, State, Creator, CreationDate, Updater, LastUpdateDate};
}
function createBug(id, baseData) {
  const summary = baseData.summary;
  const description = baseData.description;
  const recreation = baseData.recreation;
  const creator = 'FPonce';
  const creationDate = '1680400087';
  const updater = 'FPonce';
  const lastUpdateDate = '1680400087';
  return {id, summary, description, recreation, creator, creationDate, updater, lastUpdateDate};
}