import { useState } from "react";

import githubSrc from "./github-button.jpg";
import MetaTags from 'react-meta-tags';

const drinkToCl = {
    beer: 33,
    wine: 15,
    liquor: 4,
};

const HOUR_IN_MILLISECONDS = 36000000;

function App() {
    const [weight, setWeight] = useState(80);
    const [timeWindow, setTimeWindow] = useState(1);
    const [sex, setSex] = useState("female");
    const [drink, setDrink] = useState("beer");
    const [hourly, setHourly] = useState(null);
    const [goal, setGoal] = useState(null);
    const [targetBAC, setTargetBAC] = useState(0.075);
    const [anotherPour, setAnotherPour] = useState(false);

    const calculateBac = () => {
        const bodyWeight = weight * 1000;
        const R = sex === "female" ? 0.55 : 0.68;
        const alcoholConsumed = bodyWeight * R * ((parseFloat(targetBAC) + (0.016*parseInt(timeWindow)))/ 100);

        const addedBACPerHour = (14/(bodyWeight*R)) *100
        const burnedBACPerHour = 0.016
        const neededDrinksPerHour = burnedBACPerHour/addedBACPerHour


        const numberOfDrinks = alcoholConsumed / 14;
        setHourly(neededDrinksPerHour);
        setGoal(numberOfDrinks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearInterval();
        calculateBac();
    };

    const drinkAlert = () => {
        document.getElementById("notification-sound").play();
        setAnotherPour(true);
    };

    const startDrinkTimer = () => {
        drinkAlert();
        const peakInterval = setInterval(() => {
            drinkAlert();
        }, (HOUR_IN_MILLISECONDS * timeWindow) / (goal - 1)); // -1 Since the first drink will be poured directly

        // Used for maintainment drinking
        // Will wait until peak is reached then start maintaining timer.
        setTimeout(() => {
            clearInterval(peakInterval);
            setInterval(() => drinkAlert(), HOUR_IN_MILLISECONDS / hourly)
        }, HOUR_IN_MILLISECONDS * timeWindow)
    };

    return (
        <article>
            <MetaTags>
                <title>{anotherPour ? "Time for another pour!" : "Ballmers Peak Calculator"}</title>
            </MetaTags>
            <audio id="notification-sound">
                <source src="/ballmers-peak-calculator/notification-sound.mp3" />
            </audio>
            <a href="https://github.com/Pluppen/ballmers-peak-calculator" target="_blank" rel="noreferrer">
                <img width="120" src={githubSrc} alt="github button" />
            </a>
            <header className="flex flex-col justify-center items-center py-12">
                <h1 className="text-5xl mb-4 font-medium">
                    Ballmers Peak Calculator
                </h1>
                <p className="text-xl">
                    "A BAC between 0.129% and 0.138% confers superhuman programming
                    ability"
                </p>
                <a
                    href="https://xkcd.com/323/"
                    className="text-xs cursor-pointer hover:underline"
                >
                    source
                </a>
            </header>
            <main>
                {goal ? (
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-center text-2xl font-medium mb-4">
                            You will need to drink around
                            <span className="underline cursor-pointer relative">
                                <span>
                                    {" "}
                                    {Math.round(goal * 10) / 10} glasses of {drink}
                                </span>
                                <span className="opacity-0 transition duration-500 hover:opacity-100 absolute text-lg left-0 top-0 w-48 h-12">
                                    <span className="absolute top-8 bg-white p-2 border rounded-md w-64 left-0">
                                        More exactly {Math.round(drinkToCl[drink] * goal)}cl of{" "}
                                        {drink}
                                    </span>
                                </span>
                            </span>{" "}
                            in {timeWindow} hour(s) to reach the peak.
                        </h2>
                        <h2 className="text-center text-xl font-medium mb-4">
                            You'll then need {Math.round(hourly)} drink per hour to maintain the peak.
                        </h2>
                        <button className="px-6 py-3 rounded-full border border-blue-600 uppercase text-blue-600 text-md mb-8 font-semibold hover:bg-blue-100 transition duration-400" onClick={startDrinkTimer}>
                            Start Timer
                        </button>
                    </div>
                ) : null}
                <form
                    className="flex flex-col justify-center items-center"
                    onSubmit={handleSubmit}
                >

                    <div className="flex flex-col justify-center items-center">
                        <label for="hoursToPeak" className="text-xl">
                            How many hours until peak time?
                        </label>
                        <select value={timeWindow} onChange={(e) => setTimeWindow(e.target.value)} className="px-6 py-3 my-4 border rounded-xl">
                            <option value="1">1 hour</option>
                            <option value="2">2 hours</option>
                            <option value="3">3 hours</option>
                            <option value="4">4 hours</option>
                        </select>
                    </div>



                    <div className="flex flex-col justify-center items-center">
                        <label htmlFor="wight" className="text-xl">
                            What's your weight? (kg)
                        </label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            placeholder="Weight in kilograms"
                            className="px-6 py-3 my-4 border rounded-xl"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <label htmlFor="weight" className="text-xl">
                            Select your BAC target
                        </label>
                        <select value={targetBAC} onChange={(e) => setTargetBAC(e.target.value)} className="px-6 py-3 my-4 border rounded-xl">
                            <option value={0.075}>The Scientific Way (0.075%)</option>
                            <option value={0.129}>The Light Ballmer Way (0.129%)</option>
                            <option value={0.133}>The Medium Ballmer Way (0.133%)</option>
                            <option value={0.138}>The Strong Ballmer Way (0.138%)</option>
                        </select>
                    </div>

                    <p className="mt-4 mb-4 text-xl">What's your sex?</p>
                    <div className="flex space-x-4">
                        <div>
                            <label htmlFor="sexFemale">Female</label>
                            <input
                                className="ml-2"
                                id="sexFemale"
                                type="radio"
                                name="sex"
                                value="female"
                                checked={sex === "female"}
                                onClick={() => setSex("female")}
                            />
                        </div>
                        <div>
                            <label htmlFor="sexMale">Male</label>
                            <input
                                name="sex"
                                id="sexMale"
                                className="ml-2"
                                value="male"
                                type="radio"
                                checked={sex === "male"}
                                onClick={() => setSex("male")}
                            />
                        </div>
                    </div>

                    <p className="mt-8 mb-4 text-xl">What's your preferred drink?</p>
                    <div className="flex space-x-4">
                        <div>
                            <label htmlFor="drinkBeer">🍺 Beer (5% Alcohol)</label>
                            <input
                                className="ml-2"
                                id="drinkBeer"
                                type="radio"
                                name="drink"
                                value={"beer"}
                                checked={drink === "beer"}
                                onClick={() => setDrink("beer")}
                            />
                        </div>
                        <div>
                            <label htmlFor="drinkLiquor">🥃 Liquor (40% Alcohol)</label>
                            <input
                                name="drink"
                                id="drinkLiquor"
                                className="ml-2"
                                type="radio"
                                value={"liquor"}
                                checked={drink === "liquor"}
                                onClick={() => setDrink("liquor")}
                            />
                        </div>

                        <div>
                            <label htmlFor="drinkWine">🍷 Wine (12% Alcohol)</label>
                            <input
                                name="drink"
                                id="drinkWine"
                                className="ml-2"
                                type="radio"
                                value={"wine"}
                                checked={drink === "wine"}
                                onClick={() => setDrink("wine")}
                            />
                        </div>
                    </div>

                    <button className="px-8 py-4 rounded-full bg-blue-600 uppercase text-white text-md mt-8 font-semibold">
                        Calculate
                    </button>
                </form>
            </main>
            <footer className="flex flex-col justify-center items-center py-12">

                <p className="text-m">
                    Disclaimer - the above BAC result is not a good indication on if it's safe to drive or operate heavy machinery. Drink with caution.
                </p>

            </footer>
            <div className={"flex flex-col justify-center items-center fixed top-0 left-0 w-full h-full bg-white px-4 " + (anotherPour ? "block" : "hidden")}>
                <h2 className="text-6xl uppercase font-bold">Time for another pour 🍻</h2>
                <button onClick={() => setAnotherPour(false)} className="mt-8 px-8 py-4 uppercase bg-blue-600 text-white font-bold shadow-lg border rounded-full">The drink has been poured ✅</button>
            </div>
        </article>
    );
}

export default App;
