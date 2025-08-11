/*
  Warnings:

  - You are about to drop the column `address` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `area` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `garage` on the `Property` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "neighborhood" TEXT,
    "street" TEXT,
    "streetNumber" TEXT,
    "zipCode" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "usableArea" INTEGER,
    "totalArea" INTEGER,
    "bedrooms" INTEGER,
    "suites" INTEGER,
    "bathrooms" INTEGER,
    "parkingSpaces" INTEGER,
    "rooms" INTEGER,
    "floor" INTEGER,
    "yearBuilt" INTEGER,
    "age" TEXT,
    "condoFee" REAL,
    "iptu" REAL,
    "privateAmenities" JSONB,
    "commonAmenities" JSONB,
    "petsAllowed" BOOLEAN,
    "furnished" BOOLEAN,
    "referenceCode" TEXT,
    "lastUpdate" DATETIME,
    "listingUrl" TEXT,
    "realtorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Property_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Property" ("age", "bathrooms", "bedrooms", "city", "createdAt", "description", "id", "price", "realtorId", "rooms", "state", "status", "title", "type", "updatedAt", "zipCode") SELECT "age", "bathrooms", "bedrooms", "city", "createdAt", "description", "id", "price", "realtorId", "rooms", "state", "status", "title", "type", "updatedAt", "zipCode" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
