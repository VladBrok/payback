import Category from "components/Category";

export default function CategoryButton({ name, onClick, ...props }) {
  function handleClick(e) {
    onClick(name);
  }

  return (
    <button type="button" onClick={handleClick}>
      <Category name={name} {...props} />
    </button>
  );
}
