import OnlineFriend from "./OnlineFriend";

const Widgets = () => {
  return (
    <div className="col-span-1">
      <div className="sticky top-24 space-y-8">
        {/* sponsered */}
        <div className="space-y-2">
          <h1 className="font-bold text-xl">Sponsered</h1>
          <img
            src="https://picsum.photos/200"
            alt="sponsered image"
            className="w-full aspect-square object-cover rounded-md"
          />
        </div>

        {/* online friends */}
        <div>
          <h1 className="font-bold text-xl mb-2">Online friends</h1>
          <OnlineFriend />
          <OnlineFriend />
          <OnlineFriend />
          <OnlineFriend />
          <OnlineFriend />
          <OnlineFriend />
          <OnlineFriend />
        </div>
      </div>
    </div>
  );
};

export default Widgets;
