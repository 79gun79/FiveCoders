import gammue from "../images/GammueLogo.png";
import Search from "./Search";
import { useState } from "react";
import axios from "axios";
import NotLoginUser from "./NotLoginUser";
import LoginUser from "./LoginUser";

export default function Topbar() {
	const [searchInput, setSearchInput] = useState("");
	const [searchData, setSearchData] = useState<(Post | User)[]>();

	const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		searchEvent;
	};

	const searchEvent = async () => {
		try {
			const { data } = await axios.get(`http://13.125.208.179:5009/search/all/${searchInput}`);
			setSearchData(data);
		} catch (error) {
			console.log(error);
		}
	};

	const searchInputEvent = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value);

	return (
		<>
			<header className="flex justify-center items-center border-b border-b-[#9E9E9E] p-4 bg-white">
				<button className="absolute left-8 cursor-pointer">
					<img src={gammue} alt="Gammue" />
				</button>
				<form className="flex relative items-center w-[560px] z-1" onSubmit={searchSubmit}>
					<input
						type="text"
						// placeholder="검색어를 입력해주세요"
						className="input-style w-full h-[48px] bg-white border-2 border-[#51B8B2]"
						value={searchInput}
						onChange={searchInputEvent}
					/>
					<button type="submit" className="absolute right-4 cursor-pointer" onClick={searchEvent}>
						<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
							<path
								fill="#51B8B2"
								d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0s.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
							></path>
						</svg>
					</button>
				</form>
				<NotLoginUser />
				{/* <LoginUser /> */}
			</header>
			<main className="flex">
				<aside className="w-[280px] min-h-[calc(100vh-81px)] bg-[#51B8B2] text-xl">사이드바</aside>
				{/* 임시로 구현해 둔 검색 기능 */}
				<section className="ml-40 mt-10 w-5xl">
					<Search searchData={searchData} />
				</section>
			</main>
		</>
	);
}
