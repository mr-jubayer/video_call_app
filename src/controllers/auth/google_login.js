import { OAuth2Client } from "google-auth-library";
import envVars from "../../config/env.js";
import { UserModel } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const client = new OAuth2Client(envVars.GOOGLE_CLIENT_ID);

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token",
      error
    );
  }
};

const googleLogin = asyncHandler(async (req, res) => {
  const { token } = req.body;

  // verify google token
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: envVars.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { sub: googleId, email, name, picture: avatar } = payload;

  // TODO: find or create user in DB
  let user = await UserModel.findOne({ email });

  if (!user) {
    user = await UserModel.create({
      name,
      email,
      googleId,
      avatar,
      provider: "google",
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await UserModel.findById(user._id).select(
    "-refreshToken -password"
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "LoggedIn successfully"
      )
    );
});

export { googleLogin };
