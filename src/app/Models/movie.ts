export class Movie {
    id: number;
    image: string;
    description: string;
    name: string;
    releaseYear: number;

    constructor(id?: number, image?: string, description?: string, name?: string, releaseYear?: number){
        this.id = id!;
        this.image = image!;
        this.description = description!;
        this.name = name!;
        this.releaseYear = releaseYear!;
    }
}
