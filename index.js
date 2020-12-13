import Users from './entities/Users.js';
import Subjects from './entities/Subjects.js';
import Notes from './entities/Notes.js';
import Attachments from './entities/Attachments.js';
import Tags from './entities/Tags.js';
import TagNote from './entities/TagNote.js';



import express from 'express';
import bodyParser from 'body-parser';
import db from './dbConfig.js';

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  let port = process.env.PORT || 8000;
  app.listen(port);
  console.log('API is runnning at ' + port);

  //users-notes, relatie 1 - M
Users.hasMany(Notes, {as: "Notes", foreignKey: "UserId"});
Notes.belongsTo(Users, {foreignKey: "UserId"}); 

//subjects- notes, relatie 1- M
Subjects.hasMany(Notes, {as: "Notes", foreignKey: "SubjectId"});
Notes.belongsTo(Subjects, {as:"Subjects", foreignKey: "SubjectId"}); 

//notes- attachments, relatie 1 - M
Notes.hasMany(Attachments, {as: "Attachments", foreignKey: "NoteId"});
Attachments.belongsTo(Notes, {foreignKey: "NoteId"}); 

//notes-tags, relatie M - M
Tags.belongsToMany(Notes, {through: "TagNote", as: "Notes", foreignKey: "TagId"});
Notes.belongsToMany(Tags, {through: "TagNote", as: "Tags", foreignKey: "NoteId"});


  //users

async function createUser(user){
    return await Users.create(user)
  }
  
  async function getUser(){
    return await Users.findAll()
  }

  router.route('/user').post( async (req, res) => {
    res.json(await createUser(req.body));
  })
  
  router.route('/user').get( async (req, res) => {
    res.json(await getUser());
  })

  //subjects
  
async function createSubject(subject){
    return await Subjects.create(subject)
  }
  
  async function getSubject(){
    return await Subjects.findAll()
  }

  router.route('/subject').post( async (req, res) => {
    res.json(await createSubject(req.body));
  })
  
  router.route('/subject').get( async (req, res) => {
    res.json(await getSubject());
  })

    //notes
  
async function createNote(note){
    return await Notes.create(note)
  }
  
  async function getNote(){
    return await Notes.findAll()
  }

  router.route('/note').post( async (req, res) => {
    res.json(await createNote(req.body));
  })
  
  router.route('/note').get( async (req, res) => {
    res.json(await getNote());
  })

   //attachments

async function createAttachment(attachment){
  return await Attachments.create(attachment)
}

async function getAttachment(){
  return await Attachments.findAll()
}

router.route('/attachment').post( async (req, res) => {
  res.json(await createAttachment(req.body));
})

router.route('/attachment').get( async (req, res) => {
  res.json(await getAttachment());
})

//get notes and attachments from the subject selected

async function getNotesAttachFromSubject(id){
  return await Notes.findAll({
    where:{
      SubjectId: parseInt(id)
    },
    include:[
      {
        model: Attachments, as: "Attachments"
      }
    ]
  })
}

router.route('/subject/:id').get( async (req, res) => {
  res.json(await getNotesAttachFromSubject(req.params.id));
})

//get all notes and attachments from a certain user

async function getNotesAttachFromUser(id){
  return await Notes.findAll({
    where:{
      UserId: parseInt(id)
    },
    include:[
      {
        model: Attachments, as: "Attachments"
      }
    ]
  })
}

router.route('/user/:id').get( async (req, res) => {
  res.json(await getNotesAttachFromUser(req.params.id));
})

//add tag for note
