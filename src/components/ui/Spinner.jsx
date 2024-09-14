export default function Spinner() {
  return (
    <div className="bg-gradient-to-r from-hoverOrange via-orange-400 to-yellow-200 w-[3rem] h-[3rem]  animate-spin mx-auto  mt-44 dark:bg-slate-800 rounded-full border-3 flex justify-center items-center">
      <div className="bg-white dark:bg-slate-800 w-[2.5rem] h-[2.5rem] rounded-full"></div>
    </div>
  );
}
