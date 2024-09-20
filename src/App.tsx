import Sidebar from "./components/Sidebar";
import HomePage from "./pages/Home";

function App() {
  return (
    <main className="flex h-screen bg-secondary flex-col md:flex-row">
      <Sidebar />

      <section className="flex p-4 md:ml-20 h-screen">
        <HomePage />
      </section>
    </main>
  );
}

export default App;
