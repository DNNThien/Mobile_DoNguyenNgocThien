// ==================================================
// 1. Import & setup
// ==================================================
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// --- Firebase Admin setup ---
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://smartagriculture-4edb5-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();
const auth = admin.auth();

// --- Express setup ---
const app = express();
app.use(cors());
app.use(express.json());

// --- Nodemailer setup (Gmail example) ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dnnthien2903@gmail.com",
    pass: "moimbpqkqnipnufn", // App Password (không dùng password thật)
  },
});

// ==================================================
// 2. Helper functions
// ==================================================
function generateOTP(length = 6) {
  const chars = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++)
    otp += chars[Math.floor(Math.random() * chars.length)];
  return otp;
}

async function sendOTPEmail(toEmail, otp) {
  const mailOptions = {
    from: "dnnthien2903@gmail.com",
    to: toEmail,
    subject: "Mã OTP xác thực",
    text: `Mã OTP của bạn là: ${otp}. Hết hạn sau 10 phút.`,
  };
  await transporter.sendMail(mailOptions);
}

// ==================================================
// 3. Check Email: kiểm tra email có tồn tại trong Firebase Auth không
// ==================================================
app.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;

    try {
      await auth.getUserByEmail(email); // Tìm user trong Firebase Authentication
      return res.json({ success: true, message: "Email already exists" }); // Đã tồn tại
    } catch (error) {
      console.log("Server: Error when check email: ", error);
      if (error.code === "auth/user-not-found") {
        return res
          .status(400)
          .json({ success: false, message: "Email not found" }); // Chưa tồn tại
      } else {
        throw error; // Lỗi khác (mạng, quyền, v.v.)
      }
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// ==================================================
// 4. Signup: gửi OTP (đăng ký tài khoản mới)
// ==================================================
app.post("/signup/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 phút

    await db.ref(`otp_verification/${email.replace(".", "_")}`).set({
      otp,
      expiresAt,
      purpose: "signup",
    });

    await sendOTPEmail(email, otp);
    console.log("Sent OTP for signup: Successfully!");
    res.json({ success: true, message: "OTP sent to email for SignUp" });
  } catch (error) {
    console.log("Error when send OTP for signup: ", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// ==================================================
// 5. Signup: xác thực OTP và tạo user
// ==================================================
app.post("/signup/verify-otp", async (req, res) => {
  try {
    const { email, otp, name, gender, acceptedTerms } = req.body;

    const refOtp = await db
      .ref(`otp_verification/${email.replace(".", "_")}`)
      .once("value");
    const data = refOtp.val();

    if (
      !data ||
      data.otp !== otp ||
      Date.now() > data.expiresAt ||
      data.purpose !== "signup"
    )
      return res.status(400).json({ error: "OTP invalid or expired" });

    // --- Lưu thông tin user vào Realtime Database ---
    await db.ref(`users/${email.replace(".", "_")}`).set({
      name,
      gender,
      email,
      acceptedTerms,
      createdAt: Date.now(),
    });

    // --- Xóa OTP sau khi dùng ---
    await db.ref(`otp_verification/${email.replace(".", "_")}`).remove();
    res.json({ message: "User created successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================================================
// 6. Login: gửi OTP
// ==================================================
app.post("/login/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    await db.ref(`otp_verification/${email.replace(".", "_")}`).set({
      otp,
      expiresAt,
      purpose: "login",
    });

    await sendOTPEmail(email, otp);
    console.log("Sent OTP for login: Successfully!");
    res.json({ success: true, message: "OTP sent to email for login" });
  } catch (error) {
    console.log("Error when send OTP for login: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// ==================================================
// 7. Login: xác thực OTP
// ==================================================
app.post("/login/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const refOtp = await db
      .ref(`otp_verification/${email.replace(".", "_")}`)
      .once("value");
    const data = refOtp.val();

    if (
      !data ||
      data.otp !== otp ||
      Date.now() > data.expiresAt ||
      data.purpose !== "login"
    )
      return res
        .status(400)
        .json({ success: false, message: "OTP invalid or expired" });

    await db.ref(`otp_verification/${email.replace(".", "_")}`).remove();

    res.json({ success: true, message: "Verify OTP for login: Successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ==================================================
// 8. Reset password: gửi OTP
// ==================================================
app.post("/reset-password/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    await db.ref(`otp_verification/${email.replace(".", "_")}`).set({
      otp,
      expiresAt,
      purpose: "reset_password",
    });

    await sendOTPEmail(email, otp);
    res.json({
      success: true,
      message: "OTP sent to email for password reset",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ==================================================
// 9. Reset password: xác thực OTP
// ==================================================
app.post("/reset-password/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const refOtp = await db
      .ref(`otp_verification/${email.replace(".", "_")}`)
      .once("value");
    const data = refOtp.val();

    if (
      !data ||
      data.otp !== otp ||
      Date.now() > data.expiresAt ||
      data.purpose !== "reset_password"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "OTP invalid or expired" });
    }

    // Nếu OTP hợp lệ, trả về success
    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post("/reset-password/update-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const userRecord = await auth.getUserByEmail(email);
    await auth.updateUser(userRecord.uid, { password: newPassword });

    // Xóa OTP đã dùng nếu muốn
    await db.ref(`otp_verification/${email.replace(".", "_")}`).remove();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ========================
// Middleware xác thực token
// ========================
async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Missing or invalid token" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    // Xác minh token với Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Lưu thông tin user (uid, email, v.v.) vào req.user để API khác có thể dùng
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
}


// ==================================================
// 8. Change password: gửi OTP
// ==================================================
app.post("/change-password/send-otp", verifyToken, async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    await db.ref(`otp_verification/${email.replace(".", "_")}`).set({
      otp,
      expiresAt,
      purpose: "change_password",
    });

    await sendOTPEmail(email, otp);
    res.json({
      success: true,
      message: "OTP sent to email for password reset",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ==================================================
// 9. Change password: xác thực OTP
// ==================================================
app.post("/change-password/verify-otp", verifyToken, async (req, res) => {
  try {
    const { email, otp } = req.body;

    const refOtp = await db
      .ref(`otp_verification/${email.replace(".", "_")}`)
      .once("value");
    const data = refOtp.val();

    if (
      !data ||
      data.otp !== otp ||
      Date.now() > data.expiresAt ||
      data.purpose !== "change_password"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "OTP invalid or expired" });
    }

    // Nếu OTP hợp lệ, trả về success
    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post("/change-password/update-password", verifyToken,  async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const userRecord = await auth.getUserByEmail(email);
    await auth.updateUser(userRecord.uid, { password: newPassword });

    // Xóa OTP đã dùng nếu muốn
    await db.ref(`otp_verification/${email.replace(".", "_")}`).remove();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


// ========================
// API: Lấy thông tin user
// ========================
app.get("/user/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;

    // ✅ Kiểm tra email trong token có khớp với email đang được yêu cầu không
    // (tránh việc 1 người lấy token rồi đi xem dữ liệu người khác)
    if (req.user.email !== email) {
      return res.status(403).json({
        success: false,
        message: "Access denied: You are not authorized to access this data",
      });
    }

    const formattedEmail = email.replace(/\./g, "_");

    const snapshot = await db.ref(`users/${formattedEmail}`).once("value");
    const userData = snapshot.val();

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    res.json({
      success: true,
      message: "User data retrieved successfully",
      data: userData,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================================================
// 10. Update user info: gửi OTP
// ==================================================
app.post("/update-info/send-otp", verifyToken, async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    await db.ref(`otp_verification/${email.replace(".", "_")}`).set({
      otp,
      expiresAt,
      purpose: "update_info",
    });

    await sendOTPEmail(email, otp);
    res.json({ success: true, message: "OTP sent to email for update info" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ==================================================
// 11. Update user info: xác thực OTP
// ==================================================
app.post("/update-info/verify-otp", verifyToken, async (req, res) => {
  try {
    const {
      email,
      otp,
      name,
      gender,
      phoneNumber,
      birthday,
      address,
      country,
    } = req.body;
    const refOtp = await db
      .ref(`otp_verification/${email.replace(".", "_")}`)
      .once("value");
    const data = refOtp.val();

    if (
      !data ||
      data.otp !== otp ||
      Date.now() > data.expiresAt ||
      data.purpose !== "update_info"
    )
      return res
        .status(400)
        .json({ success: false, message: "OTP invalid or expired" });

    await db.ref(`users/${email.replace(".", "_")}`).update({
      name,
      gender,
      phoneNumber,
      birthday,
      address,
      country,
    });

    await db.ref(`otp_verification/${email.replace(".", "_")}`).remove();
    res.json({ success: true, message: "User info updated successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ==================================================
// 12. Delete account: gửi OTP
// ==================================================
app.post("/delete-account/send-otp", verifyToken, async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // OTP hết hạn sau 10 phút

    await db.ref(`otp_verification/${email.replace(".", "_")}`).set({
      otp,
      expiresAt,
      purpose: "delete_account",
    });

    await sendOTPEmail(email, otp);
    res.json({
      success: true,
      message: "OTP sent to email for account deletion confirmation",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// ==================================================
// 13. Delete account: xác thực OTP và xóa tài khoản
// ==================================================
app.post("/delete-account/verify-otp", verifyToken, async (req, res) => {
  try {
    const { email, otp } = req.body;

    const refOtp = await db
      .ref(`otp_verification/${email.replace(".", "_")}`)
      .once("value");
    const data = refOtp.val();

    // Kiểm tra OTP hợp lệ
    if (
      !data ||
      data.otp !== otp ||
      Date.now() > data.expiresAt ||
      data.purpose !== "delete_account"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "OTP invalid or expired" });
    }

    const userRecord = await auth.getUserByEmail(email);
    await auth.deleteUser(userRecord.uid);
    await db.ref(`users/${userRecord.uid}`).remove();

    await db.ref(`otp_verification/${email.replace(".", "_")}`).remove();

    res.json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});


// ==================================================
// 12. Start server
// ==================================================
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
