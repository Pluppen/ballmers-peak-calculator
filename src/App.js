import {useState} from "react";

const drinkToCl = {
  "beer": 35,
  "wine": 15,
  "liquor": 4
}

function App() {
  const [weight, setWeight] = useState(80);
  const [sex, setSex] = useState(null);
  const [drink, setDrink] = useState(null);

  const [goal, setGoal] = useState(null);

  const calculateBac = () => {
    const bodyWeight = weight * 1000;
    const R = sex === "female" ? 0.55 : 0.68;
    const BAC = 0.129;
    const alcoholConsumed = (bodyWeight * R) * (BAC / 100);

    const numerOfDrinks = alcoholConsumed / 14;
    setGoal(Math.round(numerOfDrinks))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateBac();
  }

  return (
    <article>
      <header className="flex flex-col justify-center items-center py-12">
        <h1 className="text-5xl mb-4 font-medium">Balmers Peak Calculator</h1>
        <p className="text-xl">"A BAC between 0.129‰ and 0.138‰ confers superhuman programming ability"</p>
        <a href="https://xkcd.com/323/" className="text-xs cursor-pointer hover:underline">source</a>
      </header>
      <main>
        {goal ? (
          <div>
            <h2 className="text-center text-2xl font-medium mb-4">You will need to drink
            <span className="underline cursor-pointer relative">
              <span> {goal} glasses of {drink}</span>
              <span className="opacity-0 transition duration-500 hover:opacity-100 absolute text-lg left-0 top-0 w-48 h-12">
                <span className="absolute top-8 bg-white p-2 border rounded-md w-64 left-0">This means {drinkToCl[drink] * goal}cl of {drink}</span>
              </span>
            </span> to reach the peak!</h2>
          </div>
         ) : null}
        <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <label for="weight" className="text-xl">What's your weight? (kg)</label>
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

          <p className="mt-4 mb-4 text-xl">What's your sex?</p>
          <div className="flex space-x-4">
            <div>
              <label for="sexFemale">Female</label>
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
              <label for="sexMale">Male</label>
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
              <label for="drinkBeer">🍺 Beer (5% Alcohol)</label>
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
              <label for="drinkLiquor">🥃 Liquor (40% Alcohol)</label>
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
              <label for="drinkWine">🍷 Wine (12% Alcohol)</label>
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

          <button className="px-8 py-4 rounded-full bg-blue-600 uppercase text-white text-md mt-8 font-semibold">Calculate</button>
        </form>
      </main>
    </article>
  );
}

export default App;
