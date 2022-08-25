import Category from "components/Category";

export default function CategoryButton({ id, onClick, ...props }) {
  function handleClick() {
    onClick(id);
  }

  return (
    <button type="button" onClick={handleClick}>
      <Category {...props} />
    </button>
  );
}
