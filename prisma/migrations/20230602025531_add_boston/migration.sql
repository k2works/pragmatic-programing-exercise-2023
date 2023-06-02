-- CreateTable
CREATE TABLE "Boston" (
    "ID" SERIAL NOT NULL,
    "CRIME" TEXT,
    "ZN" DOUBLE PRECISION,
    "INDUS" DOUBLE PRECISION,
    "CHAS" INTEGER,
    "NOX" DOUBLE PRECISION,
    "RM" DOUBLE PRECISION,
    "AGE" DOUBLE PRECISION,
    "DIS" DOUBLE PRECISION,
    "RAD" INTEGER,
    "TAX" INTEGER,
    "PTRATIO" DOUBLE PRECISION,
    "B" DOUBLE PRECISION,
    "LSTAT" DOUBLE PRECISION,
    "PRICE" DOUBLE PRECISION,

    CONSTRAINT "Boston_pkey" PRIMARY KEY ("ID")
);

COMMENT ON TABLE "Boston" IS 'ボストンの住宅価格データ';
COMMENT ON COLUMN "Boston"."ID" IS 'ID';
COMMENT ON COLUMN "Boston"."CRIME" IS 'その地域の犯罪発生率（high, low, very_low）';
COMMENT ON COLUMN "Boston"."ZN" IS '25,000平方フィート以上の住宅区画の占める割合';
COMMENT ON COLUMN "Boston"."INDUS" IS '小売業以外の商業が占める面積の割合';
COMMENT ON COLUMN "Boston"."CHAS" IS 'チャールズ川の付近かどうかによるダミー変数（1:川の周辺、0:それ以外）';
COMMENT ON COLUMN "Boston"."NOX" IS '窒素酸化物の濃度';
COMMENT ON COLUMN "Boston"."RM" IS '住居の平均部屋数';
COMMENT ON COLUMN "Boston"."AGE" IS '1940年より前に建てられた物件の割合';
COMMENT ON COLUMN "Boston"."DIS" IS 'ボストン市内の5つの雇用施設からの距離';
COMMENT ON COLUMN "Boston"."RAD" IS '環状高速道路へのアクセスしやすさ';
COMMENT ON COLUMN "Boston"."TAX" IS '10,000ドルあたりの不動産税率の総計';
COMMENT ON COLUMN "Boston"."PTRATIO" IS '町ごとの教員1人あたりの児童生徒数';
COMMENT ON COLUMN "Boston"."B" IS '町ごとの黒人の比率（Bk)を次の式で表したもの。1000(Bk-0.63)^2';
COMMENT ON COLUMN "Boston"."LSTAT" IS '人口における低所得者の割合';
COMMENT ON COLUMN "Boston"."PRICE" IS 'その地域の住宅平均価格';

