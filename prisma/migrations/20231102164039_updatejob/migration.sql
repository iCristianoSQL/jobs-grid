-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "applicationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasResponse" BOOLEAN NOT NULL,
    "isClosed" BOOLEAN NOT NULL,
    "recruiterLinkedIn" TEXT NOT NULL,
    "techLeadLinkedIn" TEXT NOT NULL,
    "jobDetailsURL" TEXT NOT NULL,
    "sendedRecruiterMessage" BOOLEAN NOT NULL DEFAULT false,
    "sendedTechLeadMessage" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Job" ("applicationDate", "company", "hasResponse", "id", "isClosed", "jobDetailsURL", "recruiterLinkedIn", "techLeadLinkedIn", "title") SELECT "applicationDate", "company", "hasResponse", "id", "isClosed", "jobDetailsURL", "recruiterLinkedIn", "techLeadLinkedIn", "title" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
