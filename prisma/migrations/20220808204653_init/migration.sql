-- CreateTable
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "long_link" TEXT NOT NULL,
    "short_link" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_long_link_key" ON "Link"("long_link");

-- CreateIndex
CREATE UNIQUE INDEX "Link_short_link_key" ON "Link"("short_link");
