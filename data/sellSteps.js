import CategorySearch from "components/CategorySearch";
import CategoryButton from "components/CategoryButton";
import InputForm from "components/InputForm";
import FileForm from "components/FileForm";
import PriceInput from "components/PriceInput";
import ProductStatus from "components/ProductStatus";
import PremiumIcon from "components/PremiumIcon";
import Loading from "components/Loading";
import ContinueButton from "components/ContinueButton";
import { formatMoney } from "lib/money";
import { FcTemplate } from "react-icons/fc";

export const STEP_DATA = [
  {
    title: "Select category",
    property: "category",
    component: (handle, { categories }) => (
      <CategorySearch
        searchBarLabel="Find"
        category={props => <CategoryButton onClick={handle} {...props} />}
        categories={categories}
      />
    ),
  },
  {
    title: "Upload photo",
    property: "photoBlob",
    component: handle => (
      <FileForm onSubmit={handle} submitButton={<ContinueButton />} />
    ),
  },
  {
    title: "Specify title",
    property: "title",
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
    property: "description",
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
    property: "price",
    component: (handle, { minPrice, maxPrice, serviceChargesPercent }) => (
      <InputForm
        key={3}
        submitButton={<ContinueButton />}
        min={minPrice}
        max={maxPrice}
        initialValue={minPrice.toString()}
        onSubmit={handle}
        hint={`Service charges are ${serviceChargesPercent}%`}
        input={props => (
          <PriceInput {...props} placeholder="Enter product price" />
        )}
      />
    ),
  },
  {
    title: "Select status",
    property: "isPremium",
    component: (handle, { isMakingPayment, premiumCost }) => (
      <>
        <ProductStatus
          key={4}
          name="Premium"
          description="Your product will be displayed on the main page"
          Icon={PremiumIcon}
          onClick={() => handle(true)}
          buyable={true}
          disabled={isMakingPayment}
        >
          Select for {formatMoney(premiumCost)}
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

export const STEPS = {
  START: 0,
  END: STEP_DATA.length - 1,
};
