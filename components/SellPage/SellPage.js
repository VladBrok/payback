import styles from "./SellPage.module.scss";
import utilStyles from "styles/utils.module.scss";
import CategorySearch from "components/CategorySearch";
import CategoryButton from "components/CategoryButton";
import Subpage from "components/Subpage";
import InputForm from "components/InputForm";
import FileForm from "components/FileForm";
import PriceInput from "components/PriceInput";
import ProductStatus from "components/ProductStatus";
import PremiumIcon from "components/PremiumIcon";
import Loading from "components/Loading";
import { post } from "lib/api/client";
import { formatMoney } from "lib/money";
import { makePremiumPayment } from "lib/payment/client";
import { useSession } from "next-auth/react";
import { FcTemplate } from "react-icons/fc";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";

const STEPS = {
  CATEGORY: { value: undefined, title: "Select category" },
  PHOTO: { value: "1", title: "Upload photo" },
  TITLE: { value: "2", title: "Specify title" },
  DESCRIPTION: { value: "3", title: "Specify description" },
  PRICE: { value: "4", title: "Specify price" },
  PREMIUM: { value: "5", title: "Select status" },
  END: { value: "6", title: "" },
};

// todo: refactor (useReducer ?)
function SellPage({ serviceChargesPercent, premiumCost }) {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [category, setCategory] = useState();
  const [photoBlob, setPhotoBlob] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [isPremium, setIsPremium] = useState();
  const [paymentData, setPaymentData] = useState();
  const {
    data: { user },
  } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (step.value !== STEPS.END.value) {
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
    user.id,
    paymentData,
  ]);

  function handleCategoryClick(value) {
    setCategory(value);
    setStep(STEPS.PHOTO);
  }

  function handlePhotoSubmit(value) {
    setPhotoBlob(value);
    setStep(STEPS.TITLE);
  }

  function handleTitleSubmit(value) {
    setTitle(value);
    setStep(STEPS.DESCRIPTION);
  }

  function handleDescriptionSubmit(value) {
    setDescription(value);
    setStep(STEPS.PRICE);
  }

  function handlePriceSubmit(value) {
    setPrice(value);
    setStep(STEPS.PREMIUM);
  }

  function handlePremiumSelect(value) {
    const end = data => {
      setPaymentData(data);
      setIsPremium(value);
      setStep(STEPS.END);
    };

    if (value) {
      makePremiumPayment(end);
    } else {
      end();
    }
  }

  function handleGoBack() {
    if (step.value == undefined) {
      router.back();
    } else {
      setStep(cur =>
        Object.values(STEPS).find(s => s.value == (+cur.value - 1 || undefined))
      );
    }
  }

  const continueButton = (
    <button className={utilStyles["button-primary"]}>Continue</button>
  );

  return (
    <>
      <Head>
        <title>Sell</title>
      </Head>

      <Subpage title={step.title} onGoBack={handleGoBack}>
        <div className={styles.container}>
          {step.value === STEPS.CATEGORY.value ? (
            <CategorySearch
              searchBarLabel="Find"
              category={props => (
                <CategoryButton onClick={handleCategoryClick} {...props} />
              )}
            />
          ) : step.value === STEPS.PHOTO.value ? (
            <FileForm
              onSubmit={handlePhotoSubmit}
              submitButton={continueButton}
            />
          ) : step.value === STEPS.TITLE.value ? (
            <InputForm
              key={STEPS.TITLE.value}
              submitButton={continueButton}
              max={70}
              onSubmit={handleTitleSubmit}
              input={props => (
                <input
                  type="text"
                  placeholder="Enter product title"
                  {...props}
                />
              )}
            />
          ) : step.value === STEPS.DESCRIPTION.value ? (
            <InputForm
              key={STEPS.DESCRIPTION.value}
              submitButton={continueButton}
              max={300}
              onSubmit={handleDescriptionSubmit}
              input={props => (
                <textarea
                  placeholder="Enter product description"
                  rows="10"
                  cols="15"
                  {...props}
                />
              )}
            />
          ) : step.value === STEPS.PRICE.value ? (
            <InputForm
              key={STEPS.PRICE.value}
              submitButton={continueButton}
              min={100}
              max={100000}
              initialValue="100"
              onSubmit={handlePriceSubmit}
              hint={`Service charges are ${serviceChargesPercent}%`}
              input={props => (
                <PriceInput {...props} placeholder="Enter product price" />
              )}
            />
          ) : step.value === STEPS.PREMIUM.value ? (
            <>
              <ProductStatus
                key={`${STEPS.PREMIUM.value}-1`}
                name="Premium"
                description="Your product will be displayed on the main page"
                Icon={PremiumIcon}
                onClick={handlePremiumSelect.bind(null, true)}
              >
                Select for {formatMoney(premiumCost)}
              </ProductStatus>
              <ProductStatus
                key={`${STEPS.PREMIUM.value}-2`}
                name="Regular"
                description="You can put the product up for sale for free, but the premium status will help you sell it faster"
                Icon={FcTemplate}
                onClick={handlePremiumSelect.bind(null, false)}
              >
                Select for free
              </ProductStatus>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </Subpage>
    </>
  );
}

SellPage.auth = true;
export default SellPage;
