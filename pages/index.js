import Main from "components/Main";
import Footer from "components/Footer";
import ReviewModal from "components/ReviewModal";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <ReviewModal isOpen={isOpen} close={setIsOpen.bind(null, false)} />
      <Main />
      <Footer />
    </>
  );
}
