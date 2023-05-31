COMMENT ON TABLE "public"."Cinema" IS '映画の興行収入データ';
COMMENT ON COLUMN "public"."Cinema"."cinema_id" IS '映画作品のID';
COMMENT ON COLUMN "public"."Cinema"."sns1" IS '公開後10日以内にSNS1でつぶやかれた数';
COMMENT ON COLUMN "public"."Cinema"."sns2" IS '公開後10日以内にSNS2でつぶやかれた数';
COMMENT ON COLUMN "public"."Cinema"."actor" IS '主演俳優の昨年のメディア露出度。actorの値が大きいほど露出している';
COMMENT ON COLUMN "public"."Cinema"."original" IS '原作があるかどうか（あるなら1、ないなら0）';
COMMENT ON COLUMN "public"."Cinema"."sales" IS '最終的な興行収入（単位:万円）';
