'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function addMessage(previousState, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: 'You must be logged in to send a message' };
  }

  const { userId } = sessionUser;

  const recipient = formData.get('recipient');

  if (userId === recipient) {
    return { error: 'You can not send a message to yourself' };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('body'),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;

//---------------------------------------------------

// // The returned data is then picked up by the useActionState hook
// // and replaces its previous state data with this returned data.
// export async function createUser(prevState, formData) {
//   const email = formData.get('email');

//   if (!emailIsValid(email)) {
//       return {
//         message: "Unable to verify email"
//       }
//   }

//   try {
//     await createUser(email)

//     return {
//       message: "Successfully signed up"
//     }
//   } catch(e) {
//     return {
//       message: "Unable to create user"
//     }
//   }
// }

// //------------------------------------------------

// // Now that this is in the hook's state,
// // the server action can now access the state via the first argument which is known as ‘previousState’.
// // This can then be passed to server functions to update that user's profile.
