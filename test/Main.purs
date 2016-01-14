module Test.Main where

import Prelude
import Control.Monad.Aff.AVar (AVAR())
import Control.Monad.Eff (Eff())
import Control.Monad.Eff.Random (RANDOM())
import Test.Unit.Console (TESTOUTPUT())
import Test.Unit (test, runTest, TIMER())
import Test.Unit.Assert as Assert
import Test.Unit.QuickCheck (quickCheck)
import Test.QuickCheck((===), Result())

import Main(func)

main :: forall eff. Eff ( random     :: RANDOM
                        , testOutput :: TESTOUTPUT
                        , avar       :: AVAR
                        , timer      :: TIMER
                        | eff ) Unit
main = runTest do
  test "quickCheck Main.func" do
    quickCheck \x y -> func x y === x * y
  test "success test" do
    Assert.assert "2 + 2 should be 4" $ (2 + 2) == 4
  test "failure test" do
    Assert.assert "2 + 2 shouldn't be 5" $ (2 + 2) == 5
