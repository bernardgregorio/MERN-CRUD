export const clearCookie = (name, res) => {
  res.clearCookie(name, {
    httpOnly: true,
    sameSite: "Strict",
    secure: false,
  });
};

export const createCookie = (name, refreshToken, maxAge, res) => {
  res.cookie(name, refreshToken, {
    httpOnly: true,
    sameSite: "Strict",
    secure: false,
    maxAge: maxAge, //24 * 60 * 60 * 1000,
  });
};
