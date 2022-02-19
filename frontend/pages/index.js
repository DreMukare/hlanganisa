import Head from "next/head";
import Image from "next/image";
import Button from "../components/button";
import Logo from "../components/logo";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hlanganisa Landing Page</title>
        <meta name="description" content="Hlanganisa landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="py-5 px-8">
        <Logo />
      </nav>
      <main className="flex flex-col justify-center h-screen">
        <section className="px-8">
          <h1 className="font-bold text-4xl text-left">CONNECT AND SHARE</h1>
          <p>
            Hlanganisa is a community for professionals to interact with clients
            and showcase their services.
          </p>
        </section>
        <section className="mt-8 px-8 flex flex-col justify-center ">
          <Button
            text="Join as a service provider"
            style="border text-white bg-black text-lg"
          />
        </section>
      </main>

      <footer></footer>
    </div>
  );
}
