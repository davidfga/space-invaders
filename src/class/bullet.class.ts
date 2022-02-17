import IBullets from "../interfaces/bullet.interface";

export class bullet implements IBullets {
    currentPositionX!:number
    currentPositionY!:number
    bulletHTMLElement!:HTMLElement
    
    create(XPosition:number, YPosition: number){

        
        let newBullet = document.createElement('div')
        newBullet.className = 'piece shoot'
        newBullet.innerHTML = '<span></span>'
        
        document.getElementById('board')!.appendChild(newBullet)
        this.bulletHTMLElement = newBullet
        this.currentPositionX = XPosition += 50
        this.currentPositionY = YPosition -= 100
        this.bulletHTMLElement.style.marginLeft = `${this.currentPositionX}px`
        this.bulletHTMLElement.style.marginTop = `${this.currentPositionY}px`
        this.move()
    }
    move(){
        const bulletCrash = () => {
            let endBoardY = document.getElementById('board')!.getBoundingClientRect().y | 0
            let endBoardX = document.getElementById('board')!.getBoundingClientRect().x | 0
            let endBulletY  = this.bulletHTMLElement.getBoundingClientRect().y
            let endBulletX  = this.bulletHTMLElement.getBoundingClientRect().x
            let invaderCrash = false

            let invaders = Array.from(document.getElementsByClassName('enemy'))

            invaders.forEach(invader => {
                console.log('CHECK')
                let endInvaderY = invader.getBoundingClientRect().y | 0
                let endInvaderX = invader.getBoundingClientRect().x | 0
                console.log('endInvaderX',endInvaderX)
                console.log('endBulletX',endBulletX)
                console.log('endInvaderY',endInvaderY)
                console.log('endBulletY',endBulletY)

                if( endInvaderX + 50 == endBulletX && endInvaderY == endBulletY +100){
                    invader.remove()
                    this.destroy()
                    invaderCrash = true
                } else {
                    invaderCrash =false
                }
                
            });



            if(endBulletY + 100 <= endBoardY){
                return true
            } else {
                return false
            }
        }

        let interval = setInterval(() => {
            this.bulletHTMLElement.style.marginTop = `${this.currentPositionY -= 100 }px`
            console.log('moving')
            if (bulletCrash()){
                clearInterval(interval)
                this.destroy()
            } 
        },50)


    }
    destroy(){
        this.bulletHTMLElement.remove()
    }
}
