import React from "react";
import Loading from "./Loading";

const UserInfo = () => (
  <div className="user-info">
    <div>
      Account: {(document.querySelector('#username') as HTMLInputElement).value}
    </div>
    <div>
      <a href="/logout">Log out</a>
    </div>
  </div>
)

interface CardProps {
  note: Note,
  setActiveNote: (activeNote: Note) => void;
}

class Card extends React.Component<CardProps, null> {
  constructor(props) {
    super(props);
    this.openNote = this.openNote.bind(this);
  }

  openNote() {
    this.props.setActiveNote(this.props.note);
  }

  render() {
    return (
      <div className="card" onClick={this.openNote}>
        <div className="card-inner">
          <div className="headline">{this.props.note.headline}</div>
          <div className="text">{this.props.note.text}</div>
        </div>
      </div>
    )
  }
}

interface Note {
  id?: number,
  headline: string,
  text: string
}
interface NoteProps {
  activeNote?: Note,
  setActiveNote: (activeNote: Note) => void,
  saveNote: () => void,
  discardNote: () => void
}
interface NoteState { }


class EditNote extends React.Component<NoteProps, NoteState> {
  constructor(props) {
    super(props);
    this.state = {};
    this.writeNote = this.writeNote.bind(this);
  }

  writeNote(e) {
    let activeNote: Note;
    if (this.props.activeNote) {
      activeNote = this.props.activeNote;
      activeNote[e.target.name] = e.target.value;
    } else {
      activeNote = { headline: '', text: '' };
    }
    this.props.setActiveNote(activeNote);
  }

  render() {
    return (
      <div className={`new-note ${this.props.activeNote ? "open" : "closed"}`}>
        <div className="new-note-header">
          <input
            type="text"
            name="headline"
            autoComplete="off"
            value={this.props.activeNote ? this.props.activeNote.headline : 'New note'}
            onChange={this.writeNote}
            onClick={this.writeNote}
          />
          <div className={`close-buttons ${this.props.activeNote ? "open" : "closed"}`}>
            <div className="icon save" onClick={this.props.saveNote}></div>
            <div className="icon delete" onClick={this.props.discardNote}></div>
          </div>
        </div>
        <div className="new-note-body">
          <textarea
            onChange={this.writeNote}
            name="text"
            value={this.props.activeNote ? this.props.activeNote.text : ''}
          >
          </textarea>
        </div>
      </div>
    )
  }
}

interface DashProps { }
interface DashState {
  activeNote?: Note,
  loading: boolean,
  notes: Note[]
}

class Dash extends React.Component<DashProps, DashState> {
  constructor(props: DashProps) {
    super(props);

    this.state = {
      activeNote: null,
      loading: true,
      notes: []
    };

    this.fetchNotes = this.fetchNotes.bind(this);
    this.setActiveNote = this.setActiveNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    this.fetchNotes()
  }

  fetchNotes() {
    fetch('/notes/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          notes: data,
          loading: false
        })
      })
      .catch((error) => alert(`Error: ${error}`));
  }

  setActiveNote(activeNote: Note) {
    this.setState({ activeNote: activeNote })
  }

  saveNote() {
    let method: string;
    let url: string = "/notes/";
    if (this.state.activeNote.id) {
      method = "PUT"
      url = `${url}${this.state.activeNote.id}/`;
    } else {
      method = "POST"
    }

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': (document.getElementById('csrf-token') as HTMLInputElement).value
      },
      body: JSON.stringify(this.state.activeNote),
    })
      .then(response => response.json())
      .then(() => {
        this.setState({ activeNote: null });
        this.fetchNotes();
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  }

  deleteNote() {
    this.setState((state) => {
      if (state.activeNote.id) {
        fetch(`/notes/${state.activeNote.id}`, {
          method: "DELETE",
          headers: {
            'X-CSRFToken': (document.getElementById('csrf-token') as HTMLInputElement).value
          }
        })
          .catch((error) => alert(`Error: ${error}`))
      }
      return {
        activeNote: null,
        notes: state.notes.filter((e) => e.id !== state.activeNote.id)
      }
    });
  }

  render() {
    let content;
    if (this.state.loading) {
      content = <Loading />
    }
    else if (!this.state.notes.length) {
      content = <div className="content-wrapper">Write something!</div>
    }
    else {
      content = this.state.notes.map((note) => (
        <Card
          key={note.id}
          note={note}
          setActiveNote={this.setActiveNote}
        />
      ))
    };

    return (
      <>
        <div className="dashboard">
          <UserInfo />
          {content}
        </div>
        <EditNote
          setActiveNote={this.setActiveNote}
          activeNote={this.state.activeNote}
          saveNote={this.saveNote}
          discardNote={this.deleteNote}
        />
      </>
    )
  }
}

export default Dash;