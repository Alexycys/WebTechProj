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

//get user by id
  async function getUserById(id){
    return await Users.findByPk(id);
}

  router.route('/user').post( async (req, res) => {
    res.json(await createUser(req.body));
  })
  
  router.route('/user').get( async (req, res) => {
    res.json(await getUser());
  })

router.route('/user/id/:id').get(async(req,res)=> {
    res.json(await getUserById(req.params.id));
})

  //subjects
  
async function createSubject(subject){
    return await Subjects.create(subject)
  }
  
  async function getSubject(){
    return await Subjects.findAll()
  }

//get subject by id
  async function getSubjectById(id){
      return await Subjects.findByPk(id);
  }

  router.route('/subject').post( async (req, res) => {
    res.json(await createSubject(req.body));
  })
  
  router.route('/subject').get( async (req, res) => {
    res.json(await getSubject());
  })

router.route('/subject/id/:id').get(async(req,res)=> {
      res.json(await getSubjectById(req.params.id));
  })

    //notes
  
async function createNote(note){
    return await Notes.create(note)
  }
  
  async function getNote(){
    return await Notes.findAll()
  }

 //get notes by id
  async function getNoteById(id){
    return await Notes.findByPk(id);
}

  router.route('/note').post( async (req, res) => {
    res.json(await createNote(req.body));
  })
  
  router.route('/note').get( async (req, res) => {
    res.json(await getNote());
  })

 router.route('/note/id/:id').get(async(req,res)=> {
    res.json(await getNoteById(req.params.id));
})

   //attachments

async function createAttachment(attachment){
  return await Attachments.create(attachment)
}

async function getAttachment(){
  return await Attachments.findAll()
}

//get attachments by id
async function getAttachmentById(id){
    return await Attachments.findByPk(id);
}

router.route('/attachment').post( async (req, res) => {
  res.json(await createAttachment(req.body));
})

router.route('/attachment').get( async (req, res) => {
  res.json(await getAttachment());
})

router.route('/attachment/id/:id').get(async(req,res)=> {
    res.json(await getAttachmentById(req.params.id));
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

router.route('/tag/notes/:tagContent').get( async (req, res) => {
  res.json(await getNotesFromTag(req.params.tagContent));
})

//get tags

async function getTags(){
  return await Tags.findAll()
}

router.route('/tags').get( async (req, res) => {
  res.json(await getTags());
})

//get Tags by id
async function getTagById(id){
    return await Tags.findByPk(id);
}

router.route('/tag/id/:id').get(async(req,res)=> {
    res.json(await getTagById(req.params.id));
})

//get TagNote

async function getTagNote(){
  return await TagNote.findAll()
}

router.route('/tagNote').get( async (req, res) => {
  res.json(await getTagNote());
})

//get NoteTag by id
async function getNoteTagById(id){
  return await TagNote.findByPk(id);
}

router.route('/NoteTag/:id').get(async(req,res)=> {
  res.json(await getNoteTagById(req.params.id));
})

//Alex's changes
async function addTagForNoteAlex(noteId, tagName){

  let myTag=await Tags.findOne({
    where:{
      TagContent: tagName
    },
    attributes:['TagId']
  })

  //console.log(myTag);

  if(myTag){
    console.log("myTag may not be empty?");
     await TagNote.create(
       {
         TagId: myTag.TagId,
         NoteId: parseInt(noteId)
       }
     )
  }
  else{
    console.log("I got here");
     let myNewTag = await Tags.create(
       {
         TagContent: tagName
       }
     )

     await TagNote.create(
       {
         TagId: myNewTag.TagId,
         NoteId: parseInt(noteId)
       }
     )

  }

}


router.route('/notetag/:noteId/:tagContent').post( async (req, res) => {
  res.json(await addTagForNoteAlex(req.params.noteId, req.params.tagContent));
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
