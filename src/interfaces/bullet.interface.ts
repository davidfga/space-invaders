export default interface IBullets {
    currentPositionX:number,
    currentPositionY:number,
    create(XPosition:number, YPosition: number):void,
    move():void,
    destroy():void,
}