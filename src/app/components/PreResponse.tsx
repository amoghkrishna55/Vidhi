import Image from "next/image"
import logo from "../../assets/images/apex_logo_rm_bg.png"
import { useEffect, useState } from "react";
import PreResponseDiv from "./PreResponseDiv";

const preResponseArray = [
	"I noticed unauthorized charges on my credit card. What steps should I take to resolve this?",
	"My landlord refuses to make necessary repairs to my apartment. Can I withhold rent?",
	"I received an email asking for my personal information to claim a prize. Is this a scam?",
	"I loaned money to a friend who is now refusing to pay me back. Do I have any legal recourse?",
	"I am facing gender discrimination at my workplace. What are my legal options to address this issue and protect my rights?",
	"I have been injured in a public place due to negligence. Can I sue the government for compensation?",
	"I am a victim of cyberbullying. What are my legal rights and options?",
	"I am a student and I have been accused of cheating on an exam. What are my legal rights and options?",
	"My child was unfairly disciplined at school. What legal recourse do I have to challenge the disciplinary action?",
	"I purchased a product that was falsely advertised. How can I seek compensation for being misled as a consumer?",
	"My employer is not paying me the minimum wage mandated by law. What legal steps can I take to claim my rightful wages?",
	"I have been wrongfully accused of a crime I did not commit. How can I defend myself in court and prove my innocence?"
]


const selectRandom = () => {
	const shuffleArray = (preResponseArray: any) => {
		for (let i = preResponseArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[preResponseArray[i], preResponseArray[j]] = [preResponseArray[j], preResponseArray[i]];
		}
		return preResponseArray;
	};

	const selectRandomElements = (array: any, count: number) => {
		const shuffledArray = shuffleArray(array);
		return shuffledArray.slice(0, count);
	};

	const randomElements = selectRandomElements(preResponseArray, 4);
	return randomElements;
}
const PreResponse = ({handleClickLoad}: {handleClickLoad:any}) => {

	const [randomArray, setRandomArray] = useState([]);
	useEffect(() => {
		const randomElements = selectRandom();
		setRandomArray(randomElements);
	}, [])

	return (
		<div className="w-[100%] h-[100%] flex justify-center items-between flex-col">
			<div className="w-[100%] flex justify-center items-center flex-col">
				<Image
					src={logo}
					alt="logo"
					width={200}
					height={200}
				/>

				<br />
				<p className="font-bold text-3xl text-slate-500">Welcome 👋,</p>
				<p className="font-bold text-2xl text-slate-600">How can I help you with your legal questions today?</p>
			</div>

			<div className="flex flex-wrap mt-[5rem] justify-evenly gap-6">
				{
					randomArray && randomArray.length > 0 ?
						randomArray.map((item, index) => <PreResponseDiv query={item} handleClickLoad={handleClickLoad}/>)
						: null
				}

			</div>
		</div>
	)
}

export default PreResponse