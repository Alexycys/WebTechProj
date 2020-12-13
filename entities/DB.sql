IF(DB_ID('NotesDB') IS not NULL)
drop database NotesDB

IF(DB_ID('NotesDB') IS NULL)
	CREATE DATABASE NotesDB
GO
use NotesDB

IF OBJECT_ID('Users') IS NOT NULL
	drop table Users
GO

IF OBJECT_ID('Subjects') IS NOT NULL
	drop table Subjects
GO

IF OBJECT_ID('Attachments') IS NOT NULL
	drop table Attachments
GO

IF OBJECT_ID('Notes') IS NOT NULL
	drop table Notes
GO

IF OBJECT_ID('Tags') IS NOT NULL
	drop table Tags
GO

IF OBJECT_ID('TagNote') IS NOT NULL
	drop table TagNote
GO

IF OBJECT_ID('Users') IS NULL
	CREATE TABLE Users
	(
	UserId INT NOT NULL IDENTITY(1, 1),
	UserName NVARCHAR(100) NOT NULL,
	UserSurname NVARCHAR(100) NOT NULL,
	UserNickname NVARCHAR(100) NOT NULL,
	UserPassword NVARCHAR(25) NOT NULL,
	CONSTRAINT PK_Users PRIMARY KEY (UserId)
	)

	GO

	IF OBJECT_ID('Notes') IS NULL
	CREATE TABLE Notes
	(
	NoteId INT NOT NULL IDENTITY(1, 1),
	NoteText NVARCHAR(MAX) NOT NULL,
    UserId INT NOT NULL,
	NoteDate DATE DEFAULT GETDATE() NOT NULL,
	SubjectId INT,
	CONSTRAINT PK_Notes PRIMARY KEY (NoteId)
	)

	GO

	IF OBJECT_ID('Subjects') IS NULL
	CREATE TABLE Subjects
	(
	SubjectId INT NOT NULL IDENTITY(1, 1),
	SubjectName NVARCHAR(100) NOT NULL,
	SubjectClass INT,
	SubjectProfessor NVARCHAR(100),
	CONSTRAINT PK_Subjects PRIMARY KEY (SubjectId)
	)

	GO

	IF OBJECT_ID('Attachments') IS NULL
	CREATE TABLE Attachments
	(
	AttachmentId INT NOT NULL IDENTITY(1, 1),
	NoteId INT NOT NULL,
	AttachmentReff NVARCHAR(MAX) NOT NULL,
	CONSTRAINT PK_Attachments PRIMARY KEY (AttachmentId)
	)

	GO

	
	IF OBJECT_ID('Tags') IS NULL
	CREATE TABLE Tags
	(
	TagId INT NOT NULL IDENTITY(1, 1),
	TagContent NVARCHAR(100) NOT NULL,
	CONSTRAINT PK_Tags PRIMARY KEY (TagId)
	)

	GO

	IF OBJECT_ID('TagNote') IS NULL
	CREATE TABLE TagNote
	(
	TagId INT NOT NULL,
	NoteId INT NOT NULL,
	CONSTRAINT PK_TagNote PRIMARY KEY (TagId, NoteId)
	)


IF OBJECT_ID('FK_Users_Notes') IS NULL
	ALTER TABLE Notes ADD CONSTRAINT FK_Users_Notes FOREIGN KEY (UserId) REFERENCES Users(UserId)
GO

IF OBJECT_ID('FK_Subjects_Notes') IS NULL
	ALTER TABLE Notes ADD CONSTRAINT FK_Subjects_Notes FOREIGN KEY (SubjectId) REFERENCES Subjects(SubjectId)
GO

IF OBJECT_ID('FK_Notes_Attachments') IS NULL
	ALTER TABLE Attachments ADD CONSTRAINT FK_Notes_Attachments FOREIGN KEY (NoteId) REFERENCES Notes(NoteId)
GO

IF OBJECT_ID('FK_Notes_Attachments') IS NULL
	ALTER TABLE Attachments ADD CONSTRAINT FK_Notes_Attachments FOREIGN KEY (NoteId) REFERENCES Notes(NoteId)
GO


IF OBJECT_ID('FK_TagNote_Tags') IS NULL
	ALTER TABLE TagNote ADD CONSTRAINT FK_TagNote_Tags FOREIGN KEY (TagId) REFERENCES Tags(TagId)
GO

IF OBJECT_ID('FK_TagNote_Notes') IS NULL
	ALTER TABLE TagNote ADD CONSTRAINT FK_TagNote_Notes FOREIGN KEY (NoteId) REFERENCES Notes(NoteId)
