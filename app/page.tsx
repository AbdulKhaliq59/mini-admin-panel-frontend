import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <h1 className="mb-8 text-5xl font-extrabold leading-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
          Admin Panel Frontend
        </h1>

        <div className="mb-16 flex w-full max-w-2xl flex-col items-center sm:items-start">
          <p className="mb-4 text-2xl text-zinc-700 dark:text-zinc-300">
            This is the admin panel frontend for managing the application.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Use the navigation menu to access different sections of the admin panel.
          </p>
        </div>

        <Image
          src="/globe.svg"
          alt="Admin Panel Illustration"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </main>
    </div>
  );
}
