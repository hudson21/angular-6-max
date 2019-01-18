//Here we are creating the recipe model
export class Recipe {
    //These are the variables that are gonna be reachable for other componentes (public)
    public name: string; 
    public description: string;
    public imagePath: string;

    constructor(name:string, desc:string, imagePath:string){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}