import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function Success() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <CheckBadgeIcon className='h-24 w-24 text-blue-500' aria-hidden='true' />
      <p>Form Submitted</p>
    </div>
  );
}
