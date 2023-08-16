export function SearchBar(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return (
    <input
      className={`border border-slate-300 rounded-sm shadow-md mt-6 mb-10 py-2 px-4 bg-transparent w-full text-xl !text-[#1f1f1f] outline-none !font-medium`}
      {...props}
    />
  );
}
