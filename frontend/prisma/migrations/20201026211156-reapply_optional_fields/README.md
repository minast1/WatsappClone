# Migration `20201026211156-reapply_optional_fields`

This migration has been generated at 10/26/2020, 9:11:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."files" ALTER COLUMN "userId" DROP NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201026210739-make_userid_field_nullable_on_files..20201026211156-reapply_optional_fields
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
@@ -94,10 +94,10 @@
 model File {
   id        Int      @id @default(autoincrement())
   name      String   @unique
-  owner     User     @relation(fields: [userId], references: [id])
-  userId    Int
+  owner     User?    @relation(fields: [userId], references: [id])
+  userId    Int?
   createdAt DateTime @default(now()) @map(name: "created_at")
   updatedAt DateTime @default(now()) @map(name: "updated_at")
   @@map(name: "files")
```


