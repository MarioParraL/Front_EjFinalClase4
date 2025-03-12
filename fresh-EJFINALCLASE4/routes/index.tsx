import Character from "../components/Character.tsx";
import Axios from "npm:axios";

type Character = {
  id: string;
  name: string;
  image: string;
};

type Data = {
  results: Character[];
};

export default async function Home() {
  try {
    const characters = await Axios.get<Data>(
      "https://rickandmortyapi.com/api/character",
    );

    return (
      <div>
        <h1>Rick & Morty Characters</h1>
        <div class="characterContainer">
          {characters.data.results.map((p) => {
            return (
              <div class="characterCard" key={p.id}>
                <a href={`/character/${p.id}`}>
                  <h3>{p.name}</h3>
                  <div class="characterImage">
                    <img src={p.image} alt={p.name} />
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (e) {
    return <div>Ha habido un error</div>;
  }
}
