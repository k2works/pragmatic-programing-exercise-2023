-- CreateTable
CREATE TABLE "パーティ" (
    "ID" TEXT NOT NULL,
    "名称" TEXT NOT NULL,
    "職業コード" TEXT NOT NULL,
    "HP" INTEGER,
    "MP" INTEGER,
    "状態コード" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "イベントテーブル" (
    "イベント番号" SERIAL NOT NULL,
    "イベント名称" TEXT NOT NULL,
    "タイプ" TEXT NOT NULL,
    "前提イベント番号" INTEGER,
    "後続イベント番号" INTEGER,

    CONSTRAINT "イベントテーブル_pkey" PRIMARY KEY ("イベント番号")
);

-- CreateTable
CREATE TABLE "経験イベント" (
    "イベント番号" SERIAL NOT NULL,
    "クリア区分" TEXT NOT NULL,
    "クリア結果" TEXT,
    "ルート番号" INTEGER,
    "eventTableEventNumber" INTEGER,

    CONSTRAINT "経験イベント_pkey" PRIMARY KEY ("イベント番号")
);

-- CreateTable
CREATE TABLE "コード" (
    "コード種別" TEXT NOT NULL,
    "コード値" TEXT NOT NULL,
    "コード名称" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "パーティ_ID_key" ON "パーティ"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "コード_コード種別_コード値_key" ON "コード"("コード種別", "コード値");

-- AddForeignKey
ALTER TABLE "経験イベント" ADD CONSTRAINT "経験イベント_eventTableEventNumber_fkey" FOREIGN KEY ("eventTableEventNumber") REFERENCES "イベントテーブル"("イベント番号") ON DELETE SET NULL ON UPDATE CASCADE;
