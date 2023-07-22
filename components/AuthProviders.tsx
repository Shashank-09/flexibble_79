"use client";
import React from 'react'
import { getProviders , signIn } from 'next-auth/react'
import { useState , useEffect } from 'react';
import Button from './Button';
import { sign } from 'crypto';
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl:string;
  callbackUrl: string;
  signinUrlParams? : Record<string , string> | null; 

}
type Providers = Record<string , Provider>

const AuthProviders = () => {
  const [providers , setProvider] = useState<Providers | null>(null);
  
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      console.log(res);
      setProvider(res);
    }
    fetchProviders();
  }, []);


 if(providers){
  return(
    <div>
      {Object.values(providers).map((provider 
      : Provider , i) => (
          <Button 
          key={i} 
          title="Sign In"
          handleClick={() => signIn(provider?.id)}
          />
        ))}
    </div>
  )
 }
}

export default AuthProviders