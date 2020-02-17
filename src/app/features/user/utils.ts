export async function getUserByFirebaseToken(context: {
  user: { uid: string };
}): Promise<any> {
  if (!context || !context.user) return null;
  const firebaseUid = context.user.uid;

  return null;
}
