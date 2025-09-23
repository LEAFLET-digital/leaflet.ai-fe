import { forwardRef } from "react";
import Input from "./Input";

const SearchInput = forwardRef(({ 
  placeholder = "Search...",
  onSearch,
  className = "",
  ...props 
}, ref) => {
  const searchIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  return (
    <Input
      ref={ref}
      type="text"
      placeholder={placeholder}
      icon={searchIcon}
      className={className}
      {...props}
    />
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;