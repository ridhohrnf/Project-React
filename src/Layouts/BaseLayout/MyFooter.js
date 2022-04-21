import { Layout } from "antd";

const { Footer } = Layout;

const MyFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        background: "#001529",
        color: "#fff",
        clear: "both",
        position: "relative",
      }}
    >
      ReactJS Final Project Created by{" "}
      <a href="https://www.linkedin.com/in/ridhoheranof">
        Muhammad Ridho Heranof
      </a>
    </Footer>
  );
};

export default MyFooter;
