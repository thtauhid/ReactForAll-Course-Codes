import { CheckIcon, ClipboardIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "raviger";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ShareLink(props: { id: number }) {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <div className='flex mt-4'>
      <input
        type='text'
        className='flex-1 ml-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
        value={`http://localhost:3000/preview/${props.id}`}
        readOnly
      />
      <CopyToClipboard
        text={`http://localhost:3000/preview/${props.id}`}
        onCopy={() => setCopied(true)}
      >
        <button
          className={`ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none  ${
            copied ? "bg-green-500 hover:bg-green-600" : ""
          }`}
        >
          {copied ? (
            <CheckIcon className='h-6 w-6' aria-hidden='true' />
          ) : (
            <ClipboardIcon className='h-6 w-6' aria-hidden='true' />
          )}
        </button>
      </CopyToClipboard>

      <Link
        type='button'
        className='ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
        href={`/preview/${props.id}`}
        target='_blank'
      >
        <EyeIcon className='h-6 w-6' aria-hidden='true' />
      </Link>
    </div>
  );
}
