import { signInWithEmailAndPassword } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../firebase/firebase";

export const useAuthStore = create((set)=>({

 isJoin: false, // 현재 회원가입 화면인지 여부
setIsJoin: (value) => set({ isJoin: value }),
  //1. 상태변수


  //회원가입
  

  //로그인
  onLogin : async(email,password)=>{
    try{
      const userCredential= await signInWithEmailAndPassword(auth,email,password);
      set({user:userCredential.user})
      alert("로그인성공")
    }
    catch(err){
      alert(err.message)
    }
  }

}))