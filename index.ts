import { board } from "./src/class/board";
import { invader } from "./src/class/invader.class";
import { player } from "./src/class/player.class";



function main () {
    const newBoard = new board()
    newBoard.create()


    new invader().create(0, 0)
    new invader().create(100, 0)
    new invader().create(200, 0)
    new invader().create(300, 0)
    new invader().create(400, 0)
    new invader().create(500, 0)
    new invader().create(600, 0)
    new invader().create(700, 0)
    new invader().create(800, 0)
    new invader().create(900, 0)
    new invader().create(1000, 0)
    new invader().create(0, 200)
    new invader().create(100, 200)
    new invader().create(200, 200)
    new invader().create(300, 200)
    new invader().create(400, 200)
    new invader().create(500, 200)
    new invader().create(600, 200)
    new invader().create(700, 200)
    new invader().create(800, 200)
    new invader().create(900, 200)
    new invader().create(1000, 200)
    new invader().create(0, 100)
    new invader().create(100, 100)
    new invader().create(200, 100)
    new invader().create(300, 100)
    new invader().create(400, 100)
    new invader().create(500, 100)
    new invader().create(600, 100)
    new invader().create(700, 100)
    new invader().create(800, 100)
    new invader().create(900, 100)
    new invader().create(1000, 100)
    new invader().create(0, 300)
    new invader().create(100, 300)
    new invader().create(200, 300)
    new invader().create(300, 300)
    new invader().create(400, 300)
    new invader().create(500, 300)
    new invader().create(600, 300)
    new invader().create(700, 300)
    new invader().create(800, 300)
    new invader().create(900, 300)
    new invader().create(1000, 300)


    const newPlayer = new player()
    newPlayer.create(500, 900)


}
main()

