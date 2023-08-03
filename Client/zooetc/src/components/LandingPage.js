import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React from "react";

export default function LandingPage() {
  return (
    <Layout className="zooContainer">
      <Content className="landingContent">
        <img className="landingLogo" alt="ZooEtcLogo" src="/images/zooetc3.png" />
        <div className="landingDiv">
          <h5>Welcome to Zoo Etc!</h5>
          <p>The idea of a one stop resource shop for zoo professionals evolved after
            hearing the same conversations over and over again: </p>
          <ul>
            <li>What is the best gear to buy?</li>
            <li>What does each zoo have to offer their employees?</li>
            <li>What is the best enrichment to give certain species?</li>
            <li>What browse is given to which species?</li>
            <li>And where to find other meaningful resources?</li>
          </ul>
          <p>With those conversations , I had the idea to create a one stop shop of resources for zoo professionals.
            <br></br>The idea of Zoo Etc. was born years before I followed the path of a software developer out of that need, 
            <br></br>and being able to execute a base version of it, with the potential to grow it more, is truly exciting.
          </p>
          <p>
            So, with all that said, if you work in the zoo world, this application is for you.
          </p>
        </div>
      </Content>
    </Layout>
  );
}

{/* <span className="zooContainer" style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
    }}>some very fascinating information about zoos, im sure...</span> */}