import styles from "./sell.module.scss";
import utilStyles from "styles/utils.module.scss";
import CategorySearch from "components/CategorySearch";
import CategoryButton from "components/CategoryButton";
import Subpage from "components/Subpage";
import Router from "components/Router";
import InputForm from "components/InputForm";
import FileForm from "components/FileForm";
import PriceInput from "components/PriceInput";
import ProductStatus from "components/ProductStatus";
import PremiumIcon from "components/PremiumIcon";
import { FcTemplate } from "react-icons/fc";
import { useRouter } from "next/router";
import { useState } from "react";

const STEPS = {
  CATEGORY: undefined,
  PHOTO: "1",
  TITLE: "2",
  DESCRIPTION: "3",
  PRICE: "4",
  PREMIUM: "5",
  END: "6",
};

// fixme: user can cange steps from url
// todo: refactor (useReducer ?)
function SellPage() {
  const [category, setCategory] = useState();
  const [photo, setPhoto] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [isPremium, setIsPremium] = useState();
  const router = useRouter();

  function handleCategoryClick(value) {
    setCategory(value);
    goToStep(STEPS.PHOTO);
  }

  function handlePhotoSubmit(value) {
    setPhoto(value);
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
    console.log(value);
    setIsPremium(value);
    goToStep(STEPS.END);
  }

  function goToStep(step) {
    router.push(`?step=${step}`, null, { shallow: true });
  }

  const continueButton = (
    <button className={utilStyles["button-primary"]}>Continue</button>
  );

  return (
    <div className={styles.container}>
      <Router>
        {({ step }) => {
          {
            if (step === STEPS.CATEGORY)
              return (
                <Subpage title="Select category">
                  <CategorySearch
                    searchBarLabel="Find"
                    category={props => (
                      <CategoryButton
                        onClick={handleCategoryClick}
                        {...props}
                      />
                    )}
                  />
                </Subpage>
              );

            if (step === STEPS.PHOTO)
              return (
                <Subpage title="Upload photo">
                  <FileForm
                    onSubmit={handlePhotoSubmit}
                    submitButton={continueButton}
                  />
                </Subpage>
              );

            if (step === STEPS.TITLE)
              return (
                <Subpage title="Specify title">
                  <InputForm
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
                </Subpage>
              );

            if (step === STEPS.DESCRIPTION)
              return (
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
              );

            if (step === STEPS.PRICE)
              return (
                <Subpage title="Specify price">
                  <InputForm
                    submitButton={continueButton}
                    min={100}
                    max={100000}
                    initialValue={100}
                    onSubmit={handlePriceSubmit}
                    hint="Service charges are 15%" // fixme
                    input={props => (
                      <PriceInput
                        {...props}
                        placeholder="Enter product price"
                      />
                    )}
                  />
                </Subpage>
              );

            if (step === STEPS.PREMIUM)
              return (
                <Subpage title="Select status">
                  <ProductStatus
                    name="Premium"
                    description="Your product will be displayed on the main page"
                    Icon={PremiumIcon}
                    onClick={handlePremiumSelect.bind(null, true)}
                  >
                    Select for 10$ {/* fixme: add payment system */}
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
              );

            if (step === STEPS.END) return;
          }
        }}
      </Router>
    </div>
  );
}

SellPage.auth = true;
export default SellPage;
