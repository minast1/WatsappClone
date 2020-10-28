# Migration `20201019041156-add_chats_table`

This migration has been generated at 10/19/2020, 4:11:56 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."messages" ADD COLUMN "chatId" integer   

CREATE TABLE "public"."chats" (
"id" SERIAL,
"name" text   NOT NULL ,
"userId" integer   NOT NULL ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."chats" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."messages" ADD FOREIGN KEY ("chatId")REFERENCES "public"."chats"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201017200237-remvoe_chat_model..20201019041156-add_chats_table
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
@@ -49,8 +49,9 @@
   createdAt     DateTime  @default(now()) @map(name: "created_at")
   updatedAt     DateTime  @default(now()) @map(name: "updated_at")
   @@map(name: "users")
+  Chat Chat[]
 }
 model VerificationRequest {
   id         Int      @id @default(autoincrement())
@@ -71,5 +72,20 @@
   createdAt DateTime @default(now()) @map(name: "created_at")
   updatedAt DateTime @default(now()) @map(name: "updated_at")
   @@map(name: "messages")
+  Chat   Chat? @relation(fields: [chatId], references: [id])
+  chatId Int?
 }
+
+model Chat {
+  id        Int       @id @default(autoincrement())
+  name      String
+  messages  Message[]
+  owner     User      @relation(fields: [userId], references: [id])
+  userId    Int
+  createdAt DateTime  @default(now()) @map(name: "created_at")
+  updatedAt DateTime  @default(now()) @map(name: "updated_at")
+
+
+  @@map(name: "chats")
+}
```


