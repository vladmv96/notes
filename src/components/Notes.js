import React, { Component } from 'react';
import '../styles/Notes.css'
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
import circle from '../images/circle.jpeg';
import { connect } from 'react-redux';
import { saveNotes, saveColor } from '../actions/notes_actions';


class Notes extends Component {

  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      hover: false,
      createNote: false,
      text: '',
      name: '',
      background: '#fcff75',
      colorPicker: false
    }
  }

  componentWillMount = () => {
    document.body.style.background = this.props.color;
    this.setState({notes: this.props.notes})
  }

  componentDidMount = () => {
    let list = document.getElementById("list");
    Sortable.create(list);
  }


  changeHovered = (hover) => {
    this.setState({ hover });
  };

  setNote = () => {
    this.setState({ createNote: true });
  };

  createNote = () => {
    this.setState({ createNote: false });
    this.state.notes.push({ name: this.state.name, text: this.state.text, editName: true, editText: true});
    this.setState({ name: '', text: '' });
    this.props.saveNotes(this.state.notes);
    this.forceUpdate();
  }

  saveNote = (index) => {
    this.state.notes[index]['editName'] = true;
    this.state.notes[index]['editText'] = true;
    this.props.saveNotes(this.state.notes);
    this.forceUpdate();
  }

  saveName = (index) => {
    this.state.notes[index]['editName'] = true;
    this.props.saveNotes(this.state.notes);
    this.forceUpdate();
  }

  saveText = (index) => {
    this.state.notes[index]['editText'] = true;
    this.props.saveNotes(this.state.notes);
    this.forceUpdate();
  }

  deleteNote = (index) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заметку?')) {
    this.state.notes.splice(index, 1);
    this.props.saveNotes(this.state.notes);
    this.forceUpdate();
    } 
  }

  editName = (name, index) => {
    this.state.notes[index]['editName'] = false;
    this.forceUpdate();
  }

  editText = (text, index) => {
    this.state.notes[index]['editText'] = false;
    this.forceUpdate();
  }

  handleChangeComplete = (color) => {
    this.props.saveColor(color.hex);
    document.body.style.background = color.hex
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
          {item['editName'] &&
            <Typography component="p" style={inlineStyles.name} variant="headline" component="h3" className="name" >
              {item.name}
              <img src={editIcon} style={inlineStyles.edite} onClick={this.editName.bind(this, item.name, index)} className="edit" />
            </Typography>}
          {!item['editName'] &&
            <TextField
              value={this.state.notes[index]['name']}
              style={inlineStyles.textField}
              onChange={this.handleEdit('name', index)}
              placeholder="Название"
              InputProps={{
                disableUnderline: true
              }}
            />}
          {item['editText'] &&
            <Typography style={inlineStyles.text} component="h4" className="text" >
              {item.text}
              <img src={editIcon} style={inlineStyles.edite} onClick={this.editText.bind(this, item.text, index)} className="edit" />
            </Typography>}
          {!item['editText'] &&
            <TextField
              multiline
              placeholder='Содержание'
              value={this.state.notes[index]['text']}
              style={inlineStyles.textField}
              onChange={this.handleEdit('text', index)}
              InputProps={{
                disableUnderline: true
              }}
            />
          }
          {(!item['editText'] && !item['editName']) &&
            <Button style={inlineStyles.button} onClick={this.saveNote.bind(this, index)}>
              Сохранить
          </Button>
          }
          {(item['editText'] && !item['editName']) &&
            <Button style={inlineStyles.button} onClick={this.saveName.bind(this, index)}>
              Сохранить
          </Button>
          }
          {(!item['editText'] && item['editName']) &&
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

  handleEdit = (name, index) => event => {
    console.log(this.state.notes[index][name])
    this.state.notes[index][name] = event.target.value
    this.forceUpdate();
  }

  render() {
    const { classes } = this.props
    const { hover, createNote, colorPicker, notes } = this.state

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
                  Нажмите для создания новой заметки
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

const mapDispatchToProps = {
   saveNotes,
   saveColor
 }

 const mapStateToProps = (state) => ({
    notes: state.notes.notes,
    color: state.notes.color
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Notes));
