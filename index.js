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




//get notes for a certain tag

async function getNotesFromTag(tag){

  let myTag=await Tags.findOne({
    where:{
      TagContent: tag
    }
  })

  //array with notes id
  let notesId=await TagNote.findAll({
    where:{
      TagId: myTag.TagId
    }
  })


  let notes=[]
  for(let i=0;i<notesId.length;i++)
  {
    notes[i]=await Notes.findByPk(notesId[i].NoteId)
  }

  return notes

}

router.route('/tag/notes').get( async (req, res) => {
  res.json(await getNotesFromTag("#economie"));
})

//get tags

async function getTags(){
  return await Tags.findAll()
}

router.route('/tags').get( async (req, res) => {
  res.json(await getTags());
})

//get TagNote

async function getTagNote(){
  return await TagNote.findAll()
}

router.route('/tagNote').get( async (req, res) => {
  res.json(await getTagNote());
})

//ADD TAG FOR A NOTE

// async function addTagForNote(id, tag)
// {
 
//   //check if tag exists in Tags
//   let myTag=await Tags.findOne({
//     where:{
//       TagContent: tag
//     }
//   })
 
// let createTagNote;
// //if tag exists in Tags
// if(myTag!==null){
// //check if tag exists for my note
// let tagNote=await TagNote.findOne({
//   where:{
//     TagId: myTag.TagId,
//     NoteId: parseInt(id)
//   }
// })

// //if tagNote exists
//   if(tagNote!==null)
//   {
//     //do not create same TagNote twice
//     //+ give a message to user
//     return
//   }
//   else{
//       createTagNote=await TagNote.create({
//       TagId: myTag.TagId,
//       NoteId: parseInt(id)
//     })
//   }
// }


// else{
//   let tagCreated=await Tags.create({
//     TagContent: tag
//   })


//     createTagNote=await TagNote.create({
//     TagId: tagCreated.TagId,
//     NoteId: parseInt(id)
//   })
// }
// return createTagNote
// }


// router.route('/note/:id').post( async (req, res) => {
//   res.json(await addTagForNote(req.params.id, "#economie"));
// })
