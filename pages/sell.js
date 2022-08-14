import styles from "./sell.module.scss";
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
import { post } from "lib/api";
import { useSession } from "next-auth/react";
import { FcTemplate } from "react-icons/fc";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { formatMoney } from "lib/money";

const STEPS = {
  CATEGORY: undefined,
  PHOTO: "1",
  TITLE: "2",
  DESCRIPTION: "3",
  PRICE: "4",
  PREMIUM: "5",
  END: "6",
};

// todo: refactor (useReducer ?)
function SellPage({ serviceChargesPercent, premiumCost }) {
  const [step, setStep] = useState();
  const [category, setCategory] = useState();
  const [photoBlob, setPhotoBlob] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [isPremium, setIsPremium] = useState();
  const {
    data: { user },
  } = useSession();
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
      userId: user.id,
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
  ]);

  function handleCategoryClick(value) {
    setCategory(value);
    goToStep(STEPS.PHOTO);
  }

  function handlePhotoSubmit(value) {
    setPhotoBlob(value);
    goToStep(STEPS.TITLE);
  }

  function handleTitleSubmit(value) {
    setTitle(value);
    goToStep(STEPS.DESCRIPTION);
  }

  function handleDescriptionSubmit(value) {
    setDescription(value);
    goToStep(STEPS.PRICE);
  }

  function handlePriceSubmit(value) {
    setPrice(value);
    goToStep(STEPS.PREMIUM);
  }

  function handlePremiumSelect(value) {
    setIsPremium(value);
    goToStep(STEPS.END);
  }

  function goToStep(step) {
    setStep(step);
  }

  const continueButton = (
    <button className={utilStyles["button-primary"]}>Continue</button>
  );

  // todo: implement goBack
  return (
    <div className={styles.container}>
      {step === STEPS.CATEGORY ? (
        <Subpage title="Select category">
          <CategorySearch
            searchBarLabel="Find"
            category={props => (
              <CategoryButton onClick={handleCategoryClick} {...props} />
            )}
          />
        </Subpage>
      ) : step === STEPS.PHOTO ? (
        <Subpage title="Upload photo">
          <FileForm
            onSubmit={handlePhotoSubmit}
            submitButton={continueButton}
          />
        </Subpage>
      ) : step === STEPS.TITLE ? (
        <Subpage title="Specify title">
          <InputForm
            submitButton={continueButton}
            max={70}
            onSubmit={handleTitleSubmit}
            input={props => (
              <input type="text" placeholder="Enter product title" {...props} />
            )}
          />
        </Subpage>
      ) : step === STEPS.DESCRIPTION ? (
        <Subpage title="Specify description">
          <InputForm
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
        </Subpage>
      ) : step === STEPS.PRICE ? (
        <Subpage title="Specify price">
          <InputForm
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
        </Subpage>
      ) : step === STEPS.PREMIUM ? (
        <Subpage title="Select status">
          <ProductStatus
            name="Premium"
            description="Your product will be displayed on the main page"
            Icon={PremiumIcon}
            onClick={handlePremiumSelect.bind(null, true)}
          >
            Select for {formatMoney(premiumCost)}
          </ProductStatus>
          <ProductStatus
            name="Regular"
            description="You can put the product up for sale for free, but the premium status will help you sell it faster"
            Icon={FcTemplate}
            onClick={handlePremiumSelect.bind(null, false)}
          >
            Select for free
          </ProductStatus>
        </Subpage>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      serviceChargesPercent: process.env.SERVICE_CHARGES_PERCENT,
      premiumCost: process.env.PREMIUM_COST,
    },
  };
}

SellPage.auth = true;
export default SellPage;
