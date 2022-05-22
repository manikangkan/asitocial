import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Error = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* navbar */}
      <Navbar />
      {/* section */}
      <section className="max-w-7xl mx-auto grid grid-cols-5 gap-x-4 my-4">
        <Sidebar />
        <div className="col-span-4 flex flex-col justify-center items-center space-y-8">
          <img
            src="https://i.pinimg.com/originals/f9/f1/26/f9f126a122254cdce0faf1187cd4fc91.png"
            alt="error image"
            className="h-96"
          />
          <Link to="/">
            <button className="py-2 px-4 bg-teal-800 text-white rounded-md font-medium">
              Back to home
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Error;
