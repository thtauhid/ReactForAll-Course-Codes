import { Link } from "raviger";

export default function ShareLink(props: { id: number }) {
  return (
    <div className='flex mt-4'>
      <input
        type='text'
        className='flex-1 ml-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
        value={`http://localhost:3000/view/${props.id}`}
        readOnly
      />
      <Link
        type='button'
        className='ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
        href={`/view/${props.id}`}
        target='_blank'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
          />
        </svg>
      </Link>
    </div>
  );
}
