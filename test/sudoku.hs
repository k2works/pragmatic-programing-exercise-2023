-- | sudoku.hsLibraries
-- $ ghc --make sudoku
-- $ ./sudoku
-- [3,6,7,8,4,1,9.5,2]
-- [2,1,8,7,9,5,4,3,6]
-- [5,9,4,3,2,6,7,8,1]
-- [4,3,1,5,7,2,8,6,9]
-- [9,7,5,6,8,4,1,2,3]
-- [8,2,6,1,3,9,5,4,7]
-- [6,4,2,9,1,8,3,7,5]
-- [1,5,3,4,6,7,2,9,8]
-- [7,8,9,2,5,3,6,1,4]

import Data.List
import Data.Function

-- | マス
type Cell = (Int, Int)

-- | 盤面状況
type Board = [(Cell, Int)]

-- | 数独のソルバ
solve :: Board -> [Board]
solve board = [(cell, n) : board
              | let remains = cells \\ map fst board
              , let cell = maximumBy (compare `on` length . used board) remains
              , n <- [1..9] \\ used board cell
              ] >>= solve

-- | 81マス全体
cells :: [Cell]
cells = [(x, y) | x <- [0..8], y <- [0..8]]

-- | マスの所属する区間
area :: Cell -> Int
area (x, y) = (x `div` 3) * 3 + (y `div` 3)

-- | ある盤面状況で、あるマスの周囲に使われている数値を列挙する
used :: Board -> Cell -> [Int]
used board cell = nub [n |
                         any (\ f -> f cell == f cell) [snd, fst, area], (c, n) <- board]

main :: IO ()
main = case solve problem of
        answer: _ -> mapM_ print answer
        [] -> putStrLn "invalid probelm"


-- | 解を軽くフォーマットする
format :: Board -> [[Int]]
format = map (map snd) . transpose . groupBy ((==) `on` (fst . fst)) . sort

-- | 例題
problem :: Board
problem = [((3,0), 8),( (5,0), 1),( (6,1), 4),( (7,1), 3),( (0,2), 5),( (4,3), 7),( (6,3), 8),( (6,4), 1),( (1,5), 2),( (4,5), 3),( (0,6), 6),( (7,6), 7),( (8,6), 5),( (2,7), 3),( (3,7), 4),( (3,8), 2),( (6,8), 6)]
