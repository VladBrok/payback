import styles from "./SellPage.module.scss";
import CategorySearch from "components/CategorySearch";
import CategoryButton from "components/CategoryButton";
import Subpage from "components/Subpage";
import InputForm from "components/InputForm";
import FileForm from "components/FileForm";
import PriceInput from "components/PriceInput";
import ProductStatus from "components/ProductStatus";
import PremiumIcon from "components/PremiumIcon";
import Loading from "components/Loading";
import ContinueButton from "components/ContinueButton";
import { post } from "lib/api/client";
import { formatMoney } from "lib/money";
import { makePremiumPayment } from "lib/payment/client";
import { FcTemplate } from "react-icons/fc";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";

const STEP_DATA = [
  {
    title: "Select category",
    component: handle => (
      <CategorySearch
        searchBarLabel="Find"
        category={props => <CategoryButton onClick={handle} {...props} />}
      />
    ),
  },
  {
    title: "Upload photo",
    component: handle => (
      <FileForm onSubmit={handle} submitButton={<ContinueButton />} />
    ),
  },
  {
    title: "Specify title",
    component: handle => (
      <InputForm
        key={1}
        submitButton={<ContinueButton />}
        max={70}
        onSubmit={handle}
        input={props => (
          <input type="text" placeholder="Enter product title" {...props} />
        )}
      />
    ),
  },
  {
    title: "Specify description",
    component: handle => (
      <InputForm
        key={2}
        submitButton={<ContinueButton />}
        max={300}
        onSubmit={handle}
        input={props => (
          <textarea
            placeholder="Enter product description"
            rows="10"
            cols="15"
            {...props}
          />
        )}
      />
    ),
  },
  {
    title: "Specify price",
    component: (handle, props) => (
      <InputForm
        key={3}
        submitButton={<ContinueButton />}
        min={100}
        max={100000}
        initialValue="100"
        onSubmit={handle}
        hint={`Service charges are ${props.serviceChargesPercent}%`}
        input={props => (
          <PriceInput {...props} placeholder="Enter product price" />
        )}
      />
    ),
  },
  {
    title: "Select status",
    component: (handle, props) => (
      <>
        <ProductStatus
          key={4}
          name="Premium"
          description="Your product will be displayed on the main page"
          Icon={PremiumIcon}
          onClick={() => handle(true)}
        >
          Select for {formatMoney(props.premiumCost)}
        </ProductStatus>
        <ProductStatus
          key={5}
          name="Regular"
          description="You can put the product up for sale for free, but the premium status will help you sell it faster"
          Icon={FcTemplate}
          onClick={() => handle(false)}
        >
          Select for free
        </ProductStatus>
      </>
    ),
  },
  { title: "", component: () => <Loading /> },
];

const STEPS = {
  START: 0,
  END: STEP_DATA.length - 1,
};

function SellPage(props) {
  const [step, setStep] = useState(STEPS.START);
  const [category, setCategory] = useState();
  const [photoBlob, setPhotoBlob] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [isPremium, setIsPremium] = useState();
  const [paymentData, setPaymentData] = useState();
  const router = useRouter();

  useEffect(() => {
    if (step !== STEPS.END) {
      return;
    }

    post("product", {
      category,
      photoBlob,
      title,
      description,
      price,
      isPremium,
      paymentData,
    }).then(() => router.push("/profile/products"));
  }, [
    router,
    step,
    category,
    photoBlob,
    title,
    description,
    price,
    isPremium,
    paymentData,
  ]);

  function handlePremiumSelect(value) {
    const end = data => {
      setPaymentData(data);
      setIsPremium(value);
      goToNextStep();
    };

    if (value) {
      makePremiumPayment(end);
    } else {
      end();
    }
  }

  const handlers = [
    withNextStep(setCategory),
    withNextStep(setPhotoBlob),
    withNextStep(setTitle),
    withNextStep(setDescription),
    withNextStep(setPrice),
    handlePremiumSelect,
  ];

  function withNextStep(setter) {
    return value => {
      setter(value);
      goToNextStep();
    };
  }

  function goToNextStep() {
    setStep(cur => cur + 1);
  }

  function handleGoBack() {
    if (step === STEPS.START) {
      router.back();
    } else {
      setStep(cur => cur - 1);
    }
  }

  return (
    <>
      <Head>
        <title>Sell</title>
      </Head>

      <Subpage title={STEP_DATA[step].title} onGoBack={handleGoBack}>
        <div className={styles.container}>
          {STEP_DATA[step].component(handlers[step], props)}
        </div>
      </Subpage>
    </>
  );
}

SellPage.auth = true;
export default SellPage;
