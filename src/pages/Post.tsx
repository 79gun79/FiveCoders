import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Channel from "./Channel";

export default function Post() {
	return (
		<>
			<Header />
			<main className="flex">
				<Sidebar />
				<section className="w-auto mt-[50px] mx-[160px]">
					<Channel />
				</section>
			</main>
			<footer></footer>
		</>
	);
}
