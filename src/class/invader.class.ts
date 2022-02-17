import ICharacters from "../interfaces/characters.interface";

export class invader implements ICharacters{
    currentPositionX!: number
    currentPositionY!: number
    invaderHTMLElement!:HTMLElement

    create(XPosition:number, YPosition: number){

        this.invaderHTMLElement = document.createElement('div')
        this.invaderHTMLElement.className = 'enemy piece'
        this.invaderHTMLElement.innerHTML = '<img src="./src/assets/images/enemy.png" alt="" srcset="">'

        document.getElementById('board')!.appendChild(this.invaderHTMLElement)
        

        this.currentPositionX = XPosition
        this.currentPositionY = YPosition
        this.invaderHTMLElement.style.marginLeft = `${XPosition}px`
        this.invaderHTMLElement.style.marginTop = `${YPosition}px`
        this.collision()
    }
    shot(){

    }
    move(){

    }
    collision(){
        let bullet = document.getElementById('shoot')!
        if(bullet){
            let bulletLimitX = bullet.getBoundingClientRect().x
            let invaderLimitX  = this.invaderHTMLElement.getBoundingClientRect().x
            let invaderWidth = 100
            if (invaderLimitX - invaderWidth < bulletLimitX || invaderLimitX + invaderWidth * 2 > bulletLimitX + 1100){
                return 'leftCollision'
            }
        }
    }
}