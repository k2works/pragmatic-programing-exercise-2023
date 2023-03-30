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
rle = concat . map rl2str . map toPair . group

rl2str :: (Char, Int) -> String
rl2str (c, n) = c : show n -- nを文字列にして文字cを先頭に付ける

toPair :: [a] -> (a, Int)
toPair xs = (head xs, length xs)
