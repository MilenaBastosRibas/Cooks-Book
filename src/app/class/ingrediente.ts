export class Ingrediente {
    private _id: number;
    private _quantidade: string;
    private _unidadeMedida: string;
    private _nomeIngrediente: string;

    constructor(quantidade: string, unidadedeMedida: string, nomeIngrediente: string){
        let chave = new Date;
        this._id = chave.getTime();
        this._quantidade = quantidade;
        this._unidadeMedida = unidadedeMedida;
        this._nomeIngrediente = nomeIngrediente;
    }

    public getId(): number{
        return this._id;
    }

    public getQuantidade(): string{
        return this._quantidade;
    }

    public getUnidadeMedida(): string{
        return this._unidadeMedida;
    }

    public getNomeIngrediente(): string{
        return this._nomeIngrediente;
    }

    public setQuantidade(quantidade: string){
        this._quantidade = quantidade;
    }

    public setUnidadeMedida(unidadeMedida: string){
        this._unidadeMedida = unidadeMedida;
    }

    public setNomeIngrediente(nomeIngrediente: string){
        this._nomeIngrediente = nomeIngrediente;
    }
}
