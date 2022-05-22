import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
const Home = () => {
  
  return (
    <main className="min-h-screen bg-slate-50">
      {/* navbar */}
      <Navbar />
      {/* section */}
      <section className="max-w-7xl mx-auto grid grid-cols-5 gap-x-4 my-4">
        <Sidebar />
        <Feed />
        <Widgets />
      </section>
    </main>
  );
};

export default Home;
