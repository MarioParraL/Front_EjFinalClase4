import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "axios";
import Axios from "axios";
import Character from "../../components/Character.tsx";
import Episode from "../../components/Episode.tsx";

type Character = {
  id: string;
  name: string;
  image: string;
};
type Data = { // Lo que paso a page
  id: number;
  name: string;
  characters: Character[];
};

type EpisodeAPI = {
  id: number;
  name: string;
  characters: string[];
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const id = ctx.params.id;
    const url = `https://rickandmortyapi.com/api/episode/${id}`;

    try {
      const episodes = await Axios.get<EpisodeAPI>(url);
      const charactersURL = episodes.data.characters;

      const characters = await Promise.all(charactersURL.map(async (url) => {
        const ch = await axios.get<Character>(url);
        return {
          name: ch.data.name,
          image: ch.data.image,
          id: ch.data.id,
        };
      }));

      const ep = {
        ...episodes.data,
        characters,
      };

      return ctx.render(ep);
    } catch (e) {
      throw new Error("Error");
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <>
      <Episode episode={props.data} />
    </>
  );
};

export default Page;
