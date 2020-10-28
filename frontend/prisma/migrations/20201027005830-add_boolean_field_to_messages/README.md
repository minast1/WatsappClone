# Migration `20201027005830-add_boolean_field_to_messages`

This migration has been generated at 10/27/2020, 12:58:30 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."messages" ADD COLUMN "isFile" boolean   NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201026211156-reapply_optional_fields..20201027005830-add_boolean_field_to_messages
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
@@ -71,8 +71,9 @@
   owner     User     @relation(fields: [userId], references: [id])
   userId    Int
   Chat      Chat?    @relation(fields: [chatId], references: [id])
   chatId    Int?
+  isFile    Boolean  @default(false)
   createdAt DateTime @default(now()) @map(name: "created_at")
   updatedAt DateTime @default(now()) @map(name: "updated_at")
```


