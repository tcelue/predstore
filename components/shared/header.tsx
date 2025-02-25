'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {  onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Menu } from 'lucide-react';
import { User } from "firebase/auth"; // Import Firebase User type

// Mock categories data (to be replaced with Firestore data in the future)
const mockCategories = [
  { id: 1, name: '天气', path: '/weather' },
  { id: 2, name: '选举', path: '/election' },
  { id: 3, name: '体育', path: '/sports' },
  { id: 4, name: '科技', path: '/technology' },
  { id: 5, name: '股市', path: '/stock-market' },
  { id: 6, name: '娱乐', path: '/entertainment' },
];

export default function Header() {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState(mockCategories); // Using mock data for now
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Site Name */}
        <Link href="/" className="text-2xl font-bold text-gray-700">天策预测市场</Link>
        
        {/* Hamburger Menu (for small screens) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <Menu size={28} className="text-gray-700" />
          </button>
        </div>
        
        {/* Full-screen Dropdown Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 space-y-6 shadow-md md:hidden">
            {categories.map((category) => (
              <Link key={category.id} href={category.path} className="text-gray-600 hover:text-gray-900 text-xl">
                {category.name}
              </Link>
            ))}
            {user ? (
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-xl"
              >
                Logout
              </button>
            ) : (
              <div className="space-y-4">
                <Link href="/login" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-xl">Login</Link>
                <Link href="/register" className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-xl">Register</Link>
              </div>
            )}
            <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-gray-700 text-2xl">✖</button>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.path} className="text-gray-600 hover:text-gray-900">
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Authentication Links */}
        <div className="hidden md:flex">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          ) : (
            <div className="space-x-4">
              <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">Login</Link>
              <Link href="/register" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
