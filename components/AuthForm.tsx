'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/lib/firebase'; // Ensure you have Firebase initialized in this file

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700">{isSignUp ? 'Sign Up' : 'Login'}</h2>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4 w-full">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full px-4 py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all">
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button onClick={handleGoogleSignIn} className="w-full px-4 py-3 mt-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all">
        Sign in with Google
      </button>
      <p className="mt-4 text-sm text-center text-gray-600">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button className="text-blue-500 hover:underline" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}
