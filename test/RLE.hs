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
rle = concatMap (\s -> head s : show(length s)). group