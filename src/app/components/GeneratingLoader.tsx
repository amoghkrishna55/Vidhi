import { DNA } from "react-loader-spinner"

const GeneratingLoader = () => {
	return (
		<div><DNA
			visible={true}
			height="80"
			width="80"
			ariaLabel="dna-loading"
			wrapperStyle={{}}
			wrapperClass="dna-wrapper"
		/></div>
	)
}

export default GeneratingLoader