import React, { Component } from 'react';
import '../styles/App.css'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import deleteIcon from '../icons/delete.svg';
import editIcon from '../icons/edit.svg';
import Sortable from 'sortablejs';
import { CirclePicker } from 'react-color';
import background from '../images/background.png';
import circle from '../images/circle.jpeg'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      notes: [{ name: 'Name', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }],
      hover: false,
      createNote: false,
      text: '',
      name: '',
      editName: [true],
      editText: [true],
      dragObject: {},
      background: '#fcff75',
      colorPicker: false
    }
  }

  componentWillMount = () => {
    document.body.style.background = this.state.background
    // document.body.style.backgroundImage = `url(${background})`;
  }

  componentDidMount = () => {
    var list = document.getElementById("list");
    Sortable.create(list);
  }


  changeHovered = (hover) => {
    this.setState({ hover });
  };

  setNote = () => {
    this.setState({ createNote: true });
  };

  createNote = () => {
    this.state.editName.push(true);
    this.state.editText.push(true);
    this.setState({ createNote: false });
    this.state.notes.push({ name: this.state.name, text: this.state.text });
    this.setState({ name: '', text: '' });
    this.forceUpdate();
    console.log(this.state.notes);
  }

  saveNote = (index) => {
    this.state.editName[index] = true;
    this.state.editText[index] = true;
    this.state.notes[index] = { name: this.state.name, text: this.state.text };
    this.setState({ name: '', text: '' });
    this.forceUpdate();
    console.log(this.state.notes);
  }

  saveName = (index) => {
    this.state.editName[index] = true;
    this.state.notes[index]['name'] = this.state.name;
    this.setState({ name: '', text: '' });
    this.forceUpdate();
    console.log(this.state.notes);
  }

  saveText = (index) => {
    this.state.editText[index] = true;
    this.state.notes[index]['text'] = this.state.text;
    this.setState({ name: '', text: '' });
    this.forceUpdate();
    console.log(this.state.notes);
  }

  deleteNote = (index) => {
    this.state.editName.splice(index, 1);
    this.state.editText.splice(index, 1)
    this.state.notes.splice(index, 1);
    this.forceUpdate();
  }

  editName = (name, index) => {
    this.state.editName[index] = false;
    this.setState({ name: name })
  }

  editText = (text, index) => {
    this.state.editText[index] = false;
    this.setState({ text: text })
  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    document.body.style.background = this.state.background
    this.setState({colorPicker: false})
  };

  changeColor = () => {
    this.setState({colorPicker: true})
  }

  renderNote = (item, index) => {
    return (
      <Grid item xs={12} sm={4} md={4} key={index}>
        <Paper style={inlineStyles.note} elevation={2} className="card">
          <img style={inlineStyles.delete} src={deleteIcon} onClick={this.deleteNote.bind(this, index)} className="delete" />
          {this.state.editName[index] &&
            <Typography component="p" style={inlineStyles.name} variant="headline" component="h3" className="name" >
              {item.name}
              <img src={editIcon} style={inlineStyles.edite} onClick={this.editName.bind(this, item.name, index)} className="edit" />
            </Typography>}
          {!this.state.editName[index] &&
            <TextField
              value={this.state.name}
              style={inlineStyles.textField}
              onChange={this.handleChange('name')}
              placeholder="Название"
              InputProps={{
                disableUnderline: true
              }}
            />}
          {this.state.editText[index] &&
            <Typography style={inlineStyles.text} component="h4" className="text" >
              {item.text}
              <img src={editIcon} style={inlineStyles.edite} onClick={this.editText.bind(this, item.text, index)} className="edit" />
            </Typography>}
          {!this.state.editText[index] &&
            <TextField
              multiline
              placeholder='Содержание'
              value={this.state.text}
              style={inlineStyles.textField}
              onChange={this.handleChange('text')}
              InputProps={{
                disableUnderline: true
              }}
            />
          }
          {(!this.state.editText[index] && !this.state.editName[index]) &&
            <Button style={inlineStyles.button} onClick={this.saveNote.bind(this, index)}>
              Сохранить
          </Button>
          }
          {(this.state.editText[index] && !this.state.editName[index]) &&
            <Button style={inlineStyles.button} onClick={this.saveName.bind(this, index)}>
              Сохранить
          </Button>
          }
          {(!this.state.editText[index] && this.state.editName[index]) &&
            <Button style={inlineStyles.button} onClick={this.saveText.bind(this, index)}>
              Сохранить
          </Button>
          }
        </Paper>
      </Grid>
    )
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props
    const { hover, createNote, notes, colorPicker } = this.state

    return (
      <div>
        <div style={inlineStyles.container} className={classes.container}>
          <Grid container spacing={16} id="list">
            <Grid item xs={12} sm={4} md={4}>
              {!createNote && <Paper style={inlineStyles.newNote} elevation={hover ? 5 : 1}
                onMouseOver={this.changeHovered.bind(this, true)}
                onMouseOut={this.changeHovered.bind(this, false)}
                onClick={this.setNote}>
                <Typography variant="headline" component="h3">
                  Нажмите сюда для создания новой заметки
              </Typography>
              </Paper>}

              {createNote && <Paper style={inlineStyles.createNote} elevation={hover ? 5 : 1}
                onMouseOver={this.changeHovered.bind(this, true)}
                onMouseOut={this.changeHovered.bind(this, false)}>
                <TextField
                  value={this.state.name}
                  style={inlineStyles.textField}
                  onChange={this.handleChange('name')}
                  placeholder="Название"
                  component="h2"
                  InputProps={{
                    disableUnderline: true
                  }}
                />
                <TextField
                  id="multiline-flexible"
                  multiline
                  placeholder='Содержание'
                  value={this.state.text}
                  style={inlineStyles.textField}
                  onChange={this.handleChange('text')}
                  InputProps={{
                    disableUnderline: true
                  }}
                />
                <Button style={inlineStyles.button} onClick={this.createNote}>Создать</Button>
              </Paper>}

            </Grid>
            {notes.length > 0 && notes.map(this.renderNote)}
          </Grid>
        </div>
        {!colorPicker && <div className="circle" style={{backgroundImage: `url(${circle})`}} onClick={ this.changeColor }> </div> }
        {colorPicker && <CirclePicker
          className="colorPicker"
          width="150px"
          colors = {["#FF6C6C", "#FFCE6C", "#FFFF6C", "#C0EE65", "#57CC57", "#419999", "#536DAB", "#8A4DAB", "#CD5699"]}
          onChangeComplete={this.handleChangeComplete}
        /> }
      </div>
    );
  }
}

const styles = theme => (
  {
    container: {
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '16px 10%',
      flex: 1,
      '&:hover': {
        bottom: 5,
        transition: theme.transitions.create(['bottom'])
      }
    }
  })

const inlineStyles = {
  newNote: {
    width: '90%',
    padding: '15px',
    cursor: 'pointer'
  },
  colorPicker: {
    display: 'none'
  },
  delete: {
    height: '15px',
    right: '15px',
    cursor: 'pointer'
  },
  edite: {
    height: '10px',
    marginLeft: '8px',
    marginBottom: '1px',
    cursor: 'pointer'
  },
  note: {
    width: '87%',
    padding: '10px 20px 20px 20px',
    cursor: 'pointer',
    whiteSpace: 'pre-line'
  },
  createNote: {
    width: '90%',
    padding: '15px'
  },
  textField: {
    margin: '5px 5px 15px 15px',
    width: '90%',
    wpap: 'hard'
  },
  button: {
    display: 'block',
    margin: '5px auto 0 auto'
  },
  name: {
    margin: '5px 5px 15px 20px'
  },
  text: {
    margin: '5px 5px 15px 20px'
  }
}

export default withStyles(styles)(App);
