import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

export const CreateAdBanner = () => {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between">
        <div>
          <strong className="text-2xl text-white font-black">
            Não encontrou seu duo?
          </strong>
          <p className="text-zinc-400">
            Publique um anúncio para encontrar novos players!
          </p>
        </div>

        <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-400 transition-all flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
};
