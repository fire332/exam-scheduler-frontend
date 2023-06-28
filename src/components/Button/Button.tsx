export default function Button(props: { text: string }) {
  return (
    <button className="h-16 w-full min-w-[6rem] rounded-md border-b-2 border-primary-600 bg-primary-500 text-xl text-white transition-all hover:border-2 hover:border-primary-500 hover:bg-transparent hover:text-primary-500">
      {props.text}
    </button>
  );
}
