//import FooterComp from "./components/Footer";
//import Header from "./components/Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <>
    {/*<div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
      
     
  </div>*/}
    <Outlet />
    </>
  );
}