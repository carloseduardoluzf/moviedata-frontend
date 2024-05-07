export class Movie {
    id?: number;
    title!: string;
    director!: string;
    year!: number;
    genre!: string;
    userId?: number;
    isFavorite?: boolean;
}