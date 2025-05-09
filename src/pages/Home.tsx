// import SteamCard from "../components/SteamCard";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar />
        <section className="w-auto mt-[50px] mx-[160px]">
          <h1>Home Component</h1>
        </section>
      </main>
      <footer></footer>
      {/* <SteamCard /> */}
    </>
  );
}
