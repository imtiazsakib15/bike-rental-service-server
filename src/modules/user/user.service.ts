const getMeFromDB = async (payload: Record<string, unknown>) => {
  const user = { ...payload };
  delete user.password;
  return user;
};

export const UserServices = { getMeFromDB };
