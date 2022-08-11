import Category from "components/Category";

export default function CategoryButton({ id, name, onClick, ...props }) {
  function handleClick() {
    onClick(id);
  }

  return (
    <button type="button" onClick={handleClick}>
      <Category name={name} {...props} />
    </button>
  );
}
