import Layout from "./component/layout";

export default function Home() {
  return (
    <Layout themeColor={"#fff"} bgColor={""}>
      <div
        className="bg-image"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      ></div>
    </Layout>
  );
}
