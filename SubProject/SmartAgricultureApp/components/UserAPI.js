// Cấu hình URL của server
const BASE_URL = "http://10.27.192.191:3000";

// ==================================================
// 1. Hàm gọi API tổng quát
// ==================================================
async function callAPI(endpoint, method = "GET", body = null, token = null) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Request failed",
        data: data.data || null,
      };
    }

    return {
      success: true,
      message: data.message || "Success",
      data: data.data || null,
    };
  } catch (error) {
    console.log("Error when CallAPI:", error);
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
}

export async function checkEmailExists(email) {
  return await callAPI("/check-email", "POST", { email });
}

// 🔹 Lấy thông tin người dùng từ server
export async function getUserData(idToken, email) {
  return await callAPI(`/user/${email}`, "GET", null, idToken);
}

// ==================================================
// 2. Đăng ký (Signup)
// ==================================================

// 🔹 Gửi OTP để đăng ký
export async function signupSendOtp(email) {
  return await callAPI("/signup/send-otp", "POST", { email });
}

// 🔹 Xác thực OTP và tạo tài khoản mới
export async function signupVerifyOtp(
  email,
  otp,
  password,
  name,
  gender,
  acceptedTerms
) {
  return await callAPI("/signup/verify-otp", "POST", {
    email,
    otp,
    password,
    name,
    gender,
    acceptedTerms,
  });
}

// ==================================================
// 3. Đăng nhập (Login)
// ==================================================

// 🔹 Gửi OTP để đăng nhập
export async function loginSendOtp(email) {
  return await callAPI("/login/send-otp", "POST", { email });
}

// 🔹 Xác thực OTP và đăng nhập thành công
export async function loginVerifyOtp(email, otp) {
  return await callAPI("/login/verify-otp", "POST", { email, otp });
}

// ==================================================
// 4. Quên mật khẩu (Reset Password)
// ==================================================

// 🔹 Gửi OTP để đặt lại mật khẩu
export async function resetPasswordSendOtp(email) {
  return await callAPI("/reset-password/send-otp", "POST", { email });
}

// 🔹 Xác thực OTP và cập nhật mật khẩu mới
export async function resetPasswordVerifyOtp(email, otp, newPassword) {
  return await callAPI("/reset-password/verify-otp", "POST", {
    email,
    otp,
  });
}

// 🔹 Cập nhật mật khẩu mới
export async function updatePassword(email, newPassword) {
  return await callAPI("/reset-password/update-password", "POST", {
    email,
    newPassword,
  });
}

// ==================================================
// 5. Cập nhật thông tin người dùng (Update Info)
// ==================================================

// 🔹 Gửi OTP để xác thực trước khi cập nhật
export async function updateInfoSendOtp(idToken, email) {
  return await callAPI("/update-info/send-otp", "POST", { email }, idToken);
}

// 🔹 Xác thực OTP và cập nhật thông tin
export async function updateInfoVerifyOtp(
  idToken,
  email,
  otp,
  name,
  gender,
  phoneNumber,
  birthday,
  address,
  country
) {
  return await callAPI(
    "/update-info/verify-otp",
    "POST",
    {
      email,
      otp,
      name,
      gender,
      phoneNumber,
      birthday,
      address,
      country,
    },
    idToken
  );
}

export async function changePasswordSendOtp(idToken, email) {
  return await callAPI("/change-password/send-otp", "POST", { email }, idToken);
}

export async function changePasswordVerifyOtp(idToken, email, otp) {
  return await callAPI(
    "/change-password/verify-otp",
    "POST",
    { email, otp },
    idToken
  );
}

export async function changePasswordUpdatePassword(
  idToken,
  email,
  newPassword
) {
  return await callAPI(
    "/change-password/update-password",
    "POST",
    {
      email,
      newPassword,
    },
    idToken
  );
}

export async function deleteAccountSendOtp(idToken, email) {
  return await callAPI("/delete-account/send-otp", "POST", { email }, idToken);
}

export async function deleteAccountVerifyOtp(idToken, email, otp) {
  return await callAPI(
    "/delete-account/verify-otp",
    "POST",
    { email, otp },
    idToken
  );
}
