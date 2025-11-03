import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView } from "react-native";
import { getChatGPTResponse } from "./api";

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const gptResponse = await getChatGPTResponse(input);
    const botMessage = { role: "bot", content: gptResponse };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView>
        {messages.map((msg, index) => (
          <Text key={index} style={{ marginVertical: 5 }}>
            {msg.role === "user" ? "Bạn: " : "Bot: "}
            {msg.content}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Nhập tin nhắn..."
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Gửi" onPress={sendMessage} />
    </View>
  );
}
