import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Usuario } from '../class/usuario';
import { AuthService } from './auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Receita } from '../class/receita';

export interface ImgData {
  name: string
  downloadUrl: string
}

@Injectable({
  providedIn: 'root'
})

export class ReceitaCrudService {
  private _PATH : string = "receitas/";
  private _user : Usuario;
  static count: number = 0;

  tarefa: AngularFireUploadTask;
  uploadedFileUrl: Observable<string>;
  arquivo: string;


  constructor(
    private db : AngularFireDatabase,
    private auth : AuthService,
    private storage: AngularFireStorage
  ) {
    ReceitaCrudService.count += 1;
    this._user = this.auth.getUserLogado();
    this._PATH = "receitas/" + this._user.uid;
  }

  public setUser(user: Usuario) {
    this._user = user;
  }

  public setPATH(user: Usuario) {
    this._PATH = "receitas/" + user.uid;
  }

  public setUserPath(user: Usuario) {
    this._user = user;
    this._PATH = "receitas/" + user.uid;
  }

  createReceita(receita : Receita){
    return this.db.database.ref(this._PATH).push(receita);
  }

  editReceita(key : any, receita : any){
    return this.db.database.ref(this._PATH).child(key).update(receita);
  }

  removeReceita(key : any){
    return this.db.database.ref(this._PATH + "/" + key).remove();
  }

  getReceitas(){
    return this.db.list(this._PATH).snapshotChanges().pipe(
      map((action) => {
        return action.map((dados) => ({
          key: dados.payload.key,
          data: dados.payload.val()
        }))
      })
    );
  }

  getReceita(key : string){
    return this.db.list(this._PATH, ref => ref.orderByKey().equalTo(key))
    .snapshotChanges().pipe(
      map((action) => {
        return action.map((dados) => ({
          key: dados.payload.key,
          data: dados.payload.val()
        }))
      })
    );
  }

  uploadStorage(event: FileList) {
    const file = event.item(0)
    /* if(file.type.split('/')[0] != 'imagem') {
      console.log('Tipo nao suportado')
      return
    } */
    this.arquivo = file.name
    const path = `images/${file.name}`
    const fileRef = this.storage.ref(path)
    this.tarefa = this.storage.upload(path, file)
    console.log(file)

    this.tarefa.snapshotChanges().pipe(
      finalize(()=>{
        this.uploadedFileUrl = fileRef.getDownloadURL()
        this.uploadedFileUrl.subscribe((resp)=>{
          this.uploadDatabase({name:file.name,
          downloadUrl:resp
          })
        })
      })
    ).subscribe();
    //return this.db.database.ref('images/').push(image)
  }

  uploadDatabase(image: ImgData) {
    console.log(this.db.database.ref('images/'))
    return this.db.database.ref('images/').push(image)   
  }

  getImages() {
    return this.db.list('images/').snapshotChanges().pipe(
      map((action)=>{
        return action.map((dados)=>({
          key: dados.payload.key,
          data: dados.payload.val() 
        }))
      })
    )
  }
}
