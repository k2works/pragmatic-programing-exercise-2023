module RLE where

-- | ランレングス圧縮
-- >>> rle ""
-- ""
-- >>> rle "AAABBCCCAAA"
-- "A3B2C3A3"
rle :: String -> String
rle "" = ""
rle (h:t) = aux 1 h t h where
  aux :: Int -> Char -> String -> Char -> String
  aux runLength prevChar "" currentChar = prevChar : show runLength
  aux runLength prevChar (c:s) currentChar
    | c == prevChar = aux (runLength + 1) prevChar s currentChar
    | otherwise = prevChar : show runLength ++ aux 1 c s c

