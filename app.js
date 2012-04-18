// Generated by CoffeeScript 1.3.1
(function() {
  var Board, Human, Player, TicTacToe, buildIcon, game,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  buildIcon = function(n) {
    return "<img src='img/smile." + (parseInt(Math.random() * 18 + 1)) + ".jpg' alt='player icon'>";
  };

  Player = (function() {

    Player.name = 'Player';

    function Player(name, icon) {
      this.name = name;
      this.icon = icon;
    }

    Player.prototype.move = function(r, c) {
      var coord;
      coord = (c * 3) + parseInt(r);
      console.log(r, c, this.name, coord);
      if (game.turn === this && game.board.items[coord] === null) {
        game.board.items[coord] = this;
        $(game.board.dom[coord]).html(this.icon);
        if (this.hasWon()) {
          return game.endGame(this);
        } else {
          return game.endTurn();
        }
      }
    };

    Player.prototype.hasWon = function() {
      var e, marks, wins, _ref;
      wins = [0x124, 0x92, 0x49, 0x111, 0x54, 0x1c0, 0x38, 0x38];
      marks = ((function() {
        var _i, _len, _ref, _results;
        _ref = game.board.items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          _results.push(e === this ? 1 : 0);
        }
        return _results;
      }).call(this)).join('');
      if (_ref = parseInt(marks, 2), __indexOf.call(wins, _ref) >= 0) {
        return true;
      } else {
        return false;
      }
    };

    return Player;

  })();

  Human = (function(_super) {

    __extends(Human, _super);

    Human.name = 'Human';

    function Human(name, icon) {
      var _this = this;
      this.name = name;
      this.icon = icon;
      $('.tictactoe td').click(function(e) {
        var c, delim, item, r, _ref;
        item = $(e.target);
        _ref = item.data('coord'), r = _ref[0], delim = _ref[1], c = _ref[2];
        return _this.move(r, c);
      });
    }

    Human.prototype.move = function(r, c) {
      if (game.turn === this) {
        return Human.__super__.move.call(this, r, c);
      }
    };

    return Human;

  })(Player);

  Board = (function() {

    Board.name = 'Board';

    function Board() {
      var e,
        _this = this;
      this.items = [null, null, null, null, null, null, null, null, null];
      this.dom = $('.tictactoe td').each(function(e) {
        return e.target;
      });
      console.log((function() {
        var _i, _len, _ref, _results;
        _ref = this.dom;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          _results.push($(e).html(" "));
        }
        return _results;
      }).call(this));
    }

    return Board;

  })();

  TicTacToe = (function() {

    TicTacToe.name = 'TicTacToe';

    function TicTacToe() {
      this.turn = this.player1 = new Human('P1', buildIcon(3));
      this.nextTurn = this.player2 = new Human('P2', buildIcon(5));
      this.board = new Board;
    }

    TicTacToe.prototype.newGame = function() {
      return this.board = new Board;
    };

    TicTacToe.prototype.endTurn = function() {
      var _ref;
      return _ref = [this.turn, this.nextTurn], this.nextTurn = _ref[0], this.turn = _ref[1], _ref;
    };

    TicTacToe.prototype.endGame = function(winner) {
      alert("" + winner.name + " wins!");
      return this.newGame();
    };

    return TicTacToe;

  })();

  game = new TicTacToe;

  window.game = game;

}).call(this);
