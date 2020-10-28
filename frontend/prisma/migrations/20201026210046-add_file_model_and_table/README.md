# Migration `20201026210046-add_file_model_and_table`

This migration has been generated at 10/26/2020, 9:00:46 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."File" (
"id" SERIAL,
"name" text   NOT NULL ,
"userId" integer   NOT NULL ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "File.name_unique" ON "public"."File"("name")

ALTER TABLE "public"."File" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201019041156-add_chats_table..20201026210046-add_file_model_and_table
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Account {
   id                 Int       @id @default(autoincrement())
@@ -47,11 +47,12 @@
   image         String?
   messages      Message[] // A user can have many todos
   createdAt     DateTime  @default(now()) @map(name: "created_at")
   updatedAt     DateTime  @default(now()) @map(name: "updated_at")
+  Chat          Chat[]
+  files         File[]
   @@map(name: "users")
-  Chat Chat[]
 }
 model VerificationRequest {
   id         Int      @id @default(autoincrement())
@@ -68,14 +69,15 @@
   id        Int      @id @default(autoincrement())
   body      String
   owner     User     @relation(fields: [userId], references: [id])
   userId    Int
+  Chat      Chat?    @relation(fields: [chatId], references: [id])
+  chatId    Int?
   createdAt DateTime @default(now()) @map(name: "created_at")
   updatedAt DateTime @default(now()) @map(name: "updated_at")
+
   @@map(name: "messages")
-  Chat   Chat? @relation(fields: [chatId], references: [id])
-  chatId Int?
 }
 model Chat {
   id        Int       @id @default(autoincrement())
@@ -88,4 +90,13 @@
   @@map(name: "chats")
 }
+
+model File {
+  id        Int      @id @default(autoincrement())
+  name      String   @unique
+  owner     User     @relation(fields: [userId], references: [id])
+  userId    Int
+  createdAt DateTime @default(now()) @map(name: "created_at")
+  updatedAt DateTime @default(now()) @map(name: "updated_at")
+}
```


