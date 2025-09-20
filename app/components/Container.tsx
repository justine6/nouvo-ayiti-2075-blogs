import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}
