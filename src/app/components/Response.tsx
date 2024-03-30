import React from 'react';
import Image from "next/image";
import user from "../../assets/images/user.png";
import bot from "../../assets/images/bot.png";
import Link from 'next/link';
import GeneratingLoader from './GeneratingLoader';

const Response = ({ role, message, loading, isCurrentLoading, reference }: { role: string, message: string, loading: boolean, isCurrentLoading: boolean, reference: [] }) => {

    const ProcessedText = ({ rawText }: { rawText: string }) => {
        const parts = rawText.split(/\*{2}(.*?)\*{2}/); // Split the text based on **
        const formattedText = parts.map((part, index) => {
            if (index % 2 === 0) {
                // Text outside of **
                return part.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                ));
            } else {
                // Text inside **
                return <strong key={index}>{part}</strong>;
            }
        });

        return formattedText;
    };

    const renderMessage = () => {
        return (
            <div className="w-[80%] text-[#F8F8F8] my-3 rounded-xl">
                <div className="flex gap-3 px-2 py-2">
                    <Image
                        src={role === "You" ? user : bot}
                        alt="user image"
                        width={30}
                        height={30}
                    />
                    <span className="font-bold">{role}</span>
                </div>

                <div className="px-8 py-2">
                    {isCurrentLoading ? (
                        loading ? (
                            <GeneratingLoader/>
                        ) : (
                            <ProcessedText rawText={message} />
                        )
                    ) : (
                        <ProcessedText rawText={message} />
                    )}
                </div>

                {role !== "You" ? (
                    <div>
                        <h2 className="px-8 font-bold text-red-400 text-lg">
                            {reference ? "References " : null}{" "}
                        </h2>
                        {reference
                            ? reference.map((item: any, index: number) => {
                                return (
                                    <div className="w-[100%] flex px-8">
                                        <Link
                                            target="_blank"
                                            href={item.source}
                                            className="text-blue-400 block underline"
                                        >
                                            {item.title}
                                        </Link>
                                    </div>
                                );
                            })
                            : null}
                    </div>
                ) : null}
                <br />
            </div>
        );
    };

    return renderMessage();
}

export default Response;
