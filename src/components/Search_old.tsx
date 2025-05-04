import { useEffect, useState } from "react";

export default function Search({ searchData }: { searchData: (Post | User)[] | undefined }) {
	const [searchResult, setSearchResult] = useState(searchData);
	const [isSearchAll, setIsSearchAll] = useState(true);
	const [isSearchPost, setIsSearchPost] = useState(false);
	const [isSearchUser, setIsSearchUser] = useState(false);

	useEffect(() => {
		setSearchResult(searchData);
		setIsSearchAll(true);
		setIsSearchPost(false);
		setIsSearchUser(false);
	}, [searchData]);

	const filterAll = () => {
		setSearchResult(searchData);
		setIsSearchAll(true);
		setIsSearchPost(false);
		setIsSearchUser(false);
	};

	const filterPost = () => {
		setSearchResult(searchData?.filter((e) => "title" in e));
		setIsSearchAll(false);
		setIsSearchPost(true);
		setIsSearchUser(false);
	};

	const filterUser = () => {
		setSearchResult(searchData?.filter((e) => "email" in e));
		setIsSearchAll(false);
		setIsSearchPost(false);
		setIsSearchUser(true);
	};

	return (
		<>
			{JSON.stringify(searchData) !== undefined && (
				<>
					<button onClick={filterAll} disabled={isSearchAll} className="tab-btn-style">
						전체
					</button>
					<button onClick={filterPost} disabled={isSearchPost} className="tab-btn-style">
						포스트
					</button>
					<button onClick={filterUser} disabled={isSearchUser} className="tab-btn-style">
						유저
					</button>
				</>
			)}
			{searchResult?.map((data) =>
				"email" in data ? (
					<div className="border m-2 p-1 rounded-xl" key={data._id}>
						<div>유저 이름: {data.fullName}</div>
						<div>이메일: {data.email}</div>
						<div>작성글 수: {data.posts.length}</div>
						<div>작성 댓글 수: {data.comments.length}</div>
					</div>
				) : (
					<div className="border m-2 p-1 rounded-xl" key={data._id}>
						<div>글 제목: {data.title}</div>
						{/* <div>작성자: {data.author}</div> */}
						<div>댓글 수: {data.comments.length}</div>
						<div>좋아요 수: {data.likes.length}</div>
					</div>
				)
			)}
			{searchResult?.length === 0 && <div>검색 결과가 없습니다.</div>}
		</>
	);
}
