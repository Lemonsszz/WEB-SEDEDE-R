import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-hueso-2">
          <p className="text-body-md text-tinta-2">Cargando...</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
