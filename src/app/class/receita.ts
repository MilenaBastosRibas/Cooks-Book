import { Ingrediente } from "./ingrediente";

export class Receita {
    private _id: number;
    private _nomeReceita: string;
    private _dieta: number;
    private _tempoPreparo: string;
    private _rendimento: number;
    private _modoPreparo: string;
    private _ingredientes: Ingrediente[]
    length: number;

    constructor(nomeReceita: string, dieta: number, tempoPreparo: string, rendimento: number, modoPreparo: string, ingredientes: Ingrediente[]) {
        let chave = new Date;
        this._id = chave.getTime();
        this._nomeReceita = nomeReceita;
        this._dieta = dieta;
        this._tempoPreparo = tempoPreparo;
        this._rendimento = rendimento;
        this._modoPreparo = modoPreparo;
        this._ingredientes = ingredientes;
    }

    public getId(): number{
        return this._id;
    }

    public getNomeReceita(): string{
        return this._nomeReceita;
    }

    public getDieta(): number{
        return this._dieta;
    }

    public getTempoPreparo(): string{
        return this._tempoPreparo;
    }

    public getRendimento(): number{
        return this._rendimento;
    }

    public getModoPreparo(): string{
        return this._modoPreparo;
    }

    public getIngredientes(): Ingrediente[] {
        return this._ingredientes;
    }

    public setNomeReceita(nomeReceita: string){
        this._nomeReceita = nomeReceita;
    }

    public setDieta(dieta: number){
        this._dieta = dieta;
    }

    public setTempoPreparo(tempoPreparo: string){
        this._tempoPreparo = tempoPreparo;
    }

    public setRendimento(rendimento: number){
        this._rendimento = rendimento;
    }

    public setModoPreparo(modoPreparo: string){
        this._modoPreparo = modoPreparo;
    }

    public setIngredientes(ingredientes: Ingrediente[]){
        this._ingredientes = ingredientes;
    }

}