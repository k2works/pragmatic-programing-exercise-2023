module RLE where

import Data.List(group)

-- | ランレングス圧縮
-- >>> rle ""
-- ""
-- >>> rle "A"
-- "A1"
-- >>> rle "AAABBCCCAAA"
-- "A3B2C3A3"
rle :: String -> String
rle = fromCharAndRunLength . toCharAndRunLength

-- | 文字とその連長の組のリストを出力文字列へ変換する
fromCharAndRunLength :: [(Char, Int)] -> String
fromCharAndRunLength = concat . map rl2str

rl2str :: (Char, Int) -> String
rl2str (c, n) = c : show n -- nを文字列にして文字cを先頭に付ける

-- | 入力文字列とその連長の組のリストへ変換する
toCharAndRunLength :: String -> [(Char, Int)]
toCharAndRunLength [] = []
toCharAndRunLength xs = map toPair $ group xs

toPair :: [a] -> (a, Int)
toPair xs = (head xs, length xs)
