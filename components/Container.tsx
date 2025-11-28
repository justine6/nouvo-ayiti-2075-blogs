import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return <div className="mx-auto max-w-5xl px-4">{children}</div>;
}
