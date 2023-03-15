-- CreateEnum
CREATE TYPE "ETHExperience" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');

-- CreateEnum
CREATE TYPE "hackerMotivation" AS ENUM ('ATTENDWORKSHOPS', 'RESUMEBUILD', 'GETBETTER', 'MEETCOMPANIES', 'MEETPEOPLE', 'LAUNCHPRODUCT', 'WINPRIZE', 'OTHER');

-- CreateEnum
CREATE TYPE "applicationStatus" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "Hacker" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "website" TEXT,
    "github" TEXT,
    "linkedIn" TEXT,
    "yearsOfSoftwareExperience" INTEGER NOT NULL DEFAULT 0,
    "ethExperienceLevel" "ETHExperience" NOT NULL DEFAULT 'BEGINNER',
    "motivation" "hackerMotivation" NOT NULL,
    "priorBuilds" VARCHAR(500) NOT NULL,
    "lookingToBuild" VARCHAR(500) NOT NULL,
    "rulesAccepted" BOOLEAN NOT NULL,
    "applicationStatus" "applicationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Hacker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "website" TEXT,
    "organization" TEXT NOT NULL,
    "linkedIn" TEXT,
    "telegram" TEXT,
    "twitter" TEXT,
    "otherEvents" VARCHAR(500) NOT NULL,
    "motivation" VARCHAR(500) NOT NULL,
    "rulesAccepted" BOOLEAN NOT NULL,
    "applicationStatus" "applicationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "website" TEXT,
    "github" TEXT,
    "linkedIn" TEXT,
    "telegram" TEXT,
    "twitter" TEXT,
    "yearsOfSoftwareExperience" INTEGER NOT NULL DEFAULT 0,
    "ethExperienceLevel" "ETHExperience" NOT NULL DEFAULT 'BEGINNER',
    "priorMentor" VARCHAR(500),
    "motivation" VARCHAR(500) NOT NULL,
    "rulesAccepted" BOOLEAN NOT NULL,
    "applicationStatus" "applicationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hacker_email_key" ON "Hacker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_email_key" ON "Partner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_email_key" ON "Mentor"("email");
