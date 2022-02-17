System.register("src/class/board", [], function (exports_1, context_1) {
    "use strict";
    var board;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            board = class board {
                create() {
                    document.getElementById('app').innerHTML = `<div id="board"></div>`;
                }
            };
            exports_1("board", board);
        }
    };
});
System.register("src/interfaces/characters.interface", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/class/invader.class", [], function (exports_3, context_3) {
    "use strict";
    var invader;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            invader = class invader {
                create(XPosition, YPosition) {
                    this.invaderHTMLElement = document.createElement('div');
                    this.invaderHTMLElement.className = 'enemy piece';
                    this.invaderHTMLElement.innerHTML = '<img src="./src/assets/images/enemy.png" alt="" srcset="">';
                    document.getElementById('board').appendChild(this.invaderHTMLElement);
                    this.currentPositionX = XPosition;
                    this.currentPositionY = YPosition;
                    this.invaderHTMLElement.style.marginLeft = `${XPosition}px`;
                    this.invaderHTMLElement.style.marginTop = `${YPosition}px`;
                    this.collision();
                }
                shot() {
                }
                move() {
                }
                collision() {
                    let bullet = document.getElementById('shoot');
                    if (bullet) {
                        let bulletLimitX = bullet.getBoundingClientRect().x;
                        let invaderLimitX = this.invaderHTMLElement.getBoundingClientRect().x;
                        let invaderWidth = 100;
                        if (invaderLimitX - invaderWidth < bulletLimitX || invaderLimitX + invaderWidth * 2 > bulletLimitX + 1100) {
                            return 'leftCollision';
                        }
                    }
                }
            };
            exports_3("invader", invader);
        }
    };
});
System.register("src/interfaces/bullet.interface", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/class/bullet.class", [], function (exports_5, context_5) {
    "use strict";
    var bullet;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            bullet = class bullet {
                create(XPosition, YPosition) {
                    let newBullet = document.createElement('div');
                    newBullet.className = 'piece shoot';
                    newBullet.innerHTML = '<span></span>';
                    document.getElementById('board').appendChild(newBullet);
                    this.bulletHTMLElement = newBullet;
                    this.currentPositionX = XPosition += 50;
                    this.currentPositionY = YPosition -= 100;
                    this.bulletHTMLElement.style.marginLeft = `${this.currentPositionX}px`;
                    this.bulletHTMLElement.style.marginTop = `${this.currentPositionY}px`;
                    this.move();
                }
                move() {
                    const bulletCrash = () => {
                        let endBoardY = document.getElementById('board').getBoundingClientRect().y | 0;
                        let endBoardX = document.getElementById('board').getBoundingClientRect().x | 0;
                        let endBulletY = this.bulletHTMLElement.getBoundingClientRect().y;
                        let endBulletX = this.bulletHTMLElement.getBoundingClientRect().x;
                        let invaderCrash = false;
                        let invaders = Array.from(document.getElementsByClassName('enemy'));
                        invaders.forEach(invader => {
                            console.log('CHECK');
                            let endInvaderY = invader.getBoundingClientRect().y | 0;
                            let endInvaderX = invader.getBoundingClientRect().x | 0;
                            console.log('endInvaderX', endInvaderX);
                            console.log('endBulletX', endBulletX);
                            console.log('endInvaderY', endInvaderY);
                            console.log('endBulletY', endBulletY);
                            if (endInvaderX + 50 == endBulletX && endInvaderY == endBulletY + 100) {
                                invader.remove();
                                this.destroy();
                                invaderCrash = true;
                            }
                            else {
                                invaderCrash = false;
                            }
                        });
                        if (endBulletY + 100 <= endBoardY) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    let interval = setInterval(() => {
                        this.bulletHTMLElement.style.marginTop = `${this.currentPositionY -= 100}px`;
                        console.log('moving');
                        if (bulletCrash()) {
                            clearInterval(interval);
                            this.destroy();
                        }
                    }, 50);
                }
                destroy() {
                    this.bulletHTMLElement.remove();
                }
            };
            exports_5("bullet", bullet);
        }
    };
});
System.register("src/class/player.class", ["src/class/bullet.class"], function (exports_6, context_6) {
    "use strict";
    var bullet_class_1, player;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (bullet_class_1_1) {
                bullet_class_1 = bullet_class_1_1;
            }
        ],
        execute: function () {
            player = class player {
                create(XPosition, YPosition) {
                    document.getElementById('board').innerHTML += `
                                                        <div class="piece hero" id="hero" >
                                                            <img src="./src/assets/images/hero.png" alt="" srcset="">
                                                        </div>
                                                        `;
                    this.playerHTMLElement = document.getElementById('hero');
                    this.currentPositionX = XPosition;
                    this.currentPositionY = YPosition;
                    this.playerHTMLElement.style.marginLeft = `${XPosition}px`;
                    this.playerHTMLElement.style.marginTop = `${YPosition}px`;
                    document.addEventListener('keydown', e => {
                        if (e.code === 'Space') {
                            this.shot();
                        }
                        this.move(e.code);
                    });
                }
                shot() {
                    let newShoot = new bullet_class_1.bullet();
                    newShoot.create(this.currentPositionX, this.currentPositionY);
                }
                move(keypress) {
                    console.log('move()');
                    switch (keypress) {
                        case 'ArrowLeft':
                            if (this.collision() !== 'leftCollision') {
                                this.currentPositionX -= 100;
                                this.playerHTMLElement.style.marginLeft = `${this.currentPositionX}px`;
                            }
                            break;
                        case 'ArrowRight':
                            if (this.collision() !== 'rightCollision') {
                                this.currentPositionX += 100;
                                this.playerHTMLElement.style.marginLeft = `${this.currentPositionX}px`;
                            }
                            break;
                        default:
                            break;
                    }
                }
                collision() {
                    let board = document.getElementById('board');
                    let boardLimitX = board.getBoundingClientRect().x;
                    let playerLimitX = this.playerHTMLElement.getBoundingClientRect().x;
                    let playerWidth = 100;
                    if (playerLimitX - playerWidth < boardLimitX) {
                        return 'leftCollision';
                    }
                    if (playerLimitX + playerWidth * 2 > boardLimitX + 1100) {
                        return 'rightCollision';
                    }
                }
            };
            exports_6("player", player);
        }
    };
});
System.register("index", ["src/class/board", "src/class/invader.class", "src/class/player.class"], function (exports_7, context_7) {
    "use strict";
    var board_1, invader_class_1, player_class_1;
    var __moduleName = context_7 && context_7.id;
    function main() {
        const newBoard = new board_1.board();
        newBoard.create();
        new invader_class_1.invader().create(0, 0);
        new invader_class_1.invader().create(100, 0);
        new invader_class_1.invader().create(200, 0);
        new invader_class_1.invader().create(300, 0);
        new invader_class_1.invader().create(400, 0);
        new invader_class_1.invader().create(500, 0);
        new invader_class_1.invader().create(600, 0);
        new invader_class_1.invader().create(700, 0);
        new invader_class_1.invader().create(800, 0);
        new invader_class_1.invader().create(900, 0);
        new invader_class_1.invader().create(1000, 0);
        new invader_class_1.invader().create(0, 200);
        new invader_class_1.invader().create(100, 200);
        new invader_class_1.invader().create(200, 200);
        new invader_class_1.invader().create(300, 200);
        new invader_class_1.invader().create(400, 200);
        new invader_class_1.invader().create(500, 200);
        new invader_class_1.invader().create(600, 200);
        new invader_class_1.invader().create(700, 200);
        new invader_class_1.invader().create(800, 200);
        new invader_class_1.invader().create(900, 200);
        new invader_class_1.invader().create(1000, 200);
        new invader_class_1.invader().create(0, 100);
        new invader_class_1.invader().create(100, 100);
        new invader_class_1.invader().create(200, 100);
        new invader_class_1.invader().create(300, 100);
        new invader_class_1.invader().create(400, 100);
        new invader_class_1.invader().create(500, 100);
        new invader_class_1.invader().create(600, 100);
        new invader_class_1.invader().create(700, 100);
        new invader_class_1.invader().create(800, 100);
        new invader_class_1.invader().create(900, 100);
        new invader_class_1.invader().create(1000, 100);
        new invader_class_1.invader().create(0, 300);
        new invader_class_1.invader().create(100, 300);
        new invader_class_1.invader().create(200, 300);
        new invader_class_1.invader().create(300, 300);
        new invader_class_1.invader().create(400, 300);
        new invader_class_1.invader().create(500, 300);
        new invader_class_1.invader().create(600, 300);
        new invader_class_1.invader().create(700, 300);
        new invader_class_1.invader().create(800, 300);
        new invader_class_1.invader().create(900, 300);
        new invader_class_1.invader().create(1000, 300);
        const newPlayer = new player_class_1.player();
        newPlayer.create(500, 900);
    }
    return {
        setters: [
            function (board_1_1) {
                board_1 = board_1_1;
            },
            function (invader_class_1_1) {
                invader_class_1 = invader_class_1_1;
            },
            function (player_class_1_1) {
                player_class_1 = player_class_1_1;
            }
        ],
        execute: function () {
            main();
        }
    };
});
