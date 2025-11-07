import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBOOHhmRWNaomQk9fDZ9xOplqmwZGMSBCc",
});

export default function ChatBotScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // chứa cả yêu cầu & phản hồi

  // 🔹 Hàm gọi Gemini API
  async function GeminiChat(request) {
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: request,
      });

      const reply = result.text || "Không có phản hồi.";

      // Cập nhật mảng tin nhắn
      setMessages((prev) => [
        ...prev,
        { role: "user", text: request },
        { role: "bot", text: reply },
      ]);
    } catch (error) {
      console.error("GeminiChat error:", error);
      Alert.alert("Lỗi khi gọi API!");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* 🟩 Hiển thị yêu cầu và phản hồi */}
      <ScrollView contentContainerStyle={styles.displayContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.role === "user" ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 🟦 Ô nhập ở cuối màn hình */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập yêu cầu..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!input.trim()) return;
            GeminiChat(input);
            setInput("");
          }}
        >
          <Text style={styles.buttonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  displayContainer: {
    paddingVertical: 20,
  },
  messageBubble: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    maxWidth: "85%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  messageText: {
    fontSize: 16,
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  button: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
