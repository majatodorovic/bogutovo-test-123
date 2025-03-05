import Link from "next/link";

const PageInCreation = () => {
    return (
        <div
            className={`container mx-auto my-32 flex max-w-[80%] flex-col items-center justify-center px-2 2xl:px-[2rem] 3xl:px-[3rem] 4xl:px-[9.5rem]`}
        >
            <div
                className={`flex flex-col items-center justify-center gap-3 rounded-lg border p-6 text-center sm:p-10`}
            >
                <h2 className={`text-2xl font-medium uppercase`}>
                    Stranica je u izradi
                </h2>
                <h3 className={`text-[1rem] font-light`}>
                    Molimo pokušajte kasnije.
                </h3>
                <div className={`text-[1rem] font-light`}>
                    Povratak na{" "}
                    <Link className={`font-normal underline `} href={`/`}>
                        početnu stranu
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PageInCreation;