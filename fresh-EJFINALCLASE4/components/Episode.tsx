import { FunctionComponent } from "preact";
type Character = {
  id: string;
  name: string;
  image: string;
};
export type Props = {
  episode: {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: Character[];
  };
};

const Character: FunctionComponent<Props> = (props) => {
  const episode = props.episode;

  return (
    <div class="casa">
      <a href="/">
        <img src="/casa.svg" alt="volver" width="20px">
          Volver
        </img>
      </a>
      <div>
      </div>
      <h1 class="episode-title">{episode.name}</h1>
      <h2 class="subtitle">
        <div>
          {episode.air_date}
          {episode.episode}
        </div>
        Episode Characters
      </h2>
      <div class="characterContainer">
        {episode.characters.map((ch) => (
          /*  <a href={`/episode/${ep.id}`}>{ep.name}</a>*/
          <div class="characterCard" key={ch.id}>
            <a href={`/character/${ch.id}`}>
              <h3>{ch.name}</h3>
            </a>
            <div class="characterImage">
              <img src={ch.image} alt={ch.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Character;
