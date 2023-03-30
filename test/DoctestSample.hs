module DoctestSample where

-- | 文字列中のスペースの個数
--
-- >>> countSpace ""
-- 0
-- >>> countSpace "abracadabra"
-- 0
-- >>> countSpace "Hello, World!"
-- 1
-- >>> countSpace "    "
-- 4
--
-- prop> countSpace s == sum [1 | c <- s, c == ' ']
-- Add QuickCheck to your cabal dependencies to run this test.
--
countSpace :: String -> Int
countSpace = length . filter (' ' ==)
-- スペースだけでなく、うっかりタブ文字もカウントしてしまう
-- countSpace = length . filter (\x -> ' ' == x || '\t' == x)
