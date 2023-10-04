// import {
//   Navbar,
//   Button,
//   Input,
// } from "@material-tailwind/react";

// function NavbarWithSearch() {
//   return (
//         <div className="pt-3">
//           <Input
//             type="search"
//             placeholder ="Search Products.."
//             className="pr-22"
//           />
//           {/* <Button size="sm" className="!absolute right-1 top-1 rounded text-black mr-[275px] mt-7">
//             Search
//           </Button> */}
//         </div>

//   );
// }

// export default NavbarWithSearch;

"use client";
import { useEffect, useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const Search = ({search} : {search?: string}) => {
  const router = useRouter();
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 500);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return;
    }


    if (!query) {
      router.push('/')
    } else {
      router.push(`/products?search=${query}`)
    }
  }, [query, router]);

  return (
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
        <MagnifyingGlassIcon 
         className="h-5 w-5 text-gray-600 ml-1"
         aria-aria-hidden="true"
        />
      </div>
      <input 
       value={text}
       onChange={e => setText(e.target.value)}
       placeholder="Search Dine Market"
       className="block rounded-md w-46 h-8 border-2 py-1.5 pl-7"
      />
    </div>
  );
};

export default Search;
