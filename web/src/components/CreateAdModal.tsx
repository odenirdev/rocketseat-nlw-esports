import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToogleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";

import { Check, GameController } from "phosphor-react";

import { Input } from "./Form/Input";
import { Item } from "./Form/Item";
import { Label } from "./Form/Label";
import { Game } from "../interfaces/Game";

interface AdData {
  name: string;
  discord: string;
  game: string;
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface CreateAdModalProps {
  onClose: () => void;
}

export const CreateAdModal: React.FC<CreateAdModalProps> = ({ onClose }) => {
  const [games, setGames] = useState<Game[]>([]);

  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    axios.get("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  const getWeekDayClasses = (value: string) => {
    return `w-10 h-8 rounded ${
      weekDays.includes(value) ? "bg-violet-500" : "bg-zinc-900"
    }`;
  };

  const handleCreateAd: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event?.preventDefault();

    {
      /* Todo: Tratar formulário com a biblioteca react-hook-form */
    }
    {
      /* Todo: Validar campos */
    }

    const formData = new FormData(event?.target as HTMLFormElement);
    const data: any = {
      ...Object.fromEntries(formData),
      weekDays,
      useVoiceChannel,
    };

    const adData: AdData = {
      ...data,
      yearsPlaying: Number(data.yearsPlaying),
      weekDays: weekDays.map(Number),
    };

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, adData);

      onClose();

      alert("Anúncio cadastrado com sucesso");
    } catch (error) {
      alert("Erro ao criar anúncio");
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] rounded-md shadow-lg">
        <Dialog.Title className="text-3xl font-black">
          Publique seu anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <Item>
            <Label htmlFor="game">Qual o game?</Label>

            {/* Todo: Utilizar o componente primitivo de Select do radix */}
            <select
              name="game"
              id="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
            >
              <option selected disabled defaultValue="">
                Selecione o game que deseja jogar
              </option>

              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </Item>
          <Item>
            <Label htmlFor="name">Seu nome (ou nickname)</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Como te chamam dentro do game?"
            />
          </Item>

          <div className="grid grid-cols-2 gap-6">
            <Item>
              <Label className="font-semibold">Joga há quantos anos?</Label>
              <Input
                type="number"
                placeholder="Tudo bem ser ZERO"
                id="yearsPlaying"
                name="yearsPlaying"
              />
            </Item>
            <Item>
              <Label htmlFor="discord">Qual seu Discord?</Label>
              <Input
                id="discord"
                name="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </Item>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <Label>Quando custuma jogar ?</Label>

              <ToogleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToogleGroup.Item
                  title="Domingo"
                  value="0"
                  className={getWeekDayClasses("0")}
                >
                  D
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  title="Segunda"
                  value="1"
                  className={getWeekDayClasses("1")}
                >
                  S
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  title="Terça"
                  value="2"
                  className={getWeekDayClasses("2")}
                >
                  T
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  title="Quarta"
                  value="3"
                  className={getWeekDayClasses("3")}
                >
                  Q
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  className={getWeekDayClasses("4")}
                  title="Quinta"
                  value="4"
                >
                  Q
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  className={getWeekDayClasses("5")}
                  title="Sexta"
                  value="5"
                >
                  S
                </ToogleGroup.Item>
                <ToogleGroup.Item
                  className={getWeekDayClasses("6")}
                  title="Sábado"
                  value="6"
                >
                  S
                </ToogleGroup.Item>
              </ToogleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <Item>
                <Label>Qual horário do dia?</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="time" placeholder="De" name="hourStart" />
                  <Input type="time" placeholder="Até" name="hourEnd" />
                </div>
              </Item>
            </div>
          </div>

          <div className="mt-2">
            <Label>
              <div className="flex gap-3 text-sm">
                <Checkbox.Root
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                  checked={useVoiceChannel}
                  onCheckedChange={(checked) => {
                    if (typeof checked === "boolean") {
                      setUseVoiceChannel(checked);
                    }
                  }}
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </div>
            </Label>
          </div>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3"
            >
              <GameController size={24} /> Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
