import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

import logoSvg from "./assets/logo.svg";

import { Game } from "./interfaces/Game";

import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";

import "./styles/main.css";
import { CreateAdModal } from "./components/CreateAdModal";

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [openCreateAdModal, setOpenCreateAdModal] = useState<boolean>(false);

  const handleCloseCreateAdModal = () => {
    setOpenCreateAdModal(false);
  };

  useEffect(() => {
    axios.get("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20 px-4">
      <img src={logoSvg} />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui
      </h1>

      {/* Todo: Adicionar carousel com KEN-SLIDER */}
      <div className="grid gap-6 md:grid-cols-6 grid-cols-1 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root open={openCreateAdModal} onOpenChange={setOpenCreateAdModal}>
        <CreateAdBanner />

        <CreateAdModal onClose={handleCloseCreateAdModal} />
      </Dialog.Root>
    </div>
  );
}

export default App;
