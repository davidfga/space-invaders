import ICharacters from "../interfaces/characters.interface";
import { bullet } from "./bullet.class";

export class player implements ICharacters{
    currentPositionX!: number
    currentPositionY!: number
    playerHTMLElement!:HTMLElement

    create (XPosition:number, YPosition: number) {
        document.getElementById('board')!.innerHTML += `
                                                        <div class="piece hero" id="hero" >
                                                            <img src="./src/assets/images/hero.png" alt="" srcset="">
                                                        </div>
                                                        `
        this.playerHTMLElement = document.getElementById('hero') as HTMLElement
        this.currentPositionX = XPosition
        this.currentPositionY = YPosition
        this.playerHTMLElement.style.marginLeft = `${XPosition}px`
        this.playerHTMLElement.style.marginTop = `${YPosition}px`
        document.addEventListener('keydown', e => {
            if(e.code === 'Space'){
                this.shot()
            }
            this.move(e.code)
        })
    }
    shot(){
        let newShoot = new bullet()
        newShoot.create(this.currentPositionX, this.currentPositionY )
    }
    move(keypress:string){
        console.log('move()')
            switch (keypress){
                case 'ArrowLeft':
                    if(this.collision() !== 'leftCollision'){
                        this.currentPositionX -= 100
                        this.playerHTMLElement.style.marginLeft = `${this.currentPositionX}px`
                    }
                    break
                case 'ArrowRight':
                    if(this.collision() !== 'rightCollision'){
                        this.currentPositionX += 100
                        this.playerHTMLElement.style.marginLeft = `${this.currentPositionX}px`
                    }
                    break
                default:
                    break
        }
    }
    collision(){
        let board = document.getElementById('board')!
        let boardLimitX = board.getBoundingClientRect().x
        let playerLimitX  = this.playerHTMLElement.getBoundingClientRect().x
        let playerWidth = 100
        if (playerLimitX - playerWidth < boardLimitX){
            return 'leftCollision'
        }
        if ( playerLimitX + playerWidth * 2 > boardLimitX + 1100){
            return 'rightCollision'
        }
    }
}