module Main where

import Prelude
import Control.Monad.Eff
import Control.Monad.Eff.Console

main :: forall e. Eff (console :: CONSOLE | e) Unit
main = do
  log $ "5 * 6 = " ++ (show $ func 5 6)


func :: Int -> Int -> Int
func x y = x * y
