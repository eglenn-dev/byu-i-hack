import { postCount } from "@/model/post-model";

const ReportCount = async () => {
  const count = await postCount();
  console.log(`${count}`);
  return (
    <div className="w-screen mt-16">
      <h1 className="text-5xl pl-3 m-auto pr-3">
        {count}+ <span className="text-3xl">Reports</span>
      </h1>
    </div>
  );
};

export default ReportCount;
