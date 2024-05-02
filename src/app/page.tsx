import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      pagina principal

      <Link
        href={'/login'}
      >
        Login
      </Link>
    </main>
  );
}
