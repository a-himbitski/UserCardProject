export class RatingManager {

  private _ratingStyle: { color: string; };

  public get count(): number {
    return this._count;
  }
  public plus(): void {
    this._count++;
    this.updateColor();
  }
  public minus(): void {
    this._count--;
    this.updateColor();
  }

  public isMaximum():boolean{
    return this.count === this._max;
  }

  public isMinimum():boolean{
    return this._min === this.count ;
  }

  public getRatingStyle()
  {
    return this._ratingStyle;
  }
  
  constructor(private _count: number, private _max:number,private _min:number) {
    this._ratingStyle={ color: "blue" };
  }

  public updateColor():void {

    if (this.count > 5)
        this._ratingStyle={ color: "green" };

    if (this.count < -5)
        this._ratingStyle={ color: "red" };
      
    if (this.count <= 5 && this.count >= -5)
        this._ratingStyle={ color: "blue" };
  }

  
}
