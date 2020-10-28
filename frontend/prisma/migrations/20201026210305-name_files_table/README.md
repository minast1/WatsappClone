# Migration `20201026210305-name_files_table`

This migration has been generated at 10/26/2020, 9:03:05 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."files" (
"id" SERIAL,
"name" text   NOT NULL ,
"userId" integer   NOT NULL ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "files.name_unique" ON "public"."files"("name")

ALTER TABLE "public"."files" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201026210046-add_file_model_and_table..20201026210305-name_files_table
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
@@ -98,5 +98,7 @@
   owner     User     @relation(fields: [userId], references: [id])
   userId    Int
   createdAt DateTime @default(now()) @map(name: "created_at")
   updatedAt DateTime @default(now()) @map(name: "updated_at")
+
+  @@map(name: "files")
 }
```


