import { useState } from "react";
import channelImg from "../assets/channelImg.svg";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PostList from "../components/PostList";
import { postsData } from "../types/postsData";

export default function Search() {
	const [userTab, setUserTab] = useState(true);

	// 임시
	const channelData: ChannelType = {
		authRequired: true,
		posts: postsData,
		channelId: 1,
		name: "FC 온라인",
		description:
			"https://media.istockphoto.com/id/1133951413/ko/%EC%82%AC%EC%A7%84/%EC%BC%84-%ED%8C%85-%EC%B4%A8-%ED%8C%A1.jpg?s=2048x2048&w=is&k=20&c=o7oc-GnmnNHETP8_pZOIIwZXwZOYyAa7SeCxTZ5S4_M=",
		createdAt: "",
		updatedAt: "",
	};

	return (
		<>
			<Header />
			<main className="flex">
				<Sidebar />
				<section className="w-auto mt-[50px] mx-[160px]">
					<div className="mb-9.5 text-xl">
						<button
							className="w-100 border-b-2 border-b-[var(--color-gray3)] cursor-pointer disabled:border-b-[var(--color-main)] disabled:cursor-default"
							onClick={() => setUserTab(true)}
							disabled={userTab}
						>
							사용자
						</button>
						<button
							className="w-100 border-b-2 border-b-[var(--color-gray3)] cursor-pointer disabled:border-b-[var(--color-main)] disabled:cursor-default"
							onClick={() => setUserTab(false)}
							disabled={!userTab}
						>
							게시글
						</button>
					</div>

					{/* 사용자 검색 */}
					{userTab && (
						<div>
							<div
								style={{ boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.1)" }}
								className="flex items-center relative my-3 px-6 py-7 rounded-3xl"
							>
								<img
									src={channelImg}
									alt="channelImg"
									className="w-14 h-14 mr-6"
								/>
								<span className="font-bold text-xl">피파의노예</span>
								<button className="absolute right-6.5 p-2 cursor-pointer rounded-[8px] bg-[var(--color-gray1)] text-[var(--color-gray8)] hover:bg-[var(--color-main)] hover:text-white">
									프로필 보기
								</button>
							</div>
							<div
								style={{ boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.1)" }}
								className="flex items-center relative my-3 px-6 py-7 rounded-3xl"
							>
								<img
									src={channelImg}
									alt="channelImg"
									className="w-14 h-14 mr-6"
								/>
								<span className="font-bold text-xl">코리안음바페</span>
								<button className="absolute right-6.5 p-2 cursor-pointer rounded-[8px] bg-[var(--color-gray1)] text-[var(--color-gray8)] hover:bg-[var(--color-main)] hover:text-white">
									프로필 보기
								</button>
							</div>
							<div
								style={{ boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.1)" }}
								className="flex items-center relative my-3 px-6 py-7 rounded-3xl"
							>
								<img
									src={channelImg}
									alt="channelImg"
									className="w-14 h-14 mr-6"
								/>
								<span className="font-bold text-xl">반박불가</span>
								<button className="absolute right-6.5 p-2 cursor-pointer rounded-[8px] bg-[var(--color-gray1)] text-[var(--color-gray8)] hover:bg-[var(--color-main)] hover:text-white">
									프로필 보기
								</button>
							</div>
						</div>
					)}

					{/* 게시글 검색 */}
					{!userTab &&
						channelData.posts.map((v) => (
							<div className="mb-5">
								<PostList key={v.postId} {...v} />
							</div>
						))}
				</section>
			</main>
			<footer></footer>
		</>
	);
}
