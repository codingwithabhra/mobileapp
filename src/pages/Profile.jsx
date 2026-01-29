import Header from "../components/Header";
import Footer from "../components/Footer";
import Profiledetails from "../components/Profiledetails";

const Profile = () => {

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ flexShrink: 0 }}>
        <Header />
      </header>

      <main
        style={{
          backgroundColor: "#e6f0ff",
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div className="container py-5">
          <Profiledetails />
        </div>
      </main>

      <footer style={{ flexShrink: 0 }}>
        <Footer />
      </footer>
    </div>
  );
};

export default Profile;
