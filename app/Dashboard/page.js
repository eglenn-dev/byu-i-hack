// pages/map.js
import MapComponent from "../../components/Map";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getRecentPosts } from "@/model/post-model";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

export default async function MapPage() {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  let result = "";
  const recentPosts = await getRecentPosts();
  const flatPosts = Object.values(recentPosts).map((post) => post.description).join(", ");
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });
    console.log(flatPosts);
    result = await model.generateContent(
      `You are summarizing information from a community watch platform. Take a politically correct and uplifting approach to the summary of the following information. Do not summarize anything that could be deemed inappropriate or otherwise offensive. Here is what you will summarize: "${flatPosts}"`
    );
    console.log(result);
  } catch (e) {
    console.error(e);
  }

  return (
    <div>
      <Header />
      <MapComponent apiKey={API_KEY} />
      <div>
        {result}
      </div>
      <Footer />
    </div>
  );
};