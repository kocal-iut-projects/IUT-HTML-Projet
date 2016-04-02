// Generated by CoffeeScript 1.10.0
var GamePlay;

GamePlay = (function() {
  GamePlay.prototype.joueur1 = null;

  GamePlay.prototype.joueur2 = null;

  GamePlay.prototype.joueur3 = null;

  GamePlay.prototype.joueur4 = null;

  GamePlay.prototype.spriteG = null;

  GamePlay.prototype.spriteD = null;

  GamePlay.prototype.bmd = null;

  GamePlay.prototype.bmdtest = null;

  GamePlay.prototype.globalVelocity = 100;

  GamePlay.prototype.epaisseurMur = 10;

  GamePlay.prototype.epaisseurMoto = 1;

  GamePlay.prototype.tourne = function(joueur, direction) {
    if (direction === "droite") {
      joueur.angle += 90;
    } else if (direction === "gauche") {
      joueur.angle -= 90;
    }
    return game.physics.arcade.velocityFromAngle(joueur.angle, this.globalVelocity, joueur.body.velocity);
  };

  GamePlay.prototype.collisionTest = function(joueur, positionX, positionY) {
    var combien, i, j, posTempX, posTempY, ref, retour;
    this.bmd.update();
    combien = 0;
    for (i = j = 0, ref = this.epaisseurMur - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      posTempX = positionX;
      posTempY = positionY;
      if (joueur.body.velocity.x === this.globalVelocity) {
        posTempX += this.epaisseurMur + 4;
        posTempY += i;
      } else if (joueur.body.velocity.x === -this.globalVelocity) {
        posTempX -= 4;
        posTempY += i;
      } else if (joueur.body.velocity.y === this.globalVelocity) {
        posTempY += this.epaisseurMur + 4;
        posTempX += i;
      } else {
        posTempY -= 4;
        posTempX += i;
      }
      retour = this.bmd.getPixel(posTempX, posTempY);
      if (i === 0) {
        this.bmdtest.context.fillRect(posTempX, posTempY, 1, 1);
        this.bmdtest.dirty = true;
      }
      if (retour.r || retour.g || retour.b) {
        combien++;
      }
    }
    if (combien > (3 * this.epaisseurMur / 4)) {
      console.log(combien);
      return this.explode(joueur);
    }
  };

  GamePlay.prototype.explode = function(joueur) {
    return console.log("boum!");
  };

  function GamePlay(game1) {
    this.game = game1;
    if (debug) {
      console.log('GamePlay::construct()');
    }
  }

  GamePlay.prototype.preload = function() {
    if (debug) {
      console.log('GamePlay::preload()');
    }
    game.load.image('fleche_gauche', 'assets/fleche_gauche.png');
    return game.load.image('fleche_droite', 'assets/fleche_droite.png');
  };

  GamePlay.prototype.create = function() {
    var bg, bg2, bmd;
    if (debug) {
      console.log('GamePlay::create()');
    }
    this.epaisseurMoto *= this.epaisseurMur;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#124184';
    bmd = game.add.bitmapData(this.epaisseurMoto, this.epaisseurMoto);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.epaisseurMoto, this.epaisseurMoto);
    bmd.ctx.fillStyle = '#ff0000';
    bmd.ctx.fill();
    this.joueur1 = game.add.sprite(200, 200, bmd);
    this.bmd = game.add.bitmapData(game.width, game.height);
    this.bmd.context.fillStyle = '#ffffff';
    this.bmd.ctx.fill();
    bg = game.add.sprite(0, 0, this.bmd);
    this.bmdtest = game.add.bitmapData(game.width, game.height);
    this.bmdtest.context.fillStyle = '#00FF00';
    this.bmdtest.ctx.fill();
    bg2 = game.add.sprite(0, 0, this.bmdtest);
    game.physics.arcade.enable(this.joueur1, Phaser.Physics.ARCADE);
    this.joueur1.body.velocity.x = this.globalVelocity;
    this.joueur1.anchor.set(0.5);
    this.spriteG = game.add.sprite(0, 0, 'fleche_gauche');
    this.spriteG.scale.setTo(0.2, 0.2);
    this.spriteD = game.add.sprite(50, 0, 'fleche_droite');
    this.spriteD.scale.setTo(0.2, 0.2);
    this.spriteG.inputEnabled = true;
    this.spriteG.events.onInputDown.add(this.listenerBoutonG, this);
    this.spriteD.inputEnabled = true;
    return this.spriteD.events.onInputDown.add(this.listenerBoutonD, this);
  };

  GamePlay.prototype.listenerBoutonG = function() {
    if (debug) {
      console.log("bonton gauche");
    }
    return this.tourne(this.joueur1, "gauche");
  };

  GamePlay.prototype.listenerBoutonD = function() {
    if (debug) {
      console.log("bonton droit");
    }
    return this.tourne(this.joueur1, "droite");
  };

  GamePlay.prototype.update = function() {
    var positionX, positionY;
    if (debug) {
      console.log('GamePlay::update()');
    }
    positionX = this.joueur1.x - this.epaisseurMur / 2;
    positionY = this.joueur1.y - this.epaisseurMur / 2;
    if (this.joueur1.alive) {
      this.collisionTest(this.joueur1, positionX, positionY);
    }
    this.bmd.context.fillRect(positionX, positionY, this.epaisseurMur, this.epaisseurMur);
    return this.bmd.dirty = true;
  };

  return GamePlay;

})();

//# sourceMappingURL=GamePlay.js.map
