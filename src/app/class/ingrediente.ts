export class Ingrediente {
    private _id: number;
    private _quantidade: string;
    private _unidadeMedida: string;
    private _nomeIngrediente: string;
    
    constructor(quantidade: string, unidadeMedida: string, nomeIngrediente: string){
        let chave = new Date;
        this._id = chave.getTime();
        this._quantidade = quantidade;
        this._unidadeMedida = unidadeMedida;
        this._nomeIngrediente = nomeIngrediente;
    }

    public get id(): number{
        return this._id;
    }

    public get quantidade(): string{
        return this._quantidade;
    }

    public get unidadeMedida(): string{
        return this._unidadeMedida;
    }

    public get nomeIngrediente(): string{
        return this._nomeIngrediente;
    }

    public setId(id: any) {
        this._id = id;
    }

    public setQuantidade(quantidade: string) {
        this._quantidade = quantidade;
    }

    public setUnidadeMedida(unidadeMedida: string) {
        this._unidadeMedida = unidadeMedida;
    }

    public setNomeIngrediente(nomeIngrediente: string) {
        this._nomeIngrediente = nomeIngrediente;
    }
}
