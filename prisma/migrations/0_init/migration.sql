-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "auth"."users" (
    "id" UUID NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL DEFAULT '',
    "description" VARCHAR NOT NULL DEFAULT '',
    "image_url" VARCHAR NOT NULL DEFAULT '',
    "type" VARCHAR NOT NULL DEFAULT '',
    "composition" JSONB,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals-plan-items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "meals_plan_id" UUID,
    "meal_id" UUID,

    CONSTRAINT "meals-plan-items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals-plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "date" VARCHAR NOT NULL,

    CONSTRAINT "meals-plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "created_at" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL DEFAULT '',
    "name" VARCHAR NOT NULL DEFAULT '',
    "role" VARCHAR NOT NULL DEFAULT '',

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "created_at" VARCHAR NOT NULL,
    "updated_at" VARCHAR,
    "name" VARCHAR NOT NULL DEFAULT '',
    "email" VARCHAR NOT NULL DEFAULT '',
    "age" INTEGER NOT NULL DEFAULT 0,
    "height" INTEGER NOT NULL DEFAULT 0,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "gender" VARCHAR NOT NULL DEFAULT '',
    "activity_level" VARCHAR NOT NULL DEFAULT '',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "meals-plan-items" ADD CONSTRAINT "meals-plan-items_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals-plan-items" ADD CONSTRAINT "meals-plan-items_meals_plan_id_fkey" FOREIGN KEY ("meals_plan_id") REFERENCES "meals-plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
