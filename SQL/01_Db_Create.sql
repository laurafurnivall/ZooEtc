USE [master]

IF db_id('ZooEtc') IS NULL
	CREATE DATABASE [ZooEtc]
GO

USE [ZooEtc]
GO

DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [Zoos];
DROP TABLE IF EXISTS [Uniforms];
DROP TABLE IF EXISTS [UniformTypes];
DROP TABLE IF EXISTS [Types];
DROP TABLE IF EXISTS [UniformReviews];
DROP TABLE IF EXISTS [JobListings];
DROP TABLE IF EXISTS [ZooReviews];
GO

CREATE TABLE [Users] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [UserName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [isAdmin] bit NOT NULL
)
GO

CREATE TABLE [Zoos] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [ZooName] nvarchar(255) NOT NULL,
  [Address] nvarchar(255) NOT NULL,
  [PhoneNumber] nvarchar(255) NOT NULL,
  [ZooImgUrl] nvarchar(255) NOT NULL,
  [ZooUrl] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ZooReviews] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [ZooId] int NOT NULL,
  [ReviewDate] nvarchar(255) NOT NULL,
  [AnimalCare] int,
  [Culture] int,
  [ConservationInitiative] int,
  [Salary] int,
  [Benefits] int,
  [Leadership] int,
  [Inclusivity] int,
  [Comments] nvarchar(255),
  [isApproved] bit
)
GO

CREATE TABLE [Uniforms] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [PurchaseUrl] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UniformTypes] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [TypeId] int NOT NULL,
  [UniformId] int NOT NULL
)
GO

CREATE TABLE [Types] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Type] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UniformReviews] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [UniformId] int NOT NULL,
  [ReviewDate] nvarchar(255) NOT NULL,
  [Longetivity] int,
  [Versatility] int,
  [Comfort] int,
  [Comments] nvarchar(255),
  [isApproved] bit
)
GO

CREATE TABLE [JobListings] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [ZooId] int NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [PostingDate] Date NOT NULL,
  [RemovalDate] Date NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [Salary] nvarchar(255) NOT NULL,
  [JobUrl] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [ZooReviews] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [ZooReviews] ADD FOREIGN KEY ([ZooId]) REFERENCES [Zoos] ([Id])
GO

ALTER TABLE [UniformTypes] ADD FOREIGN KEY ([TypeId]) REFERENCES [Types] ([Id])
GO

ALTER TABLE [UniformTypes] ADD FOREIGN KEY ([UniformId]) REFERENCES [Uniforms] ([Id])
GO

ALTER TABLE [UniformReviews] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [UniformReviews] ADD FOREIGN KEY ([UniformId]) REFERENCES [Uniforms] ([Id])
GO

ALTER TABLE [JobListings] ADD FOREIGN KEY ([ZooId]) REFERENCES [Zoos] ([Id])
GO


