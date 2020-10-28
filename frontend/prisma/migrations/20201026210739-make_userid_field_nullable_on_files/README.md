# Migration `20201026210739-make_userid_field_nullable_on_files`

This migration has been generated at 10/26/2020, 9:07:39 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."chats" ALTER COLUMN "userId" DROP NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201026210305-name_files_table..20201026210739-make_userid_field_nullable_on_files
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
@@ -82,10 +82,10 @@
 model Chat {
   id        Int       @id @default(autoincrement())
   name      String
   messages  Message[]
-  owner     User      @relation(fields: [userId], references: [id])
-  userId    Int
+  owner     User?     @relation(fields: [userId], references: [id])
+  userId    Int?
   createdAt DateTime  @default(now()) @map(name: "created_at")
   updatedAt DateTime  @default(now()) @map(name: "updated_at")
```


