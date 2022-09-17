import { ReactNode } from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label {...props} className="font-semibold">
      {children}
    </label>
  );
};
