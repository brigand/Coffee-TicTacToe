class Player
  constructor: (@name, @icon) ->
  
  # Row and Collumn on [0..2]
  move: (r, c) ->
    # We can set, but not overwrite
    
    coord = (c * 3) + parseInt(r)
    
    console.log r, c, @name, coord
    if game.turn is this and game.board.items[coord] is null
      game.board.items[coord] = this
      $(game.board.dom[coord]).html(@icon)
      
      if this.hasWon()
        game.endGame this 
      else
        game.endTurn()
      
      
  hasWon: () ->
    wins = [
      0o444   # 100100100
      0o222   # 010010010
      0o111   # 001001001
      0o421   # 100010001
      0o124   # 001010100
      0o700   # 111000000
      0o70    # 000111000
      0o70    # 000111000
    ]

    marks = ((
      if e is this
      then 1 
      else 0
      ) for e in game.board.items)
      .join('')
    
    if parseInt(marks, 2) in wins
      true
    else
      false
    
    
    
class Human extends Player
  constructor: (@name, @icon) ->
    $('.tictactoe td').click (e) =>
      item = $(e.target)
      [r, delim, c] = item.data 'coord'
      @move(r, c)
  
  move: (r, c) ->
    if game.turn is this
      super r, c
    


class Board
  constructor: () ->
    
    # Create a clean board
    @items = [
      null, null, null
      null, null, null
      null, null, null
    ]
    
    @dom = ($('.tictactoe td').each (e) => e.target)
    
    console.log ($(e).html(" ") for e in @dom)
  
class TicTacToe
  constructor: () ->
    @turn = @player1 = new Human 'P1', buildIcon(3)
    @nextTurn = @player2 = new Human 'P2', buildIcon(5)
    @board = new Board
    
  newGame: () ->
    @board = new Board
    #$('.tictactoe td').each (e) -> $(e.target).html('')
  
  endTurn: () ->
    [@nextTurn, @turn] = [@turn, @nextTurn]
    
  endGame: (winner) ->
    alert "#{winner.name} wins!"
    this.newGame()
    

game = new TicTacToe

window.game = game
