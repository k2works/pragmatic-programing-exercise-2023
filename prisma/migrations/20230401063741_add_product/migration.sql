-- CreateTable
CREATE TABLE "商品" (
    "商品コード" TEXT NOT NULL,
    "商品名" TEXT NOT NULL,
    "単価" INTEGER NOT NULL,
    "商品区分" TEXT NOT NULL,
    "関連商品コード" TEXT,

    CONSTRAINT "商品_pkey" PRIMARY KEY ("商品コード")
);

-- CreateTable
CREATE TABLE "廃番商品" (
    "商品コード" TEXT NOT NULL,
    "商品名" TEXT NOT NULL,
    "単価" INTEGER NOT NULL,
    "商品区分" TEXT NOT NULL,
    "廃番日" TIMESTAMP(3),
    "売上個数" INTEGER NOT NULL,

    CONSTRAINT "廃番商品_pkey" PRIMARY KEY ("商品コード")
);

-- CreateTable
CREATE TABLE "注文" (
    "日付" TIMESTAMP(3) NOT NULL,
    "受注番号" TEXT NOT NULL,
    "受注枝番" INTEGER NOT NULL,
    "商品コード" TEXT NOT NULL,
    "数量" INTEGER NOT NULL,
    "クーポン割引料" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "注文_受注番号_受注枝番_key" ON "注文"("受注番号", "受注枝番");

-- AddForeignKey
ALTER TABLE "商品" ADD CONSTRAINT "商品_関連商品コード_fkey" FOREIGN KEY ("関連商品コード") REFERENCES "商品"("商品コード") ON DELETE SET NULL ON UPDATE CASCADE;
