-- CreateTable
CREATE TABLE "Cinema" (
    "cinema_id" SERIAL NOT NULL,
    "sns1" TEXT,
    "sns2" TEXT,
    "actor" TEXT,
    "original" INTEGER,
    "sales" INTEGER,

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("cinema_id")
);
