// assets/documents/terms.js
import React from "react";
import { View, Text } from "react-native";

const TermsContent = () => {
  return (
    <View style={{ padding: 15 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#2a9d8f",
          textAlign: "center",
          marginBottom: 15,
        }}
      >
        Terms & Conditions
      </Text>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#264653",
            marginBottom: 3,
          }}
        >
          1. Acceptance of Terms
        </Text>
        <Text style={{ fontSize: 14, lineHeight: 20, color: "#333" }}>
          By using this app, you agree to comply with these Terms and
          Conditions.
        </Text>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#264653",
            marginBottom: 3,
          }}
        >
          2. Privacy
        </Text>
        <Text style={{ fontSize: 14, lineHeight: 20, color: "#333" }}>
          Your personal information will be handled according to our Privacy
          Policy.
        </Text>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#264653",
            marginBottom: 3,
          }}
        >
          3. User Responsibilities
        </Text>
        <Text style={{ fontSize: 14, lineHeight: 20, color: "#333" }}>
          You agree not to misuse the app, provide false information, or attempt
          to access unauthorized features.
        </Text>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#264653",
            marginBottom: 3,
          }}
        >
          4. Limitation of Liability
        </Text>
        <Text style={{ fontSize: 14, lineHeight: 20, color: "#333" }}>
          The app is provided "as is" without warranties of any kind. We are not
          responsible for any damages resulting from use.
        </Text>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#264653",
            marginBottom: 3,
          }}
        >
          5. Changes to Terms
        </Text>
        <Text style={{ fontSize: 14, lineHeight: 20, color: "#333" }}>
          We may update these Terms and Conditions at any time. Continued use of
          the app constitutes acceptance of the updated terms.
        </Text>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#264653",
            marginBottom: 3,
          }}
        >
          6. Contact
        </Text>
        <Text style={{ fontSize: 14, lineHeight: 20, color: "#333" }}>
          For any questions regarding these terms, please contact
          support@example.com.
        </Text>
      </View>
    </View>
  );
};

export default TermsContent;
