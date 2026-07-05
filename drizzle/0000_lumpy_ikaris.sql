CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"author" varchar NOT NULL,
	"url" varchar NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL
);
