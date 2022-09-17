import styles from "./GameBanner.module.css";

interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export const GameBanner = ({ title, adsCount, bannerUrl }: GameBannerProps) => {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} />

      <div className="w-full flex flex-col absolute bottom-0 pt-16 p-4 bg-game-gradient">
        <strong className="text-white">{title}</strong>
        <span className="text-zinc-300 text-sm">{adsCount} anúncio(s)</span>
      </div>
    </a>
  );
};
