-- CreateTable
CREATE TABLE "Survived" (
    "PassengerId" SERIAL NOT NULL,
    "Pclass" INTEGER,
    "Age" INTEGER,
    "Parch" INTEGER,
    "Fare" DOUBLE PRECISION,
    "Embarked" TEXT,
    "Survived" INTEGER,
    "Sex" TEXT,
    "SibSp" INTEGER,
    "Ticket" TEXT,
    "Cabin" TEXT,

    CONSTRAINT "Survived_pkey" PRIMARY KEY ("PassengerId")
);

COMMENT ON TABLE "Survived" IS '客船沈没事故での生存者データ';
COMMENT ON COLUMN "Survived"."PassengerId" IS '乗客ID';
COMMENT ON COLUMN "Survived"."Pclass" IS 'チケットクラス(1等、2等、3等)';
COMMENT ON COLUMN "Survived"."Age" IS '年齢';
COMMENT ON COLUMN "Survived"."Parch" IS '同乗した、自身の親と子供の総数';
COMMENT ON COLUMN "Survived"."Fare" IS '運賃';
COMMENT ON COLUMN "Survived"."Embarked" IS '搭乗港';
COMMENT ON COLUMN "Survived"."Survived" IS '1:生存、0:死亡';
COMMENT ON COLUMN "Survived"."Sex" IS '性別';
COMMENT ON COLUMN "Survived"."SibSp" IS '同乗した兄弟や配偶者の数';
COMMENT ON COLUMN "Survived"."Ticket" IS 'チケットID';
COMMENT ON COLUMN "Survived"."Cabin" IS '部屋番号';
