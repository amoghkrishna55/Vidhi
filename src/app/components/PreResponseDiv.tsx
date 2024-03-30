const PreResponseDiv = ({ query, handleClickLoad }: { query: string, handleClickLoad:any }) => {
	return (
		<div className="w-[30rem] px-2 py-2 rounded-lg flex justify-center items-center align-middle cursor-pointer" onClick={()=>handleClickLoad(query)}>
			<p className="w-[80%] text-[#b4b4b4] border border-[#555555] shadow-md shadow-[#2e2e2e] rounded-lg px-4 py-2  align-middle">{query}</p>
		</div>
	)
}

export default PreResponseDiv