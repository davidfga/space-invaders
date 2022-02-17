export default interface ICharacters {
    currentPositionX:number,
    currentPositionY:number,
    create(XPosition:number, YPosition: number):void,
    shot():void,
    move(instruction:string):void,
    collision():void,
}