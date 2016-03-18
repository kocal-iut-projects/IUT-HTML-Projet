// Generated by CoffeeScript 1.10.0
var create, toggleFullScreen;

create = function() {
  console.log('Create');
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  return game.input.onDown.add(toggleFullScreen, this);
};

toggleFullScreen = function() {
  if (game.scale.isFullScreen) {
    return game.scale.stopFullScreen();
  } else {
    return game.scale.startFullScreen(false);
  }
};

//# sourceMappingURL=create.js.map
