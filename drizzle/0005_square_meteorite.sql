CREATE TABLE IF NOT EXISTS "todo_list" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "todo_list_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "todo" DROP COLUMN IF EXISTS "user_id";