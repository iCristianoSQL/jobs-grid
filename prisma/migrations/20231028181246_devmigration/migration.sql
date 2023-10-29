-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "applicationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasResponse" BOOLEAN NOT NULL,
    "isClosed" BOOLEAN NOT NULL,
    "recruiterLinkedIn" TEXT NOT NULL,
    "techLeadLinkedIn" TEXT NOT NULL,
    "jobDetailsURL" TEXT NOT NULL
);
