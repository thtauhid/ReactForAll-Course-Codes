import { useEffect, useState } from "react";
import { Form } from "./types/formTypes";
import { Link } from "raviger";
import { listForms } from "./utils/apiUtils";
import { Pagination } from "./types/common";
import ReactPaginate from "react-paginate";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const getForms = async (
  limit: number,
  offset: number,
  setFormsCB: (value: Form[]) => void,
  setCountCB: (value: number) => void
) => {
  const data: Pagination<Form> = await listForms({ limit, offset });

  setCountCB(data.count);
  setFormsCB(data.results);
};

export default function Forms() {
  const limit = 5;
  const [offset, setOffset] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    getForms(limit, offset, setForms, setCount);
  }, [limit, offset]);

  const pageCount = Math.ceil(count / limit);

  // Invoke when user click to request another page.
  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * limit) % count;
    setOffset(newOffset);
  };

  return (
    <>
      <div className='flex justify-end my-4'>
        <Link
          className='flex justify-center items-center p-3 bg-blue-500 rounded text-white'
          href='/forms/create'
        >
          <PlusIcon className='h-6 w-6 mr-1' aria-hidden='true' /> Create Form
        </Link>
      </div>

      {forms.map((form) => (
        <FormCard key={form.id} formData={form} />
      ))}

      <div className='flex justify-between items-center'>
        <p>
          Displaying {1 + offset} to{" "}
          {limit + offset < count ? limit + offset : count} of {count}
        </p>
        <ReactPaginate
          breakLabel='...'
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel={
            <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
          }
          nextLabel={
            <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
          }
          renderOnZeroPageCount={null}
          containerClassName='isolate inline-flex -space-x-px rounded-md shadow-sm mt-5'
          previousClassName='rounded-l p-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:bg-blue-500 hover:text-white'
          pageClassName='px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex hover:bg-blue-500 hover:text-white'
          nextClassName='rounded-r-md p-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:bg-blue-500 hover:text-white'
          breakClassName='px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex hover:bg-blue-500 hover:text-white'
          activeClassName='bg-blue-800 text-white hover:bg-blue-800 hover:text-white'
        />
      </div>
    </>
  );
}

function FormCard(props: { formData: Form }) {
  return (
    <div className='flex justify-between items-center p-4 my-2 bg-white rounded-xl border-stone-400 border-2 hover:bg-slate-200'>
      <h2 className='text-xl'>{props.formData.title}</h2>
      <div className='flex'>
        <Link
          className='p-3 bg-blue-500 hover:bg-blue-700 rounded text-white button inline-block'
          href={`/forms/${props.formData.id}`}
        >
          <PencilSquareIcon className='h-6 w-6' aria-hidden='true' />
        </Link>
        <Link
          href={`/preview/${props.formData.id}`}
          target='_blank'
          className='ml-2 p-3 bg-blue-500 hover:bg-blue-700 rounded text-white'
        >
          <EyeIcon className='h-6 w-6' aria-hidden='true' />
        </Link>
      </div>
    </div>
  );
}
