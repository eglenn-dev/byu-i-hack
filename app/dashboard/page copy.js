import dynamic from "next/dynamic";

// Dynamically import the Map with SSR disabled
const Map = dynamic(() => import("./Map"), { ssr: false });

const Dashboard = () => {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map apiKey={API_KEY} />
    </div>
  );
};

export default Dashboard;
