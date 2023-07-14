interface Props {
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonType?: ButtonType;
}

enum ButtonType {
  Solid,
  Outline,
  Tonal,
}

export default function Button({
  children,
  onClick,
  buttonType = ButtonType.Solid,
}: React.PropsWithChildren<Props>) {
  switch (buttonType) {
    case ButtonType.Solid:
      return (
        <button
          onClick={onClick}
          className="h-16 w-full min-w-[10rem] rounded-full bg-primary-400 px-8 text-xl font-bold text-black transition-all hover:border-2 hover:border-primary-500 hover:bg-transparent hover:text-primary-500"
        >
          {children}
        </button>
      );
    case ButtonType.Outline:
      return (
        <button
          onClick={onClick}
          className="h-16 w-full min-w-[10rem] rounded-full border-2 border-primary-400 bg-transparent px-8 text-xl font-bold text-primary-400 transition-all hover:border-2 hover:border-primary-500 hover:bg-transparent hover:text-primary-500"
        >
          {children}
        </button>
      );
    case ButtonType.Tonal:
      return (
        <button
          onClick={onClick}
          className="h-16 w-full min-w-[10rem] rounded-full bg-primary-200 px-8 text-xl font-bold text-primary-700 transition-all hover:border-2 hover:border-primary-500 hover:bg-transparent hover:text-primary-500"
        >
          {children}
        </button>
      );
  }
}
