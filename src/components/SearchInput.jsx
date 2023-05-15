import PropTypes from "prop-types";

const SearchInput = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 dark:bg-gray-200 rounded-md px-4 py-2 mb-4 w-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    />
  );
};
SearchInput.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
export default SearchInput;
