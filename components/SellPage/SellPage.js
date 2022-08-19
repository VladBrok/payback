import styles from "./SellPage.module.scss";
import Subpage from "components/Subpage";
import { post } from "lib/api/client";
import { makePremiumPayment } from "lib/payment/client";
import { STEP_DATA, STEPS } from "data/sellSteps";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";

function SellPage(props) {
  const [step, setStep] = useState(STEPS.START);
  const [paymentData, setPaymentData] = useState();
  const [productData, setProductData] = useState({});
  const router = useRouter();
  const currentStepData = STEP_DATA[step];

  useEffect(() => {
    if (step !== STEPS.END) {
      return;
    }

    post("/api/product", {
      ...productData,
      paymentData,
    }).then(() => router.push("/profile/products"));
  }, [router, step, productData, paymentData]);

  function handlePremiumSelect(value) {
    const end = data => {
      setPaymentData(data);
      handle(value);
    };

    if (value) {
      makePremiumPayment(end);
    } else {
      end();
    }
  }

  function handle(value) {
    setProductData({ ...productData, [currentStepData.property]: value });
    setStep(cur => cur + 1);
  }

  function handleGoBack() {
    if (step === STEPS.START) {
      router.back();
    } else {
      setStep(cur => cur - 1);
    }
  }

  const content = (
    <div className={styles.container}>
      {currentStepData.component(
        currentStepData.property === "isPremium" ? handlePremiumSelect : handle,
        props
      )}
    </div>
  );

  return (
    <>
      <Head>
        <title>Sell</title>
      </Head>

      {step === STEPS.END ? (
        content
      ) : (
        <Subpage title={currentStepData.title} onGoBack={handleGoBack}>
          {content}
        </Subpage>
      )}
    </>
  );
}

SellPage.auth = true;
export default SellPage;
