# Migration `20201017200237-remvoe_chat_model`

This migration has been generated at 10/17/2020, 8:02:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."accounts" (
"id" SERIAL,
"compound_id" text   NOT NULL ,
"user_id" integer   NOT NULL ,
"provider_type" text   NOT NULL ,
"provider_id" text   NOT NULL ,
"provider_account_id" text   NOT NULL ,
"refresh_token" text   ,
"access_token" text   ,
"access_token_expires" timestamp(3)   ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."sessions" (
"id" SERIAL,
"user_id" integer   NOT NULL ,
"expires" timestamp(3)   NOT NULL ,
"session_token" text   NOT NULL ,
"access_token" text   NOT NULL ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."users" (
"id" SERIAL,
"name" text   ,
"email" text   ,
"email_verified" timestamp(3)   ,
"image" text   ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."verification_requests" (
"id" SERIAL,
"identifier" text   NOT NULL ,
"token" text   NOT NULL ,
"expires" timestamp(3)   NOT NULL ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."messages" (
"id" SERIAL,
"body" text   NOT NULL ,
"userId" integer   NOT NULL ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "accounts.compound_id_unique" ON "public"."accounts"("compound_id")

CREATE INDEX "providerAccountId" ON "public"."accounts"("provider_account_id")

CREATE INDEX "providerId" ON "public"."accounts"("provider_id")

CREATE INDEX "userId" ON "public"."accounts"("user_id")

CREATE UNIQUE INDEX "sessions.session_token_unique" ON "public"."sessions"("session_token")

CREATE UNIQUE INDEX "sessions.access_token_unique" ON "public"."sessions"("access_token")

CREATE UNIQUE INDEX "users.email_unique" ON "public"."users"("email")

CREATE UNIQUE INDEX "verification_requests.token_unique" ON "public"."verification_requests"("token")

ALTER TABLE "public"."messages" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201017193422-initial_migration..20201017200237-remvoe_chat_model
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
@@ -44,9 +44,8 @@
   name          String?
   email         String?   @unique
   emailVerified DateTime? @map(name: "email_verified")
   image         String?
-  chats         Chat[]
   messages      Message[] // A user can have many todos
   createdAt     DateTime  @default(now()) @map(name: "created_at")
   updatedAt     DateTime  @default(now()) @map(name: "updated_at")
@@ -68,24 +67,9 @@
   id        Int      @id @default(autoincrement())
   body      String
   owner     User     @relation(fields: [userId], references: [id])
   userId    Int
-  chat      Chat?    @relation(fields: [chatId], references: [id])
-  chatId    Int?
   createdAt DateTime @default(now()) @map(name: "created_at")
   updatedAt DateTime @default(now()) @map(name: "updated_at")
   @@map(name: "messages")
 }
-
-model Chat {
-  id        Int       @id @default(autoincrement())
-  name      String
-  messages  Message[]
-  owner     User      @relation(fields: [userId], references: [id])
-  userId    Int
-  createdAt DateTime  @default(now()) @map(name: "created_at")
-  updatedAt DateTime  @default(now()) @map(name: "updated_at")
-
-
-  @@map(name: "chats")
-}
```


