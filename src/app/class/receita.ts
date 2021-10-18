import { Ingrediente } from "./ingrediente";

export class Receita {
    private _id: any;
    private _nomeReceita: string;
    private _dieta: number;
    private _tempoPreparo: string;
    private _rendimento: number;
    private _modoPreparo: string;
    private _ingredientes: Ingrediente[];
    private _imagem: any;
    length: number;

    constructor(nomeReceita: string, dieta: number, tempoPreparo: string, rendimento: number, modoPreparo: string, ingredientes: Ingrediente[], imagem: any) {
        this._nomeReceita = nomeReceita;
        this._dieta = dieta;
        this._tempoPreparo = tempoPreparo;
        this._rendimento = rendimento;
        this._modoPreparo = modoPreparo;
        this._ingredientes = ingredientes;
        this._imagem = imagem;
    }

    public get id(): any{
        return this._id;
    }

    public get nomeReceita(): string{
        return this._nomeReceita;
    }

    public get dieta(): number{
        return this._dieta;
    }

    public get tempoPreparo(): string{
        return this._tempoPreparo;
    }

    public get rendimento(): number{
        return this._rendimento;
    }

    public get modoPreparo(): string{
        return this._modoPreparo;
    }

    public get ingredientes(): Ingrediente[] {
        return this._ingredientes;
    }

    public get imagem(): any {
        return this._imagem;
    }

    public setId(id: any): void{
        this._id = id;
    }

    public setNomeReceita(nomeReceita: string): void{
        this._nomeReceita = nomeReceita;
    }

    public setDieta(dieta: number): void{
        this._dieta = dieta;
    }

    public setTempoPreparo(tempoPreparo: string): void{
        this._tempoPreparo = tempoPreparo;
    }

    public setRendimento(rendimento: number): void{
        this._rendimento = rendimento;
    }

    public setModoPreparo(modoPreparo: string): void{
        this._modoPreparo = modoPreparo;
    }

    public setIngredientes(ingredientes: Ingrediente[]): void{
        this._ingredientes = ingredientes;
    }

    public setImagem(value: any) {
        this._imagem = value;
    } 
}