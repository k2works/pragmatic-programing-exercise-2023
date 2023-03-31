-- CreateTable
CREATE TABLE "口座" (
    "口座番号" TEXT NOT NULL,
    "名義" TEXT NOT NULL,
    "種別" TEXT NOT NULL,
    "残高" INTEGER NOT NULL,
    "更新日" TIMESTAMP(3),

    CONSTRAINT "口座_pkey" PRIMARY KEY ("口座番号")
);

-- CreateTable
CREATE TABLE "廃止口座" (
    "口座番号" TEXT NOT NULL,
    "名義" TEXT NOT NULL,
    "種別" TEXT NOT NULL,
    "解約時残高" INTEGER NOT NULL,
    "解約日" TIMESTAMP(3),

    CONSTRAINT "廃止口座_pkey" PRIMARY KEY ("口座番号")
);

-- CreateTable
CREATE TABLE "取引" (
    "取引番号" SERIAL NOT NULL,
    "取引事由ID" INTEGER NOT NULL,
    "日付" TIMESTAMP(3) NOT NULL,
    "口座番号" TEXT NOT NULL,
    "入金額" INTEGER,
    "出金額" INTEGER,

    CONSTRAINT "取引_pkey" PRIMARY KEY ("取引番号")
);

-- CreateTable
CREATE TABLE "取引事由" (
    "取引事由ID" SERIAL NOT NULL,
    "取引事由名" TEXT NOT NULL,

    CONSTRAINT "取引事由_pkey" PRIMARY KEY ("取引事由ID")
);

-- AddForeignKey
ALTER TABLE "取引" ADD CONSTRAINT "取引_取引事由ID_fkey" FOREIGN KEY ("取引事由ID") REFERENCES "取引事由"("取引事由ID") ON DELETE RESTRICT ON UPDATE CASCADE;
