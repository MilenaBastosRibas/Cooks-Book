import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/class/ingrediente';
import { Receita } from 'src/app/class/receita';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { ReceitaCrudService } from 'src/app/services/receita-crud.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})

export class CadastrarPage implements OnInit {
  private _ingredientes: Ingrediente[] = [];
  private _formCadastrar: FormGroup;
  private _formCadastrarIngrediente: FormGroup;
  public isSubmitted: boolean = false;
  private dados: any;
  private lista_imagens: any[];
  private _urlImagem: any;

  constructor(
    private _router: Router,
    private _toastService: ToastService,
    private _receitaCrud: ReceitaCrudService,
    private _ingredienteService: IngredienteService,
    public operacoes: OperacoesService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this._ingredienteService.setIngredientes(this._ingredientes);


    this._formCadastrar = this._formBuilder.group({
      nomeReceita: ['', [Validators.required]],
      dieta: [''],
      tempoPreparo: ['00:05:00', [Validators.required]],
      rendimento: [''],
      modoPreparo: ['', [Validators.required]],
      ingrediente: [''],
      imagem: [''],
    });
    

    this._formCadastrarIngrediente = this._formBuilder.group({
      quantidade: ['', [Validators.required]],
      unidadeMedida: ['', [Validators.required]],
      nomeIngrediente: ['', [Validators.required]],
    });

    this.dados = this._receitaCrud.getImages()
    this.dados.forEach(data => {
      const lista = data as Array<any>;
      this.lista_imagens = [];
      lista.forEach(img => {
        let nome = img.data.name;
        let url = img.data.downloadUrl;
        this._urlImagem = url;
        this.lista_imagens.push({ nome: nome, url: url });
      })
    });
  }

  private get errorControl() {
    return this._formCadastrar.controls;
  }

  private get errorControlIngrediente() {
    return this._formCadastrarIngrediente.controls;
  }

  private submitForm(): boolean {
    this.isSubmitted = true;

    if (!this._formCadastrar.valid) {
      this._toastService.presentToast('Todos os campos são obrigatórios.', 'danger');
      return false;
    } else {
      this.cadastrar();
    }
  }

  private submitFormIngrediente(): boolean {
    this.isSubmitted = true;
    if (!this._formCadastrarIngrediente.valid) {
      this._toastService.presentToast('Todos os campos são obrigatórios.', 'danger');
      return false;
    } else {
      this.cadastrarIngrediente();
    }
  }

  private cadastrar(): void {
    if (this._ingredienteService.getIngredientes().length != 0) {
      const receita: Receita = new Receita(
        this._formCadastrar.value['nomeReceita'],
        this._formCadastrar.value['dieta'],
        this._formCadastrar.value['tempoPreparo'],
        this._formCadastrar.value['rendimento'],
        this._formCadastrar.value['modoPreparo'],
        this._ingredienteService.getIngredientes(),
        this._urlImagem,
      );

      this._receitaCrud.createReceita(receita)
        .then(() => {
          this._toastService.presentToast('Cadastro efetuado com sucesso!', 'success');
          this._router.navigate(['/home']);
        })
        .catch((error) => {
          this._toastService.presentToast('Erro ao cadastrar receita.', 'danger');
          console.log(error.message);
        });

    }
  }

  private cadastrarIngrediente(): void {
    const ingrediente: Ingrediente = new Ingrediente(
      this._formCadastrarIngrediente.value['quantidade'],
      this._formCadastrarIngrediente.value['unidadeMedida'],
      this._formCadastrarIngrediente.value['nomeIngrediente'],
    );

    this._ingredienteService.inserir(ingrediente);
    this._toastService.presentToast('Ingrediente cadastrado com sucesso!', 'success');
  }

  public upload(event: FileList) {
    this._receitaCrud.uploadStorage(event);
  }
}