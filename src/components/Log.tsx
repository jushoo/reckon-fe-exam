export function Log() {
  return (
    <div className="justify-start flex-col w-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Log</h1>
        <button className="rounded bg-blue-500 px-4 py-2  m-2 text-white hover:cursor-pointer hover:bg-blue-700">
          Pause Log
        </button>
      </div>
    </div>
  );
}
