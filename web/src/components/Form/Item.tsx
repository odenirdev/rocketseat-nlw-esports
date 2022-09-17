import { ReactNode } from "react";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Item = ({ children, ...props }: ItemProps) => {
  return (
    <div {...props} className="flex flex-col gap-2">
      {children}
    </div>
  );
};
