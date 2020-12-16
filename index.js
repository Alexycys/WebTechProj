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

router.route('/User/:id').get(async(req,res)=> {
    res.json(await getUserById(req.params.id));
})

//update User
async function updateUsers(id, newName)
{
    if(parseInt(id) !== newName.UserId){
      console.log("Entity id diff");
      return;
    }

    let updateEntity = await getUserById(id);

    if(!updateEntity){
      console.log("There isn't a user with this id");
      return;
    }

    return await updateEntity.update(newName);

}

//update user
router.route('/user/:id').put(async(req,res)=>{
  res.json(await updateUsers(req.params.id, req.body));
})


//delete from Users
async function deleteFromUser(id)
{
  let deleteEntity = await getUserById(id);

    if (!deleteEntity){
        console.log("There isn't a magazin with this id");
        return;
    }

    return await deleteEntity.destroy();
}

router.route('/user/:id').delete(async (req, res) => {
  res.json(await deleteFromUser(req.params.id));
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

router.route('/Subject/:id').get(async(req,res)=> {
      res.json(await getSubjectById(req.params.id));
  })

 //update Subject 
async function updateSubject(id, newSubject)
{
    if(parseInt(id) !== newSubject.SubjectId){
      console.log("Entity id different");
      return;
    }

    let updateEntity = await getSubjectById(id);

    if(!updateEntity){
      console.log("There isn't a user with this id");
      return;
    }

    return await updateEntity.update(newSubject);

}

//update Subject
router.route('/subject/:id').put(async(req,res)=>{
  res.json(await updateSubject(req.params.id, req.body));
})


//delete from Subject
async function deleteFromSubject(id)
{
  let deleteEntity = await getSubjectById(id);

    if (!deleteEntity){
        console.log("There isn't a subject with this id");
        return;
    }

    return await deleteEntity.destroy();
}

router.route('/subject/:id').delete(async (req, res) => {
  res.json(await deleteFromSubject(req.params.id));
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

 router.route('/Note/:id').get(async(req,res)=> {
    res.json(await getNoteById(req.params.id));
})

//update Notes text
async function updateNotes(id, newNote)
{
    if(parseInt(id) !== newText.NoteId){
      console.log("Entity id different");
      return;
    }

    let updateEntity = await getNoteById(id);

    if(!updateEntity){
      console.log("There isn't a user with this id");
      return;
    }

    return await updateEntity.update(newNote);

}


//update Notes
router.route('/notes/:id').put(async(req,res)=>{
  res.json(await updateNotes(req.params.id, req.body));
})


//delete from Notes
async function deleteFromNotes(id)
{
  let deleteEntity = await getNoteById(id);

    if (!deleteEntity){
        console.log("There isn't a note with this id");
        return;
    }

    return await deleteEntity.destroy();
}

router.route('/note/:id').delete(async (req, res) => {
  res.json(await deleteFromNotes(req.params.id));
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

router.route('/Attachment/:id').get(async(req,res)=> {
    res.json(await getAttachmentById(req.params.id));
})

//update Attachments
async function updateAttach(id, newAttach)
{
    if(parseInt(id) !== newAttach.AttachmentId){
      console.log("Entity id diff");
      return;
    }

    let updateEntity = await getAttachmentById(id);

    if(!updateEntity){
      console.log("There isn't a user with this id");
      return;
    }

    return await updateEntity.update(newAttach);

}

//update Attchemts
router.route('/attachment/:id').put(async(req,res)=>{
  res.json(await updateAttach(req.params.id, req.body));
})


//delete from Attachments
async function deleteFromAttach(id)
{
  let deleteEntity = await getAttachmentById(id);

    if (!deleteEntity){
        console.log("There isn't a attach with this id");
        return;
    }

    return await deleteEntity.destroy();
}

router.route('/attachment/:id').delete(async (req, res) => {
  res.json(await deleteFromAttach(req.params.id));
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

router.route('/Tag/:id').get(async(req,res)=> {
    res.json(await getTagById(req.params.id));
})

//update Tags
async function updateTags(id, newTag)
{
    if(parseInt(id) !== newTag.TagId){
      console.log("Entity id different");
      return;
    }

    let updateEntity = await getTagById(id);

    if(!updateEntity){
      console.log("There isn't a user with this id");
      return;
    }

    return await updateEntity.update(newTag);

}

//update Tags
router.route('/tag/:id').put(async(req,res)=>{
  res.json(await updateTags(req.params.id, req.body));
})

//delete from Tags
async function deleteFromTags(id)
{
  let deleteEntity = await getTagById(id);

    if (!deleteEntity){
        console.log("There isn't a tag with this id");
        return;
    }

    return await deleteEntity.destroy();
}

router.route('/tag/:id').delete(async (req, res) => {
  res.json(await deleteFromTags(req.params.id));
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
