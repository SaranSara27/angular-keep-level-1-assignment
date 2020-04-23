import { Component , OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errMessage: string;
  note: Note = new Note();
  noteList: Array<Note> = [];

  constructor(private noteService: NotesService) { }
  ngOnInit() {
    this.noteService.getNotes().subscribe(
      notes => this.noteList = notes,
      err => this.errMessage = err.message
    );
  }
  takeNotes() {
    if (this.note.title && this.note.text) {
      this.noteList.push(this.note);
      this.noteService.addNote(this.note).subscribe(
        data => { },
        err => {
          const index: number =
            this.noteList.findIndex(note => note.title === this.note.title);
          this.noteList.splice(index, 1);
          this.errMessage = err.message;
        }
      );
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
}
