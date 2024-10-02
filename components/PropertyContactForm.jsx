'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import addMessage from '@/app/actions/addMessage';
import SubmitMessageButton from './SubmitMessageButton';

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();

  // update the state based on the result of an action, returned value from addMessage is going to be put in state
  const [state, formAction] = useFormState(addMessage, {}); // useFormState(action, initial state) // useActionState in react 19

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success('Message sent successfully');
  }, [state]);

  if (state.submitted) {
    return (
      <p className="text-green-500 mb-4">
        Your message has been sent successfully
      </p>
    );
  }

  return (
    session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <form action={formAction}>
          <input
            type="hidden"
            id="property"
            name="property"
            defaultValue={property._id}
          />
          <input
            type="hidden"
            id="recipient"
            name="recipient"
            defaultValue={property.owner}
          />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="body"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="body"
              name="body"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <SubmitMessageButton />
          </div>
        </form>
      </div>
    )
  );
};
export default PropertyContactForm;

//-----------------------------------------------

// // With the use of useFormState,
// // you can hold the initial form state outside the form element
// // and then pass that data into the server action known by the useFormState hook.

// 'use client'
// import { useFormState } from 'react-dom'
// import { createUser } from '@app/actions'

// const initialState = {
//   message: '',
// }

// // when a user has typed in their email in the email input element
// // and hits the sign-up button the form will trigger the server action
// export function Signup() {
//   const [state, formAction] = useFormState(createUser, initialState)

//   return (
//     <form action={formAction}>
//       <label htmlFor="email">Email</label>
//       <input type="text" id="email" name="email" required />

//       <p aria-live="polite">
//         {state?.message}
//       </p>

//       <button>Sign up</button>
//     </form>
//   )
// }

// // ------------------------------------------------
// // This can be extended further
// // to enable default values to be passed into the server action
// // to enable updates via server actions.

// 'use client'

// import { useFormState } from 'react-dom'
// import { updateUser } from '@app/actions'

// export function UpdateProfileForm({ userId, userName }) {
//   const [state, formAction] = useFormState(updateUser, {
//     id: userId,
//     name: userName,
//     userLocation: '',
//     message: ''
//   })

//   // The userName can be seen in the form
//   // and the userLocation value can be seen
//   // and overwritten by the user.
//   return (
//     <form action={formAction}>
//       <label htmlFor="userName">Name</label>
//       <input type="text" id="userName" name="userName" value={userName} disabled />

//       <label htmlFor="userLocation">Location</label>
//       <input type="text" id="userLocation" name="userLocation" required />

//       <p aria-live="polite">
//         {state?.message}
//       </p>

//       <button>Update Profile</button>
//     </form>
//   )
// }
