// /app/(auth)/register/page.tsx
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-700 mb-4">Sign Up</h2>
        <AuthForm />
      </div>
    </div>
  );
}
