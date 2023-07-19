import { ChevronLeftIcon } from '@radix-ui/react-icons';

// TODO: link to return page?

export default function Header({ children }: React.PropsWithChildren) {
  return (
    <header className="inline-flex h-20 w-full flex-row items-center text-xl font-bold">
      <div className="inline-flex w-8 items-center justify-center">
        <ChevronLeftIcon
          width="24"
          height="24"
          color="color(display-p3 0.192 0.251 0.365)"
        />
      </div>
      <div className="inline-flex">{children}</div>
    </header>
  );
}
