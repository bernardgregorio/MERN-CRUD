export const clearCookie = (name, res) => {
  res.clearCookie(name, {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });
};

export const createCookie = (name, refreshToken, maxAge, res) => {
  res.cookie(name, refreshToken, {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    maxAge: maxAge, //24 * 60 * 60 * 1000,
  });
};
