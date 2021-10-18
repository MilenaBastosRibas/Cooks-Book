import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { Usuario } from '../class/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Usuario;
  static count: number = 0;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,

  ) { 
    this.ngFireAuth.authState.subscribe((user) => {
      AuthService.count +=1;    
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user'))
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  public signIn(email:string, password:string){
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  public signUpWithEmailAndPassword(email:string, password:string){
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  public signInWithGoogle(){
    this.AuthLogin(new auth.GoogleAuthProvider())
  }

  public signInWithFacebook(){
    this.AuthLogin(new auth.FacebookAuthProvider())
  }

  public signInWithTwitter(){
    this.AuthLogin(new auth.TwitterAuthProvider())
  }

  public AuthLogin(provider){
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
        // console.log(this.getUserLogado());
        this.router.navigate(['/home'])
      })   
      this.setUserData(result.user) 
    })
    .catch((error) => {
      console.log(error)
    })
  }

  public setUserData(user){
    const userRef: AngularFirestoreDocument<any> =
    this.afStore.doc(`users/ ${user.uid}`);
    const userDataConst: Usuario = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }
    return userRef.set(userDataConst, {merge: true});
  }

  public estaLogado(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null) ? true : false;
  }

  public getUserLogado(){
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null) ? user : null;
  }

  public recuperarSenha(email: string){
    return this.ngFireAuth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('Enviado pro e-mail.');
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  public signOut(){
    return this.ngFireAuth.signOut()
    .then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/entrar']);
    })
  }
}
