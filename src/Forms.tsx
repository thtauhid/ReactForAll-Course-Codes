import { useEffect, useReducer } from "react";
import { Form } from "./types/formTypes";
import { Link } from "raviger";
import { listForms } from "./utils/apiUtils";
import { Pagination } from "./types/common";
import {
  EyeIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import InfiniteScroll from "react-infinite-scroller";

const getForms = async (limit: number, offset: number) => {
  const data: Pagination<Form> = await listForms({ limit, offset });
  return data;
};

const limit = 7; // number of forms to fetch at a time

type State = {
  forms: Form[];
  offset: number;
  count: number;
};

type Initializer = {
  type: "INITIALIZE";
  payload: { forms: Form[]; count: number };
};

type AddFormsAction = {
  type: "ADD_FORMS";
  payload: Form[];
};

type FormAction = Initializer | AddFormsAction;

const reducer = (state: State, action: FormAction) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        ...action.payload,
        offset: limit,
      };

    case "ADD_FORMS":
      const forms = [...state.forms, ...action.payload];

      // remove duplicates
      const uniqueForms = forms.filter(
        (form, index, self) => index === self.findIndex((f) => f.id === form.id)
      );

      return {
        ...state,
        forms: uniqueForms,
        offset: state.offset + limit,
      };

    default:
      return state;
  }
};

export default function Forms() {
  const [state, dispatch] = useReducer(reducer, {
    forms: [],
    offset: 0,
    count: 0,
  });

  useEffect(() => {
    getForms(limit, 0)
      .then((data) => {
        dispatch({
          type: "INITIALIZE",
          payload: {
            forms: data.results,
            count: data.count,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const newScroll = () => {
    console.log("fetching data");

    getForms(limit, state.offset)
      .then((data) => {
        dispatch({
          type: "ADD_FORMS",
          payload: data.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className='flex justify-end my-4'>
        <Link
          className='flex justify-center items-center p-3 bg-blue-500 rounded text-white focus:outline-none focus:outline-black'
          href='/forms/create'
        >
          <PlusIcon className='h-6 w-6 mr-1' aria-hidden='true' /> Create Form
        </Link>
      </div>

      <InfiniteScroll
        className='overflow-auto'
        loadMore={newScroll}
        hasMore={state.forms.length < state.count && state.forms.length > 0}
        loader={
          <div
            className='
            flex justify-center items-center p-3 bg-blue-500 rounded text-white focus:outline-none focus:outline-black
          '
            key={0}
          >
            Loading ...
          </div>
        }
      >
        {state.forms.map((form) => (
          <FormCard key={form.id} formData={form} />
        ))}
      </InfiniteScroll>
    </>
  );
}

function FormCard(props: { formData: Form }) {
  return (
    <div className='flex justify-between items-center p-4 my-2 bg-white rounded-xl border-stone-400 border-2 hover:bg-slate-200'>
      <h2 className='text-xl'>{props.formData.title}</h2>
      <div className='flex'>
        <Link
          className='p-3 bg-blue-500 hover:bg-blue-700 rounded text-white button inline-block focus:outline-none focus:outline-black'
          href={`/forms/${props.formData.id}`}
        >
          <PencilSquareIcon className='h-6 w-6' aria-hidden='true' />
        </Link>
        <Link
          href={`/preview/${props.formData.id}`}
          target='_blank'
          className='ml-2 p-3 bg-blue-500 hover:bg-blue-700 rounded text-white focus:outline-none focus:outline-black'
        >
          <EyeIcon className='h-6 w-6' aria-hidden='true' />
        </Link>
      </div>
    </div>
  );
}
