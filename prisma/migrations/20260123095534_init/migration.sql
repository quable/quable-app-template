-- CreateTable
CREATE TABLE "quable_instance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "dataLocale" TEXT NOT NULL,
    "interfaceLocale" TEXT NOT NULL DEFAULT 'en',
    "documentIds" JSONB,
    "quableInstanceId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "session_quableInstanceId_fkey" FOREIGN KEY ("quableInstanceId") REFERENCES "quable_instance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "quable_instance_name_key" ON "quable_instance"("name");

-- CreateIndex
CREATE INDEX "session_quableInstanceId_fkey" ON "session"("quableInstanceId");
