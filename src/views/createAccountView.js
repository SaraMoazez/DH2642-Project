//Component taken from tailwind

import { LockClosedIcon } from '@heroicons/react/20/solid';

export default function CreateAccountView(props) {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
        <div>
        <img
            className="mx-auto h-16 w-auto"
            src="Travel_Footprint_Logga_Tr.png"
            alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-logo-green-hover">
            Create your account
        </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
            <div>
            <label htmlFor="email-address" className="sr-only">
                Email address
            </label>
            <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                placeholder="Email address"
                onChange={onEmailChangeACB}
            />
            </div>
            <div>
            <label htmlFor="password" className="sr-only">
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                placeholder="Password"
                onChange={onPasswordChangeACB}
            />
            </div>
        </div>
        <div>
            <button
            onClick={createAccountACB}
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#22B14C] py-2 px-4 text-sm font-medium text-white hover:bg-[#28A04B] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-green-400 group-hover:text-green-200" aria-hidden="true" />
            </span>
            Create your account
            </button>
        </div>
        </form>
    </div>
    </div>
  )
  
  function onEmailChangeACB(event){
    props.email(event.target.value);
  }
  function onPasswordChangeACB(event){
    props.password(event.target.value);
  }
  function createAccountACB(event){
    event.preventDefault();
    props.onCreateAccount();
  }
}