// Generated by CoffeeScript 1.10.0
var create, listenerBoutonD, listenerBoutonG;

create = function() {
  var spriteD, spriteG;
  console.log("create");
  spriteG = game.add.sprite(0, 0, 'fleche_gauche');
  spriteG.scale.setTo(0.2, 0.2);
  spriteD = game.add.sprite(50, 0, 'fleche_droite');
  spriteD.scale.setTo(0.2, 0.2);
  spriteG.inputEnabled = true;
  spriteG.events.onInputDown.add(listenerBoutonG, this);
  spriteD.inputEnabled = true;
  return spriteD.events.onInputDown.add(listenerBoutonD, this);
};

listenerBoutonG = function() {
  return console.log("bonton gauche");
};

listenerBoutonD = function() {
  return console.log("bonton droit");
};

//# sourceMappingURL=create.js.map
