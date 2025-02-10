import React from "react";

const SearchInput = ({
  groups,
  searchTerm,
  setSearchTerm,
  setFilteredGroups,
}) => {
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = groups.filter((group) =>
      group.name.toLowerCase().includes(value)
    );

    setFilteredGroups(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="input input-bordered rounded-full"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
