import { useEffect, useState } from "react";

export default function Search({ searchData }: { searchData: (Post | User)[] | undefined }) {
	const [searchResult, setSearchResult] = useState(searchData);

	useEffect(() => {
		setSearchResult(searchData);
	}, [searchData]);

	return (
		<>
			{searchResult && (
				<>
					<div className="border-b-1 my-5 text-2xl">사용자</div>
					{searchResult
						.filter((e) => "fullName" in e)
						.map((data) => (
							<div className="flex items-center gap-3 mb-3">
								<img
									src={data.image || "https://kr.redbean.company/common/img/default_profile.png"}
									alt={`${data.fullName}'s profile image`}
									className="object-cover rounded-full size-14"
								/>
								<div>{data.fullName}</div>
							</div>
						))}
					{searchResult.filter((e) => "email" in e).length === 0 && <div>검색 결과가 없습니다.</div>}
					<div>&nbsp;</div>
					<div className="border-b-1 my-5 text-2xl">포스트</div>
					{searchResult
						.filter((e) => "title" in e)
						.map((data) => (
							<div className="border border-gray-400 rounded-[40px] p-5 my-4">
								<div className="flex gap-3">
									{data.image && <img src={data.image} alt="test" className="object-cover rounded-full size-24" />}
									<div>
										<div className="text-xl font-semibold">{data.title}</div>
										<div>(게시글내용)</div>
									</div>
								</div>
								<div className="mt-5 border-t-1">
									<button className="bg-gray-300 px-4 py-2 rounded-full mr-3 mt-3 cursor-pointer">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={24}
											height={24}
											viewBox="0 0 24 24"
											className="inline-block"
										>
											<path
												fill="#1f1f1f"
												d="M18 21H7V8l7-7l1.25 1.25q.175.175.288.475t.112.575v.35L14.55 8H21q.8 0 1.4.6T23 10v2q0 .175-.05.375t-.1.375l-3 7.05q-.225.5-.75.85T18 21m-9-2h9l3-7v-2h-9l1.35-5.5L9 8.85zM9 8.85V19zM7 8v2H4v9h3v2H2V8z"
											></path>
										</svg>{" "}
										LIKE
									</button>
									<button className="bg-gray-300 px-4 py-2 rounded-full mr-3 mt-3 cursor-pointer">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={24}
											height={24}
											viewBox="0 0 24 24"
											className="inline-block"
										>
											<path
												fill="#1f1f1f"
												d="M6 14h8v-2H6zm0-3h12V9H6zm0-3h12V6H6zM2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z"
											></path>
										</svg>{" "}
										{data.comments.length}
									</button>
								</div>
							</div>
						))}
					{searchResult.filter((e) => "title" in e).length === 0 && <div>검색 결과가 없습니다.</div>}
				</>
			)}
		</>
	);
}
