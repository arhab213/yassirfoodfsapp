import "./pagination.css";
interface propsType {
  postsItems: number;
  itemPerPage: number;
  Setter: Dispatch<SetStateAction<number>>;
  currentPage: number;
}
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function Paginations(props: propsType) {
  let { postsItems, itemPerPage, Setter, currentPage } = props;
  useEffect(() => {
    setBackgroundTo(currentPage);
  }, [currentPage]);
  let [BackgroundTo, setBackgroundTo] = useState<Number>();
  let pages = [];
  for (let i = 1; i <= Math.ceil(postsItems / itemPerPage); i++) {
    pages.push(i);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() =>
              currentPage > 1 ? Setter(currentPage - 1) : Setter(1)
            }
            className="text-violet-900 hover:text-violet-900"
          />
        </PaginationItem>
        {pages.map((e) => {
          return (
            <PaginationItem>
              <PaginationLink
                href="#"
                key={e}
                onClick={() => {
                  Setter(e);
                  setBackgroundTo(e);
                }}
                className={
                  BackgroundTo == e
                    ? " bg-violet-700 text-white hover:bg-violet-400 hover:text-white"
                    : "text-violet-900 hover:text-violet-900"
                }
              >
                {e}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href="#"
            className="text-violet-900 hover:text-violet-900"
            onClick={() =>
              currentPage >= Number(pages.length)
                ? Setter(pages.length)
                : Setter(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Paginations;
