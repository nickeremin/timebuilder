CREATE TABLE IF NOT EXISTS "todo" (
	"id" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"planned_time" interval NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text;