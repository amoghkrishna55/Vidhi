import { Watch } from "react-loader-spinner"

const Loader = () => {
	return (
		<div className="absolute w-[100%] h-[100%] flex justify-center items-center bg-slate-100">
			<Watch
				visible={true}
				height="50"
				width="50"
				radius="48"
				color="#F75D9C"
				ariaLabel="watch-loading"
			/>
		</div>
	)
}

export default Loader